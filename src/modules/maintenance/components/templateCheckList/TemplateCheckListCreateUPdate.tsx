import { yupResolver } from "@hookform/resolvers/yup";
import rowCheckListApi from "@modules/maintenance/apis/rowCheckListApi";
import templateCheckListApi from "@modules/maintenance/apis/templateCheckListApi";
import {
  unwrapError,
  unwrapListReponse,
  unwrapObjectReponse,
} from "@modules/maintenance/datas/comon/ApiResponse";
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
import DeviceSelect from "../common/select/DeviceSelect";
import QuestionComponent from "./QuestionComponent";

// Cập nhật đường dẫn phù hợp
const schema = yup.object({
  code: yup.string().required("Mã là bắt buộc"),
  name: yup.string().required("Nội dung là bắt buộc"),
  deviceId: yup.string().required("Device là bắt buộc"),
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
  // Sử dụng hook form cho các trường chính của form
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
      deviceId: "",
    },
  });
  const navigate = useNavigate();

  // Quản lý danh sách câu hỏi và danh sách câu hỏi bị xóa (chỉ khi update)
  const [questions, setQuestions] = useState<CreateRowCheckListDto[]>([]);
  const [deletedQuestions, setDeletedQuestions] = useState<string[]>([]);
  const [targetQuestionId, setTargetQuestionId] = useState<string | null>(null);
  const [localErrors, setLocalErrors] = useState<{ [key: string]: string }>({});
  const answerIdRef = useRef(0);

  useEffect(() => {
    if (id) {
      getChecklistById(id, { includeProperties: "Device" })
        .then((res) => {
          reset(res as CreateTemplateCheckListDto); // Reset form với dữ liệu từ API
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          notify(message, "error");
        });
      rowCheckListApi
        .get({ templateCheckId: id })
        .then(unwrapListReponse)
        .then((res) => {
          setQuestions(res as CreateRowCheckListDto[]);
        })
        .catch((err) => {
          const { message } = unwrapError(err);
          // notify(message, "error");
        });
    }
  }, []);

  // Hàm thêm header: isHeader = true, chỉ cần nhập tiêu đề (content)
  const addHeader = () => {
    const newHeader: CreateRowCheckListDto = {
      code: Date.now().toString(),
      content: "",
      typeErrorId: "", // không bắt buộc cho header nếu chỉ nhập tiêu đề
      templateCheckId: id || "",
      typeValue: EnumTypeValue.TEXT, // mặc định là văn bản
      dropdownValues: {},
      isHeader: true,
    };
    setQuestions([...questions, newHeader]);
  };

  // Hàm thêm câu hỏi (không phải header)
  const addQuestion = () => {
    const newQuestion: CreateRowCheckListDto = {
      code: Date.now().toString(),
      content: "",
      typeErrorId: "default", // giá trị mặc định, thay đổi nếu cần
      templateCheckId: id || "",
      typeValue: EnumTypeValue.TEXT, // mặc định là văn bản
      dropdownValues: {},
      isHeader: false,
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (
    code: string,
    key: keyof CreateRowCheckListDto,
    value: any
  ) => {
    setQuestions(
      questions.map((q) => (q.code === code ? { ...q, [key]: value } : q))
    );
  };

  const addAnswer = (questionCode: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.code === questionCode) {
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
    questionCode: string,
    answerId: string,
    text: string
  ) => {
    setQuestions(
      questions.map((q) => {
        if (q.code === questionCode) {
          return {
            ...q,
            dropdownValues: {
              ...q.dropdownValues,
              [answerId]: text,
            },
          };
        }
        return q;
      })
    );
  };

  const removeAnswer = (questionCode: string, answerId: string) => {
    setQuestions(
      questions.map((q) => {
        if (q.code === questionCode) {
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

  // Khi xóa câu hỏi, nếu câu hỏi có trường id (đã được tạo từ API) thì lưu vào deletedQuestions
  const removeQuestion = (questionCode: string) => {
    setQuestions((prev) => {
      const removedQuestion = prev.find((q) => q.code === questionCode);
      if (removedQuestion && "id" in removedQuestion && removedQuestion.id) {
        setDeletedQuestions((prevDeleted) => [
          ...prevDeleted,
          removedQuestion.id as string,
        ]);
      }
      return prev.filter((q) => q.code !== questionCode);
    });
    if (targetQuestionId === questionCode) {
      setTargetQuestionId(null);
    }
  };

  // Hàm validate: yêu cầu phải có ít nhất một header và các câu hỏi không được để trống
  const validateQuestions = () => {
    let valid = true;
    const hasHeader = questions.some((q) => q.isHeader);
    if (!hasHeader) {
      valid = false;
      setLocalErrors((prev) => ({
        ...prev,
        header: "Vui lòng tạo ít nhất một Header để nhóm câu hỏi.",
      }));
    } else {
      setLocalErrors((prev) => ({ ...prev, header: "" }));
    }
    questions.forEach((q) => {
      // Nếu là header thì chỉ cần content
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
    // try {
    if (id) {
      // Update Checklist
      const res = await updateChecklist({ id: id, updatedData: data });
      notify(res.message, "success");

      // Xử lý các row câu hỏi: nếu row có id thì update, nếu không thì tạo mới
      let parentId = "";

      for (const [index, row] of questions.entries()) {
        if (row.id) {
          // Cập nhật câu hỏi đã có
          const updateResponse = await rowCheckListApi.update(row.id, {
            content: row.content,
            typeErrorId: undefined,
            typeValue: row.typeValue,
            dropdownValues: row.dropdownValues,
          });
        } else {
          // Tạo mới câu hỏi
          const newRowResponse = await rowCheckListApi
            .post({
              ...row,
              id: undefined,
              code: Date.now().toString() + index,
              templateCheckId: id,
              parentId: parentId === "" ? undefined : parentId,
              typeValue: row.isHeader ? EnumTypeValue.TEXT : row.typeValue,
              typeErrorId: undefined,
              // typeErrorId:
              //   row.typeErrorId === ""
              //     ? "285daf35-9c80-4201-8fe2-ea3ffd9fc32e"
              //     : row.typeErrorId,
            })
            .then(unwrapObjectReponse);
          if (row.isHeader) {
            parentId = newRowResponse.id;
          }
        }
      }

      // Xóa các câu hỏi đã bị xóa trước đó
      if (deletedQuestions && deletedQuestions.length > 0)
        await rowCheckListApi.delete(true, deletedQuestions).catch(unwrapError);
    } else {
      // Tạo mới Checklist
      const checklistRes = await templateCheckListApi
        .post(data)
        .then(unwrapObjectReponse);
      let parentId = "";

      for (const [index, row] of questions.entries()) {
        const newRow = await rowCheckListApi
          .post({
            ...row,
            code: Date.now().toString() + index,
            templateCheckId: checklistRes.id,
            parentId: parentId === "" ? undefined : parentId,
            typeValue: row.isHeader ? EnumTypeValue.TEXT : row.typeValue,
            typeErrorId: undefined,
          })
          .then(unwrapObjectReponse);
        if (row.isHeader) parentId = newRow.id;
      }

      notify("success", "success");
      navigate("/template-check-list");
    }
    // } catch (err) {
    //   const { message } = unwrapError(err);
    //   notify(message, "error");
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Grid2 size={3}>
          <Stack direction="row" spacing={1}>
            <Typography variant="body2" color="primary" fontWeight={"bold"}>
              Thiết bị
            </Typography>
            <Typography color="error">*</Typography>
          </Stack>
          <Controller
            name="deviceId"
            control={control}
            rules={{
              required: "Please select a device type",
            }}
            render={({ field }) => (
              <DeviceSelect
                id={field?.value}
                onChange={(value) => field.onChange(value?.id)}
              />
            )}
          />
          {errors.deviceId && (
            <p
              style={{
                color: "#d32f2f",
                fontSize: "12px",
                marginLeft: "14px",
                marginTop: "5px",
              }}
            >
              {errors.deviceId.message}
            </p>
          )}
        </Grid2>
      </Grid2>
      {/* Danh sách câu hỏi */}
      {questions.map((question) => (
        <QuestionComponent
          key={question.code}
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
      {localErrors.header && (
        <Typography color="error" sx={{ mt: 1 }}>
          {localErrors.header}
        </Typography>
      )}
      <Button
        type="submit"
        color="success"
        variant="contained"
        sx={{ mt: 2, ml: 2 }}
      >
        Lưu
      </Button>
    </form>
  );
};

export default TemplateCheckListCreateUpdate;
