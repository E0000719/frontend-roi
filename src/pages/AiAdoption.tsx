import { Target } from "lucide-react";

export default function AiAdoption() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <Target className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">360 Company AI Adoption</h1>
          <p className="text-muted-foreground">Comprehensive AI adoption tracking</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <p className="text-muted-foreground">
          Content for 360 Company AI Adoption module will be displayed here.
        </p>
      </div>
    </div>
  );
}
