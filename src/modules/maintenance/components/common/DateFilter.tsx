import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import React, { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(quarterOfYear); // Hỗ trợ 'quarter'

type FilterOption = "week" | "month" | "quarter" | "year" | "custom";

interface DateRangeFilterProps {
  onChange?: (fromDate: Dayjs | null, toDate: Dayjs | null) => void;
}

const DATE_FORMAT = "YYYY-MM-DD";

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onChange }) => {
  // Chế độ hiển thị hiện tại (tuần/tháng/quý/năm/custom)
  const [filterOption, setFilterOption] = useState<FilterOption>("custom");

  // State chính: fromDate, toDate (dạng Dayjs)
  const [fromDate, setFromDate] = useState<Dayjs>(dayjs());
  const [toDate, setToDate] = useState<Dayjs>(dayjs());

  // State “custom”: người dùng nhập tay
  const [fromDateInput, setFromDateInput] = useState<string>(
    fromDate.format(DATE_FORMAT)
  );
  const [toDateInput, setToDateInput] = useState<string>(
    toDate.format(DATE_FORMAT)
  );

  // State cho các lựa chọn “week, month, quarter, year”
  const [weekYear, setWeekYear] = useState<number>(dayjs().year());
  const [weekNumber, setWeekNumber] = useState<number>(1);

  const [monthYear, setMonthYear] = useState<number>(dayjs().year());
  const [monthNumber, setMonthNumber] = useState<number>(dayjs().month() + 1);

  const [quarterYear, setQuarterYear] = useState<number>(dayjs().year());
  const [quarterNumber, setQuarterNumber] = useState<number>(1);

  const [yearValue, setYearValue] = useState<number>(dayjs().year());

  // Hàm parse chuỗi -> Dayjs (null nếu không hợp lệ)
  const parseDateString = (dateStr: string): Dayjs | null => {
    const parsed = dayjs(dateStr, DATE_FORMAT, true);
    return parsed.isValid() ? parsed : null;
  };

  // Nếu filterOption != 'custom', tính lại fromDate/toDate mỗi khi
  // state (weekYear... ) thay đổi.
  useEffect(() => {
    if (filterOption === "custom") return;

    let newFrom = dayjs();
    let newTo = dayjs();

    switch (filterOption) {
      case "week":
        newFrom = dayjs(`${weekYear}-01-01`)
          .startOf("week")
          .add(weekNumber - 1, "week");
        newTo = newFrom.endOf("week");
        break;
      case "month":
        newFrom = dayjs(`${monthYear}-${monthNumber}-01`).startOf("month");
        newTo = newFrom.endOf("month");
        break;
      case "quarter":
        newFrom = dayjs(`${quarterYear}-01-01`)
          .startOf("year")
          .add(quarterNumber - 1, "quarter");
        newTo = newFrom.endOf("quarter");
        break;
      case "year":
        newFrom = dayjs(`${yearValue}-01-01`).startOf("year");
        newTo = dayjs(`${yearValue}-12-31`).endOf("year");
        break;
    }

    setFromDate(newFrom);
    setToDate(newTo);

    // Đồng bộ hiển thị lên 2 field “From”, “To” (dạng chuỗi)
    setFromDateInput(newFrom.format(DATE_FORMAT));
    setToDateInput(newTo.format(DATE_FORMAT));
  }, [
    filterOption,
    weekYear,
    weekNumber,
    monthYear,
    monthNumber,
    quarterYear,
    quarterNumber,
    yearValue,
  ]);

  // Mỗi lần fromDate/toDate thay đổi, gọi onChange nếu có
  useEffect(() => {
    onChange?.(fromDate, toDate);
  }, [fromDate, toDate, onChange]);

  // Khi user gõ tay trong chế độ 'custom'
  const handleFromDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromDateInput(value);
    setFilterOption("custom"); // Chuyển về custom
    const parsed = parseDateString(value);
    if (parsed) {
      setFromDate(parsed);
    }
  };

  const handleToDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToDateInput(value);
    setFilterOption("custom");
    const parsed = parseDateString(value);
    if (parsed) {
      setToDate(parsed);
    }
  };

  return (
    <Box
      // Dùng sx để style: border, bo góc, padding, v.v.
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,

        padding: 1,
        flexWrap: "wrap", // cho phép xuống hàng nếu quá hẹp
      }}
    >
      {/* Select chọn kiểu filter */}
      <Select
        size="small"
        value={filterOption}
        onChange={(e: SelectChangeEvent) =>
          setFilterOption(e.target.value as FilterOption)
        }
        sx={{ minWidth: 120 }} // cho độ rộng tối thiểu
      >
        <MenuItem value="custom">Tuỳ chọn</MenuItem>
        <MenuItem value="week">Tuần</MenuItem>
        <MenuItem value="month">Tháng</MenuItem>
        <MenuItem value="quarter">Quý</MenuItem>
        <MenuItem value="year">Năm</MenuItem>
      </Select>

      {/* Nếu là custom -> hiển thị cặp input date */}
      {filterOption === "custom" && (
        <>
          <TextField
            label="From"
            size="small"
            type="date"
            value={fromDateInput}
            onChange={handleFromDateInputChange}
            sx={{ width: 150 }}
          />
          <TextField
            label="To"
            size="small"
            type="date"
            value={toDateInput}
            onChange={handleToDateInputChange}
            sx={{ width: 150 }}
          />
        </>
      )}

      {/* Nếu là tuần */}
      {filterOption === "week" && (
        <>
          <TextField
            label="Năm"
            size="small"
            type="number"
            value={weekYear}
            onChange={(e) => setWeekYear(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="Tuần"
            size="small"
            type="number"
            inputProps={{ min: 1, max: 53 }}
            value={weekNumber}
            onChange={(e) => setWeekNumber(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="From"
            size="small"
            value={fromDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
          <TextField
            label="To"
            size="small"
            value={toDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
        </>
      )}

      {/* Nếu là tháng */}
      {filterOption === "month" && (
        <>
          <TextField
            label="Năm"
            size="small"
            type="number"
            value={monthYear}
            onChange={(e) => setMonthYear(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="Tháng"
            size="small"
            type="number"
            inputProps={{ min: 1, max: 12 }}
            value={monthNumber}
            onChange={(e) => setMonthNumber(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="From"
            size="small"
            value={fromDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
          <TextField
            label="To"
            size="small"
            value={toDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
        </>
      )}

      {/* Nếu là quý */}
      {filterOption === "quarter" && (
        <>
          <TextField
            label="Năm"
            size="small"
            type="number"
            value={quarterYear}
            onChange={(e) => setQuarterYear(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="Quý"
            size="small"
            type="number"
            inputProps={{ min: 1, max: 4 }}
            value={quarterNumber}
            onChange={(e) => setQuarterNumber(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="From"
            size="small"
            value={fromDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
          <TextField
            label="To"
            size="small"
            value={toDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
        </>
      )}

      {/* Nếu là năm */}
      {filterOption === "year" && (
        <>
          <TextField
            label="Năm"
            size="small"
            type="number"
            value={yearValue}
            onChange={(e) => setYearValue(Number(e.target.value))}
            sx={{ width: 80 }}
          />
          <TextField
            label="From"
            size="small"
            value={fromDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
          <TextField
            label="To"
            size="small"
            value={toDate.format(DATE_FORMAT)}
            disabled
            sx={{ width: 120 }}
          />
        </>
      )}
    </Box>
  );
};

export default DateRangeFilter;
