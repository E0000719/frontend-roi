import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText, TrendingUp, DollarSign, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadialChart } from '@/components/RadialChart';
import { setRoiSystem, setRoiDimensions, getCalculationData, hasCalculationData, clearCalculationData } from '@/utils/sessionStorage';

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
  
  // Estados para resultados de cálculo
  const [calculationResults, setCalculationResults] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  
  const config = system ? systemConfigs[system] : null;

  useEffect(() => {
    // Verificar si hay resultados de cálculo al cargar
    if (hasCalculationData()) {
      const results = getCalculationData();
      setCalculationResults(results);
      setShowResults(true);
      console.log('✅ Resultados de cálculo cargados:', results);
    }
  }, []);

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

  const handleNewCase = () => {
    // Limpiar datos anteriores
    clearCalculationData();
    setCalculationResults(null);
    setShowResults(false);
    
    // Redirigir a inicio
    if (system) {
      setRoiSystem(system);
      setRoiDimensions(config.dimensions);
      navigate(`/roi-business-case/${system}/select-agent`);
    }
  };

  const handleCalculateProjection = () => {
    // TODO: Implementar cálculo de proyección
    console.log('🚧 Calcular proyección - Funcionalidad pendiente');
  };

  // Formatear números para display
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(1)}%`;
  };

  // Renderizar resultados de cálculo
  const renderCalculationResults = () => {
    if (!calculationResults || !showResults) return null;

    const { tco_global, dimensions } = calculationResults;

    // Preparar datos para la gráfica radial
    const dimensionNames = dimensions.map((dim: any) => dim.dimension_name);
    const dimensionValues = dimensions.map((dim: any) => dim.impact_percentage);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfica Radial */}
        <div className="flex items-center justify-center">
          <div className="w-full aspect-square max-w-md">
            <RadialChart dimensions={dimensionNames} data={dimensionValues} />
          </div>
        </div>

        {/* Información TCO y Dimensiones */}
        <div className="flex flex-col justify-center space-y-6">
          {/* TCO Total */}
          <div className="text-center lg:text-left">
            <p className="text-muted-foreground mb-2">El proceso asociado tiene un</p>
            <p className="text-4xl font-bold text-foreground mb-2">
              TCO de {formatCurrency(tco_global.current_tco)}
            </p>
            <p className="text-muted-foreground mb-4">anual. Este proceso considera el siguiente desglose de dimensiones:</p>
          </div>

          {/* Lista de dimensiones con impacto */}
          <div className="space-y-2">
            {dimensions
              .sort((a: any, b: any) => b.impact_percentage - a.impact_percentage)
              .map((dim: any) => (
                <div key={dim.dimension_id} className="flex justify-between items-center">
                  <span className="text-foreground">{dim.dimension_name}</span>
                  <span className="font-semibold text-foreground">
                    {formatPercentage(dim.impact_percentage)} impact
                  </span>
                </div>
              ))}
          </div>

          {/* Botón Calcular Proyección */}
          <div className="pt-4">
            <Button onClick={handleCalculateProjection} size="lg" className="w-full lg:w-auto px-8">
              <Calculator className="h-5 w-5 mr-2" />
              Calcular Proyección
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar vista inicial (sin resultados)
  const renderInitialView = () => {
    return (
      <>
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
              El proceso asociado al módulo Agentic {config.name.split(' ').slice(1).join(' ')} tiene {config.dimensions.length} dimensiones:
            </p>

            <ul className="space-y-2 mb-4">
              {config.dimensions.map((dimension) => (
                <li key={dimension} className="text-foreground">{dimension}</li>
              ))}
            </ul>

            <p className="text-muted-foreground text-sm">
              Estas dimensiones pueden variar según la información completada en el cuestionario presente, comencemos...
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleStart} size="lg" className="px-8">
            Comenzar Caso de Uso
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent/10">
            <FileText className="h-8 w-8 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nueva Implementación de ROI</h1>
            <p className="text-muted-foreground">Nuevo Caso de Negocio de ROI</p>
          </div>
        </div>

        {/* Botón "Nuevo Caso de Uso" solo si hay resultados */}
        {showResults && (
          <Button variant="outline" onClick={handleNewCase}>
            Nuevo Caso de Uso
          </Button>
        )}
      </div>

      {/* Contenido principal */}
      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 rounded-full bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {showResults ? 'Resultados del Cálculo de ROI' : 'Asistente ROI First'}
          </h2>
        </div>

        {/* Renderizar según si hay resultados o no */}
        {showResults ? renderCalculationResults() : renderInitialView()}
      </div>
    </div>
  );
}