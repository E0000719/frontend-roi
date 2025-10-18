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
    leftLabel: "Current ROI",
    leftValue: "140%",
    rightLabel: "Savings",
    rightValue: "2.4M",
    footer: "5% vs Expected",
  },
  {
    type: "dual",
    title: "Target ROI / Savings",
    leftLabel: "Target ROI",
    leftValue: "140%",
    rightLabel: "Savings",
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
    footer: "3 this quarter",
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
    <div className="flex flex-col lg:flex-row gap-2 w-full">
      {metricsData.map((metric, index) => (
        <Card key={index} className={`main-card bg-white text-gray-900 rounded-2xl border border-primary ${metric.type === "dual" ? "lg:flex-[23]" : "lg:flex-[18]"} flex-1`}>
          <CardContent className="p-6 flex flex-col items-center justify-center h-full">
            
            {metric.type === "dual" ? (
              <>
                <div className="grid grid-cols-2 gap-6 w-full mb-4">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-sm text-bluegrey-900 mb-2">{metric.leftLabel}</div>
                    <div className="text-3xl font-bold text-primary">{metric.leftValue}</div>
                  </div>
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="text-sm text-bluegrey-900 mb-2">{metric.rightLabel}</div>
                    <div className="text-3xl font-bold text-primary">{metric.rightValue}</div>
                  </div>
                </div>
                {metric.footer && (
                  <div className="text-xs text-bluegrey-800 text-center">{metric.footer}</div>
                )}
              </>
            ) : (
              <>
                <div className="text-sm text-bluegrey-900 mb-3 text-center">{metric.title}</div>
                <div className="mb-3 flex flex-col items-center justify-center">
                  {metric.label && (
                    <div className="text-xs text-bluegrey-800 mb-2 text-center">{metric.label}</div>
                  )}
                  <div className="text-4xl font-bold text-primary">{metric.value}</div>
                </div>
                {metric.footer && (
                  <div className="text-xs text-bluegrey-800 text-center">{metric.footer}</div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
