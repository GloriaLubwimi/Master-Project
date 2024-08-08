import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/en-gb'

export default function DatePickerForm({label, value, onChange}) {
  return (
    
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
        <DemoContainer components={['DatePicker']}>
            <DatePicker 
            label={label} 
            sx={{width: '100%'}}
            value={value}
            onChange={onChange}
            inputFormat='DD/MM/YYYY'
            />
        </DemoContainer>
    </LocalizationProvider>
    
  );
}