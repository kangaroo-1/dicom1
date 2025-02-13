"use client"
import { useEffect, useState } from "react";
import {supabase} from '../supabaseClient.js'
import ChatMessage from "@/components/chatbox/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from 'lucide-react';
import { Trash } from 'lucide-react';


function ChatboxPage() {
    const [messages, setMessages] = useState<Message[] | null>([]);
    const [isLoading, setLoading] = useState();
    useEffect(() => {
        const fetchMessages = async() => {
            const { data, error } = await supabase
                .from("messages")
                .select("*")
                .order("created_at", { ascending: true });
            if (data?.length === 0) {
                    // Set initial message if no chat history exists
                setMessages(
                    [
                    { id: 1, role: "assistant", content: "Hello! How can I help you today?", created_at: new Date().toISOString()},
                    { id: 2, role: "user", content: "hi, im the user", created_at: new Date().toISOString()}
                ]);
            } else {
                    setMessages(data);
            }
        }

        fetchMessages();
       

    },[])






    return (
        <div className='flex flex-col bg-slate-100'>
            {/* display chat  */}
            <div className="mt-3 h-full overflow-y-auto px-3">
                {messages?.map((msg) => (
                    <ChatMessage 
                        key={msg.id}
                        message={{
                            role: msg.role,
                            content: msg.content
                    }} />
                ))}
            </div>

            {/* chat input */}
            <div className="flex">
                <Button variant="ghost" className="">
                    <Trash />
                </Button>

                <Input 
                    className="grow border rounded bg-background"
                    placeholder="say something..."
                />
                <Button variant="ghost" disabled={isLoading || messages?.length == 0}>
                    <SendHorizontal size={50}/>
                </Button>
            </div>
        </div>
    )
}

export default ChatboxPage






type Message = {
    id: number;
    role:string;
    content:string;
    created_at: string;
}
