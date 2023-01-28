import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      {/* <Box sx={{ minWidth: 35 }}>
        <Typography variant='subtitle2' color='text.secondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box> */}
    </Box>
  );
};

export default LinearProgressWithLabel;
