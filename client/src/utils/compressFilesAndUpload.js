import Compressor from "compressorjs";

// Compress Images and upload them to cloud storage
function compressAndUpload(file, cloudStorageRef) {
  // Compressing the file and upload it in the async success hook
  return new Promise(function (resolve, reject) {
    new Compressor(file, {
      quality: 0.2,
      async success(result) {
        await cloudStorageRef
          .put(result)
          .then(() => {
            resolve("Done");
            console.log("File uploaded");
          })
          .catch((err) => {
            reject("Failed to upload image");
            console.log("Failed to upload Image to cloud", err);
          });
      },
      error(err) {
        reject("done");
        console.log(err.message);
      },
    });
  });
}

export default compressAndUpload;
