import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (
  request: Request,
  context: { params: Promise<{ id: string }>}
) => {
  try {
    await connectToDB();
    const { id } = await context.params;

    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    console.error("Error fetching prompts:", err);
    return new Response("Failed to fetch data from server", { status: 500 });
  }
};
