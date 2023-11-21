import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import Container from './Container';

// Styles
import './NewEmployee.scss';

function NewEmployee() {
  const location = useLocation();
  const navigate = useNavigate();
  const employee = location.state?.employee;

  // States for each form field
  const [name, setName] = useState(employee?.name || '');
  const [dob, setDob] = useState(employee?.dob || '');
  const [cpf, setCpf] = useState(employee?.cpf || '');
  const [email, setEmail] = useState(employee?.email || '');
  const [phone, setPhone] = useState(employee?.phone || '');
  const [street, setStreet] = useState(employee?.street || '');
  const [number, setNumber] = useState(employee?.number || '');
  const [city, setCity] = useState(employee?.city || '');
  const [state, setState] = useState(employee?.state || '');
  const [employmentContract, setEmploymentContract] = useState(null);
  const [idDocument, setIdDocument] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);
  const [schoolCurriculum, setSchoolCurriculum] = useState(null);

  // Function to handle Submit - send to backend and handle return
  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://createemployee-nlxluegtta-uc.a.run.app';
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('cpf', cpf.toString().replace(/[^0-9]/g, ''));
      formData.append('dob', dob);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('street', street);
      formData.append('number', number);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('employmentContract', linkDocuments?.employmentContract || employmentContract);
      formData.append('idDocument', linkDocuments?.idDocument || idDocument);
      formData.append('proofOfAddress', linkDocuments?.proofOfAddress || proofOfAddress);
      formData.append('schoolCurriculum', linkDocuments?.schoolCurriculum || schoolCurriculum);
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        alert('Employee created successfully');
        navigate('/employee', { state: { employee: responseData } });
      } else {
        alert('Error creating employee:', response.statusText);
        console.error('Error creating employee:', response.statusText);
      }
    } catch (error) {
      alert('Error creating employee:', error.message);
      console.error('Error creating employee:', error.message);
    }
  };

  const [linkDocuments, setLinkDocuments] = useState(null);

  useEffect(() => {
    if (employee) {
      setLinkDocuments({
        employmentContract: employee.employmentContract !== "null" ? employee.employmentContract : null,
        idDocument: employee.idDocument !== "null" ? employee.idDocument : null,
        proofOfAddress: employee.proofOfAddress !== "null" ? employee.proofOfAddress : null,
        schoolCurriculum: employee.schoolCurriculum !== "null" ? employee.schoolCurriculum : null
      });
    }
  }, []);

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
        <h1>{employee ? "Edit" : "New"} employee</h1>
        <form id="new-employee" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={50}/>
          </div>

          <div className="form-group">
            <label htmlFor="dob">Birth of Date:</label>
            <input type="date" id="dob" name="dob" value={dob} onChange={(e) => setDob(e.target.value)} required/>
          </div>

          <div className="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" placeholder="123.456.789-01" value={cpf} onChange={(e) => setCpf(e.target.value)} required maxLength={14} disabled={employee?1:0}/>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={50}/>
          </div>

          <div className="form-group">
            <label htmlFor="phone">Cellphone Number:</label>
            <input type="tel" id="phone" name="phone" pattern="\d{10}" placeholder="1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={10}/>
          </div>

          <div className="form-group">
            <label htmlFor="street">Address - Street:</label>
            <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} required maxLength={50}/>
          </div>

          <div className="form-group">
            <label htmlFor="number">Address - Number:</label>
            <input type="text" id="number" name="number" value={number} onChange={(e) => setNumber(e.target.value)} required maxLength={10}/>
          </div>

          <div className="form-group">
            <label htmlFor="city">Address - City:</label>
            <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required maxLength={50}/>
          </div>

          <div className="form-group">
            <label htmlFor="state">Address - State:</label>
            <input type="text" id="state" name="state" value={state} onChange={(e) => setState(e.target.value)} required maxLength={50}/>
          </div>

          <div className="form-group">
            <label htmlFor="employment-contract">Upload Employment Contract:</label>
            {linkDocuments?.employmentContract
              ? <div>
                  <a href={linkDocuments.employmentContract} target="_blank" rel="noopener noreferrer">View Document</a>
                  <input type="button" value="remove" onClick={() => { setLinkDocuments({...linkDocuments, employmentContract: null}) }}/>
                </div>
              : <div className="file-upload">
                <input type="file" id="employment-contract" name="employment-contract" accept=".pdf" onChange={handleEmploymentContractChange} />
              </div>
            }
          </div>

          <div className="form-group">
            <label htmlFor="id">Upload CPF/RG:</label>
            {linkDocuments?.idDocument
              ? <div>
                <a href={linkDocuments.idDocument} target="_blank" rel="noopener noreferrer">View Document</a>
                <input type="button" value="remove" onClick={() => { setLinkDocuments({...linkDocuments, idDocument: null}) }}/>
              </div>
              : <div className="file-upload">
                <input type="file" id="id" name="id" accept=".pdf" onChange={handleIdDocumentChange} />
              </div>
            }
          </div>

          <div className="form-group">
            <label htmlFor="proof-of-address">Upload Proof of Address:</label>
            {linkDocuments?.proofOfAddress
              ? <div>
                <a href={linkDocuments.proofOfAddress} target="_blank" rel="noopener noreferrer">View Document</a>
                <input type="button" value="remove" onClick={() => { setLinkDocuments({...linkDocuments, proofOfAddress: null}) }}/>
              </div>
              : <div className="file-upload">
                <input type="file" id="proof-of-address" name="proof-of-address" accept=".pdf" onChange={handleProofOfAddressChange} />
              </div>
            }
          </div>

          <div className="form-group">
            <label htmlFor="school-curriculum">Upload School Curriculum:</label>
            {linkDocuments?.schoolCurriculum
              ? <div>
                <a href={linkDocuments.schoolCurriculum} target="_blank" rel="noopener noreferrer">View Document</a>
                <input type="button" value="remove" onClick={() => { setLinkDocuments({...linkDocuments, schoolCurriculum: null}) }}/>
              </div>
              : <div className="file-upload">
                <input type="file" id="school-curriculum" name="school-curriculum" accept=".pdf" onChange={handleSchoolCurriculumChange} />
              </div>
            }
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
