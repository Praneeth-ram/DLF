from sqlalchemy import Column, Integer,DateTime,JSON,Float, Boolean,String, Text, Enum, ForeignKey, TIMESTAMP, func
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(Enum('user', 'admin', name='user_roles'), default='user')
    created_at = Column(TIMESTAMP, server_default=func.now())

    properties = relationship('Property', back_populates='owner')


# class Property(Base):
#     __tablename__ = "properties"
#     id = Column(Integer, primary_key=True, index=True)
#     title = Column(String(500), nullable=False)
#     address = Column(Text, nullable=False)
#     city = Column(String(100), nullable=False)
#     state = Column(String(100), nullable=False)
#     property_type = Column(Enum('residential', 'commercial', 'retail', name='property_types'))
#     owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
#     document_code = Column(String(16), unique=True, nullable=True)

#     owner = relationship('User', back_populates='properties')
class Property(Base):
    __tablename__ = "properties"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    price = Column(Float, nullable=False)
    location = Column(String(100), nullable=False)
    address = Column(Text)
    property_type = Column(String(50), nullable=False)  # Apartment, Villa, Office Space, Retail Space, Warehouse, Plot
    property_sub_type = Column(String(50))  # 3BHK, IT Park Office, Residential Plot, etc.
    category = Column(String(20), nullable=False)  # residential, commercial, industrial
    
    # Common fields
    area = Column(Float)  # in sq.ft
    carpet_area = Column(Float)
    is_active = Column(Boolean, default=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    
    # Residential specific
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    balconies = Column(Integer)
    floor_number = Column(Integer)
    total_floors = Column(Integer)
    facing = Column(String(20))
    unit_number = Column(String(20))
    age_of_property = Column(Integer)
    maintenance_charges = Column(Float)
    possession_status = Column(String(50))
    
    # Villa specific
    plot_area = Column(Float)
    built_up_area = Column(Float)
    number_of_floors = Column(Integer)
    garden_area = Column(Float)
    car_parking = Column(Integer)
    
    # Commercial specific
    floor_plate = Column(Float)
    lease_type = Column(String(50))
    fit_out_status = Column(String(50))
    parking_spaces = Column(Integer)
    meeting_rooms = Column(Integer)
    
    # Retail specific
    frontage_width = Column(Float)
    footfall = Column(String(20))
    storage_area = Column(Float)
    showroom_height = Column(Float)
    display_windows = Column(Integer)
    
    # Industrial specific
    clear_height = Column(Float)
    loading_docks = Column(Integer)
    power_supply = Column(String(50))
    floor_load_capacity = Column(String(50))
    crane_capacity = Column(String(50))
    
    # Plot specific
    dimensions = Column(String(50))
    soil_type = Column(String(50))
    approval_status = Column(String(100))
    
    # Additional fields
    amenities = Column(JSON)  # List of amenities as JSON
    document_code = Column(String(16), unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    owner = relationship("User", back_populates="properties")