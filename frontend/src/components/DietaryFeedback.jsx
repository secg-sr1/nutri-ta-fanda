// // src/components/DietaryFeedback.jsx

// import React from 'react';
// import { Alert, Box, Typography } from '@mui/material';

// const DietaryFeedback = ({ data }) => {
//   if (!data || data.length === 0) return null;

//   const { sugar, protein, fat, carbs } = data.reduce(
//     (acc, item) => {
//       acc.sugar += item.sugar || 0;
//       acc.protein += item.protein || 0;
//       acc.fat += item.fat || 0;
//       acc.carbs += item.carbohydrates || 0;
//       return acc;
//     },
//     { sugar: 0, protein: 0, fat: 0, carbs: 0 }
//   );

//   // Basic Dietary Advice Rules
//   const sugarMsg = sugar > 25 ?
//     `⚠️ High sugar detected (${sugar}g). Consider reducing sugar intake.` :
//     `✅ Sugar is within a healthy range (${sugar}g).`;

//   const proteinMsg = protein < 10 ?
//     `⚠️ Low protein detected (${protein}g). Consider adding a protein source.` :
//     `✅ Good protein level (${protein}g).`;

//   return (
//     <Box mt={2}>
//       <Typography variant="h6">Tough Angie's Recommendations</Typography>
//       <Alert severity={sugar > 25 ? "warning" : "success"} sx={{ mt: 1 }}>{sugarMsg}</Alert>
//       <Alert severity={protein < 10 ? "warning" : "success"} sx={{ mt: 1 }}>{proteinMsg}</Alert>
//     </Box>
//   );
// };

// export default DietaryFeedback;



// src/components/DietaryFeedback.jsx (Adaptive)

import React from 'react';
import { Alert, Box, Typography } from '@mui/material';

const DietaryFeedback = ({ data, goal }) => {
  if (!data || data.length === 0) return null;

  const total = data.reduce((acc, item) => {
    acc.sugar += item.sugar || 0;
    acc.protein += item.protein || 0;
    acc.fat += item.fat || 0;
    acc.carbs += item.carbohydrates || 0;
    return acc;
  }, { sugar: 0, protein: 0, fat: 0, carbs: 0 });

  const feedbacks = {
    low_sugar: total.sugar > 25
      ? `⚠️ High sugar detected (${total.sugar}g). Consider reducing sugary foods.`
      : `✅ Sugar is within recommended limits (${total.sugar}g).`,

    low_carbs: total.carbs > 50
      ? `⚠️ High carbs detected (${total.carbs}g). Consider lowering carb intake.`
      : `✅ Carb intake looks good (${total.carbs}g).`,

    high_protein: total.protein < 15
      ? `⚠️ Low protein detected (${total.protein}g). Consider increasing protein sources.`
      : `✅ Protein intake looks good (${total.protein}g).`,

    balanced: `✅ Meal analyzed. Sugar: ${total.sugar}g, Protein: ${total.protein}g, Fat: ${total.fat}g, Carbs: ${total.carbs}g.`
  };

  return (
    <Box mt={2}>
      <Typography variant="h6">Tough Angie's Recommendation</Typography>
      <Alert severity={feedbacks[goal].includes('⚠️') ? 'warning' : 'success'} sx={{ mt: 1 }}>
        {feedbacks[goal]}
      </Alert>
    </Box>
  );
};

export default DietaryFeedback;
