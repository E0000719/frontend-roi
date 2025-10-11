import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FileText, TrendingUp, DollarSign, Calculator, ArrowLeft, Bot, Check } from 'lucide-react';
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
  const [showFutureProjection, setShowFutureProjection] = useState(false);
  
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
    setShowFutureProjection(!showFutureProjection);
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

    // Determinar qué TCO mostrar (actual o futuro)
    const currentGlobalTco = showFutureProjection ? tco_global.future_tco : tco_global.current_tco;
    
    // Preparar datos para la gráfica radial
    const dimensionNames = dimensions.map((dim: any) => dim.dimension_name);
    const dimensionTcoValues = dimensions.map((dim: any) => 
      showFutureProjection ? dim.future_tco : dim.current_tco
    );

    // Usar siempre el TCO actual como escala máxima para mostrar la reducción
    const maxScaleValue = tco_global.current_tco;

    // Calcular porcentajes de contribución al TCO global
    const dimensionPercentages = dimensionTcoValues.map((tco: number) => 
      (tco / currentGlobalTco) * 100
    );

    return (
      <div className="space-y-8">
        {/* TCO Total - Centrado arriba */}
        <div className="text-center">
          <p className="text-muted-foreground mb-2">
            {showFutureProjection ? 'La proyección futura del proceso tiene un' : 'El proceso asociado tiene un'}
          </p>
          <p className="text-4xl font-bold text-foreground mb-2">
            TCO de {formatCurrency(currentGlobalTco)}
          </p>
          <p className="text-muted-foreground">
            anual{showFutureProjection ? ' proyectado' : ''}. Este proceso considera el siguiente desglose de dimensiones:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Gráfica Radial */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square max-w-md">
              <RadialChart 
                dimensions={dimensionNames} 
                data={dimensionTcoValues}
                maxValue={maxScaleValue}
              />
            </div>
          </div>

          {/* Leyenda de dimensiones */}
          <div className="flex flex-col justify-center space-y-3">
            <h3 className="text-lg font-semibold text-foreground mb-2">Leyenda de Dimensiones</h3>
            <div className="space-y-3">
              {dimensionNames.map((name: string, index: number) => {
                const dimension = dimensions.find((d: any) => d.dimension_name === name);
                const tcoValue = showFutureProjection ? dimension?.future_tco : dimension?.current_tco;
                const percentage = (tcoValue / currentGlobalTco) * 100;
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm leading-tight">{name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        TCO: <span className="font-semibold text-accent">{formatCurrency(tcoValue || 0)}</span>
                        {' '}({formatPercentage(percentage)})
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Botón Alternar Proyección */}
        <div className="flex justify-center pt-4">
          <Button onClick={handleCalculateProjection} size="lg" className="px-8">
            <Calculator className="h-5 w-5 mr-2" />
            {showFutureProjection ? 'Ver Proyección Actual' : 'Ver Proyección Futura'}
          </Button>
        </div>
      </div>
    );
  };

  // Renderizar vista inicial (sin resultados)
  const renderInitialView = () => {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="rounded-2xl text-card-foreground shadow-sm border-0 bg-bluegrey-400 p-6">
            <div className="w-full aspect-square max-w-md">
              <RadialChart dimensions={config.dimensions} />
            </div>
          </div>
          <div className="rounded-2xl text-card-foreground shadow-sm border-0 bg-bluegrey-400 p-6 flex flex-col">
            <div className='flex-grow'>
              <div className="font-bold text-2xl text-gray-900">
                <span>{config.name.split(' ').slice(1).join(' ')}</span>
              </div>

              <p className="text-gray-700 text-sm mt-1">
                El proceso asociado al módulo Agentic {config.name.split(' ').slice(1).join(' ')} tiene {config.dimensions.length} dimensiones:
              </p>

              <ul className="text-gray-700 text-sm mt-4 space-y-1">
                {config.dimensions.map((dimension) => (
                  <li key={dimension} className="flex items-center">
                    <Check className="text-bluegrey-700 mr-2" />
                    {dimension}</li>
                ))}
              </ul>

              <p className="text-gray-700 text-sm mt-4">
                Estas dimensiones pueden variar según la información completada en el cuestionario presente, comencemos...
              </p>
            </div>
            <Button onClick={handleStart} size="lg" className="px-8">
              Comenzar Caso de Uso
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
        </div>
      </>
    );
  };

  return (
    <div className="w-full h-full bg-bluegrey-500 rounded-2xl py-8 px-4 mb-4">
      {/* Header */}
      <div className="flex items-center">
        <div className="bg-bluegrey-200 rounded-2xl size-10 flex items-center justify-center mr-3">
          <Bot className="size-6 text-bluegrey-700" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">ROI First Assistant</h1>
        </div>

        {/* Botón "Nuevo Caso de Uso" solo si hay resultados */}
        {showResults && (
          <Button variant="outline" onClick={handleNewCase}>
            Nuevo Caso de Uso
          </Button>
        )}
      </div>
      <div className="flex items-center cursor-pointer font-bold text-lg mt-8" onClick={() => navigate(-1)}>
        <ArrowLeft /> <span className='ml-3'>{config.name}</span>
      </div>
      {/* Contenido principal */}
      <div className="mt-8">
        {showResults ? renderCalculationResults() : renderInitialView()}
      </div>
    </div>
  );
}