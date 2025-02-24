import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

interface UserDto {
  image: string;
  name: string;
  email: string;
  phone: string;
  position: string;
}

interface InfoUserProps {
  user?: UserDto;
}

const mockUser: UserDto = {
  image: "https://via.placeholder.com/150",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "123-456-7890",
  position: "Software Developer",
};

const InfoUser: React.FC<InfoUserProps> = ({ user }) => {
  user = mockUser;
  return (
    <Box
      sx={{
        maxWidth: 350,
        margin: "auto",
        borderRadius: "5px",
        padding: 2,
        boxShadow: 2,
        backgroundColor: "#fff",
        height: "100%",
      }}
    >
      {/* Hình ảnh nằm trên cùng */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Avatar
          src={user.image}
          alt={user.name}
          sx={{ width: 120, height: 120 }}
        />
      </Box>

      {/* Thông tin tài khoản */}
      <Typography variant="h6" gutterBottom>
        Thông tin tài khoản
      </Typography>
      <Box sx={{ mb: 2, pl: 1 }}>
        <Typography variant="body1">
          <strong>Tên:</strong> {user.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user.email}
        </Typography>
      </Box>

      {/* Thông tin chung */}
      <Typography variant="h6" gutterBottom>
        Thông tin chung
      </Typography>
      <Box sx={{ pl: 1 }}>
        <Typography variant="body1">
          <strong>Số điện thoại:</strong> {user.phone}
        </Typography>
        <Typography variant="body1">
          <strong>Vị trí:</strong> {user.position}
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoUser;
