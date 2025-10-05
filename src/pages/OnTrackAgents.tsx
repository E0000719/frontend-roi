import { Users } from "lucide-react";

export default function OnTrackAgents() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <Users className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agentes en Seguimiento</h1>
          <p className="text-muted-foreground">Monitorear y gestionar el rendimiento de agentes</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <p className="text-muted-foreground">
          El contenido del módulo de Agentes en Seguimiento se mostrará aquí.
        </p>
      </div>
    </div>
  );
}
