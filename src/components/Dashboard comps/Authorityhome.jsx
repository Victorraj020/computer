
import React, { useEffect, useState } from 'react';
import PrintauthorList from './PrintauthorList';
import axios from 'axios';

import '../styles/Authorityhomee.css';

export default function Authorityhome({ email }) {
  const [pendingStartupEmails, setpendingStartupEmails] = useState([]);
  const [assignedStartupEmails, setassignedStartupEmails] = useState([]);
  const [acceptedStartupEmails, setacceptedStartupEmails] = useState([]);
  const [licensedStartupEmails, setlicensedStartupEmails] = useState([]);
  const [rejectedStartupEmails, setrejectedStartupEmails] = useState([]);
  const [LArejectedStartupEmails, setLArejectedStartupEmails] = useState([]);

  const [selectedSection, setSelectedSection] = useState('start-up-1'); // Track the selected section
  const [activeTab, setActiveTab] = useState('Status');

  // Fetching data for each section
  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const pendingResponse = await axios.get('http://localhost:5002/api/isfilledapplication-false');
        setpendingStartupEmails(pendingResponse.data.success ? pendingResponse.data.pendingList : []);

        const assignedResponse = await axios.get('http://localhost:5002/api/isDrugInspectorAssigned-true');
        setassignedStartupEmails(assignedResponse.data.success ? assignedResponse.data.assignedList : []);

        const acceptedResponse = await axios.get('http://localhost:5002/api/isDrugInspectorAccepted-true');
        setacceptedStartupEmails(acceptedResponse.data.success ? acceptedResponse.data.acceptedList : []);

        const rejectedResponse = await axios.get('http://localhost:5002/api/isDrugInspectorRejected-true');
        setrejectedStartupEmails(rejectedResponse.data.success ? rejectedResponse.data.rejectedList : []);

        const licensedResponse = await axios.get('http://localhost:5002/api/isLicensed-true');
        setlicensedStartupEmails(licensedResponse.data.success ? licensedResponse.data.licensedList : []);

        const lArejectedResponse = await axios.get('http://localhost:5002/api/isLArejected');
        setLArejectedStartupEmails(lArejectedResponse.data.success ? lArejectedResponse.data.datal : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="auth-total">
      <div className="bg-orange-200 py-1 px-3">
        <ul className="flex gap-8 items-center">
          <li>
            <button onClick={() => { setSelectedSection('start-up-1'); setActiveTab('Status'); }} className={activeTab === 'Status' ? 'active-tab' : ''}>Start-up</button>
          </li>
          
          <li>
            <button onClick={() => { setSelectedSection('start-up-2'); setActiveTab('Application'); }} className={activeTab === 'Application' ? 'active-tab' : ''}>Drug-inspector</button>
          </li>
          <li>
            <button onClick={() => { setSelectedSection('start-up-3'); setActiveTab('license'); }} className={activeTab === 'license' ? 'active-tab' : ''}>Licensed</button>
          </li>
        </ul>
      </div>

      {selectedSection === 'start-up-1' && (
        <div id="start-up-1">
          <div className="sect-container">
            <p className="auth-hm">Pending Startups</p>
            <p style={{ fontSize: '1.5rem', color: 'blue' }}>You can now assign the drug inspectors for below startups</p>
            <br />
            <div>
              {pendingStartupEmails.length === 0 ? (
                <h1>No Startups found</h1>
              ) : (
                <PrintauthorList startupmails={pendingStartupEmails} type="pending" />
              )}
            </div>
          </div>
          <div className="sect-container">
            <p className="auth-hm">Rejected Startups</p>
            <p style={{ fontSize: '1.5rem', color: 'blue' }}>Startups those got rejected during application verification</p>
            <br />
            <div>
              {LArejectedStartupEmails.length === 0 ? (
                <h1>No Startups found</h1>
              ) : (
                <PrintauthorList startupmails={LArejectedStartupEmails} type="rejected" />
              )}
            </div>
          </div>
        </div>
      )}

      {selectedSection === 'start-up-2' && (
        <div id="start-up-2">
          <div className="sect-container">
            <p className="auth-hm">Drug Inspector Assigned Startups</p>
            <p style={{ fontSize: '1.5rem', color: 'blue' }}>Waiting for drug inspectors chemical verification and acceptance.</p>
            <br />
            <div>
              {assignedStartupEmails.length === 0 ? (
                <h1>No Startups found</h1>
              ) : (
                <PrintauthorList startupmails={assignedStartupEmails} type="assigned" />
              )}
            </div>
          </div>

          <div className="sect-container">
            <p className="auth-hm">Drug Inspector Accepted Startups</p>
            <p style={{ fontSize: '1.5rem', color: 'blue' }}>Chemically verified and Accepted by Drug inspector.</p>
            <br />
            <div>
              {acceptedStartupEmails.length === 0 ? (
                <h1>No Startups found</h1>
              ) : (
                <PrintauthorList startupmails={acceptedStartupEmails} type="accepted" />
              )}
            </div>
          </div>

          <div className="sect-container">
            <p className="auth-hm">Drug Inspector Rejected Startups</p>
            <p style={{ fontSize: '1.5rem', color: 'blue' }}>Rejected by Drug inspector due to presence of harmful chemicals.</p>
            <br />
            <div>
              {rejectedStartupEmails.length === 0 ? (
                <h1>No Startups found</h1>
              ) : (
                <PrintauthorList startupmails={rejectedStartupEmails} type="rejected" />
              )}
            </div>
          </div>
        </div>
      )}

      {selectedSection === 'start-up-3' && (
        <div id="start-up-3">
          <div className="sect-container">
            <p className="auth-hm">Licensed Startups</p>
            <p style={{ fontSize: '1.5rem', color: 'green' }}>Successfully Licensed Startups.</p>
            <br />
            <div>
              {licensedStartupEmails.length === 0 ? (
                <h1>No Startups found</h1>
              ) : (
                <PrintauthorList startupmails={licensedStartupEmails} type="licensed" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
