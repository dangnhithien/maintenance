export interface IAttributeDeviceValueCommand {
	deviceId: string
	attributeDeviceGroupId: string
	attributeName: string
	value?: string
}

export interface IAttributeDeviceValueCreate {
	attributeDeviceValueCommands: IAttributeDeviceValueCommand[]
}
