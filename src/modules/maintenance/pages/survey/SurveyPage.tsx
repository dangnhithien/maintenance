import Banner from "@modules/maintenance/components/survey/Banner";

import { Container, Grid2 } from "@mui/material";

const SurveyPage = () => {
  return (
    <Container>
      <Grid2 container spacing={1} p={2}>
        <Grid2 size={12}>
          <Banner
            imageSrc="https://vmsco.vn/wp-content/uploads/2024/03/may-in-date-linx-8830.jpg"
            title="Thông tin thiết bị"
            description="Thiết bị được sử dụng trong hệ thống quản lý hiện đại."
            deviceCode="D12345"
            deviceName="Thiết bị đo lường"
            deviceType="Thiết bị cảm biến"
            deviceGroup="Nhóm cảm biến môi trường"
          />
        </Grid2>
        <Grid2 size={12} direction={"row"}></Grid2>
      </Grid2>
    </Container>
  );
};

export default SurveyPage;
