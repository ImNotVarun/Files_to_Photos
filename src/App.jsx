import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileExtract from './components/FileExtract';
import LoadingBar from './components/LoadingBar';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUploadProgress = (event) => {
    if (event.lengthComputable) {
      const percentComplete = (event.loaded / event.total) * 100;
      setProgress(percentComplete);
    }
  };

  return (
    <div className="App fade-in">
      <h1>File to Image Converter</h1>
      <FileUpload
        setIsLoading={setIsLoading}
        onProgress={handleUploadProgress}
      />
      <FileExtract
        setIsLoading={setIsLoading}
        onProgress={handleUploadProgress}
      />
      {isLoading && <LoadingBar progress={progress} />}
    </div>
  );
}

export default App;