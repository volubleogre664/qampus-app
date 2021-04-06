export default function getCroppedImg({ image, crop, fileName }) {
  // console.log("\nImage");
  // console.log(image);
  // console.log("\nCrop");
  // console.log(crop);
  // console.log("\nFileName");
  // console.log(fileName);
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  let fileUrl = undefined;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error("Canvas is empty");
        return;
      }
      blob.name = fileName;
      window.URL.revokeObjectURL(fileUrl);
      fileUrl = window.URL.createObjectURL(blob);
      resolve(fileUrl);
    }, "image/webp");
  });
}
