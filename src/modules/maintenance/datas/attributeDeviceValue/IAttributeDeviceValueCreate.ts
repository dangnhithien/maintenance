import { IDevice } from '../device/IDevice'
import { IDeviceGroup } from '../deviceGroup/IDeviceGroup'

export interface IAttributeDeviceValue {
	id: string
	deviceId: string
	device?: IDevice | null
	attributeDeviceGroupId?: string | null
	attributeDeviceGroup?: IAttributeDeviceGroup | null
	attributeName: string
	value?: string
}

export interface IAttributeDeviceGroup {
	id: string
	deviceGroupId: string
	deviceGroup?: IDeviceGroup | null
	attributeName: string
	attributeDescription?: string | null
}

export interface IAttributeDeviceValueCreate {
	attributeDeviceValueCommands: IAttributeDeviceValueCommand[]
}

export interface IAttributeDeviceValueCommand {
	deviceId: string
	attributeDeviceGroupId?: string
	attributeName: string
	value?: string
}
