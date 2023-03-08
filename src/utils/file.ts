export const calculateSize = (img: any, maxWidth: number, maxHeight: number) => {
  let width = img.width;
  let height = img.height;

  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }

  return [width, height];
};

export const compressImage = async (image: any, {
  maxWidth = 320,
  maxHeight = 180,
  quality = 0.8,
  type = image.type
}) => {
  const imageBitmap = await createImageBitmap(image);
  const [newWidth, newHeight] = calculateSize(imageBitmap, maxWidth, maxHeight);
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(imageBitmap, 0, 0, newWidth, newHeight);

  return await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
};