import { useState } from "react";

function SelectImage() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [responseText, setResponseText] = useState('');

    const handleFileChange = (e) => {
        // Capture the selected file when the input changes
        console.log('File  selection open');
        setSelectedFile(e.target.files[0]);
        console.log('File Selected');

    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        // Create a FormData object to send the file
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('language', 'eng');
        formData.append('isOverlayRequired', 'false');

        const customHeaders = {
            'apiKey': 'helloworld',
        };

        function extractInfo(responseDataText){
            setResponseText("File Scanned. Information Extraction Underway... Please wait.");
            
        }
        const prompt_last = `

        Use the above extract from an invitation for guest lecture, extract and arrange the information in following format:
        
        data =[
            ["Field", "Information"]
            ["Type of lecture", "8th Module Industry expert Lecture"]
            ["Lecture Title", "Recent Trends in Natural Language Processing - An Industry Perspective Resource Person Name, Utkarsh Shreemali"]
            ["Designation", "Machine Learning Engineer"]
            ["Company Name", "Qualcomm Pvt Ltd"]
            ["City/Country", "Bengaluru, India"]
            ["Course Code/Course Title", "BDC3005/ Information Extraction and Retrieval"]
            ["Date", "9th October 2023"]
            ["Time", "7,00 PM to 9,00 PM"]
            ["Mode Online (or) Venue, Room No", "SJT404"]
            ["Coordinators", "Dr. Swathi J N and Dr. Naveen Kumar"]
        ]
        
        `
        try {
            // Send a POST request to your server
            const response = await fetch('https://api.ocr.space/Parse/Image', {
                method: 'POST',
                body: formData,
                headers: customHeaders,
            });

            if (response.ok) {
                const responseData = await response.json();
                const responseDataText = responseData.ParsedResults[0].ParsedText;
                extractInfo(responseDataText + prompt_last);
            } else {
                setResponseText('Error: File upload failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponseText('Error: File upload failed.');
        }
    };

    // return (
    //   <div>
    //     <input type="file" onChange={handleFileChange} />
    //     <button onClick={handleUpload}>Upload File</button>
    //     {responseText && <div>Server Response: {responseText}</div>}
    //   </div>
    // );
    return (
        <>
            <div class="bg-gray-900 flex justify-center" id="ImageFormSection">
                <div class="flex items-center justify-center max-w-xl mt-48 flex justify-center mt-8">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 px-40"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPEG or JPG (MAX. 1MB)</p>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                    </label>
                </div>

            </div>
            <div class="bg-gray-900">
                <div class="flex justify-center p-2 bg-gray-900">
                    <button class="w-24 px-4 py-2 text-white bg-blue-500 rounded shadow-xl" onClick={handleUpload}>Upload</button>
                </div>
                <div class="flex justify-center p-2 w-96 text-white ">
                    Server response here.
                    {responseText && <div>Server Response: {responseText}</div>}
                </div>
            </div>
        </>
    );

}

export default SelectImage;