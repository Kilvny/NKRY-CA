'use client';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'next/navigation';

type Props = {};
// here we should get the expenses with filter ?names=true in the api call 
const options = [
  {
    value: 'visaExpiryDate',
    label: 'إضافة تكاليف تجديد الإقامة',
  },
  {
    value: 'flightTicketsDueDate',
    label: 'إضافة تكاليف رخص العمل',
  },
  {
    value: 'duesPayDate',
    label: 'إضافة مصروفات التأمينات الاجتماعية',
  },
];

const AddFinance = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [value, setValue] = useState<Date | null>(new Date());

  const params = useParams();
  const employeeId: string = params?.employeeId  ? params?.employeeId.toString() : ""

  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = () => {
    // Mock saving data by logging it
    console.log('Selected Option:', selectedOption);
    console.log('Selected Date:', selectedDate);
    // You can perform other actions here, like sending the data to a server.
  };

  const handleCancel = () => {
    // Perform the cancel action, such as returning to the previous page.
    // You can use React Router or other navigation mechanisms for this.
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box textAlign="center">
        <h2>Add Expnse</h2>
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
              label="Due Date - تاريخ الإستحقاق"
              value={dayjs(value)}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
          <TextField
          label="Amount القيمة"
          name="job"
          variant="outlined"
          margin="normal"
          fullWidth
          type='number'
          // value={job}
          // onChange={handleJobChange}
          // sx={{width: "50%"}}

        />
      </Box>

      {/* Action Buttons */}
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

export default AddFinance;
