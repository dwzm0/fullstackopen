import { useState, useEffect } from "react";
import { NonSensitiveDiagnoseEntry, Diagnosis } from "../types"
import diagnoseService from "../services/diagnoses"
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
}; 

  const DiagosesComponent = () => {
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])


    const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
          target: { value },
        } = event;
        setDiagnosisCodes(
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    useEffect(() => {
    const fetchDiagnoseList = async () => {
        const diagnoses = await diagnoseService.getAll();
        setDiagnoses(diagnoses);
    };
    void fetchDiagnoseList();
    }, []);

    console.log("HI");
    

    return (
        <Select
        sx={{width: 300}}
        id="diagnose-multiple-checkbox"
        multiple
        value={diagnosisCodes}
        onChange={handleDiagnosisChange}
        input={<OutlinedInput label="Select Diagnose Code" />}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
      >
    {diagnoses.map((diagnose) => (
      <MenuItem key={diagnose.code} value={diagnose.code}>
        <Checkbox checked={diagnosisCodes.indexOf(diagnose.code) > -1} />
        <ListItemText primary={diagnose.code} />
      </MenuItem>
    ))}
  </Select>
    )
}

export default DiagosesComponent