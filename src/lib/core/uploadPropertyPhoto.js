import { supabase } from "../supabase";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export async function uploadPropertyPhoto(file, userId) {
  if (!(file instanceof File)) {
    throw new Error("Please select a valid image.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images are allowed.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Each image must be smaller than 2MB.");
  }

  if (!userId) {
    throw new Error("User ID is required.");
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";

  const uniqueId = crypto.randomUUID();

  const filePath = `${userId}/${uniqueId}.${extension}`;

  console.log("Uploading property image:", {
    userId,
    filePath,
    type: file.type,
    size: file.size,
  });

  const { error } = await supabase.storage
    .from("properties")
    .upload(filePath, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Supabase property upload error:", error);

    throw new Error(`Image upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from("properties").getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new Error("Could not generate the image public URL.");
  }

  return data.publicUrl;
}
