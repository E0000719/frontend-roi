import { TrendingUp, Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const agentPerformanceData = [
  { name: "AP-Bot-01", department: "Finance", tasks: 1245, efficiency: "98.7%", status: "active" },
  { name: "HR-Assistant-03", department: "Human Resources", tasks: 876, efficiency: "95.2%", status: "active" },
  { name: "Support-Agent-12", department: "Customer Service", tasks: 2341, efficiency: "97.8%", status: "active" },
  { name: "Sales-Assistant-05", department: "Sales", tasks: 543, efficiency: "92.1%", status: "maintenance" },
  { name: "IT-Support-02", department: "IT", tasks: 1087, efficiency: "99.3%", status: "active" },
];

export default function ProcessImprovement() {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleProcessSelect = (processName: string) => {
    setSelectedProcess(processName);
  };

  const handleStartOption = (option: string) => {
    // Navigate to chat interface with the selected option
    if (option === "roi-first") {
      navigate("/roi-business-case");
    } else {
      // For GPT ROI First, could navigate to a different flow
      navigate("/roi-business-case");
    }
  };

  if (selectedProcess) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <TrendingUp className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Continuous Process Improvement</h1>
            <p className="text-muted-foreground">Select how you want to start improving</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-xl bg-primary/10">
                <TrendingUp className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Continuous process improvement</h2>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-center mb-12">how do you want to start?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => handleStartOption("roi-first")}
                className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-border hover:border-primary hover:bg-accent/5 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <h4 className="text-lg font-semibold">ROI First Assistant</h4>
              </button>

              <button
                onClick={() => handleStartOption("gpt-roi")}
                className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-border hover:border-primary hover:bg-accent/5 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-accent" />
                </div>
                <h4 className="text-lg font-semibold">GPT ROI First</h4>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <TrendingUp className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Continuous Process Improvement</h1>
          <p className="text-muted-foreground">Select a process to improve</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-xl bg-primary/10">
              <TrendingUp className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Select one process to improve</h2>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Agent Performance</h3>
              <button className="text-sm text-primary hover:underline">View All</button>
            </div>
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
                  <TableRow
                    key={agent.name}
                    className="cursor-pointer hover:bg-accent/5"
                    onClick={() => handleProcessSelect(agent.name)}
                  >
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
