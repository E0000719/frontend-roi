import { Card, CardContent } from "@/components/ui/card";

interface MetricCardData {
  type: "dual" | "single";
  title: string;
  // For dual type
  leftLabel?: string;
  leftValue?: string;
  rightLabel?: string;
  rightValue?: string;
  // For single type
  label?: string;
  value?: string;
  // Common
  footer?: string;
}

const metricsData: MetricCardData[] = [
  {
    type: "dual",
    title: "Current ROI / Savings",
    leftLabel: "Total ROI",
    leftValue: "140%",
    rightLabel: "Total Cost Saving",
    rightValue: "2.4M",
    footer: "5% vs Expected",
  },
  {
    type: "dual",
    title: "Target ROI / Savings",
    leftLabel: "Total ROI",
    leftValue: "140%",
    rightLabel: "Total Cost Saving",
    rightValue: "2.4M",
    footer: "",
  },
  {
    type: "single",
    title: "Total AI Invested (to date)",
    label: "Investment to date",
    value: "0.989M",
    footer: "until 12/30/25",
  },
  {
    type: "single",
    title: "Agents Deployed",
    label: "",
    value: "12",
    footer: "",
  },
  {
    type: "single",
    title: "Productivity Gain",
    label: "",
    value: "37.80 %",
    footer: "5.5% vs Last Month",
  },
];

export function MetricsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
      {metricsData.map((metric, index) => (
        <Card key={index} className="main-card bg-white text-gray-900 rounded-2xl border-0">
          <CardContent className="p-6">
            <div className="text-sm text-bluegrey-900 mb-4">{metric.title}</div>
            
            {metric.type === "dual" ? (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-bluegrey-800 mb-1">{metric.leftLabel}</div>
                  <div className="text-2xl font-bold">{metric.leftValue}</div>
                </div>
                <div>
                  <div className="text-xs text-bluegrey-800 mb-1">{metric.rightLabel}</div>
                  <div className="text-2xl font-bold">{metric.rightValue}</div>
                </div>
              </div>
            ) : (
              <div className="mb-4">
                {metric.label && (
                  <div className="text-xs text-bluegrey-800 mb-1">{metric.label}</div>
                )}
                <div className="text-3xl font-bold">{metric.value}</div>
              </div>
            )}
            
            {metric.footer && (
              <div className="text-xs text-bluegrey-800">{metric.footer}</div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
