import { Button, Stack, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import React from "react";
import { useForm } from "react-hook-form";

export interface Props {
  onSearch: (data: string) => void;
}

// Define the form data structure
interface FormData {
  searchText: string; // Define the expected field
}

const InputSearch: React.FC<Props> = ({ onSearch }) => {
  const { register, handleSubmit } = useForm<FormData>(); // Use the FormData type for the form

  const onSubmit = (data: FormData) => {
    onSearch(data.searchText); // Pass the searchText field to onSearch
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        spacing={0}
        sx={{ width: 500 }}
      >
        <TextField
          size="small"
          fullWidth
          {...register("searchText")} // Register searchText field
          placeholder="Nhập từ khóa tìm kiếm ..."
          sx={{
            backgroundColor: "white",
            borderTopRightRadius: " 0px !important",
            borderBottomRightRadius: "0px !important",
            borderRadius: " 0px !important",
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginLeft: "-2px",
            borderTopLeftRadius: "0px",
            borderBottomLeftRadius: "0px",
          }}
        >
          <GridSearchIcon />
        </Button>
      </Stack>
    </form>
  );
};

export default InputSearch;
