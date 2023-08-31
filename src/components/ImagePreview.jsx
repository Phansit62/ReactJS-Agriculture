import React, { useEffect, useState } from "react";

const ImagePreview = ({ onChange, values, onDelete, mode }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [OldImage, setOldImage] = useState([]);
  const handleImageChange = (event) => {
    const files = event.target.files;
    const imageFiles = Array.from(files);
    const imagePreviews = [];

    imageFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        imagePreviews.push(reader.result);
        if (imagePreviews.length === imageFiles.length) {
          setPreviewImages(imagePreviews);
        }
      };

      reader.readAsDataURL(file);
    });

    onChange(imageFiles);
  };

  const handleDeleteImage = (index) => {
    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
  };

  const handleDeleteImageOld = (id, index) => {
    const updatedPreviews = [...OldImage];
    updatedPreviews.splice(index, 1);
    setOldImage(updatedPreviews);
    onDelete(id);
  };

  useEffect(() => {
    if (values && values.length > 0) {
      setOldImage(values);
    }
  }, [values]);

  return (
    <div>
      {mode === "single" ? <input type="file" onChange={handleImageChange} /> : <input type="file" onChange={handleImageChange} multiple />}
      <div className="flex space-x-2 mt-5">
        {previewImages.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt={`Preview ${index + 1}`} />
            <button className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" onClick={() => handleDeleteImage(index)}>
              X
            </button>
          </div>
        ))}
        {mode === "single"
          ? OldImage && previewImages.length === 0 &&
            OldImage.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview} alt={`PreviewOld ${index + 1}`} />
              </div>
            ))
          : OldImage &&
            OldImage.map((preview, index) => (
              <div key={index} className="relative">
                <img src={preview.path} alt={`PreviewOld ${index + 1}`} />
                <button className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center" onClick={() => handleDeleteImageOld(preview.id, index)}>
                  X
                </button>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ImagePreview;
