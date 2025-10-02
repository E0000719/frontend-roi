import { useNavigate, useParams } from 'react-router-dom';
import { FileText, Bot, Sparkles } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { setRoiType } from '@/utils/sessionStorage';

export default function AgentSelection() {
  const { system } = useParams<{ system: string }>();
  const navigate = useNavigate();

  const handleAgentSelect = (type: 'beginner' | 'expert') => {
    setRoiType(type);
    navigate(`/roi-business-case/${system}/chat`);
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

      <div className="gradient-card shadow-card rounded-xl p-12 border border-border/50">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="p-2 rounded-full bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">New ROI Business Case</h2>
        </div>

        <h3 className="text-3xl font-bold text-center text-foreground mb-16">
          how do you want to start?
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
    </div>
  );
}
