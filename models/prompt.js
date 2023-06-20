import {Schema, model, models} from 'mongoose';

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User Id is a required field to create prompt"]
    },
    prompt: {
        type: String,
        required: [true, "Prompt is a required feild"]
    },
    tag: {
        type: String,
        required: [true, "Tag is a required field"]
    }
});

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;