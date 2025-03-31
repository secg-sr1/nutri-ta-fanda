// // src/components/CaptureAndSendPhoto.jsx
// import React, { useRef, useCallback, useState } from 'react';
// import Webcam from 'react-webcam';
// import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
// import axios from 'axios';

// import NutritionChart from './NutritionChart';

// const videoConstraints = {
//   facingMode: 'environment',
// };

// const CaptureAndSendPhoto = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const capturePhoto = useCallback(() => {
//     const image = webcamRef.current.getScreenshot();
//     if (!image) {
//       setError('Failed to capture image');
//       return;
//     }
//     setImageSrc(image);
//     setError(null);
//     setResult(null);
//   }, []);

//   const sendToBackend = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post('http://localhost:4000/analyze', {
//         base64Image: imageSrc
//       });
//       setResult(res.data.result);
//       setLoading(false);
//     } catch (err) {
//       setError('Failed to analyze image');
//       setLoading(false);
//     }
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2}>
//       <Typography variant="h5">Take a Picture of Your Meal</Typography>

//       {!imageSrc && (
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           style={{ width: '100%', maxWidth: 400, borderRadius: 8 }}
//         />
//       )}

//       {error && <Alert severity="error">{error}</Alert>}

//       {!imageSrc ? (
//         <Button variant="contained" color="primary" onClick={capturePhoto}>
//           Capture Photo
//         </Button>
//       ) : (
//         <>
//           <img src={imageSrc} alt="Captured" style={{ width: '100%', maxWidth: 400, borderRadius: 8 }} />
//           <Box display="flex" gap={2}>
//             <Button variant="outlined" color="secondary" onClick={() => setImageSrc(null)}>
//               Retake
//             </Button>
//             <Button variant="contained" color="success" onClick={sendToBackend} disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : "Analyze"}
//             </Button>
//           </Box>
//         </>
//       )}

//       {result && (
//         <>
//           <Alert severity="info" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>
//             <strong>Answer:</strong><br />{result}
//           </Alert>

//           <NutritionChart data={[
//             { name: 'Sugar', value: 20 },
//             { name: 'Protein', value: 15 },
//             { name: 'Carbs', value: 40 },
//             { name: 'Fat', value: 10 }
//           ]} />
//         </>
//       )}
//     </Box>
//   );
// };

// export default CaptureAndSendPhoto;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// src/components/CaptureAndVisualize.jsx

// import React, { useRef, useCallback, useState } from 'react';
// import Webcam from 'react-webcam';
// import { Button, Box, Typography, Alert, CircularProgress } from '@mui/material';
// import axios from 'axios';
// import NutritionChart from './NutritionChart';
// import DietaryFeedback from './DietaryFeedback';
// import DetectedFoods from './DetectedFoods';
// import DietGoalsSelector from './DietGoalsSelector';

// const videoConstraints = {
//   facingMode: 'environment',
// };

// const CaptureAndVisualize = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);
//   const [nutritionData, setNutritionData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [goal, setGoal] = useState('balanced')

//   const capturePhoto = useCallback(() => {
//     const image = webcamRef.current.getScreenshot();
//     if (!image) {
//       setError('Failed to capture image');
//       return;
//     }
//     setImageSrc(image);
//     setError(null);
//     setNutritionData(null);
//   }, []);

//   const analyzePhoto = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post('http://localhost:4000/analyze', { base64Image: imageSrc });
//       setNutritionData(res.data.data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to analyze image');
//       setLoading(false);
//     }
//   };

//   const prepareChartData = () => {
//     if (!nutritionData) return [];

//     const total = nutritionData.reduce((acc, item) => {
//       acc.sugar += item.sugar || 0;
//       acc.protein += item.protein || 0;
//       acc.fat += item.fat || 0;
//       acc.carbs += item.carbohydrates || 0;
//       return acc;
//     }, { sugar: 0, protein: 0, fat: 0, carbs: 0 });

//     return [
//       { name: 'Sugar', value: total.sugar },
//       { name: 'Protein', value: total.protein },
//       { name: 'Fat', value: total.fat },
//       { name: 'Carbs', value: total.carbs },
//     ];
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2}>
//       <Typography variant="h5">Take a Picture of Your Meal</Typography>

//       {!imageSrc && (
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           videoConstraints={videoConstraints}
//           style={{ width: '100%', maxWidth: 400, borderRadius: 8 }}
//         />
//       )}

//       {error && <Alert severity="error">{error}</Alert>}

//       {!imageSrc ? (
//         <Button variant="contained" color="primary" onClick={capturePhoto}>
//           Capture Photo
//         </Button>
//       ) : (
//         <>
//           <img src={imageSrc} alt="Captured Meal" style={{ width: '100%', maxWidth: 400, borderRadius: 8 }} />
//           <Box display="flex" gap={2}>
//             <Button variant="outlined" color="secondary" onClick={() => setImageSrc(null)}>
//               Retake
//             </Button>
//             <Button variant="contained" color="success" onClick={analyzePhoto} disabled={loading}>
//               {loading ? <CircularProgress size={24} /> : "Analyze"}
//             </Button>
//           </Box>
//         </>
//       )}

//       {nutritionData && (
//         <Box width="100%" mt={4}>
//           <Alert severity="info">Tough Angie says: Data analyzed!</Alert>
//           <DietGoalsSelector goal={goal} setGoal={setGoal} />
//           <DetectedFoods data={nutritionData} />
//           <NutritionChart data={prepareChartData()} />
//           <DietaryFeedback data={nutritionData} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default CaptureAndVisualize;

// src/components/CaptureAndVisualize.jsx (with Upload Option)

import React, { useRef, useCallback, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Typography, Alert, CircularProgress, Divider } from '@mui/material';
import axios from 'axios';
import NutritionChart from './NutritionChart';
import DetectedFoods from './DetectedFoods';
import DietaryFeedback from './DietaryFeedback';
import DietGoalsSelector from './DietGoalsSelector';
import DietaryTips from './DietaryTips';

const backendURL = import.meta.env.VITE_BACKEND_URL;
console.log(backendURL);

const videoConstraints = {
  facingMode: 'environment',
};

const CaptureAndVisualize = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [goal, setGoal] = useState('balanced');

  const capturePhoto = useCallback(() => {
    const image = webcamRef.current.getScreenshot();
    if (!image) {
      setError('Failed to capture image');
      return;
    }
    setImageSrc(image);
    setError(null);
    setNutritionData(null);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setNutritionData(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzePhoto = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${backendURL}/analyze`, { base64Image: imageSrc });
      setNutritionData(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze image');
      setLoading(false);
    }
  };

  const prepareChartData = () => {
    if (!nutritionData) return [];

    const total = nutritionData.reduce((acc, item) => {
      acc.sugar += item.sugar || 0;
      acc.protein += item.protein || 0;
      acc.fat += item.fat || 0;
      acc.carbs += item.carbohydrates || 0;
      return acc;
    }, { sugar: 0, protein: 0, fat: 0, carbs: 0 });

    return [
      { name: 'Sugar', value: total.sugar },
      { name: 'Protein', value: total.protein },
      { name: 'Fat', value: total.fat },
      { name: 'Carbs', value: total.carbs },
    ];
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2}>
      <Typography variant="h5">Analyze Your Meal</Typography>

      {!imageSrc && (
        <Box display="flex" flexDirection="column" gap={2} alignItems="center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            style={{ width: '100%', maxWidth: 400, borderRadius: 8 }}
          />
          <Button variant="contained" color="primary" onClick={capturePhoto}>
            Capture Photo
          </Button>

          <Divider>or</Divider>

          <Button variant="outlined" component="label">
            Upload Existing Image
            <input type="file" hidden accept="image/*" onChange={handleUpload} />
          </Button>
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {imageSrc && (
        <>
          <img src={imageSrc} alt="Meal Preview" style={{ width: '100%', maxWidth: 400, borderRadius: 8 }} />
          <Box display="flex" gap={2}>
            <Button variant="outlined" color="secondary" onClick={() => setImageSrc(null)}>
              Retake / Upload Another
            </Button>
            <Button variant="contained" color="success" onClick={analyzePhoto} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Analyze"}
            </Button>
          </Box>
        </>
      )}

      {nutritionData && (
        <Box width="100%" mt={4}>
          <Alert severity="info">Tough Angie says: Data analyzed!</Alert>
          <DietGoalsSelector goal={goal} setGoal={setGoal} />
          <DetectedFoods data={nutritionData} />
          <NutritionChart data={prepareChartData()} />
          <DietaryFeedback data={nutritionData} goal={goal} />
          <DietaryTips goal={goal} />
        </Box>
      )}
    </Box>
  );
};

export default CaptureAndVisualize;
