import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import FileUploader from "./FileUpload";
import Tree from "./Tree";

function App() {
  const [json, setJson] = useState("");
  const navigate = useNavigate();

  const handleUploadText = () => {
    try {
      const parsed = JSON.parse(json);
      console.log("Parsed JSON:", parsed);

      sessionStorage.setItem("jsonData", JSON.stringify(parsed));

      navigate("/tree", { state: { data: parsed } });
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1>File Tree Explorer</h1>
            <FileUploader onFileSelect={setJson} />
            <h2>Or paste in your JSON text below.</h2>

            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              placeholder="Enter your JSON text here..."
              rows={10}
              cols={50}
            />

            <button onClick={handleUploadText}>Upload text</button>
          </>
        }
      />
      <Route path="/tree" element={<Tree />} />
    </Routes>
  );
}

export default App;
