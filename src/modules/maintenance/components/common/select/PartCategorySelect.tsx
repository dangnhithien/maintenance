import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import partCategoryApi from "@modules/maintenance/apis/partCategoryApi";
import { IPartCategory } from "@modules/maintenance/datas/partCategory/IPartCategory";
import { IPartCategoryGet } from "@modules/maintenance/datas/partCategory/IPartCategoryGet";

import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps {
  id?: string;
  disabled?: boolean;
  onChange?: (value: IPartCategory | null) => void;
}

const PartCategorySelect: React.FC<AsyncPaginateSelectProps> = ({
  id,
  onChange,
  disabled,
}) => {
  const [internalValue, setInternalValue] = useState<IPartCategory | null>(
    null
  );

  const handleChange = (val: IPartCategory | null) => {
    setInternalValue(val);
    onChange?.(val); // Gọi callback onChange nếu được truyền từ component cha
  };

  useEffect(() => {
    if (id) {
      partCategoryApi
        .getById(id)
        .then(unwrapObjectReponse)
        .then((res) => {
          setInternalValue(res);
        })
        .catch((err) => {});
    }
  }, [id]);

  const loadOptionCustomers = async (
    search: any,
    loadedOptions: any,
    additional: any
  ) => {
    const page = additional?.page || 1; // Nếu `additional` là undefined, mặc định `page = 1`

    const paramsObj: IPartCategoryGet = {
      searchTerm: search,
      takeCount: 20,
      skipCount: (page - 1) * 20,
    };

    try {
      const result = await partCategoryApi.get(paramsObj); // Gọi API với tham số
      return {
        options: result.result.items,
        hasMore: page * 10 < result.result.totalCount,
        additional: {
          page: page + 1,
        },
      };
    } catch (error) {
      console.error("Error loading Customer options:", error);
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
      loadOptions={loadOptionCustomers}
      getOptionLabel={(option: IPartCategory) => option.name}
      getOptionValue={(option: IPartCategory) => option.id}
      additional={{
        page: 1,
      }}
      debounceTimeout={400}
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 5 }) }}
      isDisabled={disabled}
      placeholder="Loại thiết bị..."
    />
  );
};

export default PartCategorySelect;
