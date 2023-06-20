import Prompt from "@models/prompt";
import { connectToDB } from "@utils/dbConnection";

export const POST = async (req, res) => {
    const {userId, prompt, tag} = await req.json();

    try {
        await connectToDB();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        console.log('Error in creating prompt in DB', error);
        return new Response("failed to create a prompt", {status: 500});
    }
}