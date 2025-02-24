import roleApi from "@modules/user/apis/RoleApi";
import { GetRoleDto } from "@modules/user/datas/role/GetRoleDto";
import { RoleDto } from "@modules/user/datas/role/RoleDto";

import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps {
  id?: string;
  isDisabled?: boolean;
  onChange?: (value: RoleDto | null) => void;
}

const RoleSelect: React.FC<AsyncPaginateSelectProps> = ({
  id,

  isDisabled,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<RoleDto | null>(null);

  //   useEffect(() => {
  //     if (id) {
  //       roleApi
  //         .getById(id)
  //         .then(unwrapObjectReponse)
  //         .then((res) => {
  //           setInternalValue(res);
  //         })
  //         .catch((err) => {});
  //     }
  //   }, []);

  const handleChange = (val: RoleDto | null) => {
    setInternalValue(val);
    onChange?.(val); // Gọi callback onChange nếu được truyền từ component cha
  };

  const loadOptionDevices = async (
    search: any,
    loadedOptions: any,
    additional: any
  ) => {
    const page = additional?.page || 1; // Nếu `additional` là undefined, mặc định `page = 1`

    const paramsObj: GetRoleDto = {
      searchTerm: search,
      takeCount: 10,
      skipCount: (page - 1) * 10,
    };

    try {
      const result = await roleApi.get(paramsObj);
      console.log(result); // Gọi API với tham số
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
      isDisabled={isDisabled}
      isClearable
      value={internalValue}
      onChange={handleChange}
      loadOptions={loadOptionDevices}
      getOptionLabel={(option: RoleDto) => option.name}
      getOptionValue={(option: RoleDto) => option.id}
      additional={{
        page: 1,
      }}
      debounceTimeout={400}
      menuPortalTarget={document.body}
      styles={{
        menuPortal: (base: any) => ({ ...base, zIndex: 5 }),
      }}
      placeholder="Role..."
    />
  );
};

export default RoleSelect;
