import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Avatar, Box, Button, Grid2, Paper, Typography } from '@mui/material';
import SurveyRow from './SurveyRow';

const Survey = () => {
  return (


    <Grid2 container spacing={1}  >
      <Paper sx={{width:'100%',py:2, px:4}}>

     <Grid2 container direction={"row"} spacing={1} sx={{ marginTop: 1 }} size={12}>
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
      
      <Grid2 size={12}>
        <Typography 
          variant="h5" 
          sx={{ textAlign: 'justify', lineHeight: 1.6 }} 
          fontWeight="bold"
        >
          Phiếu khảo sát máy in linx
        </Typography>
      </Grid2>

    
      <Grid2 container size={12} direction="row" flexWrap="nowrap">
        {/* Employee Info */}
        <Grid2 container size={6} alignItems="center" spacing={1}>
          <Grid2>
            <Avatar
              alt="Nhân viên Nguyễn Văn A"
              src="https://tranhincanvas.com/uploads/images/H%C3%ACnh%20trong%20b%C3%A0i%20h%E1%BB%8Da%20s%C4%A9%20phung%20huyen/20.jpg"
              sx={{ width: 32, height: 32 }}
            />
          </Grid2>
          <Grid2>
            <Box>
              <Typography 
                variant="body1" 
                fontWeight="bold" 
                sx={{ fontSize: '0.875rem' }}
              >
                Nhân viên
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ fontSize: '0.75rem' }}
              >
                Nguyễn Văn A
              </Typography>
            </Box>
          </Grid2>
        </Grid2>

        {/* Calendar Info */}
        <Grid2 container size={6} alignItems="center" spacing={1}>
          <Grid2>
            <CalendarMonthIcon 
              sx={{ width: 32, height: 32 }} 
              color="primary" 
            />
          </Grid2>
          <Grid2>
            <Box>
              <Typography 
                variant="body1" 
                fontWeight="bold" 
                sx={{ fontSize: '0.875rem' }}
              >
                Ngày làm việc
              </Typography>
              <Typography 
                variant="body2" 
                color="textSecondary" 
                sx={{ fontSize: '0.75rem' }}
              >
                15 tháng 1, 2025
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
      </Paper>

     
      <Grid2 container size={12} spacing={1} direction={'column'}>
        <Grid2>

        <SurveyRow />
        </Grid2>

        <Grid2>

        <SurveyRow />
        </Grid2>

        <Grid2>

        <SurveyRow />
        </Grid2>

        <Grid2>

        <SurveyRow />
        </Grid2>

        <Grid2>

        <SurveyRow />
        </Grid2>

        <Grid2>

        <SurveyRow />
        </Grid2>

        <Grid2>

        <SurveyRow />
        </Grid2>
       
      </Grid2>

      <Grid2>
        <Button variant='contained' color='success'>Xác nhận</Button> 
      </Grid2>
    </Grid2>
  
  );
};

export default Survey;
