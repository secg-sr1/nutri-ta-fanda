import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Box, Typography, useMediaQuery } from '@mui/material';

const NutritionChart = ({ data }) => {
  const chartRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!data || data.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: 'Nutrition Breakdown',
        left: 'center',
        textStyle: {
          fontSize: isMobile ? 14 : 18
        }
      },
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.name),
        axisLabel: {
          fontSize: isMobile ? 10 : 12
        }
      },
      yAxis: {
        type: 'value',
        name: 'Grams',
        axisLabel: {
          fontSize: isMobile ? 10 : 12
        }
      },
      series: [{
        type: 'bar',
        data: data.map(item => item.value),
        itemStyle: {
          color: (params) => params.name === 'Sugar' ? '#c23531' : '#5470c6',
          borderRadius: [4, 4, 0, 0]
        },
        barWidth: isMobile ? '40%' : '50%'
      }]
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, isMobile]);

  return (
    <Box mt={4} width="100%" display="flex" justifyContent="center">
      <Box width="100%" maxWidth={isMobile ? 350 : 600}>
        <Typography variant="h6" align="center" gutterBottom>Nutrition Chart</Typography>
        <div ref={chartRef} style={{ width: '100%', height: 400 }} />
      </Box>
    </Box>
  );
};

export default NutritionChart;
