import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles/PropertyDetails.css';

// Enhanced mock property data with real estate context
const mockPropertyDetails = {
  // 🏡 RESIDENTIAL - APARTMENT
  1: {
    id: 1,
    title: "3BHK Luxury Apartment in DLF Cyber Heights",
    description: "Spacious 3 bedroom apartment with premium finishes, marble flooring, and panoramic city views. Located in premium DLF sector with world-class amenities and 24/7 security. Perfect for corporate professionals and families seeking luxury living.",
    price: 28500000,
    location: "Gurgaon",
    address: "DLF Cyber Heights, Tower B, Sector 25, Gurgaon - 122002",
    propertyType: "Apartment",
    propertySubType: "3BHK",
    category: "residential",
    
    // Residential Apartment Specific
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    area: 1850,
    carpetArea: 1650,
    superArea: 1850,
    floorNumber: 12,
    totalFloors: 18,
    facing: "North-East",
    unitNumber: "1203",
    yearBuilt: 2020,
    ageOfProperty: 3,
    maintenanceCharges: 6500,
    possessionStatus: "Ready to Move",
    parking: 2,
    
    // Additional Details
    furnishing: "Semi-Furnished",
    overlooking: "City View",
    waterSupply: "24/7 Corporation",
    flooring: "Marble & Vitrified",
    
    amenities: ["Swimming Pool", "Gym", "Club House", "24/7 Security", "Power Backup", "Park", "Children's Play Area", "Landscaped Gardens", "Indoor Games", "Party Hall"],
    owner: {
      id: 101,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@dlf.com",
      phone: "+91 98765 43210",
      joinDate: "2018-05-15",
      propertiesOwned: 3
    },
    documents: [
      { id: 1, name: "Property Deed", type: "pdf", size: "2.4 MB", uploadDate: "2023-01-15" },
      { id: 2, name: "Approval Plans", type: "pdf", size: "5.1 MB", uploadDate: "2023-01-10" },
      { id: 3, name: "Tax Receipts", type: "pdf", size: "1.2 MB", uploadDate: "2023-01-05" },
      { id: 4, name: "Maintenance Bills", type: "pdf", size: "0.8 MB", uploadDate: "2023-01-20" },
      { id: 5, name: "Property Photos", type: "zip", size: "15.7 MB", uploadDate: "2023-01-20" }
    ],
    isActive: true,
    createdAt: "2023-01-01"
  },

  // 🏡 RESIDENTIAL - VILLA
  2: {
    id: 2,
    title: "DLF Magnolia Luxury Villa",
    description: "Premium independent villa with private garden, modern architecture, and premium amenities in gated community. Features Italian marble flooring, modular kitchen, and smart home automation.",
    price: 45000000,
    location: "Gurgaon",
    address: "DLF Magnolias, Sector 42, Gurgaon - 122002",
    propertyType: "Villa",
    propertySubType: "4BHK Independent Villa",
    category: "residential",
    
    // Villa Specific
    bedrooms: 4,
    bathrooms: 4,
    balconies: 3,
    area: 4500,
    plotArea: 6000,
    builtUpArea: 4200,
    numberOfFloors: 3,
    gardenArea: 800,
    carParking: 3,
    yearBuilt: 2021,
    ageOfProperty: 2,
    maintenanceCharges: 12000,
    possessionStatus: "Ready to Move",
    
    // Additional Details
    furnishing: "Fully-Furnished",
    overlooking: "Garden & Park",
    waterSupply: "24/7 Borewell + Corporation",
    flooring: "Italian Marble",
    servantQuarter: true,
    homeAutomation: true,
    
    amenities: ["Private Garden", "Swimming Pool", "Home Theater", "Servant Quarter", "Private Parking", "Security", "Landscaped Lawns", "Barbecue Area", "Solar Panels"],
    owner: {
      id: 102,
      name: "Priya Patel",
      email: "priya.patel@dlf.com",
      phone: "+91 98765 43211",
      joinDate: "2019-03-20",
      propertiesOwned: 5
    },
    documents: [
      { id: 1, name: "Property Deed", type: "pdf", size: "3.2 MB", uploadDate: "2023-01-15" },
      { id: 2, name: "Building Plans", type: "pdf", size: "8.1 MB", uploadDate: "2023-01-10" },
      { id: 3, name: "Tax Receipts", type: "pdf", size: "2.1 MB", uploadDate: "2023-01-05" },
      { id: 4, name: "Villa Photos", type: "zip", size: "25.3 MB", uploadDate: "2023-01-20" }
    ],
    isActive: true,
    createdAt: "2023-01-01"
  },

  // 🏢 COMMERCIAL - OFFICE SPACE
  3: {
    id: 3,
    title: "DLF Cyber Park Office Space",
    description: "Premium office space in IT park with modern amenities, high-speed connectivity, and excellent location. Ideal for IT companies, startups, and corporate offices.",
    price: 35000000,
    location: "Gurgaon",
    address: "DLF Cyber Park, Tower A, 8th Floor, Sector 25, Gurgaon - 122002",
    propertyType: "Office Space",
    propertySubType: "IT Park Office",
    category: "commercial",
    
    // Commercial Office Specific
    area: 2200,
    carpetArea: 1950,
    floorPlate: 15000,
    floorNumber: 8,
    totalFloors: 15,
    leaseType: "Triple Net",
    fitOutStatus: "Shell & Core",
    parkingSpaces: 8,
    meetingRooms: 4,
    cabins: 6,
    workstations: 40,
    
    // Additional Details
    powerBackup: "100% DG Backup",
    internet: "Fiber Optic Ready",
    acType: "Central AC",
    minimumLease: "3 years",
    
    amenities: ["High-Speed Internet", "Conference Rooms", "Cafeteria", "24/7 Power Backup", "Security", "Parking", "Reception", "Pantry", "Fire Safety"],
    owner: {
      id: 103,
      name: "Amit Kumar",
      email: "amit.kumar@dlf.com",
      phone: "+91 98765 43212",
      joinDate: "2017-11-10",
      propertiesOwned: 1
    },
    documents: [
      { id: 1, name: "Lease Agreement", type: "pdf", size: "4.2 MB", uploadDate: "2023-01-15" },
      { id: 2, name: "Floor Plans", type: "pdf", size: "6.8 MB", uploadDate: "2023-01-10" },
      { id: 3, name: "Fire NOC", type: "pdf", size: "1.5 MB", uploadDate: "2023-01-05" },
      { id: 4, name: "Office Photos", type: "zip", size: "18.9 MB", uploadDate: "2023-01-20" }
    ],
    isActive: true,
    createdAt: "2023-01-01"
  },

  // 🏢 COMMERCIAL - RETAIL SPACE
  4: {
    id: 4,
    title: "DLF Promenade Retail Shop",
    description: "Prime retail space in premium shopping mall with high footfall and excellent visibility. Perfect for luxury brands, restaurants, and retail businesses.",
    price: 28000000,
    location: "Delhi",
    address: "DLF Promenade, Ground Floor, Vasant Kunj, Delhi - 110070",
    propertyType: "Retail Space",
    propertySubType: "Shopping Mall Retail",
    category: "commercial",
    
    // Retail Specific
    area: 1200,
    carpetArea: 1050,
    frontageWidth: 45,
    footfall: "High",
    storageArea: 200,
    showroomHeight: 14,
    displayWindows: 3,
    mallLevel: "Ground Floor",
    
    // Additional Details
    businessType: "Retail",
    mallTimings: "10:00 AM - 10:00 PM",
    maintenanceIncludes: "Common Area, Security, AC",
    
    amenities: ["Mall Amenities", "Parking", "Security", "AC", "High Visibility", "Escalator Access", "Food Court", "Restrooms"],
    owner: {
      id: 104,
      name: "Neha Singh",
      email: "neha.singh@dlf.com",
      phone: "+91 98765 43213",
      joinDate: "2020-08-25",
      propertiesOwned: 2
    },
    documents: [
      { id: 1, name: "Mall Agreement", type: "pdf", size: "3.8 MB", uploadDate: "2023-01-15" },
      { id: 2, name: "Floor Layout", type: "pdf", size: "4.2 MB", uploadDate: "2023-01-10" },
      { id: 3, name: "Business License", type: "pdf", size: "1.1 MB", uploadDate: "2023-01-05" }
    ],
    isActive: true,
    createdAt: "2023-01-01"
  },

  // 🏭 INDUSTRIAL - WAREHOUSE
  5: {
    id: 5,
    title: "DLF Industrial Park Warehouse",
    description: "Modern warehouse facility with loading docks, high clearance, and excellent connectivity to highways. Suitable for logistics, manufacturing, and storage businesses.",
    price: 18500000,
    location: "Bhiwadi",
    address: "DLF Industrial Park, Unit 45, Bhiwadi, Rajasthan - 301019",
    propertyType: "Warehouse",
    propertySubType: "Industrial Warehouse",
    category: "industrial",
    
    // Industrial Specific
    area: 10000,
    clearHeight: 32,
    loadingDocks: 6,
    powerSupply: "3 Phase",
    floorLoadCapacity: "8 tons/sq.m",
    craneCapacity: "15 tons",
    officeArea: 400,
    
    // Additional Details
    industrialZone: "General Industry",
    approachRoad: "32 ft wide",
    truckParking: 8,
    fireSafety: "Sprinkler System",
    
    amenities: ["Loading Docks", "Office Space", "Security", "Parking", "Power Backup", "CCTV", "Boundary Wall", "Water Supply"],
    owner: {
      id: 105,
      name: "Rohan Sharma",
      email: "rohan.sharma@dlf.com",
      phone: "+91 98765 43214",
      joinDate: "2018-12-05",
      propertiesOwned: 1
    },
    documents: [
      { id: 1, name: "Industrial License", type: "pdf", size: "2.9 MB", uploadDate: "2023-01-15" },
      { id: 2, name: "Warehouse Plans", type: "pdf", size: "7.3 MB", uploadDate: "2023-01-10" },
      { id: 3, name: "Pollution NOC", type: "pdf", size: "1.8 MB", uploadDate: "2023-01-05" }
    ],
    isActive: true,
    createdAt: "2023-01-01"
  },

  // 🏞️ RESIDENTIAL - PLOT
  6: {
    id: 6,
    title: "DLF Residential Plot in Sector 25",
    description: "Premium residential plot in approved sector with all utilities and excellent location. Ready for construction with clear title and all approvals.",
    price: 12500000,
    location: "Gurgaon",
    address: "DLF Sector 25, Plot No. 45, Gurgaon - 122002",
    propertyType: "Plot",
    propertySubType: "Residential Plot",
    category: "residential",
    
    // Plot Specific
    area: 3000,
    plotArea: 3000,
    dimensions: "60x50",
    facing: "East",
    soilType: "Alluvial",
    approvalStatus: "DTCP Approved",
    
    // Additional Details
    constructionAllowed: "G+2",
    farAllowed: "1.75",
    waterConnection: "Available",
    electricity: "Available",
    sewage: "Available",
    roadWidth: "60 ft",
    
    amenities: ["Water Connection", "Electricity", "Sewage", "Road Access", "Street Lights", "Drainage"],
    owner: {
      id: 106,
      name: "Sneha Reddy",
      email: "sneha.reddy@dlf.com",
      phone: "+91 98765 43215",
      joinDate: "2019-07-15",
      propertiesOwned: 4
    },
    documents: [
      { id: 1, name: "Plot Deed", type: "pdf", size: "2.1 MB", uploadDate: "2023-01-15" },
      { id: 2, name: "Approval Maps", type: "pdf", size: "3.4 MB", uploadDate: "2023-01-10" },
      { id: 3, name: "Title Clearance", type: "pdf", size: "1.2 MB", uploadDate: "2023-01-05" },
      { id: 4, name: "NOC Documents", type: "zip", size: "5.6 MB", uploadDate: "2023-01-20" }
    ],
    isActive: true,
    createdAt: "2023-01-01"
  }
};

// Generate more properties for IDs 7-50
for (let i = 7; i <= 50; i++) {
  const categories = ['residential', 'commercial', 'industrial'];
  const category = categories[Math.floor(Math.random() * categories.length)];
  
  let property = {
    id: i,
    title: `DLF ${category.charAt(0).toUpperCase() + category.slice(1)} Property ${i}`,
    description: `Premium ${category} property with excellent features and prime location in DLF development.`,
    price: Math.floor(Math.random() * 50000000) + 5000000,
    location: ['Gurgaon', 'Delhi', 'Noida', 'Mumbai', 'Bangalore'][Math.floor(Math.random() * 5)],
    address: `DLF Sector ${Math.floor(Math.random() * 50) + 1}`,
    category: category,
    isActive: true,
    createdAt: "2023-01-01",
    owner: {
      id: 100 + i,
      name: `Owner ${i}`,
      email: `owner${i}@dlf.com`,
      phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      joinDate: "2018-05-15",
      propertiesOwned: Math.floor(Math.random() * 5) + 1
    },
    documents: [
      { id: 1, name: "Property Deed", type: "pdf", size: "2.4 MB", uploadDate: "2023-01-15" },
      { id: 2, name: "Approval Plans", type: "pdf", size: "5.1 MB", uploadDate: "2023-01-10" }
    ]
  };

  // Add category-specific attributes
  if (category === 'residential') {
    const types = ['Apartment', 'Villa', 'Plot'];
    property.propertyType = types[Math.floor(Math.random() * types.length)];
    
    if (property.propertyType === 'Apartment') {
      property.propertySubType = ['1BHK', '2BHK', '3BHK', '4BHK'][Math.floor(Math.random() * 4)];
      property.bedrooms = parseInt(property.propertySubType[0]);
      property.bathrooms = Math.max(property.bedrooms - 1, 1);
      property.area = [800, 1200, 1850, 2400][property.bedrooms - 1];
      property.floorNumber = Math.floor(Math.random() * 20) + 1;
      property.totalFloors = 20;
      property.facing = ['North', 'South', 'East', 'West', 'North-East', 'South-West'][Math.floor(Math.random() * 6)];
      property.yearBuilt = 2015 + Math.floor(Math.random() * 8);
      property.parking = Math.floor(Math.random() * 2) + 1;
    } else if (property.propertyType === 'Villa') {
      property.bedrooms = Math.floor(Math.random() * 4) + 2;
      property.bathrooms = property.bedrooms;
      property.area = Math.floor(Math.random() * 4000) + 2000;
      property.plotArea = property.area + 1000;
      property.numberOfFloors = Math.floor(Math.random() * 2) + 2;
      property.yearBuilt = 2015 + Math.floor(Math.random() * 8);
      property.parking = Math.floor(Math.random() * 3) + 2;
    } else { // Plot
      property.area = Math.floor(Math.random() * 5000) + 1000;
      property.plotArea = property.area;
      property.dimensions = `${Math.floor(Math.random() * 80) + 40}x${Math.floor(Math.random() * 60) + 30}`;
    }
    
  } else if (category === 'commercial') {
    const types = ['Office Space', 'Retail Space'];
    property.propertyType = types[Math.floor(Math.random() * types.length)];
    property.area = Math.floor(Math.random() * 5000) + 1000;
    property.carpetArea = property.area * 0.85;
    
  } else if (category === 'industrial') {
    property.propertyType = 'Warehouse';
    property.area = Math.floor(Math.random() * 20000) + 5000;
    property.clearHeight = Math.floor(Math.random() * 20) + 25;
  }

  mockPropertyDetails[i] = property;
}

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enquiryForm, setEnquiryForm] = useState({
    message: '',
    visitDate: '',
    budget: '',
    purpose: ''
  });
  const [enquirySent, setEnquirySent] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    // Simulate API call to fetch property details
    setTimeout(() => {
      const propertyData = mockPropertyDetails[id];
      if (propertyData) {
        setProperty(propertyData);
      }
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiryForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendEnquiry = (e) => {
    e.preventDefault();
    
    // Simulate API call to send enquiry
    setTimeout(() => {
      setEnquirySent(true);
      setEnquiryForm({ message: '', visitDate: '', budget: '', purpose: '' });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setEnquirySent(false);
      }, 5000);
    }, 1000);
  };

  const handleDocumentAccess = (document) => {
    // 🎭 DEMO MODE: Show metadata but don't allow actual download
    alert(`DEMO MODE: Document access simulated\n\n📄 ${document.name}\n📁 Type: ${document.type}\n💾 Size: ${document.size}\n📅 Uploaded: ${document.uploadDate}\n\nIn production, this would download the actual file.`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getPropertyIcon = (category) => {
    switch(category) {
      case 'residential': return '🏡';
      case 'commercial': return '🏢';
      case 'industrial': return '🏭';
      default: return '🏠';
    }
  };

  const renderCategorySpecificDetails = () => {
    if (!property) return null;

    switch(property.category) {
      case 'residential':
        return (
          <div className="category-details">
            <h4>🏡 Residential Details</h4>
            <div className="details-grid">
              {property.bedrooms && (
                <div className="detail-item">
                  <strong>Bedrooms:</strong>
                  <span>{property.bedrooms} BHK</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="detail-item">
                  <strong>Bathrooms:</strong>
                  <span>{property.bathrooms}</span>
                </div>
              )}
              {property.balconies && (
                <div className="detail-item">
                  <strong>Balconies:</strong>
                  <span>{property.balconies}</span>
                </div>
              )}
              {property.floorNumber && (
                <div className="detail-item">
                  <strong>Floor:</strong>
                  <span>{property.floorNumber}/{property.totalFloors}</span>
                </div>
              )}
              {property.facing && (
                <div className="detail-item">
                  <strong>Facing:</strong>
                  <span>{property.facing}</span>
                </div>
              )}
              {property.furnishing && (
                <div className="detail-item">
                  <strong>Furnishing:</strong>
                  <span>{property.furnishing}</span>
                </div>
              )}
              {property.ageOfProperty && (
                <div className="detail-item">
                  <strong>Property Age:</strong>
                  <span>{property.ageOfProperty} years</span>
                </div>
              )}
              {property.possessionStatus && (
                <div className="detail-item">
                  <strong>Possession:</strong>
                  <span>{property.possessionStatus}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 'commercial':
        return (
          <div className="category-details">
            <h4>🏢 Commercial Details</h4>
            <div className="details-grid">
              {property.carpetArea && (
                <div className="detail-item">
                  <strong>Carpet Area:</strong>
                  <span>{property.carpetArea.toLocaleString()} sq.ft.</span>
                </div>
              )}
              {property.floorPlate && (
                <div className="detail-item">
                  <strong>Floor Plate:</strong>
                  <span>{property.floorPlate.toLocaleString()} sq.ft.</span>
                </div>
              )}
              {property.leaseType && (
                <div className="detail-item">
                  <strong>Lease Type:</strong>
                  <span>{property.leaseType}</span>
                </div>
              )}
              {property.fitOutStatus && (
                <div className="detail-item">
                  <strong>Fit-Out:</strong>
                  <span>{property.fitOutStatus}</span>
                </div>
              )}
              {property.parkingSpaces && (
                <div className="detail-item">
                  <strong>Parking Spaces:</strong>
                  <span>{property.parkingSpaces}</span>
                </div>
              )}
              {property.meetingRooms && (
                <div className="detail-item">
                  <strong>Meeting Rooms:</strong>
                  <span>{property.meetingRooms}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 'industrial':
        return (
          <div className="category-details">
            <h4>🏭 Industrial Details</h4>
            <div className="details-grid">
              {property.clearHeight && (
                <div className="detail-item">
                  <strong>Clear Height:</strong>
                  <span>{property.clearHeight} feet</span>
                </div>
              )}
              {property.loadingDocks && (
                <div className="detail-item">
                  <strong>Loading Docks:</strong>
                  <span>{property.loadingDocks}</span>
                </div>
              )}
              {property.floorLoadCapacity && (
                <div className="detail-item">
                  <strong>Floor Load Capacity:</strong>
                  <span>{property.floorLoadCapacity}</span>
                </div>
              )}
              {property.craneCapacity && (
                <div className="detail-item">
                  <strong>Crane Capacity:</strong>
                  <span>{property.craneCapacity}</span>
                </div>
              )}
              {property.powerSupply && (
                <div className="detail-item">
                  <strong>Power Supply:</strong>
                  <span>{property.powerSupply}</span>
                </div>
              )}
              {property.officeArea && (
                <div className="detail-item">
                  <strong>Office Area:</strong>
                  <span>{property.officeArea} sq.ft.</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="property-loading">
        <div className="loading-spinner"></div>
        <p>Loading property details...</p>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-not-found">
        <h2>Property Not Found</h2>
        <p>The property you're looking for doesn't exist.</p>
        <Link to="/properties" className="back-to-properties">
          ← Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="property-details-page">
      {/* Header with Navigation */}
      <header className="property-header">
        <div className="container">
          <button onClick={() => navigate('/properties')} className="back-button">
            ← Back to Properties
          </button>
          <div className="property-title-section">
            <h1>{property.title}</h1>
            <div className="property-category-badge">
              <span className={`category-badge ${property.category}`}>
                {getPropertyIcon(property.category)} {property.category.toUpperCase()}
              </span>
              {property.propertySubType && (
                <span className="subtype-badge">
                  {property.propertySubType}
                </span>
              )}
            </div>
          </div>
          <p className="property-address">📍 {property.address}</p>
        </div>
      </header>

      <div className="container">
        <div className="property-layout">
          {/* Main Content */}
          <div className="property-main">
            {/* Property Image Gallery */}
            <div className="property-gallery">
              <div className="main-image">
                <div className="image-placeholder">
                  {getPropertyIcon(property.category)} {property.propertyType}
                </div>
              </div>
            </div>

            {/* Price Section */}
            <div className="price-section">
              <h2>{formatPrice(property.price)}</h2>
              <div className="property-meta">
                {property.category === 'residential' && (
                  <>
                    {property.bedrooms && <span>🛏️ {property.bedrooms} Bedrooms</span>}
                    {property.bathrooms && <span>🚿 {property.bathrooms} Bathrooms</span>}
                    <span>📐 {property.area?.toLocaleString()} sq.ft.</span>
                    {property.parking && <span>🚗 {property.parking} Parking</span>}
                  </>
                )}
                {property.category === 'commercial' && (
                  <>
                    <span>📐 {property.area?.toLocaleString()} sq.ft.</span>
                    {property.carpetArea && <span>📦 {property.carpetArea.toLocaleString()} carpet</span>}
                    <span>🏢 {property.propertyType}</span>
                  </>
                )}
                {property.category === 'industrial' && (
                  <>
                    <span>🏭 {property.area?.toLocaleString()} sq.ft.</span>
                    {property.clearHeight && <span>📏 {property.clearHeight}ft height</span>}
                    <span>🏗️ {property.propertyType}</span>
                  </>
                )}
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="tabs-navigation">
              <button 
                className={activeTab === 'details' ? 'tab-active' : ''}
                onClick={() => setActiveTab('details')}
              >
                📋 Details
              </button>
              <button 
                className={activeTab === 'documents' ? 'tab-active' : ''}
                onClick={() => setActiveTab('documents')}
              >
                📄 Documents
              </button>
              <button 
                className={activeTab === 'enquiry' ? 'tab-active' : ''}
                onClick={() => setActiveTab('enquiry')}
              >
                💬 Send Enquiry
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Details Tab */}
              {activeTab === 'details' && (
                <div className="details-content">
                  <h3>Property Description</h3>
                  <p>{property.description}</p>

                  {/* Category Specific Details */}
                  {renderCategorySpecificDetails()}

                  {/* General Details */}
                  <h3>Property Specifications</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <strong>Property Type:</strong>
                      <span>{property.propertyType}</span>
                    </div>
                    {property.yearBuilt && (
                      <div className="detail-item">
                        <strong>Year Built:</strong>
                        <span>{property.yearBuilt}</span>
                      </div>
                    )}
                    <div className="detail-item">
                      <strong>Location:</strong>
                      <span>{property.location}</span>
                    </div>
                    <div className="detail-item">
                      <strong>Total Area:</strong>
                      <span>{property.area?.toLocaleString()} sq.ft.</span>
                    </div>
                    {property.plotArea && property.plotArea !== property.area && (
                      <div className="detail-item">
                        <strong>Plot Area:</strong>
                        <span>{property.plotArea.toLocaleString()} sq.ft.</span>
                      </div>
                    )}
                    {property.dimensions && (
                      <div className="detail-item">
                        <strong>Dimensions:</strong>
                        <span>{property.dimensions}</span>
                      </div>
                    )}
                  </div>

                  <h3>Amenities & Features</h3>
                  <div className="amenities-grid">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        ✅ {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div className="documents-content">
                  <h3>Property Documents</h3>
                  <p className="demo-notice">
                    🔒 <strong>DEMO MODE:</strong> Document access is simulated. Only metadata is shown for security.
                  </p>

                  <div className="documents-list">
                    {property.documents.map((doc) => (
                      <div key={doc.id} className="document-card">
                        <div className="document-icon">
                          {doc.type === 'pdf' ? '📄' : '📁'}
                        </div>
                        <div className="document-info">
                          <h4>{doc.name}</h4>
                          <p>Type: {doc.type.toUpperCase()} • Size: {doc.size} • Uploaded: {doc.uploadDate}</p>
                        </div>
                        <button 
                          onClick={() => handleDocumentAccess(doc)}
                          className="view-document-btn"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Enquiry Tab */}
              {activeTab === 'enquiry' && (
                <div className="enquiry-content">
                  <h3>Send Enquiry to Owner</h3>
                  
                  {enquirySent && (
                    <div className="success-message">
                      ✅ Your enquiry has been sent successfully! The property owner will contact you soon.
                    </div>
                  )}

                  <form onSubmit={handleSendEnquiry} className="enquiry-form">
                    <div className="form-group">
                      <label>Your Message to the Owner *</label>
                      <textarea
                        name="message"
                        value={enquiryForm.message}
                        onChange={handleEnquiryChange}
                        placeholder={`Tell the owner about your interest in this ${property.propertyType.toLowerCase()}, ask questions, or request a viewing...`}
                        rows="5"
                        required
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Preferred Visit Date</label>
                        <input
                          type="date"
                          name="visitDate"
                          value={enquiryForm.visitDate}
                          onChange={handleEnquiryChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Your Budget (₹)</label>
                        <input
                          type="number"
                          name="budget"
                          value={enquiryForm.budget}
                          onChange={handleEnquiryChange}
                          placeholder="Enter your budget"
                        />
                      </div>

                      <div className="form-group">
                        <label>Purpose</label>
                        <select
                          name="purpose"
                          value={enquiryForm.purpose}
                          onChange={handleEnquiryChange}
                        >
                          <option value="">Select Purpose</option>
                          <option value="buy">Buy</option>
                          <option value="rent">Rent</option>
                          <option value="lease">Lease</option>
                          <option value="investment">Investment</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="send-enquiry-btn">
                      📧 Send Enquiry
                    </button>
                  </form>

                  <div className="owner-contact-info">
                    <h4>Property Owner Information</h4>
                    <div className="owner-details">
                      <p><strong>Name:</strong> {property.owner.name}</p>
                      <p><strong>Email:</strong> {property.owner.email}</p>
                      <p><strong>Phone:</strong> {property.owner.phone}</p>
                      <p><strong>DLF Member Since:</strong> {property.owner.joinDate}</p>
                      <p><strong>Properties Owned:</strong> {property.owner.propertiesOwned}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="property-sidebar">
            <div className="sidebar-card">
              <h3>Owner Information</h3>
              <div className="owner-card">
                <div className="owner-avatar">
                  👤
                </div>
                <div className="owner-info">
                  <h4>{property.owner.name}</h4>
                  <p>📧 {property.owner.email}</p>
                  <p>📞 {property.owner.phone}</p>
                  <p className="member-since">Member since {property.owner.joinDate}</p>
                  <p className="properties-owned">{property.owner.propertiesOwned} properties</p>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Quick Actions</h3>
              <button 
                onClick={() => setActiveTab('enquiry')}
                className="quick-action-btn primary"
              >
                💬 Contact Owner
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className="quick-action-btn"
              >
                📄 View Documents
              </button>
              <button className="quick-action-btn">
                📍 Schedule Visit
              </button>
              <button className="quick-action-btn">
                💰 Get Loan Estimate
              </button>
            </div>

            <div className="sidebar-card">
              <h3>Property ID</h3>
              <p className="property-id">DLF-{property.id.toString().padStart(6, '0')}</p>
              <p className="listed-date">Listed on {property.createdAt}</p>
              <p className="property-status">{property.isActive ? '🟢 Active' : '🔴 Inactive'}</p>
            </div>

            <div className="sidebar-card">
              <h3>Price Details</h3>
              <div className="price-breakdown">
                <p><strong>Asking Price:</strong> {formatPrice(property.price)}</p>
                <p><strong>Price per sq.ft:</strong> {formatPrice(property.price / property.area)}</p>
                {property.maintenanceCharges && (
                  <p><strong>Maintenance:</strong> ₹{property.maintenanceCharges}/month</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;