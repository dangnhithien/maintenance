import { UserDto } from '@modules/user/datas/user/UserDto'
import { ICaseType } from '../caseType/ICaseType'
import { CustomerDto } from '../customer/CustomerDto'
import { IDevice } from '../device/IDevice'

export interface ICase {
	id: string
	code: string
	name: string
	note?: string
	scheduledTime: string
	customerId: string
	customerCode: string
	customer?: CustomerDto
	deviceId: string
	serialNumber: string
	device?: IDevice
	caseTaskStatus: string
	caseCreator?: UserDto
	caseCreatorId: string
	assigneeName: string
	assigneeId: string
	assignee?: UserDto
	caseTypeId: string
	caseType?: ICaseType
}
