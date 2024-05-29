'use client'
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    year: '',
    make: '',
    model: ''
  });
  const [recipientEmail, setRecipientEmail] = useState('oneebfaisal@gmail.com');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateADFXML = (data) => {
    return `
      <adf>
        <prospect>
          <requestdate>${new Date().toISOString()}</requestdate>
          <status>New</status>
          <vehicle>
            <year>${data.year}</year>
            <make>${data.make}</make>
            <model>${data.model}</model>
          </vehicle>
          <customer>
            <contact>
              <name part="first">${data.firstName}</name>
              <name part="last">${data.lastName}</name>
              <email>${data.email}</email>
              <phone>${data.phone}</phone>
            </contact>
            <address>
              <street line="1">${data.street}</street>
              <city>${data.city}</city>
              <regioncode>${data.state}</regioncode>
              <postalcode>${data.zip}</postalcode>
            </address>
          </customer>
        </prospect>
      </adf>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adfXml = generateADFXML(formData);
    
    try {
      const response = await axios.post('/api/send-email', {
        email: 'oneebfaisal@gmail.com', //recipientEmail
        xmlData: adfXml
      });
      alert('Email sent successfully');
    } catch (error) {
      alert('Failed to send email');
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Export Lead to ADF-XML and Send via Email</h1>
      <form onSubmit={handleSubmit}>
        <h2>Customer Information</h2>
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
        
        <h2>Address</h2>
        <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
        <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} required />

        <h2>Vehicle Information</h2>
        <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} required />
        <input type="text" name="make" placeholder="Make" value={formData.make} onChange={handleChange} required />
        <input type="text" name="model" placeholder="Model" value={formData.model} onChange={handleChange} required />

        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}
