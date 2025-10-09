import { useNavigate, useParams } from 'react-router-dom';
import { FileText, Bot, Sparkles } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { setRoiType, setCompanyInfo } from '@/utils/sessionStorage';
import { useState } from 'react';

export default function AgentSelection() {
  const { system } = useParams<{ system: string }>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<'beginner' | 'expert' | null>(null);
  const [companyName, setCompanyName] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [primarySector, setPrimarySector] = useState('');
  const [secondarySectors, setSecondarySectors] = useState<string[]>([]);

  const sectors = [
    { value: 'tecnologia', label: 'Tecnología' },
    { value: 'finanzas', label: 'Finanzas' },
    { value: 'salud', label: 'Salud' },
    { value: 'manufactura', label: 'Manufactura' },
    { value: 'retail', label: 'Retail' },
    { value: 'servicios', label: 'Servicios' },
    { value: 'educacion', label: 'Educación' },
    { value: 'otro', label: 'Otro' },
  ];

  const availableSecondarySectors = sectors.filter(s => s.value !== primarySector);

  const handleSecondarySectoToggle = (sectorValue: string) => {
    setSecondarySectors(prev => {
      if (prev.includes(sectorValue)) {
        return prev.filter(s => s !== sectorValue);
      } else if (prev.length < 2) {
        return [...prev, sectorValue];
      }
      return prev;
    });
  };

  const handleAgentSelect = (type: 'beginner' | 'expert') => {
    setSelectedAgent(type);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!companyName || !companySize || !primarySector) {
      return;
    }

    setCompanyInfo({
      name: companyName,
      size: companySize,
      sector: primarySector,
      secondarySectors: secondarySectors,
    });

    if (selectedAgent) {
      setRoiType(selectedAgent);
      navigate(`/roi-business-case/${system}/chat`);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <FileText className="h-8 w-8 text-accent" />
        </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nueva Implementación de ROI</h1>
            <p className="text-muted-foreground">Nuevo Caso de Negocio de ROI</p>
          </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-12 border border-border/50">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="p-2 rounded-full bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">Nuevo Caso de Negocio de ROI</h2>
        </div>

        <h3 className="text-3xl font-bold text-center text-foreground mb-16">
          ¿Cómo deseas comenzar?
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
          <Card
            onClick={() => handleAgentSelect('beginner')}
            className="group cursor-pointer transition-all hover:shadow-hover hover:scale-105 border-border/50 p-8"
          >
            <CardHeader className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Bot className="h-12 w-12 text-accent" />
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-foreground">ROI First Assistant</h4>
            </CardHeader>
          </Card>

          <Card
            onClick={() => handleAgentSelect('expert')}
            className="group cursor-pointer transition-all hover:shadow-hover hover:scale-105 border-border/50 p-8"
          >
            <CardHeader className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-6 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <Sparkles className="h-12 w-12 text-accent" />
                </div>
              </div>
              <h4 className="text-2xl font-semibold text-foreground">GPT ROI First</h4>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Información de la Empresa</DialogTitle>
            <DialogDescription>
              Por favor, completa los siguientes datos antes de continuar.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Nombre de la Empresa</Label>
              <Input
                id="company-name"
                placeholder="Ingresa el nombre de la empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-size">Tamaño</Label>
              <Select value={companySize} onValueChange={setCompanySize}>
                <SelectTrigger id="company-size">
                  <SelectValue placeholder="Selecciona el tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-50">1-50 empleados</SelectItem>
                  <SelectItem value="51-200">51-200 empleados</SelectItem>
                  <SelectItem value="201-500">201-500 empleados</SelectItem>
                  <SelectItem value="501-1000">501-1000 empleados</SelectItem>
                  <SelectItem value="1000+">Más de 1000 empleados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-sector">Sector Primario</Label>
              <Select value={primarySector} onValueChange={setPrimarySector}>
                <SelectTrigger id="company-sector">
                  <SelectValue placeholder="Selecciona el sector primario" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {primarySector && (
              <div className="space-y-2">
                <Label>Sectores Secundarios (máximo 2)</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-border rounded-md p-3">
                  {availableSecondarySectors.map(sector => (
                    <div key={sector.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`secondary-${sector.value}`}
                        checked={secondarySectors.includes(sector.value)}
                        onCheckedChange={() => handleSecondarySectoToggle(sector.value)}
                        disabled={!secondarySectors.includes(sector.value) && secondarySectors.length >= 2}
                      />
                      <label
                        htmlFor={`secondary-${sector.value}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {sector.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!companyName || !companySize || !primarySector}
            >
              Continuar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
