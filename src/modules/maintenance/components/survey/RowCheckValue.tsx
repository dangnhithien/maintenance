import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import { Box, Divider, Grid, Typography } from "@mui/material";

interface Props {
  data: RowCheckValueDto;
}

const RowCheckValue: React.FC<Props> = ({ data }) => {
  if (data.isHeader) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2, // tăng padding
          backgroundColor: "#e3f2fd", // màu nền sáng nhẹ
          // borderLeft: "5px solid #1565c0", // màu viền trái nổi bật
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" color="#1565c0">
          {data.rowCheckContent}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1, mb: 1, pl: 5 }}>
      <Grid container spacing={2}>
        {/* Cột câu hỏi bên trái */}
        <Grid item xs={6}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            {data.rowCheckContent}
          </Typography>
        </Grid>
        {/* Cột câu trả lời bên phải */}
        <Grid item xs={6}>
          <Typography variant="body1" color="text.primary">
            {data.value}
          </Typography>
          {data.note && (
            <Typography variant="caption" color="text.secondary">
              Ghi chú: {data.note}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default RowCheckValue;
