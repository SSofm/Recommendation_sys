import axios from "axios";
import { useState } from "react";

export const FileUpload = () => {
  // Initially, no file is selected
  const [selectedFile, setSelectedFile] = useState([]);

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the state
    setSelectedFile(event.target.files);
  };

  // On file upload (click the upload button)
  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    for (const element of selectedFile) {
      formData.append("file", element, element.name);
    }
    // Update the formData object

    // Details of the uploaded file
    console.log("file selected", selectedFile);

    // Request made to the backend api
    // Send formData object
    axios
      .post("http://localhost:5000/images/upload-files", formData)
      .then((res) => {
        console.log("Res: ", res.data);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>

          {/* <p>Last Modified: {selectedFile.lastModifiedDate.toDateString()}</p> */}
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <h3>File Upload</h3>
      <div>
        <input type="file" onChange={onFileChange} multiple />
        <button onClick={onFileUpload}>Upload!</button>
      </div>
      {fileData}
    </div>
  );
};
