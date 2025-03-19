import { ApiRequest } from '../../../../datas/comon/ApiRequest'

export interface ITaskCheckType extends ApiRequest {
	id: string
	name: string
	description: string
}
