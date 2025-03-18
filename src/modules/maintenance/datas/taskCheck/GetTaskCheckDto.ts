import { ApiRequest } from '../../../../datas/comon/ApiRequest'
import { EnumStatusTaskCheck } from '../enum/EnumStatusTaskCheck'

export interface GetTaskCheckDto extends ApiRequest {
	templateCheckListId?: string
	productId?: string
	caseTaskId?: string
	taskCheckStatus?: EnumStatusTaskCheck
	deviceId?: string
	customerId?: string
	AssigneeId?: string
}
