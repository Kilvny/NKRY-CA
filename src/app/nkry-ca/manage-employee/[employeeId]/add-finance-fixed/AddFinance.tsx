'use client';
import React, { useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useParams } from 'next/navigation';
import { ExpenseDTO } from '@/DTOs/Expense';
import { postExpenseFixed } from '@/services/expense.service';
import Token from '../../../../../../token.json'
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Props = {};
// here we should get the expenses with filter ?names=true in the api call 
const options = [
  {
    value: 'visaExpiryDate',
    label: 'تكاليف تجديد الإقامة',
  },
  {
    value: 'flightTicketsDueDate',
    label: 'تكاليف رخص العمل',
  },
  {
    value: 'duesPayDate',
    label: 'مصروفات التأمينات الاجتماعية',
  },
];

const AddFinance = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | undefined>("");
  const [value, setValue] = useState<Date | null | Dayjs>(new Date());
  const [amount, setAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter();
  const params = useParams();
  const employeeId: string = params?.employeeId  ? params?.employeeId.toString() : ""

  const { data: session } = useSession()
  const token: string = session?.user?.email ?? Token?.token;

  const handleOptionChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setSelectedOption(event.target.value);
  };



  const handleSave = () => {

    setIsLoading(true)

    const formattedDate = dayjs(value).format('YYYY-MM-DDTHH:mm:ss.SSS');
    console.log(formattedDate);
    if(selectedOption == undefined || value?.toString().trim() == null || amount == 0 ) {
      alert("please enter correct values")
      setIsLoading(false)
      return
    }

    let expense: ExpenseDTO = {
      name: selectedOption,
      amount: amount,
      isFixed: true,
      employeeId: employeeId,
      dueDate: formattedDate

    }

    // console.log("Expense:", expense);
    postExpenseFixed(expense, employeeId, token).then((response) => {
      setIsLoading(false)
      router.push(location?.pathname.replace("/add-finance-fixed", ""))
    }).catch(err => {
      alert(err)
      setIsLoading(false)
    });

  };



  const handleCancel = () => {
    // Perform the cancel action, such as returning to the previous page.
    // You can use React Router or other navigation mechanisms for this.
  };

  const handleAmountChange = (event: any) => {
    setAmount(parseFloat(event.target.value));
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
            <MenuItem key={option.value} value={option.label}>
              {"إضافة "+ option.label}
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
          name="amoubt"
          variant="outlined"
          margin="normal"
          fullWidth
          type='number'
          value={amount}
          onChange={handleAmountChange}
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
          disabled={isLoading}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="error" // Error color
        //   onClick={handleCancel}
          href={"/nkry-ca/manage-employee/" + employeeId}
          style={{margin: '10px'}}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </Box>
      {/* You can access the selected option and date here: selectedOption, selectedDate */}
    </Box>
  );
};

export default AddFinance;
