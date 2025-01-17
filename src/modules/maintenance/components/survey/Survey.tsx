import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, Box, Grid2, Typography } from '@mui/material';
import SurveyRow from './SurveyRow';

const Survey = () => {
  return (


    <Grid2 container spacing={3} sx={{ padding: 2 }} size={4}>
     <Grid2 container direction={"row"} justifyContent={'center'} alignItems="center" spacing={1} sx={{ marginTop: 2 }} size={12}>
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "red",
            lineHeight:12
          }}
        ></div>
        <Typography variant="caption" sx={{ marginLeft: "0.5rem" }}>
          Chưa hoàn thành
        </Typography>
      </Grid2>
      {/* Text Section */}
      <Grid2 size={12}>
        <Typography 
          variant="h5" 
          sx={{ textAlign: 'justify', lineHeight: 1.6 }} 
          fontWeight="bold"
        >
          Phiếu khảo sát máy in linx
        </Typography>
      </Grid2>

      {/* Employee Info Section */}
      <Grid2 container size={12} direction="row" flexWrap="nowrap">
        {/* Employee Info */}
        <Grid2 container size={6} alignItems="center" spacing={2}>
          <Grid2>
            <Avatar
              alt="Nhân viên Nguyễn Văn A"
              src="https://tranhincanvas.com/uploads/images/H%C3%ACnh%20trong%20b%C3%A0i%20h%E1%BB%8Da%20s%C4%A9%20phung%20huyen/20.jpg"
              sx={{ width: 48, height: 48 }}
            />
          </Grid2>
          <Grid2>
            <Box>
              <Typography 
                variant="body1" 
                fontWeight="bold" 
                sx={{ fontSize: '1rem' }}
              >
                Nhân viên
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ fontSize: '0.875rem' }}
              >
                Nguyễn Văn A
              </Typography>
            </Box>
          </Grid2>
        </Grid2>

        {/* Calendar Info */}
        <Grid2 container size={6} alignItems="center" spacing={2}>
          <Grid2>
            <CalendarMonthIcon 
              sx={{ width: 40, height: 40 }} 
              color="primary" 
            />
          </Grid2>
          <Grid2>
            <Box>
              <Typography 
                variant="body1" 
                fontWeight="bold" 
                sx={{ fontSize: '1rem' }}
              >
                Ngày làm việc
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ fontSize: '0.875rem' }}
              >
                15 tháng 1, 2025
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>

      {/* Survey Row */}
      <Grid2>
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
        <SurveyRow />
      </Grid2>
    </Grid2>
  
  );
};

export default Survey;
