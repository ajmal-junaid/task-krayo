import React, { useState } from "react";
import instance from "../utils/axios";
import Swal from "sweetalert2";
import {
  FaFilePdf,
  FaFileImage,
  FaFileAudio,
  FaFileVideo,
  FaDownload,
  FaFile,
} from "react-icons/fa";

const Myfiles = ({ fileList }) => {
  const [download, setDownload] = useState("");
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop();
    switch (ext) {
      case "pdf":
        return <FaFilePdf size={20} className="text-red-600" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage size={20} className="text-blue-600" />;
      case "mp3":
      case "wav":
        return <FaFileAudio size={20} className="text-yellow-600" />;
      case "mp4":
      case "avi":
        return <FaFileVideo size={20} className="text-purple-600" />;
      default:
        return <FaFile size={20} className="text-gray-600" />;
    }
  };
  const handleDownload = (type, key, ogName) => {
    instance
      .post("/download-file", { mimetype: type, key: key }, { headers })
      .then((res) => {
        const url = res.data.data;
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", ogName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        setDownload("");
        console.log("err", err);
      });
  };
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h1 className="text-gray-800 text-2xl font-bold py-4 px-6">User Files</h1>
      <p className="text-gray-600 text-sm px-6 pb-4">
        Below are the files uploaded by the user.
      </p>
      <ul className="divide-y divide-gray-200">
        {fileList && fileList.map((file, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-3 px-4 hover:bg-gray-100"
          >
            <div className="flex items-center">
              <span className="text-gray-800 mr-3">
                {getFileIcon(file.originalname)}
              </span>
              <span className="text-gray-800">{file.originalname}</span>
            </div>
            <span className="text-gray-800">
              {Math.round(file.size / 1024)} KB
            </span>
            <a
              className="text-gray-500 hover:text-gray-800"
              onClick={() =>
                handleDownload(file.mimetype, file.key, file.originalname)
              }
            >
              <FaDownload size={20} className="fill-current" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Myfiles;
