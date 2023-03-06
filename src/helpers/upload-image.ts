import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env.mjs";

const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

const imageBaseUrl = `${env.SUPABASE_URL}/storage/v1/object/public/${env.SUPABASE_BUCKETNAME}`;

export async function uploadImage(imageURI: string) {
  const imageData = imageURI.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(imageData, "base64");
  const imageName = uuidv4();
  const imageUrl = imageBaseUrl + "/" + imageName;

  const { data, error } = await supabase.storage
    .from(env.SUPABASE_BUCKETNAME)
    .upload(imageName, imageBuffer, {
      cacheControl: "999999999",
    });
  console.info("data:", data, "err", error);
  return imageUrl;
}
