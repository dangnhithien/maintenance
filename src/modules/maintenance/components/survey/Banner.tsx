import { Box, CardContent, CardMedia, Grid2, Paper, Typography } from '@mui/material';
import React from 'react';

interface BannerProps {
  imageSrc: string;
  title: string;
  description: string;
  deviceCode: string;
  deviceName: string;
  deviceType: string;
  deviceGroup: string;
}

const Banner: React.FC<BannerProps> = ({
  imageSrc,
  title,
  description,
  deviceCode,
  deviceName,
  deviceType,
  deviceGroup,
}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden',background:'#ffffff'}}>
      <Grid2 container spacing={2} direction={'row'}>
        {/* Image Section */}
        <Grid2 >
          <CardMedia
            component="img"
            sx={{ height: 200,width:200, objectFit: 'cover' }}
            image={imageSrc}
            alt={title}
          />
        </Grid2>
        {/* Info Section */}
        <Grid2
           
         
            sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {description}
            </Typography>
            <Box mt={2}>
              <Typography variant="subtitle2" color="text.primary">
                Mã thiết bị: {deviceCode}
              </Typography>
              <Typography variant="subtitle2" color="text.primary">
                Tên thiết bị: {deviceName}
              </Typography>
              <Typography variant="subtitle2" color="text.primary">
                Loại thiết bị: {deviceType}
              </Typography>
              <Typography variant="subtitle2" color="text.primary">
                Nhóm thiết bị: {deviceGroup}
              </Typography>
            </Box>
          </CardContent>
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default Banner;
