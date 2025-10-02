import { TrendingUp } from "lucide-react";

export default function ProcessImprovement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Continuous Process Improvement</h1>
          <p className="text-muted-foreground">Track and optimize business processes</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <p className="text-muted-foreground">
          Content for Continuous Process Improvement module will be displayed here.
        </p>
      </div>
    </div>
  );
}
