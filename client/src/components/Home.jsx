import React, { useState } from "react";
import Swal from "sweetalert2";
import instance from "../utils/axios";
const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const formData = new FormData();

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileSubmit = () => {
    formData.append("file", selectedFile);
    if (selectedFile) {
      setFileList([...fileList, selectedFile]);
      setSelectedFile(null);
    }
    instance
      .post("/upload-file", formData)
      .then((res) => {
        console.log(res, "successs", formData);
        new Swal("success", res.data.message, "success");
      })
      .catch((err) => {
        new Swal("failed", err.response.data.message, "error");
        console.log("err", err);
      });
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">File Uploader</h1>
      </header>
      <main className="flex-1 bg-gray-100 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="file"
              name="file"
              accept=".jpg,.jpeg,.png,.gif"
              onChange={handleFileInputChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleFileSubmit}
            >
              Upload
            </button>
          </div>
          <ul className="list-disc list-inside">
            {fileList.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Home;
