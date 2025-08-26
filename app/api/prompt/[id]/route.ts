import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try{
        await connectToDB()
        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompt) return new Response("Prompt not found", {status: 404})

        return new Response(JSON.stringify(prompts), {status: 200})
    }catch(err){
        return new Response("Failed to fetch data from server", {status: 500})
    }
}


export const PATCH = async (req, {params}) => {
    const {prompt, tag} = req.json()

    try{
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if(!existingPrompt) return new Response("Prompt Not Found", { status: 404 })
            
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), {status: 200})

    }catch(err){
        return new Response("Error", {status: 500})
    }
}

export const DELETE = async (req, {param}) => {
    try{
        await connectToDB()

        await Prompt.findByIdAndDelete(param.id)

        return new Response("Prompt deleted successfully", {status: 200})

    }catch(err){
        return new Response("Error Deleting Prompt", {status: 500})
    }
}

