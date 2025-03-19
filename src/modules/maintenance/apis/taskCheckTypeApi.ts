import { ApiRequest } from '@datas/comon/ApiRequest'
import axiosInstance from '../../../apis/axiosInstance'
import { ApiResponseWithList } from '../../../datas/comon/ApiResponse'
import type { ITaskCheckType } from '../datas/taskCheckType/ITaskCheckType'

const BASE_URL = '/api/task-check-type'

class TaskCheckTypeApi {
	get = async (
		params?: ApiRequest,
	): Promise<ApiResponseWithList<ITaskCheckType>> => {
		return await axiosInstance.get(BASE_URL, {
			params,
		})
	}
}

const taskCheckTypeApi = new TaskCheckTypeApi()

export default taskCheckTypeApi
