import { Users, DollarSign, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { MetricsCards } from "@/components/MetricsCards";

// Total de savings de todos los departamentos de AiAdoption
const departmentSavings = [
  { name: "Finance & Accounting", positions: 68, savings: 4080000, progress: 100 },
  { name: "Customer Support", positions: 32, savings: 1536000, progress: 100 },
  { name: "HR & Administration", positions: 42, savings: 2016000, progress: 100 },
  { name: "Sales Operations", positions: 28, savings: 1680000, progress: 85 },
  { name: "IT Operations", positions: 55, savings: 3630000, progress: 92 },
  { name: "Legal", positions: 22, savings: 1584000, progress: 78 },
];

const totalCostSavings = departmentSavings.reduce((acc, dept) => acc + dept.savings, 0);

const costSavingsTrackingData = [
  { month: "Jan", expected: 0.4, current: 0.6 },
  { month: "Feb", expected: 0.9, current: 1.1 },
  { month: "Mar", expected: 1.2, current: 1.5 },
  { month: "Apr", expected: 1.7, current: 2.0 },
  { month: "May", expected: 2.1, current: 2.4 },
  { month: "Jun", expected: 2.6, current: null },
  { month: "Jul", expected: 3.0, current: null },
  { month: "Aug", expected: 3.6, current: null },
  { month: "Sep", expected: 4.1, current: null },
  { month: "Oct", expected: 4.7, current: null },
  { month: "Nov", expected: 5.4, current: null },
  { month: "Dec", expected: 6.0, current: null },
];

const metricsData = [
  { label: "Total Cost Savings", value: `$${(totalCostSavings / 1000000).toFixed(2)}M`, change: "+12.5% vs. Expected", icon: DollarSign, color: "text-primary" },
  { label: "AI Agents Deployed", value: "42", change: "+3 this quarter", icon: Users, color: "text-accent" },
  { label: "Productivity Gain", value: "37.8%", change: "+5.2% vs. Last Month", icon: TrendingUp, color: "text-primary" },
  { label: "ROI", value: "342%", change: "+42% vs. Projected", icon: Target, color: "text-accent" },
];


const agentPerformanceData = [
  { name: "ISO 27000", agentType: "Legal & Compliance", version: "0.1", department: "Information Technology", taskCompleted: 10, currentSavingsMM: 0.2, targetSavingsMM: 0.8, percentageToTarget: "25.00%" },
  { name: "Top Positions Recruiting", agentType: "Agentic Recruiting & Hiring", version: "1", department: "Human Resources", taskCompleted: 234, currentSavingsMM: 0.13, targetSavingsMM: 0.6, percentageToTarget: "21.67%" },
  { name: "Legacy SAP", agentType: "Legacy Systems Takeover", version: "1.1", department: "Information Technology", taskCompleted: 256, currentSavingsMM: 0.2, targetSavingsMM: 0.7, percentageToTarget: "28.57%" },
  { name: "SAP Payroll", agentType: "Enterprise Application Automation", version: "1", department: "Human Resources", taskCompleted: 456, currentSavingsMM: 0.23, targetSavingsMM: 0.5, percentageToTarget: "46.00%" },
  { name: "Retail Banking E-Recruiting", agentType: "Agentic Recruiting & Hiring", version: "1.1", department: "Human Resources", taskCompleted: 786, currentSavingsMM: 0.2, targetSavingsMM: 0.2, percentageToTarget: "100.00%" },
  { name: "Legacy Core Banking", agentType: "Legacy Systems Takeover", version: "1.2", department: "Operations Management", taskCompleted: 54, currentSavingsMM: 0.09, targetSavingsMM: 0.2, percentageToTarget: "45.00%" },
  { name: "CV in Bank Branches", agentType: "Real Time Insights", version: "2", department: "Operations Management", taskCompleted: 1254, currentSavingsMM: 0.24, targetSavingsMM: 0.3, percentageToTarget: "80.00%" },
  { name: "IT Service Desk", agentType: "Agentic Customer & IT Support", version: "0.5", department: "Operations Management", taskCompleted: 300, currentSavingsMM: 0.12, targetSavingsMM: 0.6, percentageToTarget: "20.00%" },
  { name: "Call Center", agentType: "Agentic Customer & IT Support", version: "0.4", department: "Customer Service", taskCompleted: 124, currentSavingsMM: 0.1, targetSavingsMM: 0.8, percentageToTarget: "12.50%" },
  { name: "Credit Collections", agentType: "Order to Cash & Collections", version: "1.3", department: "Finance", taskCompleted: 245, currentSavingsMM: 0.4, targetSavingsMM: 0.5, percentageToTarget: "80.00%" },
  { name: "IT Recruiting", agentType: "Agentic Recruiting & Hiring", version: "2.2", department: "Human Resources", taskCompleted: 222, currentSavingsMM: 0.3, targetSavingsMM: 0.4, percentageToTarget: "75.00%" },
  { name: "Procurement", agentType: "Legal & Compliance", version: "1.1", department: "Legal", taskCompleted: 135, currentSavingsMM: 0.19, targetSavingsMM: 0.4, percentageToTarget: "47.50%" },
];

const departmentBreakdown = [
  { name: "Finance", progress: 92 },
  { name: "Human Resources", progress: 78 },
  { name: "Customer Service", progress: 85 },
  { name: "Sales", progress: 45 },
  { name: "IT", progress: 96 },
];

export default function OnTrackAgents() {

  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-4 main-card bg-white rounded-2xl  py-8 px-4">
        <div className="p-3 rounded-xl bg-bluegrey-200">
          <Users className="size-8 text-bluegrey-900" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">On Track Agents</h1>
          <p className="text-bluegrey-900">Monitor and manage agent performance</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="mt-2">
        <MetricsCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2">
        {/* Cost Savings Tracking */}
        <Card className="main-card bg-white text-gray-900 rounded-2xl border-0 lg:col-span-2">
          <CardHeader>
            <CardTitle>Cost Savings Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 space-y-1">
              <p className="text-sm text-bluegrey-900">
                <span className="font-semibold">Cost Savings Obtained to date:</span> 2.4M
              </p>
              <p className="text-sm text-bluegrey-900">
                <span className="font-semibold">Projected to date:</span> 2.1M
              </p>
              <p className="text-sm text-bluegrey-900">
                <span className="font-semibold">Performance:</span> 5% over projected, 40% completed.
              </p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={costSavingsTrackingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="expected" 
                  stroke="hsl(var(--primary))" 
                  name="Expected" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#3b82f6" 
                  name="Current" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Implementation Progress */}
        <Card className="main-card bg-white text-gray-900 rounded-2xl border-0 lg:col-span-1">
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
                    strokeDasharray={`${40 * 2.51} ${100 * 2.51}`}
                    strokeLinecap="round"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold">40%</span>
                  <span className="text-xs text-muted-foreground">Completed</span>
                </div>
              </div>
              <div className="w-full space-y-3">
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="text-xs text-bluegrey-800 mb-1">Completed</div>
                    <div className="text-lg font-bold text-primary">40%</div>
                  </div>
                  <div>
                    <div className="text-xs text-bluegrey-800 mb-1">Expected</div>
                    <div className="text-lg font-bold text-bluegrey-900">35%</div>
                  </div>
                  <div>
                    <div className="text-xs text-bluegrey-800 mb-1">To Expected</div>
                    <div className="text-lg font-bold text-primary">+5%</div>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Next Phase</span>
                  </div>
                  <Progress value={40} className="h-2" />
                  <p className="text-xs text-bluegrey-800 mt-2">
                    Legacy Takeover Agent Implementation
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Performance Table */}
      <Card className="main-card bg-white text-gray-900 rounded-2xl border-0 mt-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>AI Agent Performance</CardTitle>
            <Button variant="outline" size="sm" className="text-bluegrey-800 font-jetbrains border-bluegrey-800"> View All </Button>
          </div>
        </CardHeader>
        <CardContent>
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
                <TableRow key={agent.name}>
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
        </CardContent>
      </Card>

      {/* Project Dashboard */}
      <Card className="main-card bg-white text-gray-900 rounded-2xl border-0 mt-2">
        <CardHeader>
          <CardTitle>Implementation of New Agents with Risks and Issues Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-gray-100 p-4 text-left font-semibold">Project</th>
                  <th className="border border-gray-300 bg-blue-200 p-4 text-center font-semibold">Legacy Java</th>
                  <th className="border border-gray-300 bg-cyan-200 p-4 text-center font-semibold">Cloud IT Support</th>
                  <th className="border border-gray-300 bg-green-200 p-4 text-center font-semibold">On-Prem IT Support</th>
                  <th className="border border-gray-300 bg-yellow-200 p-4 text-center font-semibold">Supply Change Automation</th>
                  <th className="border border-gray-300 bg-orange-200 p-4 text-center font-semibold">HR Avatar Agents</th>
                  <th className="border border-gray-300 bg-blue-200 p-4 text-center font-semibold">Legacy Core Banking 2.0</th>
                </tr>
              </thead>
              <tbody>
                {/* KPI Row */}
                <tr>
                  <td className="border border-gray-300 bg-gray-100 p-4 font-semibold">KPI ▼</td>
                  <td className="border border-gray-300 p-4 text-sm">
                    <div>Start: 6-Jan-26</div>
                    <div className="font-semibold">End: 24-Sep-26</div>
                  </td>
                  <td className="border border-gray-300 p-4 text-sm">
                    <div>Start: 2-Jan-26</div>
                    <div className="font-semibold">End: 24-Mar-26</div>
                  </td>
                  <td className="border border-gray-300 p-4 text-sm">
                    <div>Start: 2-Jan-26</div>
                    <div className="font-semibold">End: 24-Sep-26</div>
                  </td>
                  <td className="border border-gray-300 p-4 text-sm">
                    <div>Start: 3-Apr-26</div>
                    <div className="font-semibold">End: 24-Sep-26</div>
                  </td>
                  <td className="border border-gray-300 p-4 text-sm">
                    <div>Start: 19-Jan-26</div>
                    <div className="font-semibold">End: 17-Aug-26</div>
                  </td>
                  <td className="border border-gray-300 p-4 text-sm">
                    <div>Start: 21-Jan-26</div>
                    <div className="font-semibold">End: 11-Aug-26</div>
                  </td>
                </tr>
                
                {/* Progress Row */}
                <tr>
                  <td className="border border-gray-300 bg-gray-100 p-4 font-semibold">Progress</td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle className="stroke-gray-300" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                          <circle className="stroke-blue-900" strokeWidth="8" strokeDasharray={`${40 * 2.51} ${100 * 2.51}`} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">40%</div>
                      </div>
                      <span className="text-xs text-gray-600">2/13 in Progress</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle className="stroke-gray-300" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                          <circle className="stroke-cyan-500" strokeWidth="8" strokeDasharray={`${25 * 2.51} ${100 * 2.51}`} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">25%</div>
                      </div>
                      <span className="text-xs text-gray-600">5/11 in Progress</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle className="stroke-gray-300" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                          <circle className="stroke-green-600" strokeWidth="8" strokeDasharray={`${40 * 2.51} ${100 * 2.51}`} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">40%</div>
                      </div>
                      <span className="text-xs text-gray-600">2/13 in Progress</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle className="stroke-gray-300" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                          <circle className="stroke-yellow-500" strokeWidth="8" strokeDasharray={`${12 * 2.51} ${100 * 2.51}`} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">12%</div>
                      </div>
                      <span className="text-xs text-gray-600">1/7 in Progress</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle className="stroke-gray-300" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                          <circle className="stroke-orange-500" strokeWidth="8" strokeDasharray={`${55 * 2.51} ${100 * 2.51}`} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">55%</div>
                      </div>
                      <span className="text-xs text-gray-600">3/9 in Progress</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="relative w-20 h-20">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          <circle className="stroke-gray-300" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                          <circle className="stroke-blue-900" strokeWidth="8" strokeDasharray={`${22 * 2.51} ${100 * 2.51}`} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-bold">22%</div>
                      </div>
                      <span className="text-xs text-gray-600">4/11 in Progress</span>
                    </div>
                  </td>
                </tr>

                {/* Planned vs Actual Hours */}
                <tr>
                  <td className="border border-gray-300 bg-gray-100 p-4 font-semibold">Planned Vs<br/>Actual<br/>Hours</td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex items-end justify-center gap-2 h-24">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-blue-900" style={{height: '60px'}}></div>
                        <span className="text-xs">30.5</span>
                        <span className="text-xs text-gray-600">Planned</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-blue-400" style={{height: '50px'}}></div>
                        <span className="text-xs">25.1</span>
                        <span className="text-xs text-gray-600">Actual</span>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex items-end justify-center gap-2 h-24">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-cyan-600" style={{height: '52px'}}></div>
                        <span className="text-xs">25.8</span>
                        <span className="text-xs text-gray-600">Planned</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-cyan-300" style={{height: '42px'}}></div>
                        <span className="text-xs">20.8</span>
                        <span className="text-xs text-gray-600">Actual</span>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex items-end justify-center gap-2 h-24">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-green-700" style={{height: '64px'}}></div>
                        <span className="text-xs">31.8</span>
                        <span className="text-xs text-gray-600">Planned</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-green-400" style={{height: '50px'}}></div>
                        <span className="text-xs">24.8</span>
                        <span className="text-xs text-gray-600">Actual</span>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex items-end justify-center gap-2 h-24">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-yellow-600" style={{height: '50px'}}></div>
                        <span className="text-xs">25</span>
                        <span className="text-xs text-gray-600">Planned</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-yellow-300" style={{height: '20px'}}></div>
                        <span className="text-xs">10</span>
                        <span className="text-xs text-gray-600">Actual</span>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex items-end justify-center gap-2 h-24">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-orange-600" style={{height: '30px'}}></div>
                        <span className="text-xs">15.2</span>
                        <span className="text-xs text-gray-600">Planned</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-orange-300" style={{height: '41px'}}></div>
                        <span className="text-xs">20.5</span>
                        <span className="text-xs text-gray-600">Actual</span>
                      </div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="flex items-end justify-center gap-2 h-24">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-blue-900" style={{height: '53px'}}></div>
                        <span className="text-xs">26.5</span>
                        <span className="text-xs text-gray-600">Planned</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-12 bg-blue-400" style={{height: '51px'}}></div>
                        <span className="text-xs">25.5</span>
                        <span className="text-xs text-gray-600">Actual</span>
                      </div>
                    </div>
                  </td>
                </tr>

                {/* Risks & Issues */}
                <tr>
                  <td className="border border-gray-300 bg-gray-100 p-4 font-semibold">Risks & Issues</td>
                  <td className="border border-gray-300 p-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><span className="text-gray-600">Extreem</span><div className="flex-1 bg-blue-900 h-4 flex items-center justify-end px-1 text-white">2</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">High</span><div className="flex-1 bg-blue-400 h-4 flex items-center justify-end px-1">2</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Medium</span><div className="flex-1 bg-blue-200 h-4 flex items-center justify-end px-1">4</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Low</span></div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><span className="text-gray-600">Extreem</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">High</span><div className="flex-1 bg-cyan-500 h-4 flex items-center justify-end px-1 text-white">2</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Medium</span><div className="flex-1 bg-cyan-300 h-4 flex items-center justify-end px-1">2</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Low</span><div className="flex-1 bg-cyan-100 h-4 flex items-center justify-end px-1">4</div></div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><span className="text-gray-600">Extreem</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">High</span><div className="flex-1 bg-green-700 h-4 flex items-center justify-end px-1 text-white">1</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Medium</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Low</span><div className="flex-1 bg-green-300 h-4 flex items-center justify-end px-1">2</div></div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><span className="text-gray-600">Extreem</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">High</span><div className="flex-1 bg-yellow-500 h-4 flex items-center justify-end px-1">2</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Medium</span><div className="flex-1 bg-yellow-300 h-4 flex items-center justify-end px-1">3</div></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Low</span><div className="flex-1 bg-yellow-100 h-4 flex items-center justify-end px-1">2</div></div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><span className="text-gray-600">Extreem</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">High</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Medium</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Low</span></div>
                    </div>
                  </td>
                  <td className="border border-gray-300 p-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2"><span className="text-gray-600">Extreem</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">High</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Medium</span></div>
                      <div className="flex items-center gap-2"><span className="text-gray-600">Low</span></div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
