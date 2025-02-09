import fs from "fs";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/huggingface_transformers";


async function setupVectorStore() {
    const loader = new TextLoader("knowledge.txt");
    const docs = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 0,
      });
    const chunkedTexts = await textSplitter.splitDocuments(docs);
    const contents =  chunkedTexts.map(docs => docs.pageContent);
    console.log(contents);
    const model = new HuggingFaceTransformersEmbeddings({
        model: "Xenova/all-MiniLM-L6-v2",
    });
    const documentRes = await model.embedDocuments(contents);
}




setupVectorStore();