import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch data from server" + err, { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> => {
  try {
    const { prompt, tag } = await req.json();

    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt Not Found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Error updating prompt" + err, { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (err) {
    return new Response("Error Deleting Prompt" + err, { status: 500 });
  }
};
