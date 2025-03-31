// src/components/DetectedFoods.jsx

import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const DetectedFoods = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <Box mt={2} p={2} borderRadius={2} bgcolor="primary.light" color="primary.contrastText">
      <Typography variant="h6" gutterBottom>
        Detected Foods
      </Typography>
      <List>
        {data.map((item, idx) => (
          <ListItem key={idx} disablePadding>
            <ListItemIcon>
              <RestaurantMenuIcon color="inherit" />
            </ListItemIcon>
            <ListItemText
              primary={
                `${item.food_item}${item.estimated_quantity ? ` (${item.estimated_quantity})` : ''}`
              }
              secondary={`Sugar: ${item.sugar}g | Protein: ${item.protein}g | Fat: ${item.fat}g | Carbs: ${item.carbohydrates}g`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DetectedFoods;
