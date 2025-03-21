import { TrackingDataDto } from '../../../../datas/comon/TrackingDataDto'
import { CustomerDto } from '../customer/CustomerDto'
import { IDevice } from '../device/IDevice'
import { EnumStatusTaskCheck } from '../enum/EnumStatusTaskCheck'
import { MaintenanceUpdateType } from '../enum/EnumTaskHistory'
import { RowCheckValueDto } from '../rowCheckValue/RowCheckValueDto'
import { TemplateCheckListDto } from '../templateCheckList/TemplateCheckListDto'

export interface TaskCheckDto extends TrackingDataDto {
	id: string
	code: string
	caseTaskCode: string
	name: string
	note?: string | null
	customerId: string
	customerCode: string
	customer?: CustomerDto | null
	scheduledTime: Date
	checkTime?: string | null
	taskCheckStatus: EnumStatusTaskCheck
	templateCheckId?: string | null
	templateCheckCode?: string | null
	templateCheck?: TemplateCheckListDto | null
	productId: string
	serialNumber: string
	// product?: ProductDto | null
	taskCreator: string
	taskCreatorId?: string | null
	assigneeName?: string | null
	assigneeId?: string | null
	// assignee?: ProductDto | null
	rowCheckValues: RowCheckValueDto[]
	reason?: string
	device?: IDevice
	maintenanceHistories?: MaintenanceHistoryDto[]
}

export interface MaintenanceHistoryDto {
	id: string
	fieldName: string
	oldValue: string
	newValue: string
	updateByUsername: string
	updateByUserId: string
	maintenanceUpdateType: MaintenanceUpdateType
	maintenanceUpdateAt: string // ISO date string
	description: string
}
