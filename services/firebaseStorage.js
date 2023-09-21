import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";

export const uploadToStorage = async (fileUri, refName) => {
  // uploading the image to firestore

  console.log("busy uploading...");
  const blob = await new Promise((resolve, reject) => {
    // blob short for image, bytes
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", fileUri, true); //open the files location path
    xhr.send(null);
  });

  const uploadRef = ref(storage, refName);

  const uploadResult = await uploadBytes(uploadRef, blob);

  blob.close();

  return getDownloadURL(uploadRef);
};
