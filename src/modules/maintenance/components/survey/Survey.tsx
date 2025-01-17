import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

// Định nghĩa kiểu cho kết quả phiếu khảo sát
interface SurveyFormData {
  name: string;
  email: string;
  rating: string;
  feedback: string;
}

const SurveyForm: React.FC = () => {
  // Khai báo state để lưu trữ giá trị form
  const [formData, setFormData] = useState<SurveyFormData>({
    name: "",
    email: "",
    rating: "",
    feedback: "",
  });

  // Hàm xử lý thay đổi dữ liệu form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Survey Form Data:", formData);
    // Bạn có thể thực hiện các thao tác khác như gửi form lên server
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Họ và tên"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Đánh giá</FormLabel>
            <RadioGroup
              name="rating"
              value={formData.rating}
              onChange={handleChange}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="1 - Rất tệ"
              />
              <FormControlLabel value="2" control={<Radio />} label="2 - Tệ" />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="3 - Bình thường"
              />
              <FormControlLabel value="4" control={<Radio />} label="4 - Tốt" />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="5 - Tuyệt vời"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Ý kiến đóng góp"
            variant="outlined"
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            multiline
            rows={4}
          />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Gửi phiếu khảo sát
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SurveyForm;
