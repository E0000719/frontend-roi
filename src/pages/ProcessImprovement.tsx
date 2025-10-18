import { TrendingUp, Bot, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MetricsCards } from "@/components/MetricsCards";
import { setRoiSystem } from "@/utils/sessionStorage";

const agentPerformanceData = [
  { name: "Legacy Core Banking", agentType: "Legacy Systems Takeover", version: "1.2", department: "Operations Management", taskCompleted: 54, currentSavingsMM: 0.09, targetSavingsMM: 0.2, percentageToTarget: "45.00%" },
  { name: "CV in Bank Branches", agentType: "Real Time Insights", version: "2", department: "Operations Management", taskCompleted: 1254, currentSavingsMM: 0.24, targetSavingsMM: 0.3, percentageToTarget: "80.00%" },
  { name: "IT Service Desk", agentType: "Agentic Customer & IT Support", version: "0.5", department: "Operations Management", taskCompleted: 300, currentSavingsMM: 0.12, targetSavingsMM: 0.6, percentageToTarget: "20.00%" },
  { name: "Call Center", agentType: "Agentic Customer & IT Support", version: "0.4", department: "Customer Service", taskCompleted: 124, currentSavingsMM: 0.1, targetSavingsMM: 0.8, percentageToTarget: "12.50%" },
];

export default function ProcessImprovement() {
  const [selectedProcess, setSelectedProcess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleProcessSelect = (processName: string, department: string) => {
    // Map department to roi_system
    const departmentToSystem: { [key: string]: string } = {
      "Operations Management": "order_to_cash",
      "Customer Service": "customer_support"
    };
    
    const roiSystem = departmentToSystem[department];
    
    if (roiSystem) {
      setRoiSystem(roiSystem);
      navigate(`/${roiSystem}/select-agent`);
    }
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
        <div className="flex items-center gap-4 main-card bg-white text-gray-900 rounded-2xl border-0 py-6 px-4">
          <div className="p-3 rounded-xl bg-bluegrey-200">
            <TrendingUp className="h-8 w-8 text-bluegrey-900" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Continuous Process Improvement</h1>
            <p className="text-bluegrey-900">Select how you want to start improving</p>
          </div>
        </div>

        <div className="mt-2">
          <MetricsCards />
        </div>

        <Card className="mt-2 main-card bg-white text-gray-900 rounded-2xl border-0 py-6 px-4">
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
                className="flex flex-col items-center justify-center p-8 secondary-card bg-bluegrey-100 rounded-xl border-0 border-border hover:border-primary hover:bg-accent/5 transition-all"
              >
                <div className="size-20 rounded-2xl bg-bluegrey-200 flex items-center justify-center mb-4">
                  <Bot className="h-10 w-10 text-bluegrey-900" />
                </div>
                <h4 className="text-lg font-semibold">ROI First Assistant</h4>
              </button>

              <button
                onClick={() => handleStartOption("gpt-roi")}
                className="flex flex-col items-center justify-center p-8 secondary-card bg-bluegrey-100 rounded-xl border-0 border-border hover:border-primary hover:bg-accent/5 transition-all"
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
      <div className="flex items-center gap-4 main-card bg-white rounded-2xl  py-8 px-4 mb-2">
        <div className="p-3 rounded-xl bg-bluegrey-200">
          <TrendingUp className="h-8 w-8 text-bluegrey-900" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Continuous Process Improvement</h1>
          <p className="text-bluegrey-900">Select a process to improve</p>
        </div>
      </div>

      <div className="mb-2">
        <MetricsCards />
      </div>

      <Card className="main-card bg-white text-gray-900 rounded-2xl border-0">
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
                  <TableHead className="text-bluegrey-900">Agent Name</TableHead>
                  <TableHead className="text-bluegrey-900">Agent Type</TableHead>
                  <TableHead className="text-bluegrey-900">Version</TableHead>
                  <TableHead className="text-bluegrey-900">Department</TableHead>
                  <TableHead className="text-bluegrey-900">Task Completed</TableHead>
                  <TableHead className="text-bluegrey-900">Current Savings MM</TableHead>
                  <TableHead className="text-bluegrey-900">Target Savings MM</TableHead>
                  <TableHead className="text-bluegrey-900">Percentage to Target</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentPerformanceData.map((agent, index) => (
                  <TableRow
                    key={agent.name}
                    className="cursor-pointer hover:bg-accent/5"
                    onClick={() => handleProcessSelect(agent.name, agent.department)}
                  >
                    <TableCell className="font-medium">{index + 1}. {agent.name}</TableCell>
                    <TableCell>{agent.agentType}</TableCell>
                    <TableCell>{agent.version}</TableCell>
                    <TableCell>{agent.department}</TableCell>
                    <TableCell>{agent.taskCompleted}</TableCell>
                    <TableCell>{agent.currentSavingsMM}</TableCell>
                    <TableCell>{agent.targetSavingsMM}</TableCell>
                    <TableCell>{agent.percentageToTarget}</TableCell>
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
