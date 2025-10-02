// Service layer for ROI-related API calls
export interface SystemConfig {
  system: string;
  type: 'beginner' | 'expert';
  dimensions: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class RoiService {
  private baseUrl = '/api'; // Update with your actual backend URL

  async sendChatMessage(message: string, config: SystemConfig): Promise<ChatMessage> {
    // This will be connected to your backend
    // For now, it's a placeholder structure
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        system: config.system,
        type: config.type,
        dimensions: config.dimensions,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  }

  async estimateTCO(processDescription: string, config: SystemConfig): Promise<any> {
    const response = await fetch(`${this.baseUrl}/estimate-tco`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        processDescription,
        system: config.system,
        type: config.type,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to estimate TCO');
    }

    return response.json();
  }

  async createProposal(processDescription: string, config: SystemConfig): Promise<any> {
    const response = await fetch(`${this.baseUrl}/create-proposal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        processDescription,
        system: config.system,
        type: config.type,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create proposal');
    }

    return response.json();
  }
}

export const roiService = new RoiService();
