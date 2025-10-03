import { useNavigate, useParams } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadialChart } from '@/components/RadialChart';
import { setRoiSystem, setRoiDimensions } from '@/utils/sessionStorage';

const systemConfigs: Record<string, { name: string; dimensions: string[] }> = {
  'order-to-cash': {
    name: 'Agentic Order to Cash',
    dimensions: [
      'Customer Satisfaction',
      'Delivery Time',
      'Net Promoter Score',
      'Human Labor Cost',
      'Revenue Increment',
      'Human Error',
    ],
  },
  'legacy_takeover': {
    name: 'Legacy Takeover',
    dimensions: [
      'System Efficiency',
      'Migration Time',
      'Data Integrity',
      'Cost Reduction',
      'User Adoption',
      'Technical Debt',
    ],
  },
  'cost-to-hire': {
    name: 'Agentic Cost to Hire',
    dimensions: [
      'Time to Hire',
      'Cost per Hire',
      'Candidate Quality',
      'Process Efficiency',
      'Retention Rate',
      'Hiring Manager Satisfaction',
    ],
  },
  'customer-support': {
    name: 'Agentic Customer Support',
    dimensions: [
      'Response Time',
      'Resolution Rate',
      'Customer Satisfaction',
      'Agent Productivity',
      'Cost per Ticket',
      'First Contact Resolution',
    ],
  },
  'insights': {
    name: 'Real Time Insights',
    dimensions: [
      'Data Accuracy',
      'Processing Speed',
      'Decision Impact',
      'System Integration',
      'User Adoption',
      'ROI Visibility',
    ],
  },
  'compliance': {
    name: 'Contract Management Compliance',
    dimensions: [
      'Compliance Rate',
      'Risk Reduction',
      'Audit Efficiency',
      'Contract Accuracy',
      'Process Speed',
      'Cost Savings',
    ],
  },
  'physical-ai': {
    name: 'Physical AI',
    dimensions: [
      'Automation Level',
      'Safety Score',
      'Efficiency Gain',
      'Downtime Reduction',
      'Quality Improvement',
      'Maintenance Cost',
    ],
  },
  'web-takeover': {
    name: 'Web Interface Takeover',
    dimensions: [
      'Task Completion Rate',
      'Speed Improvement',
      'Error Reduction',
      'User Experience',
      'Integration Complexity',
      'Maintenance Effort',
    ],
  },
};

export default function SystemOverview() {
  const { system } = useParams<{ system: string }>();
  const navigate = useNavigate();
  
  const config = system ? systemConfigs[system] : null;

  if (!config) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">System not found</p>
      </div>
    );
  }

  const handleStart = () => {
    if (system) {
      setRoiSystem(system);
      setRoiDimensions(config.dimensions);
      navigate(`/roi-business-case/${system}/select-agent`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <FileText className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">New ROI Implementation</h1>
          <p className="text-muted-foreground">New ROI Business Case</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-full bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">ROI First Assistant</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square max-w-md">
              <RadialChart dimensions={config.dimensions} />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-full bg-accent/10">
                <FileText className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Agentic <span className="text-accent">{config.name.split(' ').slice(1).join(' ')}</span>
              </h3>
            </div>

            <p className="text-muted-foreground mb-4">
              The process associated to the Agentic {config.name.split(' ').slice(1).join(' ')} module has {config.dimensions.length} dimensions:
            </p>

            <ul className="space-y-2 mb-4">
              {config.dimensions.map((dimension) => (
                <li key={dimension} className="text-foreground">{dimension}</li>
              ))}
            </ul>

            <p className="text-muted-foreground text-sm">
              These dimensions can vary based on the information filled in the present questionnaire, let's start...
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleStart} size="lg" className="px-8">
            Comenzar Caso de Uso
          </Button>
        </div>
      </div>
    </div>
  );
}
