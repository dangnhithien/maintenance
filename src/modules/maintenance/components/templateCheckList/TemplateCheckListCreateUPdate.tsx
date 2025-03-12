import { unwrapError, unwrapObjectReponse } from "@datas/comon/ApiResponse";
import { yupResolver } from "@hookform/resolvers/yup";
import templateCheckListApi from "@modules/maintenance/apis/templateCheckListApi";
import { EnumTypeValue } from "@modules/maintenance/datas/enum/EnumTypeValue";
import { CreateRowCheckListDto } from "@modules/maintenance/datas/rowCheckList/CreateRowCheckListDto";
import { CreateTemplateCheckListDto } from "@modules/maintenance/datas/templateCheckList/CreateTemplateCheckListDto";
import useTemplateCheckList from "@modules/maintenance/hooks/useTemplateCheckList";
import {
  Button,
  Grid2,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useNotification } from "../common/Notistack";
// import DeviceSelect from "../common/select/DeviceSelect";
import QuestionComponent from "./QuestionComponent";

const schema = yup.object({
  code: yup.string().required("Mã là bắt buộc"),
  name: yup.string().required("Nội dung là bắt buộc"),
  description: yup
    .string()
    .max(255, "Description must be under 255 characters"),
});

interface FormProps {
  id?: string;
}

const TemplateCheckListCreateUpdate: React.FC<FormProps> = ({ id }) => {
  const {
    templateCheckLists,
    deleteChecklist,
    restoreChecklist,
    createChecklist,
    updateChecklist,
    getChecklistById,
    error,
    loading,
    totalCount,
  } = useTemplateCheckList();
  const { notify } = useNotification();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTemplateCheckListDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  });
  const navigate = useNavigate();

  // Sử dụng order làm định danh => targetQuestionId là number|null
  const [questions, setQuestions] = useState<CreateRowCheckListDto[]>([]);
  const [deletedQuestions, setDeletedQuestions] = useState<string[]>([]);
  const [targetQuestionId, setTargetQuestionId] = useState<number | null>(null);
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});
  const answerIdRef = useRef(0);

  useEffect(() => {
    if (id) {
      getChecklistById(id)
        .then((res) => {
          reset(res as CreateTemplateCheckListDto);
          const checklist = res.rowChecks ? [...res.rowChecks] : [];
          setQuestions(checklist as CreateRowCheckListDto[]);
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        });
    }
  }, []);

  const getNextOrder = () => {
    const currentMaxOrder = questions.reduce(
      (max, q) => Math.max(max, q.order || 0),
      0
    );
    return currentMaxOrder + 1;
  };

  const addHeader = () => {
    const newHeader: CreateRowCheckListDto = {
      content: "",
      typeErrorId: "",
      templateCheckId: id || "",
      typeValue: EnumTypeValue.TEXT,
      dropdownValues: {},
      isHeader: true,
      order: getNextOrder(),
    };
    setQuestions([...questions, newHeader]);
  };

  const addQuestion = () => {
    const newQuestion: CreateRowCheckListDto = {
      content: "",
      typeErrorId: "default",
      templateCheckId: id || "",
      typeValue: EnumTypeValue.TEXT,
      dropdownValues: {},
      isHeader: false,
      order: getNextOrder(),
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (
    order: number,
    key: keyof CreateRowCheckListDto,
    value: any
  ) => {
    setQuestions(
      questions.map((q) => (q.order === order ? { ...q, [key]: value } : q))
    );
  };

  const addAnswer = (questionOrder: number) => {
    setQuestions(
      questions.map((q) => {
        if (q.order === questionOrder) {
          const newAnswerId = answerIdRef.current++;
          return {
            ...q,
            dropdownValues: {
              ...q.dropdownValues,
              [newAnswerId]: "",
            },
          };
        }
        return q;
      })
    );
  };

  const updateAnswer = (
    questionOrder: number,
    answerId: string,
    text: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.order === questionOrder) {
          const newDropdownValues = { ...q.dropdownValues, [answerId]: text };
          return { ...q, dropdownValues: newDropdownValues };
        }
        return q;
      })
    );
  };

  const removeAnswer = (questionOrder: number, answerId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.order === questionOrder) {
          const { [answerId]: removed, ...rest } = q.dropdownValues || {};
          return {
            ...q,
            dropdownValues: rest,
          };
        }
        return q;
      })
    );
  };

  const removeQuestion = (questionOrder: number) => {
    setQuestions((prev) => {
      const removedQuestion = prev.find((q) => q.order === questionOrder);
      if (removedQuestion && "id" in removedQuestion && removedQuestion.id) {
        setDeletedQuestions((prevDeleted) => [
          ...prevDeleted,
          removedQuestion.id as string,
        ]);
      }
      return prev.filter((q) => q.order !== questionOrder);
    });
    if (targetQuestionId === questionOrder) {
      setTargetQuestionId(null);
    }
  };

  const validateQuestions = () => {
    let valid = true;
    questions.forEach((q) => {
      if (q.isHeader) {
        if (q.content.trim() === "") {
          valid = false;
        }
      } else {
        const requiresAnswers =
          q.typeValue === EnumTypeValue.RADIO ||
          q.typeValue === EnumTypeValue.CHECKBOX ||
          q.typeValue === EnumTypeValue.DROPDOWN;
        if (
          q.content.trim() === "" ||
          (requiresAnswers &&
            (!q.dropdownValues || Object.keys(q.dropdownValues).length === 0))
        ) {
          valid = false;
        }
      }
    });
    return valid;
  };

  const onSubmit = async (data: CreateTemplateCheckListDto) => {
    console.log(data, questions);
    if (!validateQuestions()) {
      setLocalErrors((prev) => ({
        ...prev,
        questions: "Một hoặc nhiều câu hỏi chưa đủ điều kiện để submit.",
      }));
      return;
    }
    setLocalErrors({});
    if (id) {
      const res = await updateChecklist({
        id: id,
        updatedData: { ...data, rowChecks: questions },
      });
      notify(res.message, "success");
    } else {
      const checklistRes = await templateCheckListApi
        .post({ ...data, rowChecks: questions })
        .then(unwrapObjectReponse);
      notify("success", "success");
      navigate("/template-check-list");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <Grid2 container spacing={2} sx={{ mb: 2, p: 2 }} component={Paper}>
        <Grid2 size={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="primary" fontWeight={"bold"}>
              Mã
            </Typography>
            <Typography color="error">*</Typography>
          </Stack>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                error={!!errors.code}
                helperText={errors.code?.message}
                disabled={!!id}
              />
            )}
          />
        </Grid2>
        <Grid2 size={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="primary" fontWeight={"bold"}>
              Tên
            </Typography>
            <Typography color="error">*</Typography>
          </Stack>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid2>
        <Grid2 size={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="primary" fontWeight={"bold"}>
              Mô tả
            </Typography>
            <Typography sx={{ color: "white" }}>*</Typography>
          </Stack>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid2>
      </Grid2>
      {/* Render danh sách câu hỏi */}
      {questions.map((question) => (
        <QuestionComponent
          key={question.order}
          question={question}
          updateQuestion={updateQuestion}
          addAnswer={addAnswer}
          updateAnswer={updateAnswer}
          removeAnswer={removeAnswer}
          removeQuestion={removeQuestion}
          setTargetQuestionId={setTargetQuestionId}
          targetQuestionId={targetQuestionId}
        />
      ))}
      {localErrors.questions && (
        <Typography color="error" sx={{ mt: 1 }}>
          {localErrors.questions}
        </Typography>
      )}

      <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
        <Button
          variant="contained"
          color="primary"
          onClick={addHeader}
          sx={{ mt: 2 }}
        >
          Thêm tiêu đề
        </Button>
        <Button variant="contained" onClick={addQuestion} sx={{ mt: 2, ml: 2 }}>
          Thêm câu hỏi
        </Button>
        <Button
          type="submit"
          color="success"
          variant="contained"
          sx={{ mt: 2, ml: 2 }}
        >
          Lưu
        </Button>
      </Stack>
    </form>
  );
};

export default TemplateCheckListCreateUpdate;
