import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Components
import Container from './Container';
import CustomAlert from '../components/CustomAlert';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from "@mui/material/Card";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import {Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';


// New styled components
const Section = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Header = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  '&>p': {
    paddingRight: '16px',
    paddingLeft: '8px',
    fontSize: '18px',
  }
}));

const Line = styled('hr')(({ theme }) => ({
  flex: 1,
  border: 0,
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: 0,
  marginTop: "10px",
  marginBottom: "10px"
}));


// Page component
function NewEmployee() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = useState(location.state?.mode || 'New');
  const [employee, setEmployee] = useState(location.state?.employee);

  // States for each form field
  const [name, setName] = useState(employee?.name || '');
  const [dob, setDob] = useState(employee?.dob ? dayjs(employee?.dob) : '');
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
  const [loading, setLoading] = useState(false);

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

  // Function to handle Submit - send to backend and handle return
  const handleSubmit = async () => {
    setLoading(true);
    const url = 'https://createemployee-nlxluegtta-uc.a.run.app';
    try {
      // Create structure to sen to API
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

      if (linkDocuments?.employmentContract) {
        formData.append('employmentContract', linkDocuments?.employmentContract);
      } else if (employmentContract) {
        const newFile = new Blob([employmentContract], { type: employmentContract.type });
        newFile.name = "employmentContract";
        formData.append('employmentContract', newFile, "employmentContract");
      } else {
        formData.append('employmentContract', null);
      }
      if (linkDocuments?.idDocument) {
        formData.append('idDocument', linkDocuments?.idDocument);
      } else if (idDocument) {
        const newFile = new Blob([idDocument], { type: idDocument.type });
        newFile.name = "idDocument";
        formData.append('idDocument', newFile, "idDocument");
      } else {
        formData.append('idDocument', null);
      }
      if (linkDocuments?.proofOfAddress) {
        formData.append('proofOfAddress', linkDocuments?.proofOfAddress);
      } else if (proofOfAddress) {
        const newFile = new Blob([proofOfAddress], { type: proofOfAddress.type });
        newFile.name = "proofOfAddress";
        formData.append('proofOfAddress', newFile, "proofOfAddress");
      } else {
        formData.append('proofOfAddress', null);
      }
      if (linkDocuments?.schoolCurriculum) {
        formData.append('schoolCurriculum', linkDocuments?.schoolCurriculum);
      } else if (schoolCurriculum) {
        const newFile = new Blob([schoolCurriculum], { type: schoolCurriculum.type });
        newFile.name = "schoolCurriculum";
        formData.append('schoolCurriculum', newFile, "schoolCurriculum");
      } else {
        formData.append('schoolCurriculum', null);
      }

      // In case it is a change on an existing instance, indicate it to API
      if (mode === 'Edit') formData.append('edit', "true");
      
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        if (mode === 'Edit')
          handleAlert(`updated-successfully`);
        else
          handleAlert(`created-successfully`);

        setLoading(false);
      } else {
        if (response.status === 400)
          handleAlert(`duplicated`);
        else
          handleAlert(`error`);

        console.error('Error creating employee:', response.statusText);
      }
    } catch (error) {
      handleAlert(`error`);
      console.error('Error creating employee:', error.message);
    }
    setLoading(false);
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

  // Create an inside component to render all File selector
  const File = ({label, fileLink, file, handleChange, id}) => {
    return (
      <Box display="flex" flexDirection="column">
        <label htmlFor="employment-contract">{label}</label>
        {fileLink
          ? <Box display="flex" sx={{mt:1, mb:1, ml:2, mr:2}} alignItems="center" gap={1}>
              <Button component="label" variant="contained" color="blue" sx={{width:'100%', borderRadius: 20, height: '100%' }}>
                <a href={fileLink} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'white'}}>View Document</a>
              </Button>
              {mode !== 'View' && <CloseIcon onClick={() => handleAlert(`delete-${id}`)} sx={{ cursor: "pointer" }} fontSize='1' />}
            </Box>
          : !file?.name 
            ? <Button
                component="label" variant="contained" color="blue"
                startIcon={<CloudUploadIcon />}
                sx={{ mt:1, mb:1, ml:2, mr:2, borderRadius: 20, height: '100%' }}
                disabled={mode === 'View'}
              >
                Upload <VisuallyHiddenInput type="file"  id="employment-contract" name="employment-contract" accept=".pdf" onChange={handleChange}/>
              </Button>
            : <p style={{margin: '15px', maxWidth: '400px', wordWrap: 'break-word'}}>{file.name}</p>
        }
      </Box>
    );
  }

  // dialog
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState('');

  const handleClose = () => {
    setAlertOpen(false);
    setAlertContent('');
  };

  const handleAlert = (type) => {
    setAlertContent(type);
    setAlertOpen(true);
  };

  return (
    <Container
      title={`${mode} employee`}
      classes="with-background"
      leftButtonContent={mode === 'View' 
        ? <a style={{ color: 'white' }} onClick={() => setMode('Edit')}> Edit Employee </a>
        : null}
      >
      <Box
        className={loading ? 'loading' : ""}
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
        flexDirection="row"
        display="flex"
        gap={5}
      >
        <Box sx={{flex: 0.7}} display="flex" flexDirection="column">
          <Section>
            <Header>
              <p>Personal Information</p>
              <Line />
            </Header>
            <TextField
              sx={{ width: '50%', minWidth: '600px', '>div':{borderRadius: 20} }}
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={mode === 'View'}
              maxLength={50}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Birth of Date" id="dob" name="dob" onChange={(e) => setDob(e)} required 
                sx={{ '>div':{borderRadius: 20} }} value={dob}
                disabled={mode === 'View'}
              />
            </LocalizationProvider>
            <TextField
              label="CPF"
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              maxLength={14}
              disabled={mode !== 'New'}
              sx={{ '>div':{borderRadius: 20} }}
              />
          </Section>

          <Section>
            <Header>
              <p>Contact Information</p>
              <Line />
            </Header>
            <TextField
              sx={{ width: '50%', minWidth: '600px', '>div':{borderRadius: 20} }}
              label="Email"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={50}
              disabled={mode === 'View'}
            />
            <TextField
              label="Cellphone Number"
              type="tel"
              id="phone"
              name="phone"
              pattern="\d{10}"
              placeholder="1234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              maxLength={10}
              sx={{ '>div':{borderRadius: 20} }}
              disabled={mode === 'View'}
            />
          </Section>

          <Section>
            <Header>
              <p>Address Information</p>
              <Line />
            </Header>
            <TextField
              sx={{ width: '50%', minWidth: '600px', '>div':{borderRadius: 20} }}
              label="Street" type="text" id="street" name="street" value={street}
              onChange={(e) => setStreet(e.target.value)} required maxLength={50} 
              disabled={mode === 'View'}
              />
            <TextField
              sx={{ '>div':{borderRadius: 20} }} label="Number" type="number"
              id="number" name="number" value={number} onChange={(e) => setNumber(e.target.value)}
              required maxLength={10} disabled={mode === 'View'}
              />
            <TextField
              sx={{ width: '30%', minWidth: '400px', '>div':{borderRadius: 20} }}
              label="City" type="text" id="city" name="city" value={city}
              onChange={(e) => setCity(e.target.value)} required maxLength={50} 
              disabled={mode === 'View'}
              />
            <TextField
              sx={{ '>div':{borderRadius: 20} }} label="State" type="text" id="state"
              name="state" value={state} onChange={(e) => setState(e.target.value)}
              required maxLength={50} disabled={mode === 'View'}
              />
          </Section>
          <Button variant="contained" type="button" color="orange"
            sx={{alignSelf: 'flex-end', borderRadius: 20, height: '100%' }}
            onClick={() => handleAlert(`submit`)}
            >Submit</Button>
        </Box>
        <Box sx={{ flex: 0.3}} >
          <Card sx={{ p: 3 }} >
            <File
              label="Employment Contract:"
              fileLink={linkDocuments?.employmentContract}
              file={employmentContract}
              handleChange={handleEmploymentContractChange}
              id="employmentContract"
            />
            <Line />
            <File
              label="CPF/RG:"
              fileLink={linkDocuments?.idDocument}
              file={idDocument}
              handleChange={handleIdDocumentChange}
              id="idDocument"
            />
            <Line />
            <File
              label="Proof of Address:"
              fileLink={linkDocuments?.proofOfAddress}
              file={proofOfAddress}
              handleChange={handleProofOfAddressChange}
              id="proofOfAddress"
            />
            <Line />
            <File
              label="School Curriculum:"
              fileLink={linkDocuments?.schoolCurriculum}
              file={schoolCurriculum}
              handleChange={handleSchoolCurriculumChange}
              id="schoolCurriculum"
            />
          </Card>
        </Box>
      </Box>

      {isAlertOpen && <CustomAlert
        open={isAlertOpen}
        handleClose={handleClose}
        content={
          alertContent === 'submit'
            ? 'Are you sure you want to submit?'
            : alertContent.includes('delete')
            ? 'Are you sure you want to delete this document?'
            : alertContent === 'updated-successfully'
            ? 'Employee updated sucessfully'
            : alertContent === 'created-successfully'
            ? 'Employee created sucessfully'
            : alertContent === 'duplicated'
            ? `An employee with the CPF ${cpf} already exists`
            : 'Error creating employee'
        }
        onConfirm={
          alertContent === 'submit'
            ? handleSubmit
            : alertContent === 'delete-employmentContract'
            ? () => setLinkDocuments({...linkDocuments, employmentContract: null})
            : alertContent === 'delete-idDocument'
            ? () => setLinkDocuments({...linkDocuments, idDocument: null})
            : alertContent === 'delete-proofOfAddress'
            ? () => setLinkDocuments({...linkDocuments, proofOfAddress: null})
            : alertContent === 'delete-schoolCurriculum'
            ? () => setLinkDocuments({...linkDocuments, schoolCurriculum: null})
            : alertContent.includes('successfully')
            ? () => navigate('/employees')
            : null
        }
        cancelLabel={alertContent === 'submit' || alertContent.includes('delete') ? "Cancel" : null}
        confirmLabel={alertContent === 'submit' || alertContent.includes('delete') ? "Confirm" : "Ok"}
      />}
    </Container>
  );
}

export default NewEmployee;
