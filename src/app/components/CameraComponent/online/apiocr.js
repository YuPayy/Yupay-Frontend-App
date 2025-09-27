import React, { useState } from 'react';

const ApiOcr = () => {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return;
        setLoading(true);
        setResult('');
        // Replace with your OCR API endpoint and key
        const apiUrl = 'https://your-ocr-api-endpoint.com/ocr';
        const formData = new FormData();
        formData.append('file', image);

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                // headers: { 'Authorization': 'Bearer YOUR_API_KEY' }, // if needed
            });
            const data = await response.json();
            setResult(data.text || 'No text found');
        } catch (error) {
            setResult('Error processing image');
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>OCR Image Upload</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit" disabled={loading || !image}>
                    {loading ? 'Processing...' : 'Upload & OCR'}
                </button>
            </form>
            {result && (
                <div>
                    <h3>OCR Result:</h3>
                    <pre>{result}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiOcr;