import { unwrapObjectReponse } from "@datas/comon/ApiResponse";
import partSKUApi from "@modules/maintenance/apis/partSKUApi";
import { IPartSKU } from "@modules/maintenance/datas/partSKU/IPartSKU";
import { IPartSKUGet } from "@modules/maintenance/datas/partSKU/IPartSKUGet";

import React, { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

interface AsyncPaginateSelectProps {
  id?: string;
  disabled?: boolean;
  onChange?: (value: IPartSKU | null) => void;
}

const PartSKUSelect: React.FC<AsyncPaginateSelectProps> = ({
  id,
  onChange,
  disabled,
}) => {
  const [internalValue, setInternalValue] = useState<IPartSKU | null>(null);

  const handleChange = (val: IPartSKU | null) => {
    setInternalValue(val);
    onChange?.(val); // Gọi callback onChange nếu được truyền từ component cha
  };

  useEffect(() => {
    if (id) {
      partSKUApi
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

    const paramsObj: IPartSKUGet = {
      searchTerm: search,
      takeCount: 20,
      skipCount: (page - 1) * 20,
    };

    try {
      const result = await partSKUApi.get(paramsObj); // Gọi API với tham số
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
      getOptionLabel={(option: IPartSKU) => option.name}
      getOptionValue={(option: IPartSKU) => option.id}
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

export default PartSKUSelect;
