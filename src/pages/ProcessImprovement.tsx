import { TrendingUp } from "lucide-react";

export default function ProcessImprovement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mejora Continua de Procesos</h1>
          <p className="text-muted-foreground">Seguimiento y optimización de procesos de negocio</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <p className="text-muted-foreground">
          El contenido del módulo de Mejora Continua de Procesos se mostrará aquí.
        </p>
      </div>
    </div>
  );
}
