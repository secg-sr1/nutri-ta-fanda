// src/components/DietGoalsSelector.jsx

import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, Box, Typography } from '@mui/material';

const goals = [
  { label: 'Low Sugar', key: 'low_sugar' },
  { label: 'Low Carbs', key: 'low_carbs' },
  { label: 'High Protein', key: 'high_protein' },
  { label: 'Balanced Diet', key: 'balanced' }
];

const DietGoalsSelector = ({ goal, setGoal }) => {
  return (
    <Box mt={2}>
      <Typography variant="h6">Select your dietary goal</Typography>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="diet-goal-label">Dietary Goal</InputLabel>
        <Select
          labelId="diet-goal-label"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          label="Dietary Goal"
        >
          {goals.map((g) => (
            <MenuItem key={g.key} value={g.key}>{g.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default DietGoalsSelector;
