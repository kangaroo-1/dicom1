"use client"
import { useEffect, useRef, useState } from "react";
import {supabase} from '../supabaseClient.js'
import ChatMessage from "@/components/chatbox/ChatMessage";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from 'lucide-react';
import { Trash } from 'lucide-react';
import axios from 'axios';

function ChatboxPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>("");
    const [isLoading, setLoading] = useState();
    const inputRef = useRef<HTMLInputElement>();
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const fetchMessages = async() => {
            const { data, error } = await supabase
                .from("messages")
                .select("*")
                .order("created_at", { ascending: true });
            if (data && data?.length === 0) {
                    // Set initial message if no chat history exists
                setMessages(
                [
                    { id: 1, role: "assistant", content: "Hello! How can I help you today?", created_at: new Date().toISOString()},
                    { id: 2, role: "user", content: "hi, im the user", created_at: new Date().toISOString()}
                ]);
            } else {
                    if (data!)
                    setMessages(data);
            }
        }

        fetchMessages();

        //real-time subscription
        const subscription = supabase.
                                channel('messages')
                                .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
                                    setMessages((prev) => [...prev, payload.new as Message]);
                                }).subscribe();
        return () => {
            supabase.removeChannel(subscription);
        };

    },[])

    useEffect(() => {
        // if (scrollRef.current) {
        //     scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        // }
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const handleSubmitMessage = async () => {
        if (!input?.trim()) return;
        const newMessage = {
            role: "user",  
            content: input,
          };
        try {
            console.log("handleSubmitMessage");
            // send msg to Supabase
            const { data, error } = await supabase
            .from("messages")
            .insert(newMessage);
            // send msg to backend through api route
            const llmResponse = await axios.post('http://localhost:3001/api/chat', {
                message: input
            });
            console.log(llmResponse);

            setInput("");
        } catch (error) {
            console.log("error")
        }

    };

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    return (
        <div className='flex flex-col bg-slate-100 h-screen'>
            {/* display chat  */}
            <div className="flex-grow h-full overflow-y-auto px-3">
                {messages?.map((msg) => (
                    <ChatMessage 
                        key={msg.id}
                        message={{
                            role: msg.role,
                            content: msg.content
                        }} />
                ))}
                <div ref={scrollRef} />
            </div>

            {/* chat input */}
            <div className="sticky bottom-0 flex items-center p-3" >
                <Button variant="ghost" className="">
                    <Trash />
                </Button>

                <Input 
                    onChange={(e) => handleInputChange(e)}
                    value={input}
                    className="grow border rounded bg-background"
                    placeholder="say something..."
                />
                <Button 
                    variant="ghost" 
                    onClick={handleSubmitMessage}
                    disabled={isLoading || messages?.length == 0}>
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
