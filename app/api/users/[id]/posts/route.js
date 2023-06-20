import { connectToDB } from "@utils/dbConnection";
import Prompt from "@models/prompt";
import { Schema } from "mongoose";

export const GET = async (req, {params}, res) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(prompts), {status: 200})
    } catch (error) {
       console.log("Error in getting prompts for a user", error); 
       return new Response("failed to get Prompts for this user", {status: 500})
    }
}