const baseUrl = process.env.NEXT_PUBLIC_URL;

export const serverPost = async (path, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};
