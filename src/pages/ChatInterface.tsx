import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Send, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getRoiSystem, getRoiType, getRoiDimensions } from '@/utils/sessionStorage';
import { roiService } from '@/services/roiService';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const { system } = useParams<{ system: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const roiSystem = getRoiSystem();
  const roiType = getRoiType();
  const dimensions = getRoiDimensions();

  useEffect(() => {
    // Redirect if session data is missing
    if (!roiSystem || !roiType || !system) {
      toast.error('Session data missing. Please start from the beginning.');
      navigate('/roi-business-case');
    }
  }, [roiSystem, roiType, system, navigate]);

  const agentName = roiType === 'expert' ? 'GPT ROI First' : 'ROI First Assistant';
  const AgentIcon = roiType === 'expert' ? Sparkles : Bot;

  const handleSendMessage = async () => {
    if (!message.trim() || !roiSystem || !roiType) return;

    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // This is where you'll integrate with your backend
      // For now, it's a placeholder
      const response = await roiService.sendChatMessage(message, {
        system: roiSystem,
        type: roiType,
        dimensions,
      });

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content || 'Thank you for your message. I will help you with the ROI analysis.',
      }]);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEstimateTCO = () => {
    toast.info('Estimating TCO of the current process...');
    // This will be connected to your backend
  };

  const handleCreateProposal = () => {
    toast.info('Creating technical and financial proposal...');
    // This will be connected to your backend
  };

  return (
    <div className="space-y-8 h-[calc(100vh-8rem)]">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-accent/10">
          <FileText className="h-8 w-8 text-accent" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">New ROI Implementation</h1>
          <p className="text-muted-foreground">New ROI Business Case</p>
        </div>
      </div>

      <div className="gradient-card shadow-card rounded-xl p-8 border border-border/50 h-[calc(100%-8rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-full bg-accent/10">
            <FileText className="h-6 w-6 text-accent" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">New ROI Business Case</h2>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="p-2 rounded-full bg-accent/10">
            <AgentIcon className="h-5 w-5 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">{agentName}</h3>
        </div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <p className="text-xl font-semibold mb-2">Tell me about the current process</p>
              <p className="text-sm">Share details about your process to get started with the ROI analysis</p>
            </div>
          )}
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-xl p-4 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-foreground rounded-xl p-4">
                <div className="flex gap-2">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEstimateTCO}
              className="flex-1"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Estimate the current TCO of the process
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCreateProposal}
              className="flex-1"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Estimate TCO & create a technical / financial proposal
            </Button>
          </div>

          <div className="relative">
            <Textarea
              placeholder="write the general process description"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="min-h-[100px] pr-12 resize-none"
              disabled={isLoading}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              className="absolute bottom-3 right-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
