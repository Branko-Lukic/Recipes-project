import React, { useEffect, useState } from "react";
import { storage } from "../../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const useUploadImage = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((res) => {
      getDownloadURL(res.ref).then((url) => setImageURL(url));
    });
  }, [imageUpload]);

  return [imageURL, setImageUpload];
};
