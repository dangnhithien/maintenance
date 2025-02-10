import { Box } from "@mui/material";
import React from "react";

interface ImageDisplayProps {
  // Chuỗi Base64 của hình ảnh (không chứa prefix "data:image/jpeg;base64,")
  imageData: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  // Cho phép chỉ định MIME type nếu cần (mặc định là image/jpeg)
  mimeType?: string;
}

const ImageBase64: React.FC<ImageDisplayProps> = ({
  imageData,
  alt = "Image",
  width = "100%",
  height = "auto",
  mimeType = "image/jpeg",
}) => {
  // Kiểm tra nếu imageData rỗng hoặc không có dữ liệu, hiển thị thông báo
  if (!imageData) {
    return (
      <Box>
        <Box
          component="img"
          src={"https://placehold.co/600x400/png"}
          alt={alt}
          width={width}
          height={height}
          sx={{ objectFit: "contain", borderRadius: 1 }}
        />
      </Box>
    );
  }

  // Tạo data URL bằng cách nối MIME type và chuỗi Base64
  const src = `data:${mimeType};base64,${imageData}`;

  return (
    <Box>
      <Box
        component="img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        sx={{ objectFit: "contain", borderRadius: 1 }}
      />
    </Box>
  );
};

export default ImageBase64;
