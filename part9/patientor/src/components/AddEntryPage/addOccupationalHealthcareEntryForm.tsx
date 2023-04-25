import { useState, SyntheticEvent, useEffect } from "react";
import {  TextField, Grid, Button, } from '@mui/material';
import { OccupationalHealthcareEntryWithoutId, Diagnosis, Patient, NonSensitiveDiagnoseEntry } from "../../types"
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import diagnoseService from "../../services/diagnoses"
import DiagosesComponent from "../../hooks";


interface Props {
    onSubmit: (patient: Patient, values: OccupationalHealthcareEntryWithoutId) => void;
    patient: Patient,
  }

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

const AddOccupationalHealthcareEntryForm = ({onSubmit, patient }: Props) => {
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])
    const [employerName, setEmployerName] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

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

    const addEntry = (event: SyntheticEvent) => {
        event.preventDefault();
        if(endDate === "" && startDate === ""){
          onSubmit(patient, {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
        })
        }else {
          onSubmit(patient, {
            type: "OccupationalHealthcare",
            description,
            date,
            specialist,
            diagnosisCodes,
            employerName,
            sickLeave: {
              startDate,
              endDate
            }
        })
        }
        setDescription("")
        setDate("")
        setSpecialist("")
        setDiagnosisCodes([])
        setEmployerName("")
        setStartDate("")
        setEndDate("")
    }

    return (
        <div>
          <form style={{paddingBlock: 30}} onSubmit={addEntry}>
            <TextField
              label="Description"
              fullWidth 
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
            <InputLabel>Pass date</InputLabel>     
            <Input
              type="date" 
              fullWidth
              value={date}
              onChange={({target}) => setDate(target.value)} 
            />
            <TextField
              label="Specialist"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
           <InputLabel id="diagnose-multiple-checkbox-label">Select Diagnose Code</InputLabel> 
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
          <DiagosesComponent />
        </Select>
              <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel>Pass a sickleave start date</InputLabel>              
            <Input
              style={{paddingBlock: 5}}
              type="date" 
              fullWidth
              value={startDate}
              onChange={({target}) => setStartDate(target.value)} 
            />  
            <InputLabel>Pass a sickleave end date</InputLabel>                
            <Input
              style={{paddingBlock: 5}}
              type="date" 
              fullWidth
              value={endDate}
              onChange={({target}) => setEndDate(target.value)} 
            />   
            <Grid>
              <Grid item>
                <Button
                  style={{
                    marginTop: 10,
                    float: "left",
                  }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      );
}



export default AddOccupationalHealthcareEntryForm