import { FormControl, FormControlLabel, FormLabel, MenuItem, Paper, Radio, Select, TextField } from '@mui/material';
import { useState } from 'react';

const SurveyRow = () => {
  const [checkedTrue, setCheckedTrue] = useState(false);
  const [checkedFalse, setCheckedFalse] = useState(false);
  const [note, setNote] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const handleCheckboxChange = (value: string) => {
    if (value === 'true') {
      setCheckedTrue(!checkedTrue);
      if (checkedFalse) {
        setCheckedFalse(false);
        setSelectedReason(''); // Reset the reason if "True" is checked
      }
      setNote(''); // Reset note when "True" is checked/unchecked
    } else if (value === 'false') {
      setCheckedFalse(!checkedFalse);
      if (checkedTrue) {
        setCheckedTrue(false);
      }
      if (!checkedFalse) {
        setNote(''); // Reset note only when switching from unchecked to checked
        setSelectedReason(''); // Reset reason when "False" is first selected
      }
    }
  };

  const handleNoteChange = (event: any) => {
    setNote(event.target.value);
  };

  const handleReasonChange = (event: any) => {
    setSelectedReason(event.target.value);
  };

  return (
    <Paper elevation={2} sx={{  pt:3,pb:4  ,px:4 }}>
      <FormControl component="fieldset" style={{ width: '100%' }}>
        <FormLabel sx={{fontWeight:'bold'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ullam excepturi molestiae. Adipisci distinctio dicta commodi temporibus nisi fugit dignissimos odio perferendis debitis ex. In a voluptatem aliquam dolores nisi.</FormLabel>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px',marginTop:'8px' }}>
          <FormControlLabel
            control={
              <Radio
                checked={checkedTrue}
                onChange={() => handleCheckboxChange('true')}
              />
            }
            label="Đã kiểm tra"
          />
          <FormControlLabel
            control={
              <Radio
                checked={checkedFalse}
                onChange={() => handleCheckboxChange('false')}
              />
            }
            label="Lỗi"
          />
           {checkedFalse && (
            <FormControl style={{ minWidth: 150 }}>
              <Select
                value={selectedReason}
                onChange={handleReasonChange}
                displayEmpty
                size='small'
                
            
              >
                <MenuItem value="" disabled >
                 
                  Chọn lý do
                </MenuItem>
                <MenuItem value="network">Lỗi mạng</MenuItem>
                <MenuItem value="hardware">Lỗi phần cứng</MenuItem>
                <MenuItem value="software">Lỗi phần mềm</MenuItem>
              </Select>
            </FormControl>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end'}}>
           <FormLabel style={{ marginRight: '8px',width:80,marginBottom:'-5px' }}>Ghi chú:</FormLabel>
        <TextField
        
          variant="standard"
          fullWidth
          value={note}
          onChange={handleNoteChange}


        />
        </div>
       
      </FormControl>
    </Paper>
  );
};

export default SurveyRow;
