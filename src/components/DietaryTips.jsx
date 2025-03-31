// src/components/DietaryTips.jsx

import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

const DietaryTips = ({ goal }) => {
  if (!goal) return null;

  const tips = {
    low_sugar: [
      'Swap sugary drinks for water or unsweetened tea.',
      'Choose fresh fruits over processed desserts.',
      'Check labels for hidden sugars in sauces and snacks.'
    ],

    low_carbs: [
      'Replace white bread and pasta with whole grains.',
      'Increase intake of non-starchy vegetables.',
      'Opt for lean proteins to feel fuller with fewer carbs.'
    ],

    high_protein: [
      'Add lean meats, legumes, or dairy to your meals.',
      'Include a protein source in every meal.',
      'Consider snacks like nuts, yogurt, or boiled eggs.'
    ],

    balanced: [
      'Maintain a varied diet with fruits, vegetables, proteins, and healthy fats.',
      'Avoid excessive processed foods.',
      'Drink enough water throughout the day.'
    ]
  };

  return (
    <Box mt={3} p={2} borderRadius={2} bgcolor="primary.light" color="primary.contrastText">
      <Typography variant="h6" gutterBottom>
        Tough Angie's Tips
      </Typography>
      <List>
        {tips[goal].map((tip, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <EmojiObjectsIcon color="inherit" />
            </ListItemIcon>
            <ListItemText primary={tip} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DietaryTips;
