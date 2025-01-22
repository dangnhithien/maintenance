import typeDeviceApi from "@modules/maintenance/apis/typeDeviceApi";
import { unwrapObjectReponse } from "@modules/maintenance/datas/comon/ApiResponse";
import { GetTypeDeviceDto } from "@modules/maintenance/datas/typeDevice/GetTypeDeviceDto";
import { TypeDeviceDto } from "@modules/maintenance/datas/typeDevice/TypeDeviceDto";
import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps {
  id?: string;
  onChange?: (value: TypeDeviceDto | null) => void;
}

const TypeDeviceSelect: React.FC<AsyncPaginateSelectProps> = ({
  id,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<TypeDeviceDto | null>(
    null
  );

  useEffect(() => {
    if (id) {
      typeDeviceApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          setInternalValue(res);
        })
        .catch((err) => {});
    }
  }, []);

  const handleChange = (val: TypeDeviceDto | null) => {
    setInternalValue(val);
    onChange?.(val); // Gọi callback onChange nếu được truyền từ component cha
  };

  const loadOptionDevices = async (
    search: any,
    loadedOptions: any,
    additional: any
  ) => {
    const page = additional?.page || 1; // Nếu `additional` là undefined, mặc định `page = 1`

    const paramsObj: GetTypeDeviceDto = {
      searchTerm: search,
      takeCount: 10,
      skipCount: (page - 1) * 10,
    };

    try {
      const result = await typeDeviceApi.get(paramsObj); // Gọi API với tham số
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
      getOptionLabel={(option: TypeDeviceDto) => option.name}
      getOptionValue={(option: TypeDeviceDto) => option.id}
      additional={{
        page: 1,
      }}
      debounceTimeout={400}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
    />
  );
};

export default TypeDeviceSelect;
