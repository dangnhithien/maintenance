import { he } from 'date-fns/locale'
import axiosInstance from '../../../apis/axiosInstance'
import { ApiRequest } from '../../../datas/comon/ApiRequest'
import {
	ApiResponseWithList,
	ApiResponseWithObject,
} from '../../../datas/comon/ApiResponse'
import { IDevice } from '../datas/device/IDevice'
import { IDeviceCreate } from '../datas/device/IDeviceCreate'
import { IDeviceGet } from '../datas/device/IDeviceGet'

// Định nghĩa kiểu dữ liệu trả về từ API

const BASE_URL = '/api/devices'

class DeviceApi {
	// Hàm get danh sách devices
	get = async (params?: IDeviceGet): Promise<ApiResponseWithList<IDevice>> => {
		return await axiosInstance.get(BASE_URL, {
			params,
		})
	}

	post = async (
		params?: IDeviceCreate,
	): Promise<ApiResponseWithObject<IDevice>> => {
		const formData = new FormData()

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null) {
					formData.append(
						key,
						value instanceof Date ? value.toISOString() : value,
					)
				}
			})
		}

		return await axiosInstance.post(BASE_URL, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
	}
	getById = async (
		id: string,
		params?: ApiRequest,
	): Promise<ApiResponseWithObject<IDevice>> => {
		return await axiosInstance.get(`${BASE_URL}/${id}`, {
			params,
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	}
	update = async (
		id: string,
		params: IDeviceCreate,
	): Promise<ApiResponseWithList<IDevice>> => {
		return await axiosInstance.put(`${BASE_URL}/${id}`, params)
	}
	restore = async (ids: string[]): Promise<ApiResponseWithList<IDevice>> => {
		return await axiosInstance.put(`${BASE_URL}/restore`, ids)
	}
	delete = async (
		isHardDeleted: boolean,
		ids: string[], // Mảng UUIDs
	): Promise<ApiResponseWithList<IDevice>> => {
		const params = { isHardDeleted }
		return await axiosInstance.delete(`${BASE_URL}`, {
			params: params,
			data: ids,
		})
	}
}

const deviceApi = new DeviceApi()

export default deviceApi
