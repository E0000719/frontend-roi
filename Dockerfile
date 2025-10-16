# ---- Build (Vite) ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Nginx (static) ----
FROM nginx:1.27-alpine
# opcional: utilidades mínimas
RUN apk add --no-cache curl
# tu server block va en este archivo:
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copia el build de Vite
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD curl -fsS http://127.0.0.1/ || exit 1
CMD ["nginx", "-g", "daemon off;"]
