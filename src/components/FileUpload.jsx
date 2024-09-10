import React, { useState } from 'react';
import { Upload, Plus } from 'lucide-react';

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
            const response = await fetch('/api/upload_files', {
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
        <form onSubmit={handleSubmit} className="FileUpload mb-4">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <div className="flex justify-center items-center space-x-4">
                    <div>
                        <input
                            type="file"
                            id="files"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="files" className="bg-blue-500 text-white px-6 py-3 rounded-full inline-block cursor-pointer hover:bg-blue-600 transition-colors">
                            <Upload className="inline-block mr-2" />
                            Upload Files
                        </label>
                    </div>
                    <div>
                        <input
                            type="file"
                            id="existing_image"
                            accept="image/*"
                            onChange={handleExistingImageChange}
                            className="hidden"
                        />
                        <label htmlFor="existing_image" className="bg-blue-500 text-white px-4 py-3 rounded-full inline-block cursor-pointer hover:bg-blue-600 transition-colors">
                            <Plus className="inline-block" />
                            Existing Image
                        </label>
                    </div>
                </div>
                <p className="mt-4 text-gray-400">
                    {files.length > 0 ? `${files.length} file(s) selected` : 'or drop files here'}
                </p>
                <p className="mt-2 text-gray-400">
                    {existingImage ? 'Existing image selected' : 'Select existing file (optional)'}
                </p>
            </div>
            <div className="mt-4 text-center">
                <button type="submit" className="bg-green-500 text-white px-8 py-3 rounded-full inline-block cursor-pointer hover:bg-green-600 transition-colors">
                    Convert
                </button>
            </div>
        </form>
    );
}

export default FileUpload;