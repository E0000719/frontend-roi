import { FileText } from "lucide-react";

export default function RoiBusinessCase() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <FileText className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">New ROI Business Case</h1>
          <p className="text-muted-foreground">Create and manage ROI business cases</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <p className="text-muted-foreground">
          Content for ROI Business Case module will be displayed here.
        </p>
      </div>
    </div>
  );
}
