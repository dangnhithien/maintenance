import { RowCheckValueDto } from "@modules/maintenance/datas/rowCheckValue/RowCheckValueDto";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

interface Props {
  data: RowCheckValueDto;
}

const RowCheckValue: React.FC<Props> = ({ data }) => {
  const [checkedTrue, setCheckedTrue] = useState(false);
  const [checkedFalse, setCheckedFalse] = useState(false);
  const [note, setNote] = useState("");
  const [selectedReason, setSelectedReason] = useState("");

  const handleCheckboxChange = (value: string) => {
    if (value === "true") {
      setCheckedTrue(!checkedTrue);
      if (checkedFalse) {
        setCheckedFalse(false);
        setSelectedReason("");
      }
      setNote("");
    } else if (value === "false") {
      setCheckedFalse(!checkedFalse);
      if (checkedTrue) {
        setCheckedTrue(false);
      }
      if (!checkedFalse) {
        setNote("");
        setSelectedReason("");
      }
    }
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote(event.target.value);
  };

  const handleReasonChange = (
    event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setSelectedReason(event.target.value);
  };

  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 1,
        backgroundColor: data.isPassed ? "#eafaf1" : "#fdecea",
        transition: "all 0.3s ease",
      }}
    >
      {/* Stack để xếp icon (bên trái) và phần text (bên phải) theo chiều ngang */}
      <Stack direction="row" spacing={2} alignItems="center">
        {/* Box chứa icon */}
        <Box
          sx={{
            width: 30,
            height: 30,
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {data.isPassed ? (
            <CheckCircleOutlineIcon sx={{ color: "#28a745", fontSize: 24 }} />
          ) : (
            <HighlightOffIcon sx={{ color: "#dc3545", fontSize: 24 }} />
          )}
        </Box>

        {/* Box chứa phần text: 
            - flex: 1 để chiếm hết chiều ngang còn lại
            - justifyContent dựa vào isPassed để căn giữa hoặc căn trái
        */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Tiêu đề */}
          <Typography
            variant="caption"
            sx={{
              fontWeight: 500,
              fontSize: "15px",
            }}
          >
            {data?.rowCheckContent}
          </Typography>

          {/* Nếu có lỗi thì hiển thị thêm chi tiết lỗi và ghi chú */}
          {!data.isPassed && (
            <>
              <Typography
                variant="caption"
                sx={{
                  color: "error.main",
                  fontStyle: "italic",
                }}
              >
                {data?.errorDetailContent}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                }}
              >
                Ghi chú: {data?.note}
              </Typography>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default RowCheckValue;
