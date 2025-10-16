// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/PropertiesPage.css';

// // Enhanced mock data with proper real estate structure
// const mockProperties = [
//   // 🏡 RESIDENTIAL - APARTMENT
//   {
//     id: 1,
//     title: "3BHK Luxury Apartment in DLF Cyber Heights",
//     description: "Spacious 3 bedroom apartment with premium finishes, marble flooring, and panoramic city views. Located in premium DLF sector.",
//     price: 28500000,
//     location: "DLF Cyber City, Gurgaon",
//     address: "DLF Cyber Heights, Sector 25, Gurgaon",
//     propertyType: "Apartment",
//     propertySubType: "3BHK",
//     category: "residential",
    
//     // Residential Specific
//     bedrooms: 3,
//     bathrooms: 3,
//     balconies: 2,
//     area: 1850,
//     carpetArea: 1650,
//     floorNumber: 12,
//     totalFloors: 18,
//     facing: "North-East",
//     unitNumber: "1203",
    
//     ageOfProperty: 3,
//     maintenanceCharges: 6500,
//     possessionStatus: "Ready to Move",
    
//     amenities: ["Swimming Pool", "Gym", "Club House", "24/7 Security", "Power Backup", "Park", "Children's Play Area"],
//     isActive: true,
//     owner: "Rajesh Kumar"
//   },

//   // 🏡 RESIDENTIAL - VILLA
//   {
//     id: 2,
//     title: "DLF Magnolia Luxury Villa",
//     description: "Premium independent villa with private garden, modern architecture, and premium amenities in gated community.",
//     price: 45000000,
//     location: "DLF Magnolias, Gurgaon",
//     address: "DLF Magnolias, Sector 42, Gurgaon",
//     propertyType: "Villa",
//     propertySubType: "4BHK Independent Villa",
//     category: "residential",
    
//     // Villa Specific
//     bedrooms: 4,
//     bathrooms: 4,
//     area: 4500,
//     plotArea: 6000,
//     builtUpArea: 4200,
//     numberOfFloors: 3,
//     gardenArea: 800,
//     carParking: 3,
    
//     ageOfProperty: 2,
//     possessionStatus: "Ready to Move",
    
//     amenities: ["Private Garden", "Swimming Pool", "Home Theater", "Servant Quarter", "Private Parking", "Security"],
//     isActive: true,
//     owner: "Priya Patel"
//   },

//   // 🏢 COMMERCIAL - OFFICE SPACE
//   {
//     id: 3,
//     title: "DLF Cyber Park Office Space",
//     description: "Premium office space in IT park with modern amenities, high-speed connectivity, and excellent location.",
//     price: 35000000,
//     location: "DLF Cyber Park, Gurgaon",
//     address: "DLF Cyber Park, Tower A, Gurgaon",
//     propertyType: "Office Space",
//     propertySubType: "IT Park Office",
//     category: "commercial",
    
//     // Commercial Office Specific
//     area: 2200,
//     carpetArea: 1950,
//     floorPlate: 15000,
//     floorNumber: 8,
//     totalFloors: 15,
//     leaseType: "Triple Net",
//     fitOutStatus: "Shell & Core",
//     parkingSpaces: 8,
//     meetingRooms: 4,
    
//     amenities: ["High-Speed Internet", "Conference Rooms", "Cafeteria", "24/7 Power Backup", "Security", "Parking"],
//     isActive: true,
//     owner: "Amit Kumar"
//   },

//   // 🏢 COMMERCIAL - RETAIL SPACE
//   {
//     id: 4,
//     title: "DLF Promenade Retail Shop",
//     description: "Prime retail space in premium shopping mall with high footfall and excellent visibility.",
//     price: 28000000,
//     location: "DLF Promenade, Delhi",
//     address: "DLF Promenade, Vasant Kunj, Delhi",
//     propertyType: "Retail Space",
//     propertySubType: "Shopping Mall Retail",
//     category: "commercial",
    
//     // Retail Specific
//     area: 1200,
//     carpetArea: 1050,
//     frontageWidth: 45,
//     footfall: "High",
//     storageArea: 200,
//     showroomHeight: 14,
//     displayWindows: 3,
    
//     amenities: ["Mall Amenities", "Parking", "Security", "AC", "High Visibility"],
//     isActive: true,
//     owner: "Neha Singh"
//   },

//   // 🏭 INDUSTRIAL - WAREHOUSE
//   {
//     id: 5,
//     title: "DLF Industrial Park Warehouse",
//     description: "Modern warehouse facility with loading docks, high clearance, and excellent connectivity to highways.",
//     price: 18500000,
//     location: "DLF Industrial Park, Bhiwadi",
//     address: "DLF Industrial Park, Bhiwadi, Rajasthan",
//     propertyType: "Warehouse",
//     propertySubType: "Industrial Warehouse",
//     category: "industrial",
    
//     // Industrial Specific
//     area: 10000,
//     clearHeight: 32,
//     loadingDocks: 6,
//     powerSupply: "3 Phase",
//     floorLoadCapacity: "8 tons/sq.m",
//     craneCapacity: "15 tons",
    
//     amenities: ["Loading Docks", "Office Space", "Security", "Parking", "Power Backup"],
//     isActive: true,
//     owner: "Rohan Sharma"
//   },

//   // 🏞️ RESIDENTIAL - PLOT
//   {
//     id: 6,
//     title: "DLF Residential Plot in Sector 25",
//     description: "Premium residential plot in approved sector with all utilities and excellent location.",
//     price: 12500000,
//     location: "DLF Sector 25, Gurgaon",
//     address: "DLF Sector 25, Plot No. 45, Gurgaon",
//     propertyType: "Plot",
//     propertySubType: "Residential Plot",
//     category: "residential",
    
//     // Plot Specific
//     area: 3000,
//     plotArea: 3000,
//     dimensions: "60x50",
//     facing: "East",
//     soilType: "Alluvial",
//     approvalStatus: "DTCP Approved",
    
//     amenities: ["Water Connection", "Electricity", "Sewage", "Road Access"],
//     isActive: true,
//     owner: "Sneha Reddy"
//   }
// ];

// // Generate more diverse properties
// for (let i = 7; i <= 50; i++) {
//   const categories = ['residential', 'commercial', 'industrial'];
//   const category = categories[Math.floor(Math.random() * categories.length)];
  
//   let property = {
//     id: i,
//     title: `DLF ${category.charAt(0).toUpperCase() + category.slice(1)} Property ${i}`,
//     description: `Premium ${category} property with excellent features and prime location in DLF development.`,
//     price: Math.floor(Math.random() * 50000000) + 5000000,
//     location: ['Gurgaon', 'Delhi', 'Noida', 'Mumbai', 'Bangalore'][Math.floor(Math.random() * 5)],
//     address: `DLF Sector ${Math.floor(Math.random() * 50) + 1}`,
//     category: category,
//     isActive: true,
//     owner: `Owner ${Math.floor(Math.random() * 1000) + 1}`
//   };

//   // Add category-specific attributes
//   if (category === 'residential') {
//     const types = ['Apartment', 'Villa', 'Plot'];
//     property.propertyType = types[Math.floor(Math.random() * types.length)];
    
//     if (property.propertyType === 'Apartment') {
//       property.propertySubType = ['1BHK', '2BHK', '3BHK', '4BHK'][Math.floor(Math.random() * 4)];
//       property.bedrooms = parseInt(property.propertySubType[0]);
//       property.bathrooms = Math.max(property.bedrooms - 1, 1);
//       property.area = [800, 1200, 1850, 2400][property.bedrooms - 1];
//       property.floorNumber = Math.floor(Math.random() * 20) + 1;
//       property.totalFloors = 20;
//       property.facing = ['North', 'South', 'East', 'West', 'North-East', 'South-West'][Math.floor(Math.random() * 6)];
//     } else if (property.propertyType === 'Villa') {
//       property.bedrooms = Math.floor(Math.random() * 4) + 2;
//       property.bathrooms = property.bedrooms;
//       property.area = Math.floor(Math.random() * 4000) + 2000;
//       property.plotArea = property.area + 1000;
//       property.numberOfFloors = Math.floor(Math.random() * 2) + 2;
//     } else { // Plot
//       property.area = Math.floor(Math.random() * 5000) + 1000;
//       property.plotArea = property.area;
//       property.dimensions = `${Math.floor(Math.random() * 80) + 40}x${Math.floor(Math.random() * 60) + 30}`;
//     }
    
//   } else if (category === 'commercial') {
//     const types = ['Office Space', 'Retail Space'];
//     property.propertyType = types[Math.floor(Math.random() * types.length)];
//     property.area = Math.floor(Math.random() * 5000) + 1000;
//     property.carpetArea = property.area * 0.85;
    
//   } else if (category === 'industrial') {
//     property.propertyType = 'Warehouse';
//     property.area = Math.floor(Math.random() * 20000) + 5000;
//     property.clearHeight = Math.floor(Math.random() * 20) + 25;
//   }

//   mockProperties.push(property);
// }

// const PropertiesPage = () => {
//   const [properties, setProperties] = useState([]);
//   const [filteredProperties, setFilteredProperties] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filters, setFilters] = useState({
//     location: '',
//     minPrice: '',
//     maxPrice: '',
//     propertyCategory: '',
//     propertyType: '',
//     bedrooms: '',
//     minArea: '',
//     maxArea: ''
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(12);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate API call to fetch properties
//     setTimeout(() => {
//       setProperties(mockProperties);
//       setFilteredProperties(mockProperties);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   // Apply search and filters
//   useEffect(() => {
//     let result = properties;

//     // Search term filter
//     if (searchTerm) {
//       result = result.filter(property =>
//         property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Category filter
//     if (filters.propertyCategory) {
//       result = result.filter(property => property.category === filters.propertyCategory);
//     }

//     // Type filter
//     if (filters.propertyType) {
//       result = result.filter(property => property.propertyType === filters.propertyType);
//     }

//     // Location filter
//     if (filters.location) {
//       result = result.filter(property =>
//         property.location.toLowerCase().includes(filters.location.toLowerCase())
//       );
//     }

//     // Price range filter
//     if (filters.minPrice) {
//       result = result.filter(property => property.price >= parseInt(filters.minPrice));
//     }
//     if (filters.maxPrice) {
//       result = result.filter(property => property.price <= parseInt(filters.maxPrice));
//     }

//     // Bedrooms filter (only for residential)
//     if (filters.bedrooms && filters.propertyCategory === 'residential') {
//       result = result.filter(property => property.bedrooms >= parseInt(filters.bedrooms));
//     }

//     // Area filters
//     if (filters.minArea) {
//       result = result.filter(property => property.area >= parseInt(filters.minArea));
//     }
//     if (filters.maxArea) {
//       result = result.filter(property => property.area <= parseInt(filters.maxArea));
//     }

//     setFilteredProperties(result);
//     setCurrentPage(1);
//   }, [searchTerm, filters, properties]);

//   // Pagination
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const clearFilters = () => {
//     setSearchTerm('');
//     setFilters({
//       location: '',
//       minPrice: '',
//       maxPrice: '',
//       propertyCategory: '',
//       propertyType: '',
//       bedrooms: '',
//       minArea: '',
//       maxArea: ''
//     });
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0
//     }).format(price);
//   };

//   const getPropertyIcon = (category) => {
//     switch(category) {
//       case 'residential': return '🏡';
//       case 'commercial': return '🏢';
//       case 'industrial': return '🏭';
//       default: return '🏠';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="properties-loading">
//         <div className="loading-spinner"></div>
//         <p>Loading 100,000+ properties...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="properties-page">
//       {/* Header */}
//       <header className="properties-header">
//         <div className="container">
//           <h1>🏢 Browse DLF Properties</h1>
//           <p>Discover {filteredProperties.length.toLocaleString()} premium properties across residential, commercial, and industrial categories</p>
//         </div>
//       </header>

//       {/* Search and Filters */}
//       <section className="filters-section">
//         <div className="container">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search by title, location, type, or description..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="search-input"
//             />
//           </div>

//           <div className="filters-grid">
//             {/* Category Filter */}
//             <select name="propertyCategory" value={filters.propertyCategory} onChange={handleFilterChange}>
//               <option value="">All Categories</option>
//               <option value="residential">🏡 Residential</option>
//               <option value="commercial">🏢 Commercial</option>
//               <option value="industrial">🏭 Industrial</option>
//             </select>

//             {/* Type Filter (dynamic based on category) */}
//             <select name="propertyType" value={filters.propertyType} onChange={handleFilterChange}>
//               <option value="">All Types</option>
//               {filters.propertyCategory === 'residential' && (
//                 <>
//                   <option value="Apartment">Apartment</option>
//                   <option value="Villa">Villa</option>
//                   <option value="Plot">Plot</option>
//                 </>
//               )}
//               {filters.propertyCategory === 'commercial' && (
//                 <>
//                   <option value="Office Space">Office Space</option>
//                   <option value="Retail Space">Retail Space</option>
//                 </>
//               )}
//               {filters.propertyCategory === 'industrial' && (
//                 <option value="Warehouse">Warehouse</option>
//               )}
//               {!filters.propertyCategory && (
//                 <>
//                   <option value="Apartment">Apartment</option>
//                   <option value="Villa">Villa</option>
//                   <option value="Plot">Plot</option>
//                   <option value="Office Space">Office Space</option>
//                   <option value="Retail Space">Retail Space</option>
//                   <option value="Warehouse">Warehouse</option>
//                 </>
//               )}
//             </select>

//             <select name="location" value={filters.location} onChange={handleFilterChange}>
//               <option value="">All Locations</option>
//               <option value="Gurgaon">Gurgaon</option>
//               <option value="Delhi">Delhi</option>
//               <option value="Noida">Noida</option>
//               <option value="Mumbai">Mumbai</option>
//               <option value="Bangalore">Bangalore</option>
//               <option value="Bhiwadi">Bhiwadi</option>
//             </select>

//             <input
//               type="number"
//               name="minPrice"
//               placeholder="Min Price (₹)"
//               value={filters.minPrice}
//               onChange={handleFilterChange}
//             />

//             <input
//               type="number"
//               name="maxPrice"
//               placeholder="Max Price (₹)"
//               value={filters.maxPrice}
//               onChange={handleFilterChange}
//             />

//             {/* Bedrooms filter (only for residential) */}
//             {filters.propertyCategory === 'residential' && (
//               <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
//                 <option value="">Any Bedrooms</option>
//                 <option value="1">1+ Bedrooms</option>
//                 <option value="2">2+ Bedrooms</option>
//                 <option value="3">3+ Bedrooms</option>
//                 <option value="4">4+ Bedrooms</option>
//               </select>
//             )}

//             {/* Area filters */}
//             <input
//               type="number"
//               name="minArea"
//               placeholder="Min Area (sq.ft)"
//               value={filters.minArea}
//               onChange={handleFilterChange}
//             />

//             <input
//               type="number"
//               name="maxArea"
//               placeholder="Max Area (sq.ft)"
//               value={filters.maxArea}
//               onChange={handleFilterChange}
//             />

//             <button onClick={clearFilters} className="clear-filters-btn">
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Properties Grid */}
//       <section className="properties-grid-section">
//         <div className="container">
//           <div className="properties-meta">
//             <p>Showing {currentProperties.length} of {filteredProperties.length.toLocaleString()} properties</p>
//             {filters.propertyCategory && (
//               <p className="filter-active">
//                 Category: <strong>{filters.propertyCategory}</strong>
//                 {filters.propertyType && ` • Type: ${filters.propertyType}`}
//               </p>
//             )}
//           </div>

//           <div className="properties-grid">
//             {currentProperties.map(property => (
//               <div key={property.id} className="property-card">
//                 <div className="property-image">
//                   <div className="image-placeholder">
//                     {getPropertyIcon(property.category)}
//                   </div>
//                   <div className="property-badge">
//                     {property.propertyType}
//                   </div>
//                 </div>
//                 <div className="property-content">
//                   <h3>{property.title}</h3>
//                   <p className="property-location">📍 {property.location}</p>
//                   <p className="property-price">{formatPrice(property.price)}</p>
                  
//                   <div className="property-features">
//                     {property.category === 'residential' && (
//                       <>
//                         {property.bedrooms && <span>🛏️ {property.bedrooms} beds</span>}
//                         {property.bathrooms && <span>🚿 {property.bathrooms} baths</span>}
//                         <span>📐 {property.area?.toLocaleString()} sq.ft.</span>
//                         {property.propertyType === 'Apartment' && property.floorNumber && (
//                           <span>🏢 Floor {property.floorNumber}/{property.totalFloors}</span>
//                         )}
//                       </>
//                     )}
//                     {property.category === 'commercial' && (
//                       <>
//                         <span>📐 {property.area?.toLocaleString()} sq.ft.</span>
//                         <span>🏢 {property.propertyType}</span>
//                         {property.carpetArea && <span>📦 {property.carpetArea.toLocaleString()} carpet</span>}
//                       </>
//                     )}
//                     {property.category === 'industrial' && (
//                       <>
//                         <span>🏭 {property.area?.toLocaleString()} sq.ft.</span>
//                         <span>📏 {property.clearHeight}ft height</span>
//                         <span>🏗️ Warehouse</span>
//                       </>
//                     )}
//                   </div>
                  
//                   <p className="property-description">{property.description}</p>
//                   <div className="property-meta-info">
//                     <span className="property-category">{property.category.toUpperCase()}</span>
//                     {property.propertySubType && (
//                       <span className="property-subtype">{property.propertySubType}</span>
//                     )}
//                   </div>
//                   <div className="property-actions">
//                     <Link to={`/properties/${property.id}`} className="view-details-btn">
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="pagination">
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </button>
              
//               <span>Page {currentPage} of {totalPages}</span>
              
//               <button 
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default PropertiesPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PropertiesPage.css';

const API_BASE_URL = 'http://localhost:8000/api';

const PropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    category: '',
    property_type: '',
    bedrooms: '',
    minArea: '',
    maxArea: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [loading, setLoading] = useState(true);
  const [totalProperties, setTotalProperties] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch properties from API
  const fetchProperties = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      
      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: itemsPerPage.toString(),
        ...filters
      });
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`${API_BASE_URL}/properties?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      
      const data = await response.json();
      
      setProperties(data.properties);
      setFilteredProperties(data.properties);
      setTotalProperties(data.total);
      setTotalPages(data.pages);
      setCurrentPage(data.page);
      
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Fallback to empty array
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load and when filters change
  useEffect(() => {
    const appliedFilters = {};
    
    // Add non-empty filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        appliedFilters[key] = value;
      }
    });

    fetchProperties(1, appliedFilters);
  }, [searchTerm, filters]);

  // Handle page change
  const handlePageChange = (newPage) => {
    const appliedFilters = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== '') {
        appliedFilters[key] = value;
      }
    });

    fetchProperties(newPage, appliedFilters);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      location: '',
      minPrice: '',
      maxPrice: '',
      category: '',
      property_type: '',
      bedrooms: '',
      minArea: '',
      maxArea: ''
    });
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

  // Parse amenities from JSON string if needed
  const parseAmenities = (amenities) => {
    if (Array.isArray(amenities)) return amenities;
    if (typeof amenities === 'string') {
      try {
        return JSON.parse(amenities);
      } catch {
        return [];
      }
    }
    return [];
  };

  if (loading && properties.length === 0) {
    return (
      <div className="properties-loading">
        <div className="loading-spinner"></div>
        <p>Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="properties-page">
      {/* Header */}
      <header className="properties-header">
        <div className="container">
          <h1>🏢 Browse DLF Properties</h1>
          <p>Discover {totalProperties.toLocaleString()} premium properties across residential, commercial, and industrial categories</p>
        </div>
      </header>

      {/* Search and Filters */}
      <section className="filters-section">
        <div className="container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by title, location, type, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-grid">
            {/* Category Filter */}
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              <option value="residential">🏡 Residential</option>
              <option value="commercial">🏢 Commercial</option>
              <option value="industrial">🏭 Industrial</option>
            </select>

            {/* Type Filter (dynamic based on category) */}
            <select name="property_type" value={filters.property_type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {filters.category === 'residential' && (
                <>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                </>
              )}
              {filters.category === 'commercial' && (
                <>
                  <option value="Office Space">Office Space</option>
                  <option value="Retail Space">Retail Space</option>
                </>
              )}
              {filters.category === 'industrial' && (
                <option value="Warehouse">Warehouse</option>
              )}
              {!filters.category && (
                <>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Plot">Plot</option>
                  <option value="Office Space">Office Space</option>
                  <option value="Retail Space">Retail Space</option>
                  <option value="Warehouse">Warehouse</option>
                </>
              )}
            </select>

            <select name="location" value={filters.location} onChange={handleFilterChange}>
              <option value="">All Locations</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Bhiwadi">Bhiwadi</option>
            </select>

            <input
              type="number"
              name="minPrice"
              placeholder="Min Price (₹)"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />

            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price (₹)"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />

            {/* Bedrooms filter (only for residential) */}
            {filters.category === 'residential' && (
              <select name="bedrooms" value={filters.bedrooms} onChange={handleFilterChange}>
                <option value="">Any Bedrooms</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            )}

            {/* Area filters */}
            <input
              type="number"
              name="minArea"
              placeholder="Min Area (sq.ft)"
              value={filters.minArea}
              onChange={handleFilterChange}
            />

            <input
              type="number"
              name="maxArea"
              placeholder="Max Area (sq.ft)"
              value={filters.maxArea}
              onChange={handleFilterChange}
            />

            <button onClick={clearFilters} className="clear-filters-btn">
              Clear Filters
            </button>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="properties-grid-section">
        <div className="container">
          <div className="properties-meta">
            <p>Showing {properties.length} of {totalProperties.toLocaleString()} properties</p>
            {filters.category && (
              <p className="filter-active">
                Category: <strong>{filters.category}</strong>
                {filters.property_type && ` • Type: ${filters.property_type}`}
              </p>
            )}
          </div>

          {properties.length === 0 ? (
            <div className="no-properties">
              <h3>No properties found</h3>
              <p>Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            <>
              <div className="properties-grid">
                {properties.map(property => (
                  <div key={property.id} className="property-card">
                    <div className="property-image">
                      <div className="image-placeholder">
                        {getPropertyIcon(property.category)}
                      </div>
                      <div className="property-badge">
                        {property.property_type}
                      </div>
                    </div>
                    <div className="property-content">
                      <h3>{property.title}</h3>
                      <p className="property-location">📍 {property.location}</p>
                      <p className="property-price">{formatPrice(property.price)}</p>
                      
                      <div className="property-features">
                        {property.category === 'residential' && (
                          <>
                            {property.bedrooms && <span>🛏️ {property.bedrooms} beds</span>}
                            {property.bathrooms && <span>🚿 {property.bathrooms} baths</span>}
                            <span>📐 {property.area?.toLocaleString()} sq.ft.</span>
                            {property.property_type === 'Apartment' && property.floor_number && (
                              <span>🏢 Floor {property.floor_number}/{property.total_floors}</span>
                            )}
                          </>
                        )}
                        {property.category === 'commercial' && (
                          <>
                            <span>📐 {property.area?.toLocaleString()} sq.ft.</span>
                            <span>🏢 {property.property_type}</span>
                            {property.carpet_area && <span>📦 {property.carpet_area.toLocaleString()} carpet</span>}
                          </>
                        )}
                        {property.category === 'industrial' && (
                          <>
                            <span>🏭 {property.area?.toLocaleString()} sq.ft.</span>
                            {property.clear_height && <span>📏 {property.clear_height}ft height</span>}
                            <span>🏗️ Warehouse</span>
                          </>
                        )}
                      </div>
                      
                      <p className="property-description">{property.description}</p>
                      <div className="property-meta-info">
                        <span className="property-category">{property.category.toUpperCase()}</span>
                        {property.property_sub_type && (
                          <span className="property-subtype">{property.property_sub_type}</span>
                        )}
                      </div>
                      <div className="property-actions">
                        <Link to={`/properties/${property.id}`} className="view-details-btn">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  
                  <span>Page {currentPage} of {totalPages}</span>
                  
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;