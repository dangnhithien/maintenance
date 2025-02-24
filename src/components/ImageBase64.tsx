import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

interface ImageDisplayProps {
  // Chuỗi Base64 của hình ảnh (không chứa prefix "data:image/jpeg;base64,")
  imageData: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  // Cho phép chỉ định MIME type nếu cần (mặc định là image/jpeg)
  mimeType?: string;
  // Cho phép truyền style tùy chỉnh cho ảnh
  sx?: SxProps<Theme>;
}

const ImageBase64: React.FC<ImageDisplayProps> = ({
  imageData,
  alt = "Image",
  width = "100%",
  height = "auto",
  mimeType = "image/jpeg",
  sx,
}) => {
  // Nếu imageData rỗng, hiển thị hình placeholder
  if (!imageData) {
    return (
      <Box>
        <Box
          component="img"
          src={"https://placehold.co/600x400/png"}
          alt={alt}
          width={width}
          height={height}
          sx={{ objectFit: "contain", borderRadius: 1, ...sx }}
        />
      </Box>
    );
  }

  // Tạo data URL từ MIME type và chuỗi Base64
  const src = `data:${mimeType};base64,${imageData}`;

  return (
    <Box>
      <Box
        component="img"
        src={src}
        alt={alt}
        width={width}
        height={height}
        sx={{ objectFit: "contain", borderRadius: 1, ...sx }}
      />
    </Box>
  );
};

export default ImageBase64;
