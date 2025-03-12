import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

export interface Props {
  onSearch: (data: string) => void;
}

interface FormData {
  searchText: string;
}

const InputSearch: React.FC<Props> = ({ onSearch }) => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const searchText = watch("searchText", ""); // Giá trị mặc định ""
  const debounceRef = useRef<NodeJS.Timeout | null>(null); // Giữ tham chiếu của timer debounce

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current); // Xóa timer cũ trước khi tạo mới

    debounceRef.current = setTimeout(() => {
      onSearch(searchText.trim()); // Gọi search, kể cả khi input rỗng
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current); // Xóa timer khi unmount
    };
  }, [searchText]);

  const onSubmit = (data: FormData) => {
    onSearch(data.searchText.trim()); // Submit ngay lập tức khi nhấn Enter
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" alignItems="center" sx={{ width: 250 }}>
        <TextField
          size="small"
          fullWidth
          {...register("searchText")}
          placeholder="Tìm kiếm thông tin"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
            sx: {
              height: "32px",
              fontSize: "14px",
              padding: "4px 8px",
            },
          }}
          sx={{
            backgroundColor: "white",
            borderRadius: "16px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "16px",
              fontSize: "14px",
              height: "32px",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#ccc",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#999",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
          }}
        />
      </Stack>
    </form>
  );
};

export default InputSearch;
