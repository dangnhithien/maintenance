export interface IPartDetailCreate extends IPartNameDetailCreate {
	serialNumber: string
	name: string
	description?: string
	deviceId: string
	partCategoryId: string
	partTypeId: string
	partGroupId: string
	partSKUId: string
	usageTypeId: string
	image?: string
}

export interface IPartDetailCommands {
	partDetailCommands: IPartDetailCreate[]
}

export interface IPartNameDetailCreate {
	partCategoryName?: string
	partTypeName?: string
	partGroupName?: string
	partSKUName?: string
	usageTypeName?: string
}
