import { FileText, Users, TrendingUp, Target, User, Search, ArrowRight, Download, Settings2, Headset, ChartColumn, Zap } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart, Area } from "recharts";
import { MetricsCards } from "@/components/MetricsCards";

import RealTimeInsightsIcon from "@/components/icons/RealTimeInsightsIcon";
import LegacySystemsTakeoverIcon from "@/components/icons/LegacySystemsTakeoverIcon";
import AgenticRecruitingHiringIcon from "@/components/icons/AgenticRecruitingHiringIcon";
import OrderToCash from "@/components/icons/OrderToCash";
import LegalCompliance from "@/components/icons/LegalCompliance";
import AgenticCustomerITSupport from "@/components/icons/AgenticCustomerITSupport";
import PhysicalAgentServiceRobotsIcon from "@/components/icons/PhysicalAgentServiceRobotsIcon";


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
const monthlySavingsData = [
  { department: "Human Resources", value: 165000 },
  { department: "Operations", value: 185000 },
  { department: "Marketing", value: 220000 },
  { department: "Sales", value: 195000 },
  { department: "TI", value: 245000 }
];

const quickAccess = [
  {
    title: "ROI Business case",
    icon: FileText,
    to: "/roi-business-case",
    iconColor: "text-primary",
  },
  {
    title: "On-track agents",
    icon: Users,
    to: "/on-track-agents",
    iconColor: "text-accent",
  },
  {
    title: "Continuous process improvement",
    icon: TrendingUp,
    to: "/process-improvement",
    iconColor: "text-primary",
  },
  {
    title: "AI 360 Enterprise Adoption",
    icon: Target,
    to: "/ai-adoption",
    iconColor: "text-accent",
  },
];

/*
const modules = [
  {
    title: "Legacy Systems Takeover",
    iconSrc: "/icons/legacy-icon.png",
    to: "/legacy-systems-takeover",
    description: "Take Control of Legacy; Build the Future in Natural Language."
  },
  {
    title: "Agentic Customer & IT Support",
    iconSrc: "/icons/customer-icon.png",
    to: "/agentic-customer-it-support",
    description: "AI-Powered Support Across Every Channel."
  },
  {
    title: "Legal & Compliance",
    iconSrc: "/icons/compliance-icon.png",
    to: "/legal-compliance",
    description: "Audit-Ready. Compliance at AI Speed."
  },
  {
    title: "Enterprise Application Automation",
    iconSrc: "/icons/enterprise-icon.png",
    to: "/enterprise-application-automation",
    description: "Control Enterprise Systems in Natural Language."
  },
  {
    title: "Real-Time Insights",
    iconSrc: "/icons/real-time-icon.png",
    to: "/real-time-insights",
    description: "From Seeing to Acting: Real-Time AI Insights."
  },
  {
    title: "Agentic Recruiting & Hiring",
    iconSrc: "/icons/recruting-icon.png",
    to: "/agentic-recruiting-hiring",
    description: "Hire Faster. Smarter. At Lower Cost."
  },
  {
    title: "Physical Agents Service Robots",
    iconSrc: "/icons/physical-icon.png",
    to: "/physical-agents-service-robots",
    description: "Audit-Ready. Compliance at AI Speed."
  },
  {
    title: "Order to cash",
    iconSrc: "/icons/order-to-cash-icon.png",
    to: "/order-to-cash",
    description: "Automate Order-to-Cash. Accelerate Collections. Unlock Cash Flow."
  },
];
*/
const modules: Array<{
  name: string;
  href: string;
  icon?: any;
  iconSrc?: string;
  iconColor?: string;
  active?: boolean;
  description?: string;
}> = [
  { name: "Agentic Customer & IT Support", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:8080/", icon: AgenticCustomerITSupport, iconColor: "text-warning-300", description: "AI-Powered Support Across Every Channel." },
  { name: "Legal & Compliance", href: "", icon: LegalCompliance, iconColor: "text-green-300", description: "Audit-Ready. Compliance at AI Speed." },
  { name: "Order to Cash", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:9098", icon: OrderToCash, iconColor: "text-pink-400", description: "Automate Order-to-Cash. Accelerate Collections. Unlock Cash Flow." },
  { name: "Agentic Recruiting & Hiring", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:8083/", icon: AgenticRecruitingHiringIcon, iconColor: "text-blue-500", description: "Hire Faster. Smarter. At Lower Cost." },
  { name: "Legacy Systems Takeover", href: "", icon: LegacySystemsTakeoverIcon, iconColor: "text-pink-400", description: "Take Control of Legacy; Build the Future in Natural Language." },
  { name: "Real-Time Insights", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:9092/", icon: RealTimeInsightsIcon, iconColor: "text-green-400", description: "From Seeing to Acting: Real-Time AI Insights." },
];

const stats = [
  { label: "ROI Business case", percentaje: 24.5, difference: 2.4, note: "vs. previous month", labelClass: "bg-green-100" },
  { label: "On-track agents", percentaje: 78.2, difference: -1.2, note: "vs. last week", labelClass: "bg-blue-200" },
  { label: "Continuous process improvement", percentaje: 15.3, difference: 0.8, note: "vs. last quarter", labelClass: "bg-warning-500" },
  { label: "AI adoption rate", percentaje: 42.7, difference: 3.1, note: "vs. last year", labelClass: "bg-pink-500" },
];

const insights = [
  {
    "id": "legacy-takeover",
    "icon": Settings2,
    "title": "Legacy Takeover",
    "status": "Insights",
    "description": [
      "AI has identified 15 high-priority leads in the last 24 hours.",
      "Campaña Win-Back ejecutada al 100%. Tasa de apertura: 42%"
    ]
  },
  {
    "id": "agentic-cost-to-hire",
    "icon": User,
    "title": "Agentic Cost to hire",
    "status": "Insights",
    "description": [
      "Everything is up to date. No violations were detected this week.",
      "The monthly regulatory report will be generated automatically on 11/30."
    ]
  },
  {
    "id": "agentic-customer-support",
    "icon": Headset,
    "title": "Agentic Customer support",
    "status": "Insights",
    "description": [
      "AI has identified 15 high-priority leads in the last 24 hours.",
      "Campaña Win-Back ejecutada al 100%. Tasa de apertura: 42%"
    ]
  },
  {
    "id": "real-insights",
    "icon": ChartColumn,
    "title": "Real Insights",
    "status": "Alert",
    "description": [
      "An 8% drop in efficiency was detected in the Northern Logistics team.",
      "The CAC is 12% below the industry average."
    ]
  }
];

function statsCard(stat) {
  return (
    <div className="bg-bluegrey-100 rounded-xl p-6 space-y-3">
      <div className="flex">
        <div className={`rounded-lg w-auto p-1 text-sm font-jetbrains text-grey-900 ${stat.labelClass}`}>
          {stat.label}
        </div>
      </div>
      <div className="text-gray-900 text-2xl font-bold">
        {stat.percentaje}%
      </div>
      <div className="text-bluegrey-900 text-sm">
        <div>
          <TrendingUp className="size-4 inline"/> {stat.difference}%
        </div>
        <div className="text-bluegrey-800">
          { stat.note}
        </div>
      </div>
    </div>
  );
}

function quickCard(module) {
  function gotoLink(to: any): import("react").MouseEventHandler<HTMLDivElement> {
    return (event) => {
      event.preventDefault();
      document.location.href = to;
    };
  }

  return (
    <div className="bg-bluegrey-100 rounded-lg p-4 cursor-pointer" key={module.title} onClick={gotoLink(module.to)}>
      <div className="flex items-center gap-2">
        <div className="bg-bluegrey-200 p-2 rounded-xl size-10">
          <module.icon className={`size-6`} />
        </div>
        <div className="font-bold text-lg">
          {module.title}
        </div>
      </div>
      <div className="mt-4">
        <Button variant="default" size="sm" className="w-full bg-green-500 text-sm font-jetbrains" >
          Go now <ArrowRight />
        </Button>
      </div>
    </div> 
    );
  }

function moduleCard(module) {
  function gotoLink(to: any): import("react").MouseEventHandler<HTMLDivElement> {
    return (event) => {
      event.preventDefault();
      document.location.href = to;
    };
  }
  return (
    <div className="bg-bluegrey-100 rounded-lg p-4 cursor-pointer" key={module.title} onClick={gotoLink(module.to)}>
      <div className="flex items-center gap-2">
        <div className="">
          <module.icon  className={`inline size-8 ${module.iconColor} bg-black rounded-full`} />
        </div>
        <div className="font-bold text-lg">
          {module.name}
        </div>
      </div>
      <div className="text-sm text-bluegrey-800">
        {module.description}
      </div>
      <div className="mt-4">
        <Button variant="default" size="sm" className="w-full bg-green-500 text-sm font-jetbrains" >
          Go now <ArrowRight />
        </Button>
      </div>
    </div> 
    );
  }

  
function insightsCard(insight) {
  return (
    <div className="bg-bluegrey-100 rounded-lg p-4 cursor-pointer" key={insight.title}>
      <div className="flex items-center gap-2 justify-between">
        <div className="bg-bluegrey-200 p-2 rounded-xl size-10">
          <insight.icon className={`size-6`} />
        </div>
        <div className="font-bold text-lg flex-grow">
          {insight.title}
        </div>
        <div>
          {insight.status == 'Insights' && (
          <span className="text-xs font-jetbrains py-1 px-2 bg-green-100 text-green-900 rounded-full">{insight.status}</span>
          )}
          {insight.status == 'Alert' && (
          <span className="text-xs font-jetbrains py-1 px-2 bg-pink-500 text-red-900 rounded-full">{insight.status}</span>
          )}

        </div>
      </div>
      <div className="mt-3">
        {insight.description.map((des, index) => (
          <div key={index} className="text-sm text-bluegrey-800">
            <Zap className="inline size-4" /> {des}
          </div>
        ))}
      </div>
    </div> 
    );
  }
function fullDateCurrent() {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long', hour: 'numeric', minute: '2-digit' };
  return new Date().toLocaleDateString("en-US", options);
}
export default function Home() {
  return (
    <>
      <div className="bg-bluegrey-100 rounded-lg mb-4 p-4 flex items-center justify-between">
        <div>Hi, Diego! Welcome back</div>
        <div> { fullDateCurrent() }</div>
      </div>
      <div className="mt-6">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <span className="mt-2 text-sm font-regular text-bluegrey-900">KPIs, charts, and shourcuts</span>
      </div>
      <div className="flex items-center justify-between gap-4 mt-8">
        <div className="relative flex-grow">
          <Search className="absolute size-4 left-3 top-3 text-bluegrey-800" />
          <Input placeholder="Search..." className="pl-8 bg-bluegrey-200 placeholder:text-bluegrey-800 rounded-full" />
        </div>
        <div>
          <Select>
            <SelectTrigger className="bg-transparent border border-gray-500 text-bluegrey-800 rounded-xl px-4 py-2">
              <SelectValue placeholder="This week" />
            </SelectTrigger>
            <SelectContent className="bg-white rounded-lg shadow-lg">
              <SelectItem value="today" className="px-4 py-2 hover:bg-bluegrey-100">Today</SelectItem>
              <SelectItem value="this-week" className="px-4 py-2 hover:bg-bluegrey-100">This week</SelectItem>
              <SelectItem value="this-month" className="px-4 py-2 hover:bg-bluegrey-100">This month</SelectItem>
              <SelectItem value="this-year" className="px-4 py-2 hover:bg-bluegrey-100">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-4">
        <MetricsCards />
      </div>
      <h2 className="text-base font-semibold mt-6">Quick access</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickAccess.map(module => quickCard(module))}
      </div>
      <h2 className="text-base font-semibold mt-6">Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {modules.map(module => moduleCard(module))}
      </div>
      <Card className="bg-bluegrey-100 p-6 mt-6">
        <h2 className="text-xl text-gray-900 font-bold">Trend of agents used per month</h2>
        <CardContent className="pt-8">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={headcountReductionData}>
                <defs>
                  <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#14EA73" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#14EA73" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="text-gray-800" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />

                <Area
                  type="monotone"
                  dataKey="actual"
                  stroke="hsl(var(--primary))"
                  fill="url(#greenGradient)"
                  strokeWidth={2}
                  name="Actual"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-bluegrey-100 p-6 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl text-gray-900 font-bold">Cost of using agents per department</h2>
            <p className="text-sm text-bluegrey-800">Q4 2025 comparison.</p>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent border border-gray-500 text-bluegrey-800 rounded-xl">
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
        <CardContent className="pt-8">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySavingsData} barSize={11}>
                <CartesianGrid strokeDasharray="3 3" className="text-gray-800" />
                <XAxis dataKey="department" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Bar dataKey="value" fill="hsl(var(--primary))" isAnimationActive={true} />
              </BarChart>
            </ResponsiveContainer>
        </CardContent>
      </Card>
      <h2 className="text-base font-semibold mt-6">Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {insights.map(insight => insightsCard(insight))}
      </div>

    </>
  );
}
