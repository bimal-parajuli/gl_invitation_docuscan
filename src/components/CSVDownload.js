import React from "react";

function CSVDownload({csv_data_in_props}) {
  const csvData = csv_data_in_props; // Replace with your CSV data

  const handleDownload = () => {
    // Create a Blob from the CSV data
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv"; // Set the filename for the downloaded file
    a.style.display = "none";

    // Append the anchor element to the document and trigger a click event
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the URL and removing the anchor element
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div>
      <button
        class="mt-24 w-24 px-4 py-2 text-white bg-green-500 rounded shadow-xl"
        onClick={handleDownload}
      >
        Download CSV
      </button>
    </div>
  );
}

export default CSVDownload;
