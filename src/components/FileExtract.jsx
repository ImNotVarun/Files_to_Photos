import React, { useState } from 'react';
import { Upload } from 'lucide-react';

function FileExtract({ setIsLoading, onProgress }) {
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', image);

        const API_URL = import.meta.env.VITE_API_URL || '';

        try {
            const response = await fetch(`${API_URL}/extract_files`, {
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
                a.download = 'extracted_files.zip';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                alert('An error occurred during the extraction.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during the extraction.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="FileExtract">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                />
                <label htmlFor="image" className="bg-blue-500 text-white px-6 py-3 rounded-full inline-block cursor-pointer hover:bg-blue-600 transition-colors">
                    <Upload className="inline-block mr-2" />
                    Select Image to Extract
                </label>
                <p className="mt-4 text-gray-400">
                    {image ? '1 file selected' : 'or drop image here'}
                </p>
            </div>
            <div className="mt-4 text-center">
                <button type="submit" className="bg-purple-500 text-white px-8 py-3 rounded-full inline-block cursor-pointer hover:bg-purple-600 transition-colors">
                    Extract Files
                </button>
            </div>
        </form>
    );
}

export default FileExtract;