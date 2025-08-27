import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET /api/prompt/[id]
export const GET = async (
  request: Request,
  context: { params: Promise<{ id: string }>}
) =>  {
  try {
    await connectToDB();
    const {id} = await context.params
    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch data from server: " + err, { status: 500 });
  }
};

// PATCH /api/prompt/[id]
export const PATCH = async (
  request: Request,
    context: { params: Promise<{ id: string }>}
) =>  {
  try {
    const { prompt, tag } = await request.json();

    await connectToDB();
    const {id} = await context.params

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Error updating prompt: " + err, { status: 500 });
  }
};

// DELETE /api/prompt/[id]
export const DELETE = async (
  request: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    await connectToDB();
    const {id} = await context.params
    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Error Deleting Prompt: " + err, { status: 500 });
  }
};
