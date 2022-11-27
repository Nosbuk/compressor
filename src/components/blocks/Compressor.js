import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];

export const Compressor = () => {
  const [files, setFiles] = useState([]);
  const handleChange = (files) => {
    setFiles((prev) => [files, ...prev]);
  };
  console.log(files);
  return (
    <main className="max-w-6xl mx-auto mt-12">
      <FileUploader
        label="Drop images here or click to browse"
        handleChange={handleChange}
        multiple
        name="files"
        types={fileTypes}
      />
      <div>
        {files.fileList.map((file) => (
          <>{file.name}</>
        ))}
      </div>
    </main>
  );
};
