import React, { useState } from 'react';

function FileUpload({ setIsLoading, onProgress }) {
    const [files, setFiles] = useState([]);
    const [existingImage, setExistingImage] = useState(null);

    const handleFileChange = (event) => {
        setFiles(Array.from(event.target.files));
    };

    const handleExistingImageChange = (event) => {
        setExistingImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));
        if (existingImage) {
            formData.append('existing_image', existingImage);
        }

        try {
            const response = await fetch('/upload_files', {
                method: 'POST',
                body: formData,
                onUploadProgress: onProgress,
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'files_image.png';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                alert('An error occurred during the upload.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during the upload.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="FileUpload">
            <div>
                <label htmlFor="files">Select files to upload:</label>
                <input
                    type="file"
                    id="files"
                    multiple
                    onChange={handleFileChange}
                />
                <span className="file-info">{files.length} file(s) selected</span>
            </div>
            <div>
                <label htmlFor="existing_image">Select existing image (optional):</label>
                <input
                    type="file"
                    id="existing_image"
                    accept="image/*"
                    onChange={handleExistingImageChange}
                />
                <span className="file-info">{existingImage ? '1 file selected' : ''}</span>
            </div>
            <button type="submit">Upload and Convert</button>
        </form>
    );
}

export default FileUpload;