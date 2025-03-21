import axiosInstance from '../../../apis/axiosInstance'
import { ApiResponseWithList } from '../../../datas/comon/ApiResponse'
import { IDeviceAttributeValue } from '../datas/attributeDeviceValue/IAttributeDeviceValue'
import { IAttributeDeviceValueCreate } from '../datas/attributeDeviceValue/IAttributeDeviceValueCreate'
import { IAttributeDeviceValueGet } from '../datas/attributeDeviceValue/IAttributeDeviceValueGet'

const BASE_URL = '/api/attribute-device-value'

class AttributeDeviceValueApi {
	get = async (
		params?: IAttributeDeviceValueGet,
	): Promise<ApiResponseWithList<IDeviceAttributeValue>> => {
		return await axiosInstance.get(BASE_URL, {
			params,
		})
	}

	post = async (
		params?: IAttributeDeviceValueCreate,
	): Promise<ApiResponseWithList<IDeviceAttributeValue>> => {
		return await axiosInstance.post(BASE_URL, params)
	}
}

const attributeDeviceValueApi = new AttributeDeviceValueApi()

export default attributeDeviceValueApi
