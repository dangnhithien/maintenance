import { Button, Stack, TextField } from "@mui/material";
import { GridSearchIcon } from "@mui/x-data-grid";
import React, { useState } from "react";
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
  const [disabled, setDisabled] = useState(false); // State to manage button disabled status

  const onSubmit = (data: FormData) => {
    setDisabled(true); // Disable the button immediately after submit
    onSearch(data.searchText); // Pass the searchText field to onSearch

    // Re-enable the button after 2000ms (2 seconds)
    setTimeout(() => {
      setDisabled(false);
    }, 500);
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
            borderTopRightRadius: "0px !important",
            borderBottomRightRadius: "0px !important",
            borderRadius: "0px !important",
          }}
        />
        <Button
          variant="contained"
          type="submit"
          loading={disabled}
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
