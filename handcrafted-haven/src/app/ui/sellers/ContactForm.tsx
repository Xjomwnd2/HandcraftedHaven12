import React, { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fname) errors.fname = "First Name is required";
    if (!formData.lname) errors.lname = "Last Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.message) errors.message = "Message is required";

    setFormErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you can handle form submission (e.g., send data to an API)
      console.log("Form submitted:", formData);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Me</h2>

      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
        />
        {formErrors.fname && <p style={{ color: "red" }}>{formErrors.fname}</p>}
      </div>

      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lname"
          value={formData.lname}
          onChange={handleChange}
        />
        {formErrors.lname && <p style={{ color: "red" }}>{formErrors.lname}</p>}
      </div>

      <div>
        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {formErrors.email && <p style={{ color: "red" }}>{formErrors.email}</p>}
      </div>

      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {formErrors.message && <p style={{ color: "red" }}>{formErrors.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
