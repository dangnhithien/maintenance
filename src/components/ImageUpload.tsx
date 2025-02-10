import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

interface ImageUploadProps {
  // Dữ liệu trả về sẽ là chuỗi Base64 không chứa prefix
  onImageUpload: (base64Image: string) => void;
  image?: string;
  label?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  label = "Upload Image",
  image = null,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    image ? `data:image/jpeg;base64,${image}` : null
  );

  // Cập nhật imagePreview khi prop image thay đổi
  useEffect(() => {
    if (image) {
      setImagePreview(`data:image/jpeg;base64,${image}`);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  // Giải phóng URL preview nếu đang dùng blob URL (trường hợp có thể xảy ra)
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Sử dụng FileReader để đọc file dưới dạng DataURL (chuỗi Base64 có prefix)
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        // Loại bỏ prefix (ví dụ: "data:image/jpeg;base64,")
        const base64Data = dataUrl.includes(",")
          ? dataUrl.split(",")[1]
          : dataUrl;
        // Cập nhật preview với DataURL đầy đủ (để hiển thị hình ảnh đúng cách)
        setImagePreview(dataUrl);
        // Trả về chuỗi Base64 không kèm prefix cho backend
        onImageUpload(base64Data);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Box
        component="label"
        width={200}
        height={200}
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="2px dashed #ccc"
        borderRadius={2}
        overflow="hidden"
        sx={{
          cursor: "pointer",
          transition: "border-color 0.3s ease",
          backgroundColor: imagePreview ? "transparent" : "grey.100",
          "&:hover": {
            borderColor: "primary.main",
          },
        }}
      >
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview ? (
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <Typography variant="subtitle1" color="text.secondary">
            {label}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;
