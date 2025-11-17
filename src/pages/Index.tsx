import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatMessage } from '@/components/ChatMessage';
import { PlayTable } from '@/components/PlayTable';
import { ThoughtLoader } from '@/components/ThoughtLoader';
import { useToast } from '@/hooks/use-toast';
import { Send, Sparkles } from 'lucide-react';

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
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm bg-background/80 px-6 py-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NFL Play Analyzer
            </h1>
            <p className="text-sm text-muted-foreground">Ask about NFL plays, players, and statistics</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center max-w-2xl animate-fade-in">
              <div className="mb-6">
                <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                  <Sparkles className="h-12 w-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome to NFL Play Analyzer
                </h2>
                <p className="text-muted-foreground">
                  Ask me about any NFL plays, touchdowns, or player statistics
                </p>
              </div>
              <div className="grid gap-3">
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-4 px-5 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  onClick={() => setInput("Show me all touchdown plays by Tyreek Hill in 2023.")}
                >
                  <span className="text-sm group-hover:text-primary transition-colors">
                    Show me all touchdown plays by Tyreek Hill in 2023.
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-4 px-5 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  onClick={() => setInput("Find all plays by Patrick Mahomes where he gained more than 20 yards.")}
                >
                  <span className="text-sm group-hover:text-primary transition-colors">
                    Find all plays by Patrick Mahomes where he gained more than 20 yards.
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-4 px-5 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  onClick={() => setInput("List all rushing touchdowns in the 2023 season.")}
                >
                  <span className="text-sm group-hover:text-primary transition-colors">
                    List all rushing touchdowns in the 2023 season.
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-4 px-5 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  onClick={() => setInput("Show me all interceptions thrown by quarterbacks in 2023.")}
                >
                  <span className="text-sm group-hover:text-primary transition-colors">
                    Show me all interceptions thrown by quarterbacks in 2023.
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="text-left justify-start h-auto py-4 px-5 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  onClick={() => setInput("Find all defensive plays recorded by Micah Parsons or T.J. Watt.")}
                >
                  <span className="text-sm group-hover:text-primary transition-colors">
                    Find all defensive plays recorded by Micah Parsons or T.J. Watt.
                  </span>
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
            {isLoading && <ThoughtLoader />}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border/50 backdrop-blur-sm bg-background/80 px-6 py-5">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about NFL plays..."
            disabled={isLoading}
            className="flex-1 h-12 px-4 bg-background border-border/50 focus-visible:ring-primary/50 transition-all duration-300"
          />
          <Button 
            onClick={handleSend} 
            disabled={isLoading || !input.trim()}
            className="h-12 px-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
