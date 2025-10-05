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

    const { tco_global, dimensions, summary_text } = calculationResults;

    return (
      <div className="space-y-6">
        {/* Resumen ejecutivo */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h3 className="text-xl font-semibold text-foreground">Executive Summary</h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {summary_text}
          </p>
        </div>

        {/* TCO Global - 4 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Current TCO */}
          <div className="gradient-card rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-red-600" />
              <p className="text-sm text-muted-foreground">Current TCO</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(tco_global.current_tco)}
            </p>
          </div>

          {/* Future TCO */}
          <div className="gradient-card rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <p className="text-sm text-muted-foreground">Future TCO</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(tco_global.future_tco)}
            </p>
          </div>

          {/* Total ROI */}
          <div className="gradient-card rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <p className="text-sm text-muted-foreground">Total ROI</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(tco_global.roi_total)}
            </p>
          </div>

          {/* ROI Percentage */}
          <div className="gradient-card rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <Calculator className="h-5 w-5 text-purple-600" />
              <p className="text-sm text-muted-foreground">ROI Percentage</p>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {formatPercentage(tco_global.roi_percentage)}
            </p>
          </div>
        </div>

        {/* Tabla de dimensiones */}
        <div className="gradient-card rounded-xl p-6 border border-border/50">
          <h3 className="text-lg font-semibold text-foreground mb-4">Impact by Dimension</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Dimension</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Current TCO</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Future TCO</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">ROI</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Impact</th>
                </tr>
              </thead>
              <tbody>
                {dimensions.map((dim: any, index: number) => (
                  <tr key={dim.dimension_id} className="border-b border-border/50 hover:bg-accent/5">
                    <td className="py-3 px-4">
                      <p className="font-medium text-foreground">{dim.dimension_name}</p>
                      {dim.description && (
                        <p className="text-xs text-muted-foreground mt-1">{dim.description}</p>
                      )}
                    </td>
                    <td className="text-right py-3 px-4 text-sm text-muted-foreground">
                      {formatCurrency(dim.current_tco)}
                    </td>
                    <td className="text-right py-3 px-4 text-sm text-muted-foreground">
                      {formatCurrency(dim.future_tco)}
                    </td>
                    <td className="text-right py-3 px-4 text-sm font-medium text-green-600">
                      {formatCurrency(dim.roi)}
                    </td>
                    <td className="text-right py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {formatPercentage(dim.impact_percentage)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botón Calcular Proyección */}
        <div className="flex justify-center">
          <Button onClick={handleCalculateProjection} size="lg" className="px-8">
            <Calculator className="h-5 w-5 mr-2" />
            Calcular Proyección
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
            <h1 className="text-3xl font-bold text-foreground">New ROI Implementation</h1>
            <p className="text-muted-foreground">New ROI Business Case</p>
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
            {showResults ? 'ROI Calculation Results' : 'ROI First Assistant'}
          </h2>
        </div>

        {/* Renderizar según si hay resultados o no */}
        {showResults ? renderCalculationResults() : renderInitialView()}
      </div>
    </div>
  );
}