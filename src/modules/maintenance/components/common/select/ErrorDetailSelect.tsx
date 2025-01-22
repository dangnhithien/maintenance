import errorDetailApi from "@modules/maintenance/apis/errorDetailApi";
import { ErrorDetailDto } from "@modules/maintenance/datas/errorDetail/ErrorDetailDto";
import { GetErrorDetailDto } from "@modules/maintenance/datas/errorDetail/GetErrorDetailDto";

import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps {
  value?: ErrorDetailDto | null;
  onChange?: (value: ErrorDetailDto | null) => void;
}

const ErrorDetailSelect: React.FC<AsyncPaginateSelectProps> = ({
  value,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<ErrorDetailDto | null>(
    value || null
  );

  const handleChange = (val: ErrorDetailDto | null) => {
    setInternalValue(val);
    onChange?.(val); // Gọi callback onChange nếu được truyền từ component cha
  };

  const loadOptionDevices = async (
    search: any,
    loadedOptions: any,
    additional: any
  ) => {
    const page = additional?.page || 1; // Nếu `additional` là undefined, mặc định `page = 1`

    const paramsObj: GetErrorDetailDto = {
      searchTerm: search,
      takeCount: 10,
      skipCount: (page - 1) * 10,
    };

    try {
      const result = await errorDetailApi.get(paramsObj); // Gọi API với tham số
      return {
        options: result.result?.items,
        hasMore: page * 10 < result.result.totalCount,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error("Error loading device options:", error);
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
  };

  return (
    <AsyncPaginate
      isClearable
      value={internalValue}
      onChange={handleChange}
      loadOptions={loadOptionDevices}
      getOptionLabel={(option: ErrorDetailDto) => option.content}
      getOptionValue={(option: ErrorDetailDto) => option.id}
      additional={{
        page: 1,
      }}
      debounceTimeout={400}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
    />
  );
};

export default ErrorDetailSelect;
