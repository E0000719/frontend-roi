import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const headcountReductionData = [
  { month: "Jan", actual: 320, projected: 315 },
  { month: "Feb", actual: 305, projected: 300 },
  { month: "Mar", actual: 290, projected: 285 },
  { month: "Apr", actual: 275, projected: 270 },
  { month: "May", actual: 260, projected: 255 },
  { month: "Jun", actual: 250, projected: 245 },
  { month: "Jul", actual: 240, projected: 235 },
  { month: "Aug", actual: 230, projected: 225 },
  { month: "Sep", actual: 220, projected: 215 },
  { month: "Oct", actual: 210, projected: 205 },
  { month: "Nov", actual: 200, projected: 195 },
  { month: "Dec", actual: 190, projected: 185 },
];

const departmentSavings = [
  { name: "Finance & Accounting", positions: 68, savings: 4080000, progress: 100 },
  { name: "Customer Support", positions: 32, savings: 1536000, progress: 100 },
  { name: "HR & Administration", positions: 42, savings: 2016000, progress: 100 },
  { name: "Sales Operations", positions: 28, savings: 1680000, progress: 85 },
  { name: "IT Operations", positions: 55, savings: 3630000, progress: 92 },
  { name: "Legal", positions: 22, savings: 1584000, progress: 78 },
];

export default function AiAdoption() {
  const totalSavings = departmentSavings.reduce((acc, dept) => acc + dept.savings, 0);
  const totalPositions = departmentSavings.reduce((acc, dept) => acc + dept.positions, 0);
  const currentHeadcount = 247;
  const progressPercent = 84;

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

      {/* Headcount Reduction Tracking */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Headcount Reduction Tracking</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor and predict headcount reduction trends
              </p>
            </div>
            <div className="flex gap-2">
              <Badge>Active</Badge>
              <Badge variant="outline">Quarterly</Badge>
              <Badge variant="outline">Yearly</Badge>
              <Badge variant="outline">Simulated last Days</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Total Headcount Reduction</div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Projected: 247</span>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">{currentHeadcount}</span>
                  <div className="text-sm">
                    <div className="text-primary font-medium">Actual: {currentHeadcount}</div>
                    <div className="text-muted-foreground">{progressPercent}% Complete</div>
                  </div>
                </div>
              </div>
            </div>
            <Progress value={progressPercent} className="w-48 h-2" />
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Headcount Reduction Trend</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={headcountReductionData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Actual"
                  dot={{ fill: "hsl(var(--primary))" }}
                />
                <Line
                  type="monotone"
                  dataKey="projected"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Projected"
                  dot={{ fill: "hsl(var(--muted-foreground))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Cost Savings */}
      <Card>
        <CardHeader>
          <CardTitle>Department Cost Savings per Department</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {departmentSavings.map((dept) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-sm font-semibold">{dept.positions} positions</span>
                  </div>
                  <Progress value={dept.progress} className="h-2" />
                </div>
                <div className="ml-6 text-right">
                  <div className="text-sm text-muted-foreground">Annual Savings</div>
                  <div className="font-semibold">${(dept.savings / 1000000).toFixed(2)}M</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Total Annual Cost Savings */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Total Annual Cost Savings</div>
            <div className="text-5xl font-bold text-primary mb-2">
              ${(totalSavings / 1000000).toFixed(3).replace(/\.?0+$/, '')}M
            </div>
            <div className="text-sm text-muted-foreground">
              (133 agents deployed saving of ${(totalSavings / 133).toLocaleString()}/year each)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
