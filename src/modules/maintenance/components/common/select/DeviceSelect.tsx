import deviceApi from "@modules/maintenance/apis/deviceApi";
import { DeviceDto } from "@modules/maintenance/datas/device/DeviceDto";
import { GetDeviceDto } from "@modules/maintenance/datas/device/GetDeviceDto";
import { TypeDeviceDto } from "@modules/maintenance/datas/typeDevice/TypeDeviceDto";
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps {
  value?: DeviceDto | null;
  onChange?: (value: DeviceDto | null) => void;
}

const DeviceSelect: React.FC<AsyncPaginateSelectProps> = ({
  value,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<DeviceDto | null>(
    value || null
  );

  const handleChange = (val: DeviceDto | null) => {
    setInternalValue(val);
    onChange?.(val); // Gọi callback onChange nếu được truyền từ component cha
  };

  const loadOptionDevices = async (
    search: any,
    loadedOptions: any,
    additional: any
  ) => {
    const page = additional?.page || 1; // Nếu `additional` là undefined, mặc định `page = 1`

    const paramsObj: GetDeviceDto = {
      searchTerm: search,
      takeCount: 10,
      skipCount: (page - 1) * 10,
    };

    try {
      const result = await deviceApi.get(paramsObj); // Gọi API với tham số
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

export default DeviceSelect;
