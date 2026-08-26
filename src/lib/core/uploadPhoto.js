import { supabase } from "../supabase";

export async function uploadPhoto(file, userId) {
  if (!(file instanceof File)) {
    throw new Error("Please select a valid image.");
  }

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WebP images are allowed.");
  }

  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Image must be smaller than 5MB.");
  }

  const extension = file.name
    .split(".")
    .pop()
    ?.toLowerCase();

  const filePath = `users/${userId}/profile.${extension}`;

  const { error } = await supabase.storage
    .from("avatar")
    .upload(filePath, file, {
      contentType: file.type,
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Supabase upload error:", error);

    throw new Error(
      `Image upload failed: ${error.message}`
    );
  }

  const { data } = supabase.storage
    .from("avatar")
    .getPublicUrl(filePath);

  if (!data?.publicUrl) {
    throw new Error("Could not generate image URL.");
  }

  return data.publicUrl;
}