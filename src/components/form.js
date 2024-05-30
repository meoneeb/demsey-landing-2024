"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { TextField } from "@mui/material";

export default function Form() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const generateADFXML = (data) => {
    return `
      <adf>
        <prospect>
          <customer>
            <contact>
              <name part="first">${data.firstName}</name>
              <name part="last">${data.lastName}</name>
              <email>${data.email}</email>
              <phone>${data.phone}</phone>
            </contact>
          </customer>
        </prospect>
      </adf>
    `;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");

    const adfXml = generateADFXML(formData);

    const templateParams = {
      to_email: "oneebfaisal@gmail.com", // Recipient email
      adf_xml: adfXml,
    };

    emailjs
      .send(
        "service_wmhv4kn",
        "template_6ksn4vd",
        templateParams,
        "s9NYqZm5I8TyJdxi4"
      )
      .then(
        (response) => {
          setResponseMessage("Email sent successfully");
          setIsLoading(false);
        },
        (error) => {
          setResponseMessage("Failed to send email");
          console.error(error);
          setIsLoading(false);
        }
      );
  };

  return (
    <div>
      <h1>Chat with us</h1>
      <form onSubmit={handleSubmit}>
        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-row flex-wrap gap-2">
            <TextField
              variant="outlined"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              variant="outlined"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <TextField
            variant="outlined"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button
            className="btn"
            style={{ background: "#1e1e1e", color: "#fff" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}
