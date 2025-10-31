import RealTimeInsightsIcon from "./components/icons/RealTimeInsightsIcon";
import LegacySystemsTakeoverIcon from "./components/icons/LegacySystemsTakeoverIcon";
import AgenticRecruitingHiringIcon from "./components/icons/AgenticRecruitingHiringIcon";
import OrderToCash from "./components/icons/OrderToCash";
import LegalCompliance from "./components/icons/LegalCompliance";
import AgenticCustomerITSupport from "./components/icons/AgenticCustomerITSupport";
import PhysicalAgentServiceRobotsIcon from "./components/icons/PhysicalAgentServiceRobotsIcon";

const modules = [
  { name: "ROI First", href: "", icon: PhysicalAgentServiceRobotsIcon, iconColor: "text-green-400", active: true },
  { name: "Agentic Customer & IT Support", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:8080/", icon: AgenticCustomerITSupport, iconColor: "text-warning-300" },
  { name: "Legal & Compliance", href: "", icon: LegalCompliance, iconColor: "text-green-300" },
  { name: "Order to Cash", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:9098", icon: OrderToCash, iconColor: "text-pink-400" },
  { name: "Agentic Recruiting & Hiring", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:8083/", icon: AgenticRecruitingHiringIcon, iconColor: "text-blue-500" },
  { name: "Legacy Systems Takeover", href: "", icon: LegacySystemsTakeoverIcon, iconColor: "text-pink-400" },
  { name: "Real-Time Insights", href: "http://ec2-44-223-62-175.compute-1.amazonaws.com:9092/", icon: RealTimeInsightsIcon, iconColor: "text-green-400" },
];

export default modules;
