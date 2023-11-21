import { useState } from "react";
import { CsvToHtmlTable } from "react-csv-to-table";
import CSVDownload from "./CSVDownload";

function SelectImage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [fileScannedOrNot, setFileScannedOrNot] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState(null);

  const handleFileChange = (e) => {
    // Capture the selected file when the input changes
    console.log("File  selection open");
    setSelectedFile(e.target.files[0]);
    console.log("File Selected");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");

    const customHeaders = {
      apiKey: "helloworld",
    };

    function getInfoFromScrape(prompt) {
        return "Information Extraction Error..";
    }

    async function extractInfo(responseDataText) {
      setResponseText(responseDataText);

      const gptResponse = await getInfoFromScrape(responseDataText + prompt_last);
      setExtractedInfo(gptResponse);

      // setResponseText("File Scanned. Information Extraction Underway... Please wait.");
    }
    const prompt_last = `

Use the above extract from an invitation for guest lecture, extract and arrange the information in following csv format, just return the csv format, no description please. Only the csv:

Field, Information
"Type of lecture", "......"
"Lecture Title", "...."
"Designation", "..."
"Company Name", "..."
"City/Country", "..."
"Course Code/Course Title", "..."
"Date", "..."
"Time", "..."
"Mode Online (or) Venue/ Room No", "..."
"Coordinators", "..."


Please dont return even an extra word other than the csv
        
        `;
    try {
      // Send a POST request to your server
      const response = await fetch("https://api.ocr.space/Parse/Image", {
        method: "POST",
        body: formData,
        headers: customHeaders,
      });

      if (response.ok) {
        const responseData = await response.json();
        const responseDataText = responseData.ParsedResults[0].ParsedText;
        setFileScannedOrNot(true);

        setResponseText(responseDataText);

        // extractInfo(responseDataText);
      } else {
        setResponseText("Error: File upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseText("Error: File upload failed.");
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
      <center class="px-30 bg-gray-900 text-white text-center text-2xl pb-24 mb-0">Part 1: Extract Info from an image scan.</center> <br></br>
      <div class="bg-gray-900 flex justify-center" id="ImageFormSection">
        <div class="flex items-center justify-center max-w-xl flex justify-center pt-8">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 px-40">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPEG or JPG (MAX. 1MB)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              class="hidden"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
      <div class="bg-gray-900">
        <div class="flex justify-center p-2 bg-gray-900">
          <button
            class="w-24 px-4 py-2 text-white bg-blue-500 rounded shadow-xl"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        <div class="text-white text-center mt-24 pb-24">
          <b>
            <u>Scanned Document Extract here.</u>
          </b>
          {responseText && (
            <div class="mt-12 leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-white text-left">
              {responseText}
            </div>
          )}
          {fileScannedOrNot && (
            <div class="mt-24">
              <b>
                <u>File Scanned...</u>
              </b>
            </div>
          )}
          {extractedInfo && (
            <CsvToHtmlTable
              data={extractedInfo}
              csvDelimiter=","
              tableClassName="table info-table mt-12 leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-white text-left"
            />
          )}
          {extractedInfo && (
            <CSVDownload  csv_data_in_props={extractedInfo}></CSVDownload>
          )}
        </div>
      </div>
    </>
  );
}

export default SelectImage;
