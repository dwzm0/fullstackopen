import { useState, useEffect, SyntheticEvent } from "react";
import {  TextField, Grid, Button, } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import diagnoseService from "../../services/diagnoses"
import { HealthCheckEntryWithoutId, Diagnosis, Patient, NonSensitiveDiagnoseEntry } from "../../types"

interface Props {
    onSubmit: (patient: Patient, values: HealthCheckEntryWithoutId) => void;
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


const AddHealthCheckForm = ({onSubmit, patient }: Props) => {
    const [diagnoses, setDiagnoses] = useState<NonSensitiveDiagnoseEntry[]>([]);
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [specialist, setSpecialist] = useState("")
    const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])
    const [healthCheckRating, setHealthCheckRating] = useState<number>(0) 

    const handleDiagnosisChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
      const {
        target: { value },
      } = event;
      setDiagnosisCodes(
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleRatingChange = (event: SelectChangeEvent) => {
      setHealthCheckRating(Number(event.target.value));
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
        onSubmit(patient, {
            type: "HealthCheck",
            description,
            date,
            specialist,
            diagnosisCodes,
            healthCheckRating,
        })
        setDescription("")
        setDate("")
        setSpecialist("")
        setDiagnosisCodes([])
        setHealthCheckRating(0)
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
            <InputLabel>Pass a date</InputLabel>
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
        </Select>
        <InputLabel id="rating-simple-select-label">Health Rating</InputLabel>
        <Select
          sx={{width: 75}}
          id="rating-simple-select"
          label="rating"
          value={String(healthCheckRating)}
          onChange={handleRatingChange}
        >
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
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



export default AddHealthCheckForm