export const checkImage = (file: File) => {
  const types = ["image/png", "image/jpeg"];
  let err = "";

  if (!file) return (err = "File não existe.");

  if (file.size > 1024 * 1024) err = "Permitido imagens até 1mb";

  if (!types.includes(file.type)) err = "A imagem aceita tipos png e jpeg.";

  return err;
};

export const imageUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ctifspyc");
  formData.append("cloud_name", "fanime");

  const res = await fetch("https://api.cloudinary.com/v1_1/fanime/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return { public_id: data.public_id, url: data.secure_url };
};
