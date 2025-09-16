const upload = async (file) => {
  const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();


    if (data.success) {
      return data.data.image.url;

    } else {
      throw new Error("Upload failed: " + data.error.message);
    }
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
export default upload;