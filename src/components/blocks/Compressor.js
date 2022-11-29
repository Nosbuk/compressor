import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import imageCompression from "browser-image-compression";
import multiDownload from "multi-download";
import { FileDropDown } from "../elements/FileDropDown";
import Slider from "react-input-slider";

const fileTypes = ["JPG", "PNG", "GIF", "JFIF"];
const nameRegex = /\.\w+/i;
export const Compressor = () => {
  const [files, setFiles] = useState([]);
  const [compressedFiles, setCompressedFiles] = useState([]);
  const [compressedFileSize, setCompressedFileSize] = useState(200);

  const compressionOptions = {
    useWebWorker: true,
    maxSizeMB: compressedFileSize / 1000,
    maxIteration: 2000,
  };

  const handleChange = (files) => {
    setFiles((prev) => (prev ? [...files, ...prev] : [...files]));
  };

  const handleCompress = () => {
    Promise.all(
      files.map((file) => imageCompression(file, compressionOptions).then((file) => file))
    ).then((result) => setCompressedFiles(result));
  };

  const handleDownload = () => {
    multiDownload(
      compressedFiles.map((file) => URL.createObjectURL(file)),
      {
        rename: ({ url, index, urls }) => `${files[index].name.replace(nameRegex, "")}_COMPRESSED`,
      }
    );
  };
  return (
    <main className="w-full max-w-6xl mx-auto mt-4 px-5 flex flex-col items-center">
      <div className="flex justify-between my-6 w-full max-w-[503px]">
        <button
          className="bg-blue-700 text-white text-xl py-4 px-10 rounded-full shadow-xl"
          onClick={handleCompress}
        >
          Compress
        </button>
        <button
          className="bg-blue-700 text-white text-xl py-4 px-10 rounded-full shadow-xl"
          disabled={!compressedFiles}
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
      <span>Max file size after compression: {compressedFileSize} KB</span>
      <Slider
        axis="x"
        x={compressedFileSize}
        onChange={({ x }) => setCompressedFileSize(x)}
        xmin={10}
        xmax={1500}
        styles={{
          track: {
            width: 400,
            height: 20,
            marginTop: 20,
            borderRadius: 50,
          },
          active: {
            borderRadius: 50,
          },
          thumb: {
            width: 30,
            height: 30,
            backgroundColor: "#bfdbfe",
          },
        }}
      />
      <FileUploader
        label="Drop images here or click to browse"
        handleChange={handleChange}
        multiple
        name="files"
        types={fileTypes}
        children={<FileDropDown />}
      />
      <div className="flex justify-between w-full mt-10">
        <div className="flex flex-col items-center w-2/5">
          {files.map((file, index) => (
            <div key={index} className="w-100 bg-gray-100 p-8 m-4 rounded-2xl w-full">
              <img src={URL.createObjectURL(file)} className="w-full" />
              <h1 className="text-center mt-2">{file.name.replace(nameRegex, "")}</h1>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center w-2/5">
          {compressedFiles.map((file, index) => (
            <div key={index} className="w-100 bg-gray-100 p-8 m-4 rounded-2xl w-full">
              <img key={index} src={URL.createObjectURL(file)} className="w-full" />
              <h1 className="text-center mt-2">{file.name.replace(nameRegex, "_COMPRESSED")}</h1>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
