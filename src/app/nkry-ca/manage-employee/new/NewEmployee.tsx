'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import styles from './invoicesNew.module.scss'; // Import the SCSS module
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { token as TOKEN } from "../../../../../token.json";
import { EmployeeDTO } from '@/DTOs/Employee';
import { postEmployee } from '@/services/employee.services';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { Card, CardContent, Input } from '@mui/material';
import { useRouter } from 'next/navigation';




const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
  };
  





const New = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [nationality, setNationality] = useState('');
    const [job, setJob] = useState('');
    const [passportNumber, setPassportNumber] = useState('');
    // car details
    const [company, setCompany] = useState<string>("")
    const [model, setModel] = useState<string>("")
    const [manfactureYear, setManfactureYear] = useState<number>(1900)
    const [plateNumber, setPlateNumber] = useState<string>("")

    const [baseSalary, setBaseSalary] = useState<number>(0)
    const [deliveryRate, setDeliveryRate] = useState<number>(0)

    const [token, setToken] = useState<string | null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const router = useRouter()

    useEffect(() => {
      const userToken = TOKEN
      if (userToken) {
        localStorage.setItem("userToken", userToken);
        // console.log("User token saved to localStorage:", userToken);
      } 
      let token: string | null = localStorage.getItem("userToken");
      setToken(token);
    }, [firstName, lastName, address, phoneNumber, employeeId, passportNumber, token])

     const data: EmployeeDTO = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber, 
      employeeIdNumber: employeeId,
      passportNumber: passportNumber,
      nationality: nationality,
      job: job,
      car: {
        company: company,
        model: model,
        manfactureYear: manfactureYear,
        plateNumber: plateNumber
      },
      fixedFinance: {
        baseSalary: baseSalary,
        deliveryRate: deliveryRate
      }
    }
  
    const handlefirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setFirstName(e.target.value);
    };
    
    const handlelastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
      setLastName(e.target.value);
    };
    
    const handleaddressChange = (e: ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value);
    };

    const handlephoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPhoneNumber(e.target.value);
    };
    
    const handleemployeeIdChange = (e: ChangeEvent<HTMLInputElement>) => {
      setEmployeeId(e.target.value);
    };
    const handleNationalityChange = (e: ChangeEvent<HTMLInputElement>) => {
      setNationality(e.target.value);
    };
    const handleJobChange = (e: ChangeEvent<HTMLInputElement>) => {
      setJob(e.target.value);
    };
    // car
    const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
      setCompany(e.target.value);
    };
    const handleModelChange = (e: ChangeEvent<HTMLInputElement>) => {
      setModel(e.target.value);
    };
    const handleManfactureYearChange = (e: ChangeEvent<HTMLInputElement>) => {
      setManfactureYear(parseInt(e.target.value));
    };
    const handlePlateNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
      setPlateNumber(e.target.value);
    };

    const handleBaseSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
      setBaseSalary(parseFloat(e.target.value));
    };

    const handleDeliveryRateChange = (e: ChangeEvent<HTMLInputElement>) => {
      setDeliveryRate(parseFloat(e.target.value));
    };



    

  const handleSave = async () => {
    console.log(data);
    try {
      // Send the formData to the API
      // Check if the token exists
      if (!token) {
        // Handle the case where there's no token (e.g., redirect to login)
        console.error('No token found.');
        return;
      }

      if(data?.car?.company.trim() === '' && data?.car?.model.trim() === '' && data?.car?.manfactureYear === 1900 && data?.car?.plateNumber.trim() === '') {
        data.car = null;
      }

      setIsLoading(true);
      postEmployee(data, token).then(() => {
        setIsLoading(false);
        router.push(location?.pathname.replace("/new", ""))
      }).catch(err => {
        setIsLoading(false);
        alert(err)
      })

      // Handle the response as needed (e.g., show a success message)

      // Clear the form if needed
      // setFirstName("")
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error:', error);
    }
  };
    // // uploda image 
    
    // const [image, setImage] = React.useState(null);
    // const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //   const fileInput = document?.getElementById('profilePictureInput');
    //   const previewImage = document?.getElementById('previewImage');

        
    //         // const file = e?.target?.files[0];
    //         // const reader = new FileReader();
    //         // previewImage?.addEventListener('change', function () {
    //         //   const file = fileInput?.files[0];
    //         //   const reader = new FileReader();
  
    //         //   reader.onload = function (e) {
    //         //       previewImage.src = e.target.result;
    //         //       previewImage.style.display = 'block';
    //         //   }
  
    //           // reader.readAsDataURL(file);
    //       });

            
        // setImage(e?.target?.files[0]);
    // };

      // Payment status options
  
  
  const passportNumberOptions = [
    { value: 'fully_paid', label: 'Fully Paid' },
    { value: 'partly_paid', label: 'Partly Paid' },
  ];



  // Handler for changing the payment status based on paid and remaining amount
  const handlepassportNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassportNumber(e.target.value)
  };


  return (
    <Box className={styles.container} sx={{ p: 2 , display: 'flex', flexWrap: 'wrap'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', alignContent: 'center'}}>
        <Button 
        href='/nkry-ca/manage-employee'
        variant='text'
        color='info'
        ><KeyboardDoubleArrowLeftIcon / > Back to all employees
        </Button>

      </Box>
      <h2 className={styles.mainTitle}>Create New Employee</h2>
      {/* Employee Name fields */}
      {<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
      <TextField
        name="firstName"
        label="FirstName"
        variant="outlined"
        margin="normal"
        fullWidth
        value={firstName}
        onChange={handlefirstNameChange}
        // sx={{width: "50%"}}
      />
      <TextField
        label="LastName"
        name="lastName"
        variant="outlined"
        margin="normal"
        fullWidth
        value={lastName}
        onChange={handlelastNameChange}
        // sx={{width: "50%"}}

      />
      {/* Customer number field */}
      <TextField
        label="Nationality"
        name="nationality"
        variant="outlined"
        margin="normal"
        fullWidth
        value={nationality}
        onChange={handleNationalityChange}
        // sx={{width: "50%"}}

      />
      <TextField
        label="Job Title"
        name="job"
        variant="outlined"
        margin="normal"
        fullWidth
        value={job}
        onChange={handleJobChange}
        // sx={{width: "50%"}}

      />

      </Box> }


      {/* Other add-ons field */}
      <Box className={styles.otherAddonsContainer} sx={{ display: 'flex', gap: '10px', alignlastName: 'center', width: "100%" }}>
        <TextField
          label="Phone Number"
          name="phoneNumber"
          variant="outlined"
          fullWidth
          margin="none"
          value={phoneNumber}
          onChange={handlephoneNumberChange}
        />
        <TextField
          label="Address"
          name="address"
          variant="outlined"
          fullWidth
          margin="none"
          value={address}
          onChange={handleaddressChange}
        />
        <Input
          // accept="image/*"
          id="photo-attachment"
          type="file"
          style={{ display: 'none' }}
        />
        <label htmlFor="photo-attachment">
          <IconButton color="primary" component="span">
            <PhotoCameraIcon />
          </IconButton>
        </label>
        <img id="previewImage" src="#" alt="Preview" 
        style={{ display: 'none',  width: '300px', height: '300px' }}
        />
      </Box>
      {/* employeeId field */}
      <TextField
        label="Employee ID (Iqama or Visa)"
        name="employeeId"
        variant="outlined"
        fullWidth
        margin="normal"
        value={employeeId}
        onChange={handleemployeeIdChange}
      />

      {/* Passport Id Number status */}
      <TextField
        label="Passport Id Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={passportNumber}
        onChange={handlepassportNumberChange}
      />

      {/* fixed finance section */}
      <Card sx={{ marginTop: "10px", display: "block" }} className="mb-4">
        <CardContent>
          {/* <Typography variant="body2" color="textSecondary">
                        
                      </Typography> */}
          <Box>
            <TextField
              label="Base Salary - الراتب الأساسي"
              name="manfactureYear"
              variant="outlined"
              margin="normal"
              fullWidth
              value={baseSalary}
              onChange={handleBaseSalaryChange}
              type='number'
            // sx={{width: "50%"}}

            />
            <TextField
              label="Delivery Rate - معدل التوصيل للطلب الواحد"
              name="plateNumber"
              variant="outlined"
              margin="normal"
              fullWidth
              value={deliveryRate}
              onChange={handleDeliveryRateChange}
            // sx={{width: "50%"}}

            />
          </Box>
        </CardContent>
      </Card>

      {/* car details  */}
      {<Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', marginTop: '10px'}}>
      <TextField
        name="company"
        label="Car Company"
        variant="outlined"
        margin="normal"
        fullWidth
        value={company}
        onChange={handleCompanyChange}
        // sx={{width: "50%"}}
      />
      <TextField
        label="Car Model"
        name="model"
        variant="outlined"
        margin="normal"
        fullWidth
        value={model}
        onChange={handleModelChange}
        // sx={{width: "50%"}}

      />
      <TextField
        label="Manfacture Year"
        name="manfactureYear"
        variant="outlined"
        margin="normal"
        fullWidth
        value={manfactureYear}
        onChange={handleManfactureYearChange}
        // sx={{width: "50%"}}

      />
      <TextField
        label="Plate Numbers"
        name="plateNumber"
        variant="outlined"
        margin="normal"
        fullWidth
        value={plateNumber}
        onChange={handlePlateNumberChange}
        // sx={{width: "50%"}}

      />

      </Box> }


      {/* Save button */}
      <Box sx={{ display: "flex", flexDirection: "row"  }}>
      <Button 
      color="success" 
      variant="contained" 
      size="large" 
      onClick={handleSave} 
      disabled={isLoading}
      style={{ margin: '10px'}}
      >
        Save
      </Button>

      <Button
        variant="contained"
        color="error" // Error color
        // onClick={handleCancel}
        href="/nkry-ca/manage-employee"
        style={{ margin: '10px' }}
        disabled={isLoading}
      >
        Cancel
      </Button>
    </Box>

    </Box>
  );
};


export default New