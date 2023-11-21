import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVUploader = () => {
    const [csvData, setCSVData] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileUpload = (e) => {
        setSelectedFile(e.target.files[0]);

        const file = e.target.files[0];
        Papa.parse(file, {
            complete: (result) => {
                setCSVData(result.data);
            },
        });
    };



    // const handleFileChange = (e) => {
    //     setSelectedFile(e.target.files[0]);
    // };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const responseData = await response.text();
                console.log('API Response:', responseData);
                alert('File Saved Succesfully. Details Logged on console.', );

            } else {
                console.error('Error: File upload failed.');
                alert('API Response:', response.text());

            }
        } catch (error) {
            console.error('Error:', error);
            alert(error);
        }

    }
    return (
        <>
            <div class="bg-gray-900">
                <input id="csvfileUploadInput" type="file" onChange={handleFileUpload} />


                <div class="relative overflow-x-auto flex justify-center p-2">
                    <table class="w-1/2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                {csvData[0] && csvData[0].map(
                                    (header, index) =>
                                        <th key={index} scope="col" class="px-6 py-3">
                                            {header}
                                        </th>
                                )
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {csvData.slice(1).map((row, rowIndex) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" key={cellIndex}>
                                            {cell}
                                        </td>))
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <button onClick={handleUpload}>Upload File</button>
            </div>
        </>

    );
};

export default CSVUploader;
