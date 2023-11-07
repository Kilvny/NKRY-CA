'use client';
import React, { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

type Props = {};
// here we should get the expenses with filter ?names=true in the api call 
const options = [
  {
    value: 'visaExpiryDate',
    label: ' مصروفات بنزين',
  },
  {
    value: 'flightTicketsDueDate',
    label: ' مصروفات علاج',
  },
  {
    value: 'duesPayDate',
    label: ' مصروفات التأمينات الاجتماعية',
  },
];

const AddFinance = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [value, setValue] = useState<Date | null>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [newName, setNewName] = useState('');

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

  // dialog methods
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDialogSave = () => {
    // Implement the logic to save the name here (e.g., send an API request)
    // After saving, close the dialog
    handleCloseDialog();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
      <Box textAlign="center">
        <h2>Add Expense to the current month - إضافة مصروفات للشهر الحالي</h2>
      </Box>
      <Box m={2} display="flex" flexDirection="column" alignItems="space-between" maxWidth="300px">
        <Box m={2} display="flex" flexDirection="row" alignContent="center" alignItems="center">
          <label>Select an option:</label> 
          <IconButton
          color="primary"
          onClick={handleOpenDialog}
          style={{ margin: '10px', borderRadius: '50%' }}
        >
          <ControlPointIcon />
        </IconButton>
        </Box>
        
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
        {/* <label>Select a date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
              label="Controlled picker"
              value={dayjs(value)}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider> */}
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
       {/* Add a button to open the dialog */}


        {/* Dialog for adding a name */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Add Expense - إضافة نوع مصروفات جديد</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name and click Save to add it.
            </DialogContentText>
            <TextField
              label="Name"
              variant="outlined"
              margin="normal"
              fullWidth
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
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
          href="/nkry-ca/manage-employee/gas-agsasd-zxcasdeq-atq123fdv12-asfd/"
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