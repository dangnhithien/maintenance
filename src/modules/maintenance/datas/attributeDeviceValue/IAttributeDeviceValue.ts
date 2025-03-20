export interface IDeviceAttributeValue {
	id: string
	deviceId: string
	attributeDeviceGroupId: string | null
	attributeName: string
	value: string | null
}
