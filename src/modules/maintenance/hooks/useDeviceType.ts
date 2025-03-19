import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import deviceTypeApi from '../apis/deviceTypeApi'
import { IDeviceType } from '../datas/deviceType/IDeviceType'
import { IDeviceTypeCreate } from '../datas/deviceType/IDeviceTypeCreate'
import { IDeviceTypeDelete } from '../datas/deviceType/IDeviceTypeDelete'
import { IDeviceTypeGet } from '../datas/deviceType/IDeviceTypeGet'

const KEY = 'DeviceTypes'

// Định nghĩa kiểu dữ liệu của 1 trang kết quả
interface DeviceTypePage {
	items: IDeviceType[]
	nextPage: number | null // Nếu null: đã load hết dữ liệu
	totalCount: number
}

export const useDeviceType = (takeCount = 10, searchTerm?: string) => {
	const queryClient = useQueryClient()

	const infiniteQuery = useInfiniteQuery<DeviceTypePage, AxiosError>({
		queryKey: [KEY, searchTerm], // Thay đổi queryKey khi searchTerm thay đổi
		queryFn: async ({ pageParam = 0 }) => {
			const params: IDeviceTypeGet = {
				takeCount,
				skipCount: pageParam as number,
				sortBy: 'CreatedDate DESC',
				searchTerm: searchTerm || undefined, // Tránh gửi searchTerm rỗng
			}
			const response = await deviceTypeApi.get(params)
			const items: IDeviceType[] = response?.result?.items || []
			const totalCount: number = response.result.totalCount
			const nextPage =
				(pageParam as number) + takeCount < totalCount
					? (pageParam as number) + takeCount
					: null
			return { items, nextPage, totalCount }
		},
		getNextPageParam: (lastPage) => lastPage.nextPage,
		initialPageParam: 0,
		enabled: !!searchTerm || true,
	})

	// Các mutation cho Create, Update, Delete, Restore
	const createDeviceType = useMutation({
		mutationFn: (newData: IDeviceTypeCreate) => deviceTypeApi.post(newData),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
	})

	const updateDeviceType = useMutation({
		mutationFn: ({
			id,
			updatedData,
		}: {
			id: string
			updatedData: IDeviceTypeCreate
		}) => deviceTypeApi.update(id, updatedData),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
	})

	const deleteDeviceType = useMutation({
		mutationFn: (data: IDeviceTypeDelete) =>
			deviceTypeApi.delete(data.isHardDeleted, data.ids),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
	})

	const restoreDeviceType = useMutation({
		mutationFn: (ids: string[]) => deviceTypeApi.restore(ids),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: [KEY] }),
	})

	// Gộp tất cả dữ liệu từ các trang thành 1 mảng
	const deviceTypes =
		infiniteQuery.data?.pages.flatMap((page) => page.items) || []
	return {
		deviceTypes,
		totalCount: infiniteQuery.data?.pages[0]?.totalCount || 0,
		fetchNextPage: infiniteQuery.fetchNextPage,
		hasNextPage: infiniteQuery.hasNextPage,
		isFetchingNextPage: infiniteQuery.isFetchingNextPage,
		isLoading: infiniteQuery.isLoading,
		error: infiniteQuery.error,
		createDeviceType: createDeviceType.mutateAsync,
		updateDeviceType: updateDeviceType.mutateAsync,
		deleteDeviceType: deleteDeviceType.mutateAsync,
		restoreDeviceType: restoreDeviceType.mutateAsync,
		refetch: infiniteQuery.refetch,
	}
}

export default useDeviceType
