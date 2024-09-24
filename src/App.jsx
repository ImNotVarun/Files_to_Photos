import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import FileExtract from './components/FileExtract';
import LoadingBar from './components/LoadingBar';
import { Upload } from 'lucide-react';
import photoSrc from './assets/photo.jpg';  // Import the image

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
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-6xl font-bold mb-8"
          style={{
            background: 'linear-gradient(to right, #ffffff, #b0b0b0, #000000)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            marginBottom: '60px'
          }}
        >
          File to Image<br />Converter
        </h1>
        <h4
          className="text-3xl font-bold mb-8"
          style={{
            color: 'red',
            WebkitBackgroundClip: 'text',
            textAlign: 'center',
            marginBottom: '60px',
          }}
        >
          * The backend is hosted on a free service and may take up to 50 seconds to initialize the first request
        </h4>


        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 bg-gray-800 rounded-lg p-4">
            <img
              src={photoSrc}  // Use the imported image source
              alt="Sample image"
              style={{ width: '420px', height: '475px', objectFit: 'cover' }}
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/420x475?text=Image+Not+Found';
              }}
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <FileUpload
              setIsLoading={setIsLoading}
              onProgress={handleUploadProgress}
            />
            <FileExtract
              setIsLoading={setIsLoading}
              onProgress={handleUploadProgress}
            />
          </div>
        </div>
        {isLoading && <LoadingBar progress={progress} />}
      </div>
      {/* Top-right corner decoration */}
      <div className="absolute top-0 right-0 w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,0 Q50,50 100,100"
            fill="none"
            stroke="#FFC107"
            strokeWidth="4"
          />
        </svg>
      </div>

      {/* Bottom-right corner decoration */}
      <div className="absolute top-0 right-40 w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            d="M100,100 Q75,75 50,90 T0,0"
            fill="none"
            stroke="#2196F3"
            strokeWidth="4"
          />
        </svg>
      </div>
    </div >
  );
}

export default App;