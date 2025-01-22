import { useCallback, useState } from "react";
import templateCheckListApi from "../apis/templateCheckListApi";
import { GetTemplateCheckListDto } from "../datas/templateCheckList/GetTemplateCheckListDto";
import { TemplateCheckListDto } from "../datas/templateCheckList/TemplateCheckListDto";

interface Result {
  templateCheckLists: TemplateCheckListDto[];
  totalCount: number;
  loading: boolean;
  error: string | null;
  fetchTemplateChecklists: (params?: GetTemplateCheckListDto) => Promise<void>;
}

const useTemplateCheckList = (
  initialParams?: GetTemplateCheckListDto
): Result => {
  const [templateCheckLists, setTemplateCheckLists] = useState<
    TemplateCheckListDto[]
  >([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hàm fetch data từ API
  const fetchTemplateChecklists = useCallback(
    async (params?: GetTemplateCheckListDto) => {
      setLoading(true);
      setError(null);
      try {
        const result = await templateCheckListApi.get(params || initialParams);
        setTemplateCheckLists(result?.result?.items); // Set danh sách devices
        setTotalCount(result?.result.totalCount); // Set tổng số item
      } catch (err: any) {
        setError(err.message || "Failed to fetch  type devices");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Tự động fetch khi khởi tạo hook

  return {
    templateCheckLists,
    totalCount,
    loading,
    error,
    fetchTemplateChecklists,
  };
};

export default useTemplateCheckList;
