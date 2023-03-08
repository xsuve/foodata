export const calculateSize = (img: any, maxSize: number) => {
  let width = img.width;
  let height = img.height;
  
  if (width > height) {
    if (width > maxSize) {
      height = height * (maxSize / width);
      width = maxSize;
    }
  } else {
    if (height > maxSize) {
      width = width * (maxSize / height);
      height = maxSize;
    }
  }
  
  return [width, height];
};

const readFile = (file: any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
};

const readImage = (fileData: any) => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.src = fileData;
    img.onload = () => {
      resolve(img);
    };

    img.onerror = reject;
  });
};

export const resizeImage = async (file: any, {
  maxSize = 320,
  quality = 0.8,
  type = file.type
}) => {
  const fileData: any = await readFile(file);
  const img: any = await readImage(fileData);
  const [newWidth, newHeight] = calculateSize(img, maxSize);
  const canvas = document.createElement('canvas');
  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, newWidth, newHeight);

  return await new Promise((resolve) => canvas.toBlob(resolve, type, quality));
};