import React, { useState } from "react";
import Swal from "sweetalert2";
import instance from "../utils/axios";
import { Outlet } from "react-router-dom";
import { CLIENT_KEY } from "../constants";
import Myfiles from "./Myfiles";
import LoadingBar from "./Loading";
const Home = ({ user, provider }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const headers = {
    Authorization: `Bearer ${provider.credential} ${provider.clientId}`,
    client: { CLIENT_KEY },
    "Content-Type": "multipart/form-data",
  };
  const handleFileSubmit = () => {
    const formData = new FormData();
    setLoading(true)
    formData.append("user", user);
    formData.append("file", selectedFile);
    if (selectedFile) {
      instance
        .post("/upload-file", formData, { headers })
        .then((res) => {
          new Swal("success", res.data.message, "success");
          setLoading(false)
          setSelectedFile(null);
        })
        .catch((err) => {
          setLoading(false)
          new Swal("failed", err.response.data.message, "error");
          console.log("err", err);
        });
    } else {
      setLoading(false)
      new Swal("warning", "upload files to continue", "warning");
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">File Uploader</h1>
      </header>
      <main className="flex-1 bg-gray-100 p-6">
        {isLoading ? <LoadingBar/> : <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="file"
              name="file"
              onChange={handleFileInputChange}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleFileSubmit()}
            >
              Upload
            </button>
          </div>
          <Myfiles fileList={fileList} provider={provider} setFileList={setFileList}/>
        </div>}
      </main>
      <Outlet />
    </div>
  );
};

export default Home;
