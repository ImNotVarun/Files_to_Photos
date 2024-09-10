import React, { useState } from 'react';

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

        try {
            const response = await fetch('/extract_files', {
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
            <div>
                <label htmlFor="image">Select image to extract files:</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <span className="file-info">{image ? '1 file selected' : ''}</span>
            </div>
            <button type="submit">Extract Files</button>
        </form>
    );
}

export default FileExtract;
