import { connectToDB } from "@utils/dbConnection";
import Prompt from "@models/prompt";


export const GET = async (req, res) => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate("creator");

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
        console.log("Error in fetching all Prompts in API", error);
        return new Response('Failed to fetch all prompts from DB', {status: 500})
    }
}