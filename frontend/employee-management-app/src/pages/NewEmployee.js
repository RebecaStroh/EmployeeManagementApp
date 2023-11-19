import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import Container from './Container';

// Styles
import './NewEmployee.scss';

function NewEmployee() {
  // States for each form field
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [employmentContract, setEmploymentContract] = useState(null);
  const [idDocument, setIdDocument] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);
  const [schoolCurriculum, setSchoolCurriculum] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const editMode = searchParams.get('editMode');


  // Function to handle Submit
  const handleSubmit = (event) => {
    console.log('Form data:', {
      name,
      dob,
      cpf,
      email,
      phone,
      street,
      number,
      city,
      state,
      employmentContract,
      idDocument,
      proofOfAddress,
      schoolCurriculum,
    });

    // Send to backend and handle return
  };

  // Handle documents
  const handleEmploymentContractChange = (event) => {
    setEmploymentContract(event.target.files[0]);
  };
  const handleIdDocumentChange = (event) => {
    setIdDocument(event.target.files[0]);
  };
  const handleProofOfAddressChange = (event) => {
    setProofOfAddress(event.target.files[0]);
  };
  const handleSchoolCurriculumChange = (event) => {
    setSchoolCurriculum(event.target.files[0]);
  };

  return (
    <Container>
      <div className="new-employee-content">
        <h1>{editMode ? "Edit" : "New"} employee</h1>
        <form id="new-employee" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Birth of Date:</label>
            <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" pattern="\d{3}\.\d{3}\.\d{3}-\d{2}" placeholder="123.456.789-01" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Cellphone Number:</label>
            <input type="tel" id="phone" name="phone" pattern="\d{10,}" placeholder="1234567890" value={phone} onChange={(e) => setPhone(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="street">Address - Street:</label>
            <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="number">Address - Number:</label>
            <input type="text" id="number" name="number" value={number} onChange={(e) => setNumber(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="city">Address - City:</label>
            <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="state">Address - State:</label>
            <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)}/>
          </div>

          <div className="form-group">
            <label htmlFor="employment-contract">Upload Employment Contract:</label>
            <div className="file-upload">
              <input type="file" id="employment-contract" name="employment-contract" accept=".pdf" onChange={handleEmploymentContractChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="id">Upload CPF/RG:</label>
            <div className="file-upload">
              <input type="file" id="id" name="id" accept=".pdf" onChange={handleIdDocumentChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="proof-of-address">Upload Proof of Address:</label>
            <div className="file-upload">
              <input type="file" id="proof-of-address" name="proof-of-address" accept=".pdf" onChange={handleProofOfAddressChange} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="school-curriculum">Upload School Curriculum:</label>
            <div className="file-upload">
              <input type="file" id="school-curriculum" name="school-curriculum" accept=".pdf" onChange={handleSchoolCurriculumChange} />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Submit"/>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default NewEmployee;
