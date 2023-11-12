'use client';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { PersonalDetailsDTO } from '@/DTOs/PersonalDetailsDTO';
import { putPersonalDetails } from '@/services/employee.services';
import Token from '../../../../../../token.json'

type Props = {};

const options = [
  {
    value: 'visaExpiryDate',
    label: 'إضافة تاريخ إنتهاء الإقامة',
  },
  {
    value: 'flightTicketsDueDate',
    label: 'إضافة تاريخ إستحقاق تذاكر الطيران',
  },
  {
    value: 'duesPayDate',
    label: 'إضافة موعد صرف المستحقات',
  },
];

const AddDetails = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [value, setValue] = useState<Date | null>(new Date());
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter();
  const params = useParams();
  const employeeId: string = params?.employeeId  ? params?.employeeId.toString() : ""
  const token: string = Token?.token;

  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };


  const handleSave = () => {

    console.log('Selected Option:', selectedOption);
    console.log('Selected Date:', value);
    setIsLoading(true)

    const formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS');
    // console.log(formattedDate);
    if(selectedOption === "" || value?.toString().trim() == null) {
      alert("please enter correct values")
      setIsLoading(false)
      return
    }

    let pd: PersonalDetailsDTO = {
      employeeId: employeeId,
    }
    pd[selectedOption] = formattedDate

    // console.log("pd:", pd);
    putPersonalDetails(pd, employeeId, token).then((response) => {
      setIsLoading(false)
      console.log(response, "adddetails.tsx")
      if(response.ok) {
        router.push(location?.pathname.replace("/add-details", ""))
      }
    }).catch(err => {
      alert(err)
      setIsLoading(false)
    });

  };


  const handleCancel = () => {
    // Perform the cancel action, such as returning to the previous page.
    // You can use React Router or other navigation mechanisms for this.
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box textAlign="center">
        <h2>Add Details</h2>
      </Box>
      <Box m={2} display="flex" flexDirection="column" alignItems="space-between" maxWidth="300px">
        <label>Select an option:</label>
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          displayEmpty
          style={{ minWidth: 'min-content' }}
          placeholder="Select an option...."
        >
          <MenuItem value="" disabled>
            Select an option...
          </MenuItem>
          {
          options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))
          }
        </Select>
        <label>Select a date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Controlled picker"
              value={dayjs(value)}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <Box m={2} display="flex" alignItems="space-between" justifyContent="center" margin="20px">
        <Button
          variant="contained"
          color="primary" // Success color
          onClick={handleSave}
          style={{margin: '10px'}}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="error" // Error color
        //   onClick={handleCancel}
          href={"/nkry-ca/manage-employee/" + employeeId}
          style={{margin: '10px'}}
        >
          Cancel
        </Button>
      </Box>
      {/* You can access the selected option and date here: selectedOption, selectedDate */}
    </Box>
  );
};

export default AddDetails;
