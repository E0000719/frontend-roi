import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Send, Sparkles, Bot, AlertCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getRoiSystem, getRoiType, getRoiDimensions } from '@/utils/sessionStorage';
import { toast } from 'sonner';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

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

interface CorrectionState {
  awaiting_corrections: boolean;
  valid_data: any;
  invalid_fields: any[];
  status: string;
}

interface ROICalculationResult {
  success: boolean;
  system: string;
  summary_text: string;
  calculation_details?: string;
  tco_global: {
    current_tco: number;
    future_tco: number;
    roi_total: number;
    roi_percentage: number;
    payback_months?: number;
  };
  dimensions: Array<{
    dimension_id: string;
    dimension_name: string;
    current_tco: number;
    future_tco: number;
    roi: number;
    ia_improvement_factor: number;
    impacto_ia: number;
    impact_percentage: number;
    description?: string;
  }>;
  metadata?: any;
}

export default function ChatInterface() {
  const { system } = useParams<{ system: string }>();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Estados para agentes
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [correctionState, setCorrectionState] = useState<CorrectionState | null>(null);
  const [currentState, setCurrentState] = useState<any>(null);

  // 🆕 Estados para cálculo ROI
  const [isCalculating, setIsCalculating] = useState(false);
  const [showCalculateButton, setShowCalculateButton] = useState(false);
  const [collectedData, setCollectedData] = useState<any>(null);

  const roiSystem = getRoiSystem();
  const roiType = getRoiType();
  const dimensions = getRoiDimensions();

  useEffect(() => {
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
      let requestPayload: any = {
        message: messageText,
        system: roiSystem || 'legacy_takeover',
        conversation_history: conversationHistory,
        user_type: roiType === 'expert' ? 'expert' : 'beginner',
        current_state: currentState,
        conversation_id: conversationId
      };

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

      if (data.conversation_history) {
        setConversationHistory(data.conversation_history);
      }

      if (data.current_state || data.conversation_id) {
        setCurrentState(data.current_state);
        setConversationId(data.conversation_id);
      }

      // 🆕 Detectar si la recopilación está completa
      if (data.status === 'completed' || data.status === 'data_completed' || data.status === 'validated_complete') {
        console.log('✅ Datos completos detectados');
        
        let dataToSave = null;
        
        if (roiType === 'beginner' && data.current_state?.collected_data) {
          // Agente guiado
          dataToSave = data.current_state.collected_data;
          console.log('📊 Datos del agente guiado:', dataToSave);
        } else if (roiType === 'expert' && data.data) {
          // Agente experto
          dataToSave = data.data;
          console.log('📊 Datos del agente experto:', dataToSave);
        }
        
        if (dataToSave) {
          setCollectedData(dataToSave);
          setShowCalculateButton(true);
          
          // Guardar en sessionStorage inmediatamente
          sessionStorage.setItem('collectedData', JSON.stringify(dataToSave));
          console.log('💾 Datos guardados en sessionStorage');
          
          toast.success('All data collected! Ready to calculate ROI.');
        }
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
      
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending message:', error);
      
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, there was an error processing your message. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
      
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    } finally {
      setIsLoading(false);
    }
  };

  // 🆕 Función para calcular ROI
  const handleCalculateROI = async () => {
    if (!collectedData || !roiSystem) {
      toast.error('No data available for calculation');
      return;
    }

    setIsCalculating(true);
    
    try {
      console.log('🧮 Iniciando cálculo ROI...');
      console.log('📊 Datos a enviar:', collectedData);

      const response = await fetch('http://localhost:8001/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system: roiSystem,
          collected_data: collectedData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const calculationResult: ROICalculationResult = await response.json();

      if (!calculationResult.success) {
        throw new Error(calculationResult.metadata?.error || 'Calculation failed');
      }

      console.log('✅ Cálculo completado:', calculationResult);

      // 💾 Guardar resultados en sessionStorage
      sessionStorage.setItem('calculationData', JSON.stringify(calculationResult));
      console.log('💾 Resultados guardados en sessionStorage');

      // 🎉 Mostrar toast de éxito
      toast.success('ROI calculation completed successfully!');

      // 🔄 Redirigir a la pantalla de overview
      setTimeout(() => {
        navigate(`/roi-business-case/${system}/overview`);
      }, 500);

    } catch (error) {
      console.error('❌ Error calculando ROI:', error);
      toast.error('Failed to calculate ROI. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    setConversationHistory([]);
    setConversationId(null);
    setCorrectionState(null);
    setCurrentState(null);
    setShowCalculateButton(false);
    setCollectedData(null);
    
    // Limpiar solo el chat, NO los resultados
    sessionStorage.removeItem('collectedData');
    
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

        {/* 🆕 Botón Calculate ROI - Aparece cuando los datos están completos */}
        {showCalculateButton && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-400">
                    Data collection completed!
                  </p>
                  <p className="text-xs text-green-700 dark:text-green-300">
                    All required data has been collected and validated
                  </p>
                </div>
              </div>
              <Button
                onClick={handleCalculateROI}
                disabled={isCalculating}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isCalculating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Calculating...
                  </>
                ) : (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate ROI
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

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
          <div className="relative">
            <Textarea
              ref={textareaRef}
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
              disabled={isLoading || isCalculating}
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading || isCalculating}
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
            
            {showCalculateButton && !isCalculating && (
              <span className="text-green-600 font-medium">
                ✓ Ready to calculate
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