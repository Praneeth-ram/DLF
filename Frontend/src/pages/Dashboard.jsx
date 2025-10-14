import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [activeEnquiryTab, setActiveEnquiryTab] = useState('received');
  const [selectedProperty, setSelectedProperty] = useState('');

  // Mock data
  const userProperties = [
    {
      id: 1,
      name: "DLF Cyber City Apartment",
      location: "Gurgaon, Haryana"
    },
    {
      id: 2,
      name: "DLF Magnolia Villa", 
      location: "Delhi"
    },
    {
      id: 3,
      name: "DLF Promenade Shop",
      location: "Mumbai, Maharashtra"
    }
  ];

  const receivedEnquiries = [
    {
      id: 1,
      from: "Amit Kumar",
      date: "2 hours ago",
      message: "Hi, I'm interested in purchasing your DLF Cyber City apartment. Could you please share more details about the property?",
      property: "DLF Cyber City Apartment"
    },
    {
      id: 2,
      from: "Priya Patel", 
      date: "1 day ago",
      message: "Hello, I would like to schedule a visit for your DLF Magnolia Villa this weekend. Please let me know your availability.",
      property: "DLF Magnolia Villa"
    }
  ];

  const sentEnquiries = [
    {
      id: 1,
      to: "Rajesh Mehta",
      date: "3 days ago", 
      message: "I'm interested in the commercial space at DLF Downtown. Could you share the lease terms and availability?",
      property: "DLF Downtown Office"
    }
  ];

  const documents = [
    { id: 1, name: 'Property Deed', type: 'PDF', size: '2.1 MB', icon: '📄' },
    { id: 2, name: 'Tax Receipt 2024', type: 'PDF', size: '1.8 MB', icon: '🧾' },
    { id: 3, name: 'Sale Agreement', type: 'PDF', size: '3.2 MB', icon: '📑' },
    { id: 4, name: 'Ownership Certificate', type: 'PDF', size: '1.5 MB', icon: '🏛️' }
  ];

  const loadDocuments = (propertyId) => {
    setSelectedProperty(propertyId);
  };

  const downloadDocument = (docName) => {
    alert(`✅ ${docName} downloaded successfully!\n\n(In production, this would download the actual file)`);
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="welcome">👋 Welcome back, Rohan Sharma!</h1>
        <p className="subtitle">Manage your properties, documents, and enquiries</p>
      </div>

      {/* Tabs Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          🏠 My Properties
        </button>
        <button 
          className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          📄 My Documents
        </button>
        <button 
          className={`tab-btn ${activeTab === 'enquiries' ? 'active' : ''}`}
          onClick={() => setActiveTab('enquiries')}
        >
          💬 My Enquiries
        </button>
      </div>

      {/* Tab Content */}
      <div className="dashboard-tab-content">
        
        {/* PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div className="tab-pane active">
            <h2 className="tab-title">🏠 My Properties</h2>
            <div className="properties-grid">
              {userProperties.map(property => (
                <div key={property.id} className="property-card">
                  <h3 className="property-name">{property.name}</h3>
                  <p className="property-location">📍 {property.location}</p>
                  <div className="property-actions">
                    <Link to={`/properties/${property.id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        setActiveTab('documents');
                        setSelectedProperty(property.id.toString());
                      }}
                    >
                      View Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === 'documents' && (
          <div className="tab-pane active">
            <h2 className="tab-title">📄 Property Documents</h2>
            
            {/* Property Selector */}
            <div className="property-selector">
              <select 
                className="select-box" 
                value={selectedProperty}
                onChange={(e) => loadDocuments(e.target.value)}
              >
                <option value="">Select a property to view documents</option>
                {userProperties.map(property => (
                  <option key={property.id} value={property.id}>
                    {property.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Documents List */}
            <div className="documents-list">
              {!selectedProperty ? (
                <div className="empty-state">
                  <div className="empty-icon">📁</div>
                  <h3>No Property Selected</h3>
                  <p>Please select a property to view its documents</p>
                </div>
              ) : (
                documents.map(doc => (
                  <div key={doc.id} className="document-card">
                    <div className="document-info">
                      <div className="document-icon">{doc.icon}</div>
                      <div className="document-details">
                        <h4>{doc.name}.{doc.type}</h4>
                        <p>{doc.size}</p>
                      </div>
                    </div>
                    <button 
                      className="download-btn" 
                      onClick={() => downloadDocument(doc.name)}
                    >
                      Download
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ENQUIRIES TAB */}
        {activeTab === 'enquiries' && (
          <div className="tab-pane active">
            <h2 className="tab-title">💬 My Enquiries</h2>
            
            {/* Enquiry Subtabs */}
            <div className="enquiries-tabs">
              <button 
                className={`enquiry-subtab ${activeEnquiryTab === 'received' ? 'active' : ''}`}
                onClick={() => setActiveEnquiryTab('received')}
              >
                📩 Received ({receivedEnquiries.length})
              </button>
              <button 
                className={`enquiry-subtab ${activeEnquiryTab === 'sent' ? 'active' : ''}`}
                onClick={() => setActiveEnquiryTab('sent')}
              >
                📤 Sent ({sentEnquiries.length})
              </button>
            </div>

            {/* Received Enquiries */}
            {activeEnquiryTab === 'received' && (
              <div className="enquiry-list">
                {receivedEnquiries.map(enquiry => (
                  <div key={enquiry.id} className="enquiry-card">
                    <div className="enquiry-header">
                      <span className="enquiry-from">From: {enquiry.from}</span>
                      <span className="enquiry-date">{enquiry.date}</span>
                    </div>
                    <p className="enquiry-message">{enquiry.message}</p>
                    <p className="enquiry-property">Regarding: {enquiry.property}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Sent Enquiries */}
            {activeEnquiryTab === 'sent' && (
              <div className="enquiry-list">
                {sentEnquiries.map(enquiry => (
                  <div key={enquiry.id} className="enquiry-card">
                    <div className="enquiry-header">
                      <span className="enquiry-from">To: {enquiry.to}</span>
                      <span className="enquiry-date">{enquiry.date}</span>
                    </div>
                    <p className="enquiry-message">{enquiry.message}</p>
                    <p className="enquiry-property">Regarding: {enquiry.property}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;