import { Users, DollarSign, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const metricsData = [
  { label: "Total Cost Savings", value: "$2.4M", change: "+12.5% vs. Expected", icon: DollarSign, color: "text-primary" },
  { label: "AI Agents Deployed", value: "42", change: "+3 this quarter", icon: Users, color: "text-accent" },
  { label: "Productivity Gain", value: "37.8%", change: "+5.2% vs. Last Month", icon: TrendingUp, color: "text-primary" },
  { label: "ROI", value: "342%", change: "+42% vs. Projected", icon: Target, color: "text-accent" },
];

const monthlySavingsData = [
  { month: "Jan", value: 165000 },
  { month: "Feb", value: 185000 },
  { month: "Mar", value: 220000 },
  { month: "Apr", value: 195000 },
  { month: "May", value: 245000 },
  { month: "Jun", value: 280000 },
  { month: "Jul", value: 315000 },
  { month: "Aug", value: 290000 },
  { month: "Sep", value: 350000 },
  { month: "Oct", value: 385000 },
  { month: "Nov", value: 420000 },
  { month: "Dec", value: 450000 },
];

const agentPerformanceData = [
  { name: "AP-Bot-01", department: "Finance", tasks: 1245, efficiency: "98.7%", status: "active" },
  { name: "HR-Assistant-03", department: "Human Resources", tasks: 876, efficiency: "95.2%", status: "active" },
  { name: "Support-Agent-12", department: "Customer Service", tasks: 2341, efficiency: "97.8%", status: "active" },
  { name: "Sales-Assistant-05", department: "Sales", tasks: 543, efficiency: "92.1%", status: "maintenance" },
  { name: "IT-Support-02", department: "IT", tasks: 1087, efficiency: "99.3%", status: "active" },
];

const departmentBreakdown = [
  { name: "Finance", progress: 92 },
  { name: "Human Resources", progress: 78 },
  { name: "Customer Service", progress: 85 },
  { name: "Sales", progress: 45 },
  { name: "IT", progress: 96 },
];

export default function OnTrackAgents() {
  const [viewPeriod, setViewPeriod] = useState("monthly");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <Users className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">On Track Agents</h1>
          <p className="text-muted-foreground">Monitor and manage agent performance</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsData.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </div>
              <div className="text-3xl font-bold mb-1">{metric.value}</div>
              <div className="text-xs text-muted-foreground">{metric.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Savings Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Monthly Cost Savings by Department</CardTitle>
              <div className="flex gap-2">
                {["Monthly", "Quarterly", "Yearly"].map((period) => (
                  <Badge
                    key={period}
                    variant={viewPeriod === period.toLowerCase() ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setViewPeriod(period.toLowerCase())}
                  >
                    {period}
                  </Badge>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySavingsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Implementation Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Implementation Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-40 h-40 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="stroke-muted"
                    strokeWidth="8"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="stroke-primary"
                    strokeWidth="8"
                    strokeDasharray={`${75 * 2.51} ${100 * 2.51}`}
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">75%</span>
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
              </div>
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Phase 3: Department Expansion</span>
                  <span className="text-muted-foreground">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Next milestone: Sales Department Integration<br />
                  Due date: May 15, 2025
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI Agent Performance</CardTitle>
            <button className="text-sm text-primary hover:underline">View All</button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Tasks Completed</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agentPerformanceData.map((agent) => (
                <TableRow key={agent.name}>
                  <TableCell className="font-medium">{agent.name}</TableCell>
                  <TableCell>{agent.department}</TableCell>
                  <TableCell>{agent.tasks.toLocaleString()}</TableCell>
                  <TableCell>{agent.efficiency}</TableCell>
                  <TableCell>
                    <Badge variant={agent.status === "active" ? "default" : "secondary"}>
                      {agent.status === "active" ? "Active" : "Maintenance"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Department Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {departmentBreakdown.map((dept) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{dept.name}</span>
                <span className="text-muted-foreground">{dept.progress}%</span>
              </div>
              <Progress value={dept.progress} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
