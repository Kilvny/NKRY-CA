'use client';
import React, { useEffect, useState } from 'react';
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
import { useParams, useRouter } from 'next/navigation';
import { getAllExpenseNamesMonthly, postExpenseName } from '@/services/expenseName.services';
import Token from '../../../../../../token.json'
import { postExpense } from '@/services/expense.service';
import { ExpenseDTO } from '@/DTOs/Expense';
import { getCurrentDateTime } from '@/helper/dateTime';

type Props = {};
// here we should get the expenses with filter ?names=true in the api call 


const AddFinance = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [newName, setNewName] = useState('');
  const [expenseNames, setExpenseNames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [clickFlag, setClickFlag] = useState(false)

  const router = useRouter();
  const params = useParams();
  const employeeId: string = params?.employeeId  ? params?.employeeId.toString() : ""
  
  const token: string = Token?.token;
  useEffect(() => {
    async function fetchExpenseNames() {
      try {
        const namesData = await getAllExpenseNamesMonthly(token);
        setExpenseNames(namesData);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    fetchExpenseNames();
  }, [token, openDialog, clickFlag]);

  
  const handleOptionChangeClick = (event: any) => {
    setClickFlag(!clickFlag)
  }
  const handleOptionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleAmountChange = (event: any) => {
    setAmount(parseFloat(event.target.value));
  };
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleSave = () => {
    // Mock saving data by logging it
    console.log('Selected Option:', selectedOption, "Amount:", amount);
    // console.log('Selected Date:', selectedDate);
    let expense: ExpenseDTO = {
      name: selectedOption,
      amount: amount,
      isFixed: false,
      employeeId: employeeId,
      dueDate: getCurrentDateTime(),

    }
    postExpense(expense, employeeId, token).then((response) => {
      // console.log(location?.pathname.replace("/add-finance", ""));
      router.push(location?.pathname.replace("/add-finance", ""))
    });
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
    setIsLoading(true)
    if (newName.trim() !== "" ) {
      postExpenseName(newName, true, token).then(
        () => {
          setIsLoading(false)
          handleCloseDialog();
        }
      ).catch(err => {
        console.log(err);
        setIsLoading(false)

      })
    }
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
          onClick={handleOptionChangeClick}
          displayEmpty
          style={{ minWidth: 'min-content' }}
          placeholder="Select an option...."
        >
          <MenuItem value="" disabled>
            Select an option...
          </MenuItem>
          {
          expenseNames.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
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
          name="amount"
          variant="outlined"
          margin="normal"
          fullWidth
          type='number'
          value={amount}
          onChange={handleAmountChange}
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
              placeholder='ادخل اسم المصروف مثل (مصروفات العلاج)'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogSave} color="primary" disabled={isLoading}>
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
