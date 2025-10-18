import { Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { useState } from "react";
import { MetricsCards } from "@/components/MetricsCards";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Datos de las 10 dimensiones para la gráfica dinámica
const dimensionsData = {
  "Human Labor Cost": {
    unit: "USD",
    description: "Measures the reduction in manual labor expenses achieved through AI automation",
    data: [
      { month: "Jan", current: -2, expected: -2.1 },
      { month: "Feb", current: -2.73, expected: -2.87 },
      { month: "Mar", current: -3.45, expected: -3.62 },
      { month: "Apr", current: -4.18, expected: -4.39 },
      { month: "May", current: -4.91, expected: -5.16 },
      { month: "Jun", current: -5.64, expected: -5.92 },
      { month: "Jul", current: -6.36, expected: -6.68 },
      { month: "Aug", current: -7.09, expected: -7.44 },
      { month: "Sep", current: -7.82, expected: -8.21 },
      { month: "Oct", current: -8.55, expected: -8.98 },
      { month: "Nov", current: -9.27, expected: -9.73 },
      { month: "Dec", current: -10, expected: -10.5 },
    ]
  },
  "Delivery Time": {
    unit: "Hours",
    description: "Tracks how AI shortens the time required to deliver products or services",
    data: [
      { month: "Jan", current: -1.5, expected: -1.58 },
      { month: "Feb", current: -2.09, expected: -2.19 },
      { month: "Mar", current: -2.68, expected: -2.81 },
      { month: "Apr", current: -3.27, expected: -3.43 },
      { month: "May", current: -3.86, expected: -4.05 },
      { month: "Jun", current: -4.45, expected: -4.67 },
      { month: "Jul", current: -5.05, expected: -5.3 },
      { month: "Aug", current: -5.64, expected: -5.92 },
      { month: "Sep", current: -6.23, expected: -6.54 },
      { month: "Oct", current: -6.82, expected: -7.16 },
      { month: "Nov", current: -7.41, expected: -7.78 },
      { month: "Dec", current: -8, expected: -8.4 },
    ]
  },
  "Human Error": {
    unit: "%",
    description: "Evaluates decreases in mistakes or inaccuracies due to AI-driven processes",
    data: [
      { month: "Jan", current: -1, expected: -1.05 },
      { month: "Feb", current: -1.55, expected: -1.63 },
      { month: "Mar", current: -2.09, expected: -2.19 },
      { month: "Apr", current: -2.64, expected: -2.77 },
      { month: "May", current: -3.18, expected: -3.34 },
      { month: "Jun", current: -3.73, expected: -3.92 },
      { month: "Jul", current: -4.27, expected: -4.48 },
      { month: "Aug", current: -4.82, expected: -5.06 },
      { month: "Sep", current: -5.36, expected: -5.63 },
      { month: "Oct", current: -5.91, expected: -6.21 },
      { month: "Nov", current: -6.45, expected: -6.77 },
      { month: "Dec", current: -7, expected: -7.35 },
    ]
  },
  "Technical Debt": {
    unit: "Score Index",
    description: "Assesses the extent to which AI solutions reduce or add to long-term system maintenance burdens",
    data: [
      { month: "Jan", current: 1, expected: 1.05 },
      { month: "Feb", current: 0.73, expected: 0.77 },
      { month: "Mar", current: 0.45, expected: 0.47 },
      { month: "Apr", current: 0.18, expected: 0.19 },
      { month: "May", current: -0.09, expected: -0.09 },
      { month: "Jun", current: -0.36, expected: -0.38 },
      { month: "Jul", current: -0.64, expected: -0.67 },
      { month: "Aug", current: -0.91, expected: -0.96 },
      { month: "Sep", current: -1.18, expected: -1.24 },
      { month: "Oct", current: -1.45, expected: -1.52 },
      { month: "Nov", current: -1.73, expected: -1.82 },
      { month: "Dec", current: -2, expected: -2.1 },
    ]
  },
  "Headcount": {
    unit: "People",
    description: "Monitors changes in workforce size resulting from AI implementation",
    data: [
      { month: "Jan", current: 0, expected: 0 },
      { month: "Feb", current: -0.27, expected: -0.28 },
      { month: "Mar", current: -0.55, expected: -0.58 },
      { month: "Apr", current: -0.82, expected: -0.86 },
      { month: "May", current: -1.09, expected: -1.14 },
      { month: "Jun", current: -1.36, expected: -1.43 },
      { month: "Jul", current: -1.64, expected: -1.72 },
      { month: "Aug", current: -1.91, expected: -2.01 },
      { month: "Sep", current: -2.18, expected: -2.29 },
      { month: "Oct", current: -2.45, expected: -2.57 },
      { month: "Nov", current: -2.73, expected: -2.87 },
      { month: "Dec", current: -3, expected: -3.15 },
    ]
  },
  "User Adoption": {
    unit: "%",
    description: "Reflects how quickly and widely employees or customers embrace AI tools",
    data: [
      { month: "Jan", current: 5, expected: 5.25 },
      { month: "Feb", current: 6.82, expected: 7.16 },
      { month: "Mar", current: 8.64, expected: 9.07 },
      { month: "Apr", current: 10.45, expected: 10.97 },
      { month: "May", current: 12.27, expected: 12.88 },
      { month: "Jun", current: 14.09, expected: 14.79 },
      { month: "Jul", current: 15.91, expected: 16.71 },
      { month: "Aug", current: 17.73, expected: 18.62 },
      { month: "Sep", current: 19.55, expected: 20.53 },
      { month: "Oct", current: 21.36, expected: 22.43 },
      { month: "Nov", current: 23.18, expected: 24.34 },
      { month: "Dec", current: 25, expected: 26.25 },
    ]
  },
  "System Efficiency": {
    unit: "%",
    description: "Gauges performance improvements in workflows, processing speed, and resource use from AI integration",
    data: [
      { month: "Jan", current: 2, expected: 2.1 },
      { month: "Feb", current: 3.18, expected: 3.34 },
      { month: "Mar", current: 4.36, expected: 4.58 },
      { month: "Apr", current: 5.55, expected: 5.83 },
      { month: "May", current: 6.73, expected: 7.07 },
      { month: "Jun", current: 7.91, expected: 8.31 },
      { month: "Jul", current: 9.09, expected: 9.54 },
      { month: "Aug", current: 10.27, expected: 10.78 },
      { month: "Sep", current: 11.45, expected: 12.02 },
      { month: "Oct", current: 12.64, expected: 13.27 },
      { month: "Nov", current: 13.82, expected: 14.51 },
      { month: "Dec", current: 15, expected: 15.75 },
    ]
  },
  "Net Promoter Score": {
    unit: "Score",
    description: "Captures how AI influences customer loyalty and likelihood to recommend the product or service",
    data: [
      { month: "Jan", current: 1, expected: 1.05 },
      { month: "Feb", current: 1.82, expected: 1.91 },
      { month: "Mar", current: 2.64, expected: 2.77 },
      { month: "Apr", current: 3.45, expected: 3.62 },
      { month: "May", current: 4.27, expected: 4.48 },
      { month: "Jun", current: 5.09, expected: 5.34 },
      { month: "Jul", current: 5.91, expected: 6.21 },
      { month: "Aug", current: 6.73, expected: 7.07 },
      { month: "Sep", current: 7.55, expected: 7.93 },
      { month: "Oct", current: 8.36, expected: 8.78 },
      { month: "Nov", current: 9.18, expected: 9.64 },
      { month: "Dec", current: 10, expected: 10.5 },
    ]
  },
  "Revenue Increase": {
    unit: "USD",
    description: "Quantifies the direct and indirect financial gains attributed to AI deployment",
    data: [
      { month: "Jan", current: 0, expected: 0 },
      { month: "Feb", current: 1.09, expected: 1.14 },
      { month: "Mar", current: 2.18, expected: 2.29 },
      { month: "Apr", current: 3.27, expected: 3.43 },
      { month: "May", current: 4.36, expected: 4.58 },
      { month: "Jun", current: 5.45, expected: 5.72 },
      { month: "Jul", current: 6.55, expected: 6.88 },
      { month: "Aug", current: 7.64, expected: 8.02 },
      { month: "Sep", current: 8.73, expected: 9.17 },
      { month: "Oct", current: 9.82, expected: 10.31 },
      { month: "Nov", current: 10.91, expected: 11.46 },
      { month: "Dec", current: 12, expected: 12.6 },
    ]
  },
  "Customer Satisfaction": {
    unit: "%",
    description: "Measures overall improvement in client experience and satisfaction due to AI-enabled enhancements",
    data: [
      { month: "Jan", current: 2, expected: 2.1 },
      { month: "Feb", current: 2.91, expected: 3.06 },
      { month: "Mar", current: 3.82, expected: 4.01 },
      { month: "Apr", current: 4.73, expected: 4.97 },
      { month: "May", current: 5.64, expected: 5.92 },
      { month: "Jun", current: 6.55, expected: 6.88 },
      { month: "Jul", current: 7.45, expected: 7.82 },
      { month: "Aug", current: 8.36, expected: 8.78 },
      { month: "Sep", current: 9.27, expected: 9.73 },
      { month: "Oct", current: 10.18, expected: 10.69 },
      { month: "Nov", current: 11.09, expected: 11.64 },
      { month: "Dec", current: 12, expected: 12.6 },
    ]
  },
};

const departmentSavings = [
  { 
    name: "Finance & Accounting", 
    positions: 68, 
    savings: 4080000, 
    progress: 100,
    monthlySavings: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 408000 },
      { month: "Apr", value: 408000 },
      { month: "May", value: 408000 },
      { month: "Jun", value: 408000 },
      { month: "Jul", value: 408000 },
      { month: "Aug", value: 408000 },
      { month: "Sep", value: 408000 },
      { month: "Oct", value: 408000 },
      { month: "Nov", value: 408000 },
      { month: "Dec", value: 408000 },
    ]
  },
  { 
    name: "Customer Support", 
    positions: 32, 
    savings: 1536000, 
    progress: 100,
    monthlySavings: [
      { month: "Jan", value: 128000 },
      { month: "Feb", value: 128000 },
      { month: "Mar", value: 128000 },
      { month: "Apr", value: 128000 },
      { month: "May", value: 128000 },
      { month: "Jun", value: 128000 },
      { month: "Jul", value: 128000 },
      { month: "Aug", value: 128000 },
      { month: "Sep", value: 128000 },
      { month: "Oct", value: 128000 },
      { month: "Nov", value: 128000 },
      { month: "Dec", value: 128000 },
    ]
  },
  { 
    name: "HR & Administration", 
    positions: 42, 
    savings: 2016000, 
    progress: 100,
    monthlySavings: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 183273 },
      { month: "Mar", value: 183273 },
      { month: "Apr", value: 183273 },
      { month: "May", value: 183273 },
      { month: "Jun", value: 183272 },
      { month: "Jul", value: 183272 },
      { month: "Aug", value: 183272 },
      { month: "Sep", value: 183272 },
      { month: "Oct", value: 183272 },
      { month: "Nov", value: 183272 },
      { month: "Dec", value: 183276 },
    ]
  },
  { 
    name: "Sales Operations", 
    positions: 28, 
    savings: 1680000, 
    progress: 85,
    monthlySavings: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 0 },
      { month: "Apr", value: 0 },
      { month: "May", value: 210000 },
      { month: "Jun", value: 210000 },
      { month: "Jul", value: 210000 },
      { month: "Aug", value: 210000 },
      { month: "Sep", value: 210000 },
      { month: "Oct", value: 210000 },
      { month: "Nov", value: 210000 },
      { month: "Dec", value: 210000 },
    ]
  },
  { 
    name: "IT Operations", 
    positions: 55, 
    savings: 3630000, 
    progress: 92,
    monthlySavings: [
      { month: "Jan", value: 302500 },
      { month: "Feb", value: 302500 },
      { month: "Mar", value: 302500 },
      { month: "Apr", value: 302500 },
      { month: "May", value: 302500 },
      { month: "Jun", value: 302500 },
      { month: "Jul", value: 302500 },
      { month: "Aug", value: 302500 },
      { month: "Sep", value: 302500 },
      { month: "Oct", value: 302500 },
      { month: "Nov", value: 302500 },
      { month: "Dec", value: 302500 },
    ]
  },
  { 
    name: "Legal", 
    positions: 22, 
    savings: 1584000, 
    progress: 78,
    monthlySavings: [
      { month: "Jan", value: 0 },
      { month: "Feb", value: 0 },
      { month: "Mar", value: 0 },
      { month: "Apr", value: 0 },
      { month: "May", value: 0 },
      { month: "Jun", value: 0 },
      { month: "Jul", value: 264000 },
      { month: "Aug", value: 264000 },
      { month: "Sep", value: 264000 },
      { month: "Oct", value: 264000 },
      { month: "Nov", value: 264000 },
      { month: "Dec", value: 264000 },
    ]
  },
];

export default function AiAdoption() {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(departmentSavings[0].name);
  const [selectedDimension, setSelectedDimension] = useState<string>("Human Labor Cost");
  const totalSavings = departmentSavings.reduce((acc, dept) => acc + dept.savings, 0);
  const totalPositions = departmentSavings.reduce((acc, dept) => acc + dept.positions, 0);
  const currentHeadcount = 247;
  const progressPercent = 84;

  const selectedDeptData = selectedDepartment 
    ? departmentSavings.find(d => d.name === selectedDepartment)
    : null;

  const dimensionsList = Object.keys(dimensionsData);
  const currentDimensionData = dimensionsData[selectedDimension as keyof typeof dimensionsData];

  return (
    <div className="w-full h-full">
      <div className="flex items-center gap-4 main-card bg-white rounded-2xl  py-8 px-4 mb-2">
        <div className="p-3 rounded-xl bg-bluegrey-200">
          <Target className="h-8 w-8 text-bluegrey-900" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">360 Company AI Adoption</h1>
          <p className="text-bluegrey-900">Comprehensive AI adoption tracking</p>
        </div>
      </div>

      <div className="mb-2">
        <MetricsCards />
      </div>

      {/* AI Impact Metrics Tracking */}
      <Card className="main-card bg-white rounded-2xl py-8 px-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CardTitle>{selectedDimension}</CardTitle>
              <p className="text-sm text-bluegrey-900 mt-1">
                {currentDimensionData.description}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-foreground">
                Dimension:
              </label>
              <Select value={selectedDimension} onValueChange={setSelectedDimension}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select dimension" />
                </SelectTrigger>
                <SelectContent className="bg-background z-50">
                  {dimensionsList.map((dimension) => (
                    <SelectItem key={dimension} value={dimension}>
                      {dimension}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={currentDimensionData.data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="month" 
                  className="text-xs"
                />
                <YAxis 
                  className="text-xs"
                  label={{ 
                    value: currentDimensionData.unit, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { textAnchor: 'middle', fill: 'hsl(var(--foreground))' }
                  }}
                />
                <Tooltip 
                  formatter={(value: number) => {
                    if (currentDimensionData.unit === "USD") {
                      return `$${value.toFixed(2)}M`;
                    }
                    return value.toFixed(2);
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Current"
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="expected"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Expected"
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Department Cost Savings */}
      <Card className="main-card bg-white rounded-2xl  py-8 px-4 mt-2">
        <CardHeader>
          <CardTitle>Department Cost Savings per Department</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {departmentSavings.map((dept) => (
            <div 
              key={dept.name} 
              className={`space-y-2 p-3 rounded-lg cursor-pointer transition-all ${
                selectedDepartment === dept.name ? 'bg-primary/10 border border-primary' : 'hover:bg-muted'
              }`}
              onClick={() => setSelectedDepartment(dept.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-sm font-semibold">{dept.positions} positions</span>
                  </div>
                  <Progress value={dept.progress} className="h-2" />
                </div>
                <div className="ml-6 text-right">
                  <div className="text-sm text-bluegrey-900">Annual Savings</div>
                  <div className="font-semibold">${(dept.savings / 1000000).toFixed(2)}M</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Monthly Cost Savings by Department */}
      {selectedDeptData && (
        <Card className="main-card bg-white text-gray-900 rounded-2xl border-0 mt-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monthly Cost Savings - {selectedDeptData.name}</CardTitle>
                <p className="text-sm text-bluegrey-900 mt-1">
                  Total Annual: ${(selectedDeptData.savings / 1000000).toFixed(2)}M
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={selectedDeptData.monthlySavings}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Total Annual Cost Savings */}
      <Card className="main-card bg-white rounded-2xl  py-8 px-4 mt-2">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-sm text-bluegrey-900 mb-2">Total Annual Cost Savings</div>
            <div className="text-5xl font-bold text-primary mb-2">
              ${(totalSavings / 1000000).toFixed(3).replace(/\.?0+$/, '')}M
            </div>
            <div className="text-sm text-bluegrey-900">
              (133 agents deployed saving of ${(totalSavings / 133).toLocaleString()}/year each)
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
