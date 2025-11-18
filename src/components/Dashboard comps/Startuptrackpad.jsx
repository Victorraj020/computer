import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Startuptrackpad.css';

const Startuptrackpad = ({ email }) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [statusInfo, setStatusInfo] = useState({
    Email_ID: "", // startup's email
    FilledApplication: false,
    AplicationAccepted: false,
    ApplicationRejected: false,
    isDrugInspectorAssigned: false,
    isDrugInspectorAccepted: false,
    isDrugInspectorRejected: false,
    isLicensed: false,
  });



  const stages = [
    { title: 'Stage 1: Application Submitted', description: 'Your application has been submitted.' },
    { title: 'Stage 2: Application Accepted', description: 'Your application has been Accepted by Licensing authority.' },
    { title: 'Stage 3: Drug Inspector Assigned', description: 'A nearby Drug inspector is assigned for your company.' },
    { title: 'Stage 4: Drug Inspector Accepted', description: 'Drug inspector has verified and Accepted your application.' },
    { title: 'Stage 5: License Approved', description: 'Congratulations. Your License has been issued.' },
  ];

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.post('http://localhost:5002/api/status-trackpad', { Startup_Email: email });
        const { success, statusInfo } = response.data;

        if (success) {
          setStatusInfo(statusInfo[0]);
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchStatus();
  }, [email]);

  useEffect(() => {
    const updateCurrentStage = () => {
      if (statusInfo.ApplicationRejected) {
        setCurrentStage(-1); // Application Rejected (Cancels all future stages)
      } else if (statusInfo.isDrugInspectorRejected) {
        setCurrentStage(-3); // Drug inspector rejected
      } else if (statusInfo.isLicensed) {
        setCurrentStage(5); // License Approved
      } else if (statusInfo.isDrugInspectorAccepted) {
        setCurrentStage(4); // Drug inspector accepted
      } else if (statusInfo.isDrugInspectorAssigned) {
        setCurrentStage(3); // Drug inspector assigned
      } else if (statusInfo.AplicationAccepted) {
        setCurrentStage(2); // Application accepted
      } else if (statusInfo.FilledApplication) {
        setCurrentStage(1); // Application submitted
      } else {
        setCurrentStage(0); // No application filled
      }
    };

    updateCurrentStage();
  }, [statusInfo]);

  const isCancelled = currentStage < 0;

  return (
    <div className=" mt-32">
      <div className="trackpad ">
        <div className="tracking-line">
          {stages.map((_, index) => {
            const isGreen = index < Math.abs(currentStage);
            const isRed = isCancelled && index >= Math.abs(currentStage);
            return (
              <div
                key={index}
                className={`dot ${isGreen ? 'active' : ''} ${isRed ? 'cancelled' : ''}`}
              />
            );
          })}
        </div>
        {stages.map((stage, index) => {
          const isRed = isCancelled && index >= Math.abs(currentStage);
          const isGreen = index < Math.abs(currentStage);

          return (
            <div
              key={index}
              className={`stage ${isGreen ? 'active' : ''} ${isRed ? 'cancelled' : ''}`}
            >
              <h4 className="status-title">{stage.title}</h4>
              <p>{isRed ? 'Cancelled at this stage' : stage.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Startuptrackpad;