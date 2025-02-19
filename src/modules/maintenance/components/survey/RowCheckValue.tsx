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
          p: 1,
          backgroundColor: "#e0f7fa",
          borderLeft: "4px solid #00acc1",
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold" color="#006064">
          {data.rowCheckContent}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1, mb: 1, pl: 4 }}>
      <Grid container spacing={1}>
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
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

export default RowCheckValue;
