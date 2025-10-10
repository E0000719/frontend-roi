import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

interface RadialChartProps {
  dimensions: string[];
  data?: number[];
  maxValue?: number;
}

export const RadialChart = ({ dimensions, data, maxValue }: RadialChartProps) => {
  const chartData = dimensions.map((dimension, index) => ({
    dimension: `${index + 1}`,
    fullName: dimension,
    value: data?.[index] || 0,
  }));

  // Calcular el dominio máximo para la escala radial
  const maxDomain = maxValue || Math.max(...(data || [0]), 100);

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
          domain={[0, maxDomain]} 
          tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          tickFormatter={(value) => {
            if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
            if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
            return value.toString();
          }}
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
