import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import typeErrorApi from "@modules/maintenance/apis/typeErrorApi";
import { GetTypeErrorDto } from "@modules/maintenance/datas/typeError/GetTypeErrorDto";
import { TypeErrorDto } from "@modules/maintenance/datas/typeError/TypeErrorDto";

import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps {
  id?: string;
  onChange?: (value: TypeErrorDto | null) => void;
}

const TypeErrorSelect: React.FC<AsyncPaginateSelectProps> = ({
  id,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<TypeErrorDto | null>(null);
  useEffect(() => {
    if (id) {
      typeErrorApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          setInternalValue(res);
        })
        .catch((err) => {});
    }
  }, [id]);

  const handleChange = (val: TypeErrorDto | null) => {
    setInternalValue(val);
    onChange?.(val); // Gọi callback onChange nếu được truyền từ component cha
  };

  const loadOptionDevices = async (
    search: any,
    loadedOptions: any,
    additional: any
  ) => {
    const page = additional?.page || 1; // Nếu `additional` là undefined, mặc định `page = 1`

    const paramsObj: GetTypeErrorDto = {
      searchTerm: search,
      takeCount: 10,
      skipCount: (page - 1) * 10,
    };

    try {
      const result = await typeErrorApi.get(paramsObj); // Gọi API với tham số
      return {
        options: result.result.items,
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
      getOptionLabel={(option: TypeErrorDto) => option.name}
      getOptionValue={(option: TypeErrorDto) => option.id}
      additional={{
        page: 1,
      }}
      debounceTimeout={400}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base: any) => ({ ...base, zIndex: 5 }),
      }}
      placeholder="Loại lỗi..."
    />
  );
};

export default TypeErrorSelect;
