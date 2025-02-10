import fs from "fs";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import dotenv from 'dotenv';

dotenv.config();

async function setupVectorStore() {

    const supabase_url = process.env.SUPABASE_URL;
    const supabase_key = process.env.supabase_key;
    console.log(supabase_url, supabase_key);
    const supabase = createClient(supabase_url, supabase_key);


    const loader = new TextLoader("knowledge.txt");
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 0,
      });
    const chunkedTexts = await textSplitter.splitDocuments(docs);
    // const contents =  chunkedTexts.map(docs => docs.pageContent);
    console.log(chunkedTexts);
    const embeddings = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
    });
    
    const vectorStore = new SupabaseVectorStore(embeddings, {
        client: supabase,
        tableName: "documents",
        queryName: "match_documents",
    });
    await vectorStore.addDocuments(chunkedTexts);
}



async function signInWithMagicLink() {
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event == 'SIGNED_IN') {

        } else if (event == 'SIGNED_OUT') {
            const { error } = await supabase.auth.signInWithOtp({
                email: "hazelwjy@outlook.com",
            });
            
        }
    });
   
}



setupVectorStore();