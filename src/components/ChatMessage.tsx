interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div
        className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
          role === 'user'
            ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-primary/20'
            : 'bg-card border border-border/50 text-card-foreground'
        }`}
      >
        <p className="text-sm leading-relaxed">{content}</p>
      </div>
    </div>
  );
};
