import React, { useState } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [transferForm, setTransferForm] = useState({
    propertyId: '',
    newOwnerId: ''
  });

  // Mock data
  const adminStats = {
    totalProperties: 102458,
    registeredUsers: 50182,
    pendingTransfers: 1247
  };

  const properties = [
    {
      id: 'PROP-001',
      name: 'DLF Cyber City Apartment',
      location: 'Gurgaon, Haryana',
      type: 'Residential',
      owner: 'Rohan Sharma'
    },
    {
      id: 'PROP-002', 
      name: 'DLF Magnolia Villa',
      location: 'Delhi',
      type: 'Residential',
      owner: 'Priya Patel'
    },
    {
      id: 'PROP-003',
      name: 'DLF Promenade Shop', 
      location: 'Mumbai, Maharashtra',
      type: 'Retail',
      owner: 'Amit Kumar'
    },
    {
      id: 'PROP-004',
      name: 'DLF Downtown Office',
      location: 'Bangalore, Karnataka', 
      type: 'Commercial',
      owner: 'Neha Singh'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Rohan Sharma',
      email: 'rohan@email.com',
      properties: 3,
      enquiries: 12,
      status: 'Active',
      initials: 'RS'
    },
    {
      id: 2,
      name: 'Priya Patel',
      email: 'priya@email.com', 
      properties: 5,
      enquiries: 8,
      status: 'Active',
      initials: 'PP'
    },
    {
      id: 3,
      name: 'Amit Kumar',
      email: 'amit@email.com',
      properties: 1, 
      enquiries: 3,
      status: 'Active',
      initials: 'AK'
    },
    {
      id: 4,
      name: 'Neha Singh',
      email: 'neha@email.com',
      properties: 2,
      enquiries: 7,
      status: 'Active',
      initials: 'NS'
    }
  ];

  const handleTransferChange = (e) => {
    const { name, value } = e.target;
    setTransferForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const transferOwnership = () => {
    if (!transferForm.propertyId || !transferForm.newOwnerId) {
      alert('❌ Please select both property and new owner');
      return;
    }

    const property = properties.find(p => p.id === transferForm.propertyId);
    const newOwner = users.find(u => u.id.toString() === transferForm.newOwnerId);

    if (confirm(`🔄 Confirm Ownership Transfer?\n\nProperty: ${property.name}\nNew Owner: ${newOwner.name}\n\nThis action cannot be undone.`)) {
      // Simulate API call
      setTimeout(() => {
        alert('✅ Ownership transferred successfully!\n\nThe property ownership has been updated and logged in the system.');
        
        // Reset form
        setTransferForm({ propertyId: '', newOwnerId: '' });
      }, 1000);
    }
  };

  const quickTransfer = (propertyId) => {
    setActiveTab('transfer');
    setTransferForm(prev => ({ ...prev, propertyId }));
    
    setTimeout(() => {
      alert('🔄 Switched to Transfer tab. Please select the new owner to complete the transfer.');
    }, 300);
  };

  return (
    <div className="admin-page">
      {/* ADMIN HEADER */}
      <div className="admin-header">
        <h1 className="admin-welcome">👑 DLF Admin Portal</h1>
        <p className="admin-subtitle">Manage properties, ownership transfers, and user accounts</p>
        
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{adminStats.totalProperties.toLocaleString()}</div>
            <div className="stat-label">Total Properties</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{adminStats.registeredUsers.toLocaleString()}</div>
            <div className="stat-label">Registered Users</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{adminStats.pendingTransfers.toLocaleString()}</div>
            <div className="stat-label">Pending Transfers</div>
          </div>
        </div>
      </div>

      {/* ADMIN TABS */}
      <div className="admin-tabs">
        <button 
          className={`admin-tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          🏢 All Properties
        </button>
        <button 
          className={`admin-tab-btn ${activeTab === 'transfer' ? 'active' : ''}`}
          onClick={() => setActiveTab('transfer')}
        >
          🔄 Transfer Ownership
        </button>
        <button 
          className={`admin-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          👥 All Users
        </button>
      </div>

      {/* ADMIN TAB CONTENT */}
      <div className="admin-tab-content">
        
        {/* ALL PROPERTIES TAB */}
        {activeTab === 'properties' && (
          <div className="admin-tab-pane active">
            <h2 className="admin-tab-title">🏢 All Properties ({adminStats.totalProperties.toLocaleString()})</h2>
            
            <div className="search-controls">
              <input type="text" className="search-input" placeholder="Search properties by name, location, owner..." />
              <select className="filter-select">
                <option>All Types</option>
                <option>Residential</option>
                <option>Commercial</option>
                <option>Retail</option>
              </select>
              <select className="filter-select">
                <option>All Cities</option>
                <option>Delhi</option>
                <option>Gurgaon</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
              </select>
            </div>

            <table className="properties-table">
              <thead>
                <tr>
                  <th>Property ID</th>
                  <th>Property Name</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Current Owner</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id}>
                    <td>#{property.id}</td>
                    <td>{property.name}</td>
                    <td>{property.location}</td>
                    <td>{property.type}</td>
                    <td><span className="owner-badge">{property.owner}</span></td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                      <button 
                        className="action-btn transfer-btn"
                        onClick={() => quickTransfer(property.id)}
                      >
                        Transfer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">...</button>
              <button className="page-btn">1024</button>
            </div>
          </div>
        )}

        {/* TRANSFER OWNERSHIP TAB */}
        {activeTab === 'transfer' && (
          <div className="admin-tab-pane active">
            <h2 className="admin-tab-title">🔄 Transfer Property Ownership</h2>
            
            <div className="transfer-form">
              <div className="form-group">
                <label className="form-label">Step 1: Select Property to Transfer</label>
                <select 
                  className="form-select" 
                  name="propertyId"
                  value={transferForm.propertyId}
                  onChange={handleTransferChange}
                >
                  <option value="">Choose a property...</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} - Current: {property.owner}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Step 2: Select New Owner</label>
                <select 
                  className="form-select" 
                  name="newOwnerId"
                  value={transferForm.newOwnerId}
                  onChange={handleTransferChange}
                >
                  <option value="">Choose new owner...</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email}) - {user.properties} properties
                    </option>
                  ))}
                </select>
              </div>

              <button className="transfer-btn-large" onClick={transferOwnership}>
                🔄 Transfer Ownership
              </button>

              <div className="transfer-info">
                <strong>⚠️ Important:</strong> This action will permanently transfer property ownership. 
                The transfer will be logged in the ownership history and cannot be undone automatically.
              </div>
            </div>
          </div>
        )}

        {/* ALL USERS TAB */}
        {activeTab === 'users' && (
          <div className="admin-tab-pane active">
            <h2 className="admin-tab-title">👥 All Users ({adminStats.registeredUsers.toLocaleString()})</h2>
            
            <div className="search-controls">
              <input type="text" className="search-input" placeholder="Search users by name, email..." />
              <select className="filter-select">
                <option>All Users</option>
                <option>Property Owners</option>
                <option>Regular Users</option>
              </select>
            </div>

            <div className="users-grid">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-header">
                    <div className="user-avatar">{user.initials}</div>
                    <div className="user-info">
                      <h3>{user.name}</h3>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <div className="user-stat-number">{user.properties}</div>
                      <div className="user-stat-label">Properties</div>
                    </div>
                    <div className="user-stat">
                      <div className="user-stat-number">{user.enquiries}</div>
                      <div className="user-stat-label">Enquiries</div>
                    </div>
                    <div className="user-stat">
                      <div className="user-stat-number">{user.status}</div>
                      <div className="user-stat-label">Status</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">...</button>
              <button className="page-btn">1254</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;