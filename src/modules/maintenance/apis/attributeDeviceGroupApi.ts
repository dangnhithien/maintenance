import axiosInstance from '../../../apis/axiosInstance'
import { ApiResponseWithList } from '../../../datas/comon/ApiResponse'
import { IAttributeDeviceGroup } from '../datas/attributeDeviceGroup/IAttributeDeviceGroup'
import { IAttributeDeviceGroupCreate } from '../datas/attributeDeviceGroup/IAttributeDeviceGroupCreate'
import { IAttributeDeviceGroupGet } from '../datas/attributeDeviceGroup/IAttributeDeviceGroupGet'

const BASE_URL = '/api/attribute-device-group'

class AttributeDeviceGroupApi {
	get = async (
		params?: IAttributeDeviceGroupGet,
	): Promise<ApiResponseWithList<IAttributeDeviceGroup>> => {
		return await axiosInstance.get(BASE_URL, {
			params,
		})
	}

	post = async (
		params?: IAttributeDeviceGroupCreate,
	): Promise<ApiResponseWithList<IAttributeDeviceGroup>> => {
		return await axiosInstance.post(BASE_URL, params)
	}
}

const attributeDeviceGroupApi = new AttributeDeviceGroupApi()

export default attributeDeviceGroupApi
