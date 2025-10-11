import { TrendingUp, Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
      <div>
        <div className="flex items-center gap-4 bg-bluegrey-500 text-gray-900 rounded-2xl border-0 py-6 px-4">
          <div className="p-3 rounded-xl bg-bluegrey-200">
            <TrendingUp className="h-8 w-8 text-bluegrey-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Continuous Process Improvement</h1>
            <p className="text-bluegrey-900">Select how you want to start improving</p>
          </div>
        </div>

        <Card className="mt-2 bg-bluegrey-500 text-gray-900 rounded-2xl border-0 py-6 px-4">
          <CardContent>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 rounded-xl bg-bluegrey-200">
                <TrendingUp className="h-12 w-12 text-bluegrey-900" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Continuous process improvement</h2>
              </div>
            </div>

            <h3 className="text-2xl font-semibold text-center mb-12">How do you want to start?</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => handleStartOption("roi-first")}
                className="flex flex-col items-center justify-center p-8 bg-bluegrey-400 rounded-xl border-0 border-border hover:border-primary hover:bg-accent/5 transition-all"
              >
                <div className="size-20 rounded-2xl bg-bluegrey-200 flex items-center justify-center mb-4">
                  <Bot className="h-10 w-10 text-bluegrey-900" />
                </div>
                <h4 className="text-lg font-semibold">ROI First Assistant</h4>
              </button>

              <button
                onClick={() => handleStartOption("gpt-roi")}
                className="flex flex-col items-center justify-center p-8 bg-bluegrey-400 rounded-xl border-0 border-border hover:border-primary hover:bg-accent/5 transition-all"
              >
                <div className="size-20 rounded-xl bg-bluegrey-200 flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-bluegrey-900" />
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
    <div className="w-full h-full">
      <div className="flex items-center gap-4 bg-bluegrey-500 rounded-2xl py-8 px-4 mb-2">
        <div className="p-3 rounded-xl bg-bluegrey-200">
          <TrendingUp className="h-8 w-8 text-bluegrey-900" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Continuous Process Improvement</h1>
          <p className="text-bluegrey-900">Select a process to improve</p>
        </div>
      </div>

      <Card className="bg-bluegrey-500 text-gray-900 rounded-2xl border-0">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-xl text-gray-900 font-bold">Select one process to improve</h2>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">AI Agent Performance</h3>
              <Button variant="outline" size="sm" className="text-bluegrey-800 font-jetbrains border-bluegrey-800"> View All </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-900">Agent Name</TableHead>
                  <TableHead className="text-gray-900">Department</TableHead>
                  <TableHead className="text-gray-900">Tasks Completed</TableHead>
                  <TableHead className="text-gray-900">Efficiency</TableHead>
                  <TableHead className="text-gray-900">Status</TableHead>
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
