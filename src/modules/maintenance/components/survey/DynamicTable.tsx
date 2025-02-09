import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import RowCheck from "./RowCheck";

// Row Component – hiển thị dạng card, không có số thứ tự

interface Props {
  rowCheckLists: CreateRowCheckListDto[];
  onChange?: (value: CreateRowCheckListDto[]) => void;
}

// Component chính sử dụng giao diện dạng form
const DynamicForm: React.FC<Props> = ({ rowCheckLists, onChange }) => {
  const [rows, setRows] = useState<CreateRowCheckListDto[]>(rowCheckLists);

  useEffect(() => {
    if (rowCheckLists.length === 0) handleAddRowAt(0);
    else setRows(rowCheckLists);
  }, [rowCheckLists]);

  // Cập nhật giá trị của các trường trong card
  const handleInputChange = (
    index: number,
    field: keyof CreateRowCheckListDto,
    value: string
  ) => {
    const updatedRows = rows.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
    if (onChange) onChange(updatedRows);
  };

  // Xóa một card
  const handleDelete = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    if (onChange) onChange(updatedRows);
  };

  // Thêm một card mới ngay sau card có chỉ số index
  const handleAddRowAt = (index: number) => {
    const newRow: CreateRowCheckListDto = {
      content: "",
      typeErrorId: "",
      code: "",
      templateCheckId: "",
    };

    let newRows: CreateRowCheckListDto[] = [];
    if (rows.length === 0) {
      newRows = [newRow];
    } else {
      newRows = [...rows];
      newRows.splice(index + 1, 0, newRow);
    }
    setRows(newRows);
    if (onChange) onChange(newRows);
  };

  return (
    <Box>
      {rows.map((row, index) => (
        <RowCheck
          key={index}
          index={index}
          row={row}
          onInputChange={handleInputChange}
          onDelete={handleDelete}
          onAdd={handleAddRowAt}
        />
      ))}
    </Box>
  );
};

export default DynamicForm;
