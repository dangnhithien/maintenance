import taskCheckApi from "@modules/maintenance/apis/taskCheckApi";
import { EnumStatusTaskCheck } from "@modules/maintenance/datas/enum/EnumStatusTaskCheck";
import useTaskCheck from "@modules/maintenance/hooks/useTaskCheck";
import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
interface Props {
  id?: string;
}
const ApprovalDetail: React.FC<Props> = ({ id }) => {
  const [note, setNote] = useState("");
  const { updateTaskCheck } = useTaskCheck();

  const handleApprove = (e: React.FormEvent) => {
    if (!id) return;
    taskCheckApi
      .updateStatus(id, {
        taskCheckStatus: EnumStatusTaskCheck.APPROVED,
      })
      .catch(() => {});
  };

  const handleReject = (e: React.FormEvent) => {
    if (!id) return;
    taskCheckApi
      .updateStatus(id, {
        taskCheckStatus: EnumStatusTaskCheck.REJECTED,
      })
      .catch(() => {});
  };

  return (
    <Box>
      <form>
        <TextField
          label="Ghi chú"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleApprove}
            sx={{ mr: 2 }}
          >
            Approve
          </Button>
          <Button variant="contained" color="error" onClick={handleReject}>
            Reject
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ApprovalDetail;
