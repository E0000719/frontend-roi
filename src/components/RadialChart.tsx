import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadialChartProps {
  dimensions: string[];
  data?: number[];
}

export const RadialChart = ({ dimensions, data }: RadialChartProps) => {
  const chartData = dimensions.map((dimension, index) => ({
    dimension: `${index + 1}`, // Usar números en lugar de nombres completos
    fullName: dimension,
    value: data?.[index] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={chartData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis 
          dataKey="dimension" 
          tick={{ fill: 'hsl(var(--foreground))', fontSize: 14, fontWeight: 600 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, Math.max(...(data || [0]), 5)]} 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
        />
        <Radar
          name="Impacto"
          dataKey="value"
          stroke="hsl(var(--accent))"
          fill="hsl(var(--accent))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};
