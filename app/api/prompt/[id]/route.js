import { connectToDB } from "@utils/dbConnection";
import Prompt from "@models/prompt";
// GET (read)

export const GET = async (req, {params}, res) => {
 try {
    await connectToDB();
   const prompt = await Prompt.findById(params.id).populate('creator');
   
   if(!prompt) {
    return new Response("Prompt not found", {status: 400});
   }

   return new Response(JSON.stringify(prompt), {status: 200})
 } catch (error) {
    console.log("Error in getting specific prompt", error);
    return new Response("failed to get the prompt", {status: 500})
 }
}

//PATCH (update)
export const PATCH = async (req, {params}, res) => {
    const {prompt, tag} = await req.json();

    console.log("Cheking prompt and tag in tge req", prompt, tag);

    try {
        await connectToDB();

        let existingPrompt = await Prompt.findById(params.id);
        console.log("checking the prompt data already there in the db", existingPrompt);
        if(!existingPrompt) {
            return new Response("Prompt not found", {status: 400});
        }
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status: 200});
    } catch (error) {
        console.log("Error in updating prompt", error)
        return new Response("failed to update a prompt", {status: 500});
    }
}
//DELETE (delete)

export const DELETE = async (req, {params}, res) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deletede successfully from DB", {status: 200})
    } catch (error) {
        console.log('Checking Error in deleting prompt', error);
        return new Response("Failed to delete Prompt from DB", {status: 500});
    }
}