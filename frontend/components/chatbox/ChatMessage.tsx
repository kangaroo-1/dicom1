interface ChatMessageProps {
    message: Message
}

type Message = {
    role:string,
    content:string
}

import { cn } from "@/lib/utils";
import { Bot } from 'lucide-react';
function ChatMessage({message:{role, content}}: ChatMessageProps) {
    const isAiMesssage = role === 'assistant';
    return (
        <div className={cn("mb-3 flex items-center", 
            isAiMesssage ? "me-5 justify-start" : "ms-5 justify-end"
        )}>
            {isAiMesssage && <Bot className="mr-2 flex-none"/>}
            <div className={cn(
                "rounded-md border px-3 py-2",
                isAiMesssage? "bg-background" : "bg-foreground text-background"
            )}>
                {content}
            </div>
        </div>
    )
}

export default ChatMessage



