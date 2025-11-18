import React, { useState } from 'react';

const NotificationCard = ({ data }) => {
  const cardStyle = {
    backgroundColor: '#1e90ff',  // Blue background
    color: 'white',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    margin: '20px auto',
    fontFamily: 'Arial, sans-serif',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  const detailStyle = {
    marginBottom: '5px',
    fontSize: '1rem',
  };

  const notificationStyle = {
    // fontStyle: 'italic',
    marginTop: '15px',
  }

  const [showDetails, setShowDetails] = useState(false);

    const handleToggleDetails = () => {
        setShowDetails(!showDetails);
    };

  return (
    <div className="bg-slate-300 w-[800px] mx-auto my-10 rounded-lg shadow-md">
            {/* Notification Title */}
            <div onClick={handleToggleDetails} className=' bg-yellow-300 px-4 py-2 rounded-md'>
            <div className="text-xl font-semibold text-gray-800 cursor-pointer ">
                <p>Notification</p>
            </div>
            <p className="text-gray-700 cursor-pointer text-lg">
               Startup Email: {data.Startup_Email}
            </p>
            </div>

            {/* Full Details (conditionally rendered) */}
            <div className=' bg-gray-200 transition-all 0.3s ease-in-out text-lg'>
            {showDetails && (
                <div className="p-4">
                    <p className="text-gray-700">
                      <span className=' text-lg font-bold'>LA Email:</span> {data.LA_Email}
                    </p>
                    <p className="text-gray-700">
                       <span className=' text-lg font-bold'>Startup Company:</span> {data.Startup_Company}
                    </p>
                    <p className="text-gray-700">
                       <span className=' text-lg font-bold'>Startup Email:</span> {data.Startup_Email}
                    </p>
                    <p className="text-gray-700">
                        <span className=' text-lg font-bold'>Date:</span> {data.date}
                    </p>
                    <p className="text-gray-700 italic">
                        <span className=' text-lg font-bold'>Notification message:</span> "{data.notification}"
                    </p>
                </div>
            )}
            </div>
        </div>
  );
};

export default NotificationCard;
