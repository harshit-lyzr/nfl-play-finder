import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/components/ChatMessage';
import { PlayTable } from '@/components/PlayTable';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  plays?: any[];
  query?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-PnO8PLVxE8ukLHaAVFQPbnlUYmkkEfXs',
        },
        body: JSON.stringify({
          user_id: 'harshit@lyzr.ai',
          agent_id: '691ad20566a08f7a747550d1',
          session_id: '691ad20566a08f7a747550d1-6cyi1aqprvb',
          message: userMessage,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      let plays: any[] = [];
      let responseText = data.response;

      // Try to parse the response as JSON if it contains results
      try {
        const parsedResponse = JSON.parse(data.response);
        if (parsedResponse.results) {
          plays = parsedResponse.results;
          responseText = parsedResponse.thought || 'Here are the results:';
        }
      } catch {
        // If parsing fails, use the response as-is
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: responseText, plays, query: userMessage },
      ]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get response from the chatbot',
        variant: 'destructive',
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h1 className="text-2xl font-bold text-foreground">NFL Play Analyzer</h1>
        <p className="text-sm text-muted-foreground">Ask about NFL plays, players, and statistics</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-2xl">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Welcome to NFL Play Analyzer
              </h2>
              <p className="text-muted-foreground mb-6">
                Ask me about any NFL plays, touchdowns, or player statistics
              </p>
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-3 px-4"
                  onClick={() => setInput("Show me all touchdown plays by Tyreek Hill in 2023.")}
                >
                  Show me all touchdown plays by Tyreek Hill in 2023.
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-3 px-4"
                  onClick={() => setInput("Find all plays by Patrick Mahomes where he gained more than 20 yards.")}
                >
                  Find all plays by Patrick Mahomes where he gained more than 20 yards.
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-3 px-4"
                  onClick={() => setInput("List all rushing touchdowns in the 2023 season.")}
                >
                  List all rushing touchdowns in the 2023 season.
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-3 px-4"
                  onClick={() => setInput("Show me all interceptions thrown by quarterbacks in 2023.")}
                >
                  Show me all interceptions thrown by quarterbacks in 2023.
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-3 px-4"
                  onClick={() => setInput("Find all defensive plays recorded by Micah Parsons or T.J. Watt.")}
                >
                  Find all defensive plays recorded by Micah Parsons or T.J. Watt.
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {messages.map((message, index) => (
              <div key={index}>
                <ChatMessage role={message.role} content={message.content} />
                {message.plays && message.plays.length > 0 && (
                  <PlayTable plays={message.plays} query={message.query} />
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border px-6 py-4">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about NFL plays..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
