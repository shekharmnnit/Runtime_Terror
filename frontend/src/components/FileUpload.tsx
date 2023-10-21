import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target.files[0].originalname)
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
        const formData = new FormData();
        formData.append('postfile', selectedFile);

        await axios.post('/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            // Handle success (e.g., show a success message)
            console.log('File uploaded successfully', response.data);
          })
          .catch(error => {
            // Handle errors (e.g., show an error message)
            console.error('Error uploading file', error);
          });
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
}

export default FileUpload;