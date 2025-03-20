import axiosInstance from '../../../apis/axiosInstance'
import { ApiRequest } from '../../../datas/comon/ApiRequest'
import {
	ApiResponseWithList,
	ApiResponseWithObject,
} from '../../../datas/comon/ApiResponse'
import { ICase } from '../datas/case/ICase'
import { ICaseCreate } from '../datas/case/ICaseCreate'
import { ICaseGet } from '../datas/case/ICaseGet'

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = '/api/case-task'

class CaseApi {
	// Hàm get danh sách Cases
	get = async (params?: ICaseGet): Promise<ApiResponseWithList<ICase>> => {
		return await axiosInstance.get(BASE_URL, {
			params,
		})
	}

	post = async (params?: ICaseCreate): Promise<ApiResponseWithList<ICase>> => {
		return await axiosInstance.post(BASE_URL, params)
	}

	getById = async (
		id: string,
		params?: ApiRequest,
	): Promise<ApiResponseWithObject<ICase>> => {
		return await axiosInstance.get(`${BASE_URL}/${id}`, { params })
	}

	update = async (
		id: string,
		params: ICaseCreate,
	): Promise<ApiResponseWithList<ICase>> => {
		return await axiosInstance.put(`${BASE_URL}/${id}`, params)
	}

	restore = async (ids: string[]): Promise<ApiResponseWithList<ICase>> => {
		return await axiosInstance.put(`${BASE_URL}/restore`, ids)
	}

	delete = async (
		isHardDeleted: boolean,
		ids: string[], // Mảng UUIDs
	): Promise<ApiResponseWithList<ICase>> => {
		const params = { isHardDeleted }
		return await axiosInstance.delete(`${BASE_URL}`, {
			params: params,
			data: ids,
		})
	}

	updateStatus = async (id: string): Promise<ApiResponseWithList<ICase>> => {
		return await axiosInstance.put(`${BASE_URL}/done-case-task/${id}`)
	}
}

const caseApi = new CaseApi()

export default caseApi
