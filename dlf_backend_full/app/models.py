from sqlalchemy import Column, Integer, String, Text, Enum, ForeignKey, TIMESTAMP, func
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


class Property(Base):
    __tablename__ = "properties"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(500), nullable=False)
    address = Column(Text, nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    property_type = Column(Enum('residential', 'commercial', 'retail', name='property_types'))
    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    document_code = Column(String(16), unique=True, nullable=True)

    owner = relationship('User', back_populates='properties')
