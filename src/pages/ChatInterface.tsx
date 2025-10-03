import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Send, Sparkles, Bot, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getRoiSystem, getRoiType, getRoiDimensions } from '@/utils/sessionStorage';
import { roiService } from '@/services/roiService';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 🆕 Interfaz para respuesta del backend
interface ChatResponse {
  response: string;
  conversation_history: any[];
  success: boolean;
  current_state?: any;
  conversation_id?: string;
  data?: any;
  missing_or_invalid_fields?: any[];
  ready_for_calculation?: boolean;
  validation_report?: any;
  status?: string;
  timestamp?: string;
}

// 🆕 Estado de corrección
interface CorrectionState {
  awaiting_corrections: boolean;
  valid_data: any;
  invalid_fields: any[];
  status: string;
}

export default function ChatInterface() {
  const { system } = useParams<{ system: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 🆕 Estados para agente experto
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [correctionState, setCorrectionState] = useState<CorrectionState | null>(null);
  const [currentState, setCurrentState] = useState<any>(null);

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const agentName = roiType === 'expert' ? 'GPT ROI First' : 'ROI First Assistant';
  const AgentIcon = roiType === 'expert' ? Sparkles : Bot;

  const sendMessageToAPI = async (messageText: string) => {
    try {
      // Construir payload según el contexto
      let requestPayload: any = {
        message: messageText,
        system: roiSystem || 'legacy_takeover',
        conversation_history: conversationHistory,
        user_type: roiType === 'expert' ? 'expert' : 'beginner',
        current_state: currentState,
        conversation_id: conversationId
      };

      // Si estamos en modo corrección, agregar contexto
      if (correctionState?.awaiting_corrections) {
        requestPayload.correction_context = {
          is_correction: true,
          valid_data: correctionState.valid_data,
          correcting_fields: correctionState.invalid_fields.map(
            (field: any) => field.field || field.field_description
          )
        };
        
        console.log('🔄 Enviando corrección con contexto:', requestPayload.correction_context);
      }

      const response = await fetch('http://localhost:8001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestPayload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      // Actualizar historial de conversación
      if (data.conversation_history) {
        setConversationHistory(data.conversation_history);
      }

      // Actualizar estados básicos
      if (data.current_state || data.conversation_id) {
        setCurrentState(data.current_state);
        setConversationId(data.conversation_id);
      }

      // Manejar estado de corrección experto
      if (data.status === 'awaiting_corrections' && data.missing_or_invalid_fields) {
        setCorrectionState({
          awaiting_corrections: true,
          valid_data: data.data || {},
          invalid_fields: data.missing_or_invalid_fields || [],
          status: data.status
        });
        console.log('❌ Errores detectados:', data.missing_or_invalid_fields);
      } else if (data.status === 'validated_complete' || data.ready_for_calculation) {
        setCorrectionState(null);
        console.log('✅ Validación completa');
        
        if (data.ready_for_calculation && data.data) {
          console.log('🎉 Datos listos para cálculo:', data.data);
          toast.success('All data validated successfully!');
        }
      } else if (data.status === 'awaiting_missing_data' && data.missing_or_invalid_fields) {
        setCorrectionState({
          awaiting_corrections: true,
          valid_data: data.data || {},
          invalid_fields: data.missing_or_invalid_fields || [],
          status: data.status
        });
        console.log('⚠️ Datos faltantes');
      }

      return data;
    } catch (error) {
      console.error('Error calling API:', error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !roiSystem || !roiType) return;

    const userMessage: Message = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await sendMessageToAPI(message);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.response || 'Thank you for your message. I will help you with the ROI analysis.',
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
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

  const handleClearChat = () => {
    setMessages([]);
    setConversationHistory([]);
    setConversationId(null);
    setCorrectionState(null);
    setCurrentState(null);
    toast.success('Chat cleared');
  };

  // Renderizar indicador de corrección
  const renderCorrectionIndicator = () => {
    if (!correctionState?.awaiting_corrections) return null;

    return (
      <div className="mb-4 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <span className="text-orange-800 dark:text-orange-400 font-medium">
            Correction Mode:
          </span>
          <span className="text-orange-700 dark:text-orange-300">
            {correctionState.invalid_fields.length} field(s) pending
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 h-[calc(100vh-8rem)]">
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
        
        {messages.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleClearChat}>
            Clear Chat
          </Button>
        )}
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

        {/* Indicador de corrección */}
        {renderCorrectionIndicator()}

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
                className={`max-w-[70%] rounded-xl p-4 whitespace-pre-wrap ${
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
          
          <div ref={messagesEndRef} />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleEstimateTCO}
              className="flex-1"
              disabled={isLoading}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Estimate the current TCO of the process
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCreateProposal}
              className="flex-1"
              disabled={isLoading}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Estimate TCO & create a technical / financial proposal
            </Button>
          </div>

          <div className="relative">
            <Textarea
              placeholder={
                correctionState?.awaiting_corrections
                  ? 'Send only the corrected value...'
                  : 'write the general process description'
              }
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
              className={`absolute bottom-3 right-3 ${
                correctionState?.awaiting_corrections ? 'bg-orange-600 hover:bg-orange-700' : ''
              }`}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Info de estado */}
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>
              {conversationHistory.length > 0 && `Messages: ${conversationHistory.length}`}
            </span>
            
            {correctionState?.awaiting_corrections && (
              <span className="text-orange-600 font-medium">
                Correcting {correctionState.invalid_fields.length} field(s)
              </span>
            )}
            
            {conversationId && (
              <span>ID: {conversationId}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}