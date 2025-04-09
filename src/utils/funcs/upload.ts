export const getExtension = (file: File) => {
  const fileName = file.name;
  const extension = fileName.split(".").pop()?.toLowerCase() || "";
  return extension;
};
