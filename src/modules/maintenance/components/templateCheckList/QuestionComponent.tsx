import { EnumTypeValue } from "@modules/maintenance/datas/enum/EnumTypeValue";
import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid2,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

interface QuestionProps {
  question: CreateRowCheckListDto;
  updateQuestion: (
    order: number,
    key: keyof CreateRowCheckListDto,
    value: any
  ) => void;
  addAnswer: (questionOrder: number) => void;
  updateAnswer: (questionOrder: number, answerId: string, text: string) => void;
  removeAnswer: (questionOrder: number, answerId: string) => void;
  removeQuestion: (questionOrder: number) => void;
  setTargetQuestionId: (id: number | null) => void;
  targetQuestionId: number | null;
}

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  updateQuestion,
  addAnswer,
  updateAnswer,
  removeAnswer,
  removeQuestion,
  setTargetQuestionId,
  targetQuestionId,
}) => {
  // Nếu câu hỏi là header, chỉ cần nhập tiêu đề (content)
  if (question.isHeader) {
    return (
      <Card
        sx={{
          mt: 3,
          mb: 1,
          border: question.content.trim() === "" ? "1px solid red" : "none",
        }}
        onClick={() => setTargetQuestionId(question.order)}
      >
        <CardContent sx={{ p: 2, pb: 2 }}>
          {targetQuestionId === question.order ? (
            <>
              <TextField
                fullWidth
                label="Tiêu đề"
                value={question.content}
                onChange={(e) =>
                  updateQuestion(question.order, "content", e.target.value)
                }
                error={question.content.trim() === ""}
                helperText={
                  question.content.trim() === "" &&
                  "Tiêu đề không được để trống"
                }
                size="small"
                autoFocus
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  color="error"
                  onClick={() => removeQuestion(question.order)}
                  size="small"
                >
                  Xóa câu hỏi
                </Button>
              </Box>
            </>
          ) : (
            <Typography
              variant="body2"
              sx={{ fontWeight: "bold" }}
              color="primary"
            >
              {question.content || "Nhấn để nhập tiêu đề..."}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }

  // Với các câu hỏi không phải header
  const requiresAnswers =
    question.typeValue === EnumTypeValue.RADIO ||
    question.typeValue === EnumTypeValue.CHECKBOX ||
    question.typeValue === EnumTypeValue.DROPDOWN;
  const isContentEmpty = question.content.trim() === "";
  const isAnswerMissing =
    requiresAnswers &&
    (!question.dropdownValues ||
      Object.keys(question.dropdownValues).length === 0);
  const hasError = isContentEmpty || isAnswerMissing;

  const answers = question.dropdownValues
    ? Object.entries(question.dropdownValues)
    : [];

  return (
    <Card
      sx={{
        mb: 1,
        p: 1,
        border: hasError ? "1px solid red" : "none",
      }}
      onClick={() => setTargetQuestionId(question.order)}
    >
      <CardContent sx={{ p: 3 }}>
        {targetQuestionId === question.order ? (
          <>
            <TextField
              fullWidth
              label="Câu hỏi"
              value={question.content}
              onChange={(e) =>
                updateQuestion(question.order, "content", e.target.value)
              }
              error={isContentEmpty}
              helperText={isContentEmpty && "Câu hỏi không được để trống"}
              size="small"
              sx={{ mb: 2 }}
              autoFocus
            />
            <Grid2 container direction={"row"} mb={2} spacing={2}>
              <Grid2 size={12}>
                <TextField
                  size="small"
                  select
                  fullWidth
                  label="Loại câu hỏi"
                  value={question.typeValue}
                  onChange={(e) =>
                    updateQuestion(question.order, "typeValue", e.target.value)
                  }
                >
                  <MenuItem value={EnumTypeValue.TEXT}>Văn bản</MenuItem>
                  <MenuItem value={EnumTypeValue.NUMBER}>Số</MenuItem>
                  <MenuItem value={EnumTypeValue.DROPDOWN}>Danh sách</MenuItem>
                  <MenuItem value={EnumTypeValue.ChangePartDetail}>
                    Thay thế linh kiện
                  </MenuItem>
                  <MenuItem value={EnumTypeValue.UpdateLastMaintenanceDate}>
                    Cập nhật ngày bảo trì
                  </MenuItem>
                </TextField>
              </Grid2>
            </Grid2>
          </>
        ) : (
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", py: 0.5 }}
            color="textSecondary"
          >
            {question.content || "Nhấn để nhập câu hỏi..."}
          </Typography>
        )}
        {targetQuestionId === question.order &&
          question.typeValue !== EnumTypeValue.TEXT &&
          question.typeValue !== EnumTypeValue.NUMBER &&
          question.typeValue !== EnumTypeValue.ChangePartDetail &&
          question.typeValue !== EnumTypeValue.UpdateLastMaintenanceDate && (
            <Box sx={{ ml: 1 }}>
              {answers.map(([answerId, answerText]) => (
                <Box
                  key={answerId}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 0.5,
                  }}
                >
                  <TextField
                    fullWidth
                    value={answerText}
                    onChange={(e) =>
                      updateAnswer(question.order, answerId, e.target.value)
                    }
                    size="small"
                  />
                  <Button
                    color="error"
                    onClick={() => removeAnswer(question.order, answerId)}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    Xóa
                  </Button>
                </Box>
              ))}
              <Button onClick={() => addAnswer(question.order)} size="small">
                Thêm câu trả lời
              </Button>
              {isAnswerMissing && (
                <Typography color="error" variant="caption" sx={{ mt: 0.5 }}>
                  Loại câu hỏi này yêu cầu có ít nhất một đáp án.
                </Typography>
              )}
            </Box>
          )}
        {question.typeValue === EnumTypeValue.RADIO && (
          <RadioGroup sx={{ flexDirection: "column", ml: 1 }}>
            {answers.length > 0 ? (
              answers.map(([answerId, answerText]) => (
                <FormControlLabel
                  key={answerId}
                  value={answerText}
                  control={<Radio size="small" />}
                  label={answerText}
                  sx={{ m: 0 }}
                />
              ))
            ) : (
              <Typography variant="caption" color="textSecondary">
                Chưa có đáp án
              </Typography>
            )}
          </RadioGroup>
        )}
        {question.typeValue === EnumTypeValue.CHECKBOX && (
          <Box sx={{ ml: 1, display: "flex", flexDirection: "column" }}>
            {answers.length > 0 ? (
              answers.map(([answerId, answerText]) => (
                <FormControlLabel
                  key={answerId}
                  control={<Checkbox size="small" />}
                  label={answerText}
                  sx={{ m: 0 }}
                />
              ))
            ) : (
              <Typography variant="caption" color="textSecondary">
                Chưa có đáp án
              </Typography>
            )}
          </Box>
        )}
        {question.typeValue === EnumTypeValue.NUMBER && (
          <TextField type="number" fullWidth size="small" sx={{ mt: 1 }} />
        )}
        {question.typeValue === EnumTypeValue.DROPDOWN && (
          <TextField select fullWidth size="small" sx={{ mt: 1 }} value={""}>
            {answers.length > 0 ? (
              answers.map(([answerId, answerText]) => (
                <MenuItem key={answerId} value={answerText}>
                  {answerText}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Chưa có đáp án</MenuItem>
            )}
          </TextField>
        )}
        {targetQuestionId === question.order && (
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              color="error"
              onClick={() => removeQuestion(question.order)}
              size="small"
            >
              Xóa câu hỏi
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionComponent;
