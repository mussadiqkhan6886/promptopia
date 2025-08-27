import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "@node_modules/next/server";

interface RouteParams {
  params: {
    id: string;
  };
}

export const GET = async (
  req: NextRequest,
  { params }: RouteParams
): Promise<Response> => {
  try {
    await connectToDB();

    const { id } = await params

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch data from server", { status: 500 });
  }
};

export const PATCH = async (req: NextRequest,
  { params }: RouteParams
): Promise<Response> => {
  try {
    const { prompt, tag } = await req.json();

    await connectToDB();

    const { id } = await params 

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Error updating prompt", { status: 500 });
  }
};

export const DELETE = async (req: NextRequest,
  { params }: RouteParams
): Promise<Response> => {
  try {
    await connectToDB();

    const { id } = await params

    await Prompt.findByIdAndDelete(id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Error Deleting Prompt", { status: 500 });
  }
};
