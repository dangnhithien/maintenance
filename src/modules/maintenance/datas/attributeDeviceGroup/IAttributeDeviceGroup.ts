import { IAttributeDeviceValue } from '../attributeDeviceValue/IAttributeDeviceValueCreate'

export interface IAttributeDeviceGroup extends IAttributeDeviceValue {
	id: string
	deviceGroupId: string
	deviceGroup?: any
	attributeName: string
	attributeDescription?: string | null
}
