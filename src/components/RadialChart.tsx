import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadialChartProps {
  dimensions: string[];
  data?: number[];
}

export const RadialChart = ({ dimensions, data }: RadialChartProps) => {
  const chartData = dimensions.map((dimension, index) => ({
    dimension,
    value: data?.[index] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={chartData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis 
          dataKey="dimension" 
          tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 5]} 
          tick={{ fill: 'hsl(var(--muted-foreground))' }}
        />
        <Radar
          name="Score"
          dataKey="value"
          stroke="hsl(var(--accent))"
          fill="hsl(var(--accent))"
          fillOpacity={0.3}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
