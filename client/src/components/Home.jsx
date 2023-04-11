import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import instance from "../utils/axios";
import { CLIENT_KEY } from "../constants";
import Myfiles from "./Myfiles";
import LoadingBar from "./Loading";
import { useNavigate } from "react-router-dom";
const Home = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getDatas();
  }, []);
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const headers = {
    "Content-Type": "multipart/form-data",
  };
  const handleFileSubmit = () => {
    const formData = new FormData();
    setLoading(true);
    formData.append("user", user);
    formData.append("file", selectedFile);
    if (selectedFile) {
      instance
        .post("/upload-file", formData, { headers })
        .then((res) => {
          new Swal("success", res.data.message, "success");
          console.log();
          setFileList([...fileList, res.data.data]);
          setLoading(false);
          setSelectedFile(null);
        })
        .catch((err) => {
          setLoading(false);
          new Swal("failed", err.response.data.message, "error");
          console.log("err", err);
        });
    } else {
      setLoading(false);
      new Swal("warning", "upload files to continue", "warning");
    }
  };
  const getDatas = () => {
    instance
      .get("/my-files")
      .then((res) => {
        setFileList(res.data.data);
      })
      .catch((err) => {
        new Swal("Failed", "Operation Failed", "error");
        console.log("err", err);
      });
  };
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">File Uploader</h1>
        <button
          onClick={() => handleLogout()}
          className="text-sm text-gray-400 hover:text-white"
        >
          Logout
        </button>
      </header>
      <main className="flex-1 bg-gray-100 p-6">
        {isLoading ? (
          <LoadingBar />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input type="file" name="file" onChange={handleFileInputChange} />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleFileSubmit()}
              >
                Upload
              </button>
            </div>
            <Myfiles fileList={fileList} setFileList={setFileList} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
