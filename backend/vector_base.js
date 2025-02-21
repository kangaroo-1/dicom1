import fs from "fs";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";
import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import dotenv from 'dotenv';

dotenv.config();

class SupabaseVectorStoreSingleton {
    constructor() {
      if (!SupabaseVectorStoreSingleton.instance) {
        const supabase_url = process.env.SUPABASE_URL;
        const supabase_key = process.env.supabase_key;
        const supabase = createClient(supabase_url, supabase_key);
  
        const loader = new TextLoader("knowledge.txt");
        const docs = loader.load(); // You can adjust this part as needed
        const textSplitter = new RecursiveCharacterTextSplitter({
          chunkSize: 100,
          chunkOverlap: 0,
        });
        const chunkedTexts = textSplitter.splitDocuments(docs);
  
        const embeddings = new HuggingFaceTransformersEmbeddings({
          model: "Xenova/all-MiniLM-L6-v2",
        });
  
        const vectorStore = new SupabaseVectorStore(embeddings, {
          client: supabase,
          tableName: "documents",
          queryName: "match_documents",
        });
  
        // Add documents only once when the vector store is initialized
        vectorStore.addDocuments(chunkedTexts);
  
        SupabaseVectorStoreSingleton.instance = vectorStore;
      }
  
      return SupabaseVectorStoreSingleton.instance;
    }
  
    // Query the vector store
    async queryVector(query, topK = 1) {
      const vectorStore = SupabaseVectorStoreSingleton.instance;
      const results = await vectorStore.similaritySearch(query, topK);
      return results;
    }
}



const instance = new SupabaseVectorStoreSingleton();
Object.freeze(instance);
export default instance;









// async function setupVectorStore() {

//     const supabase_url = process.env.SUPABASE_URL;
//     const supabase_key = process.env.supabase_key;
//     console.log(supabase_url, supabase_key);
//     const supabase = createClient(supabase_url, supabase_key);


//     const loader = new TextLoader("knowledge.txt");
//     const docs = await loader.load();
//     const textSplitter = new RecursiveCharacterTextSplitter({
//         chunkSize: 100,
//         chunkOverlap: 0,
//       });
//     const chunkedTexts = await textSplitter.splitDocuments(docs);
//     // const contents =  chunkedTexts.map(docs => docs.pageContent);
//     // console.log(chunkedTexts);
//     const embeddings = new HuggingFaceTransformersEmbeddings({
//         model: "Xenova/all-MiniLM-L6-v2",
//     });
    
//     const vectorStore = new SupabaseVectorStore(embeddings, {
//         client: supabase,
//         tableName: "documents",
//         queryName: "match_documents",
//     });
//     await vectorStore.addDocuments(chunkedTexts);

//     const similaritySearchResults = await vectorStore.similaritySearch(
//         "NM",
//         1,
//     );
//     const content = similaritySearchResults[0].pageContent;
//     console.log(content)
// }



// async function signInWithMagicLink() {
//     const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
//         if (event == 'SIGNED_IN') {

//         } else if (event == 'SIGNED_OUT') {
//             const { error } = await supabase.auth.signInWithOtp({
//                 email: "hazelwjy@outlook.com",
//             });
            
//         }
//     });
   
// }


// async function queryVectorBase(query) {
    
// }




// setupVectorStore();