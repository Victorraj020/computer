import React, { useState } from 'react';

const UserManual = () => {
  const [showManual, setShowManual] = useState(false);

  return (
    <div className="p-4 bg-gray-100 border border-gray-300 rounded-lg mb-4">
      {/* Toggle Button */}
      <button
        onClick={() => setShowManual(!showManual)}
        className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        {showManual ? "Hide User Manual" : "Read User Manual"}
      </button>

      {/* Link to download the provided PDF */}
      <a href="../NSWS Startup Application Guide (1).pdf" download className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg ml-3">
        Download User Manual
      </a>

      {/* Manual Content */}
      {showManual && (
        <div className="mt-4 text-gray-700 space-y-4">
          <h2 className="text-lg font-semibold">User Manual</h2>
          <p>
            This form is designed to collect details about the manufacturer,
            certification, and IE code information. Please fill out the fields
            carefully as described below:
          </p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Details of Manufacturer:</strong> 
              Enter the <em>PAN Number</em> and <em>GST Number</em> of your company/firm. Also, upload a file containing PAN details and provide the website address if available.
            </li>
            <li>
              <strong>Company Certification Details:</strong> 
              Provide the <em>Certificate Number</em>, the <em>Date of Issue</em>, and the <em>Name of the Issuing Authority</em>.
            </li>
            <li>
              <strong>Details of IE Code by DGFT:</strong> 
              Enter the <em>IE Code</em> and its <em>Date of Issue</em>.
            </li>
            <li>
              <strong>Captcha:</strong> 
              Enter the captcha code shown at the bottom of the form to proceed.
            </li>
          </ol>
          <p className="font-medium">
            Note: Ensure all fields marked with <span className="text-red-500">*</span> are completed.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManual;
