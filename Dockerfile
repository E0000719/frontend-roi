# -----------------------------------------------------------
# STAGE 1: BUILD (Compilación con Node.js y Vite)
# -----------------------------------------------------------
# Utilizamos una imagen de Node.js reciente para el proceso de build.
FROM node:20-slim AS builder

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# 1. Copiar archivos de configuración para instalar dependencias
# Copiamos solo los archivos de lock y package.json primero para aprovechar el caché de Docker
COPY package.json ./
# Asumo que usas npm con package-lock.json. Si usas yarn o pnpm, ajusta el archivo de lock.
COPY package-lock.json ./ 

# 2. Instalar dependencias
# --production=false asegura que se instalen las devDependencies (necesarias para la construcción)
RUN npm install

# 3. Copiar el código fuente completo
COPY . .

# 4. Comando de construcción de Vite
# Se ejecuta el comando que genera los archivos estáticos en el directorio 'build'
RUN npm run build

# -----------------------------------------------------------
# STAGE 2: FINAL (Servicio estático con Nginx)
# -----------------------------------------------------------
# Usamos Nginx Alpine: una imagen muy ligera y segura para servir contenido estático.
FROM nginx:stable-alpine AS final

# Instalar 'curl' para propósitos de salud/diagnóstico (health checks) en AWS (opcional, pero útil)
RUN apk add --no-cache curl

# Copiar la configuración personalizada de Nginx (NECESARIO para React Router/SPA)
# Se asume que el archivo nginx.conf está en el mismo directorio que el Dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos generados desde la etapa 'builder'
# Los archivos de la carpeta 'build' se copian al directorio de servicio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Puerto de escucha por defecto de Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]