import {
	Box,
	Button,
	Grid2,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import CustomerSelect from '../../common/select/CustomerSelect'
import DeviceTypeSelect from '../../common/select/DeviceTypeSelect'
import DeviceGroupSelect from '../../common/select/DeviceGroupSelect'
import DeviceSKUSelect from '../../common/select/DeviceSKUSelect'
import DeviceModelSelect from '../../common/select/DeviceModel'
import UsageTypeSelect from '../../common/select/UsageTypeSelect'
import { IDeviceCreate } from '@modules/maintenance/datas/device/IDeviceCreate'
import { DatePicker } from '@mui/x-date-pickers'
import DeviceGroupItemsModal from './DeviceGroupItemsModal'
import { Settings } from '@mui/icons-material'
import { IAttributeDeviceValue } from '@modules/maintenance/datas/attributeDeviceValue/IAttributeDeviceValueCreate'

interface DeviceFormProps {
	control: any
	errors: any
	handleNext: () => void
	updateCreatedDevice: (key: keyof IDeviceCreate, value: string) => void
	customerId: string | undefined
	createdDevice: IDeviceCreate | null
	setSelectedGroupItems: (items: IAttributeDeviceValue[]) => void
	deviceTypeId: string | undefined
	deviceGroupId: string | undefined
	deviceSKUId: string | undefined
}

const DeviceForm: React.FC<DeviceFormProps> = ({
	control,
	errors,
	handleNext,
	updateCreatedDevice,
	setSelectedGroupItems,
	deviceTypeId,
	deviceGroupId,
	deviceSKUId,
}) => {
	const [modalOpen, setModalOpen] = useState(false)

	return (
		<Grid2 container spacing={4}>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='serialNumber'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Seri'
							fullWidth
							size='small'
							error={!!errors.serialNumber}
							helperText={errors.serialNumber?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Tên thiết bị'
							fullWidth
							size='small'
							error={!!errors.name}
							helperText={errors.name?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='rfid'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='RFID'
							fullWidth
							size='small'
							error={!!errors.rfid}
							helperText={errors.rfid?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='usageTypeId'
					control={control}
					rules={{
						required: 'Please select a device type',
					}}
					render={({ field }) => (
						<UsageTypeSelect
							id={field?.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(value) =>
								updateCreatedDevice('usageTypeId', value?.name)
							}
							error={!!errors.usageTypeId}
						/>
					)}
				/>
				{errors.usageTypeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.usageTypeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='deviceTypeId'
					control={control}
					rules={{
						required: 'Please select a device type',
					}}
					render={({ field }) => (
						<DeviceTypeSelect
							id={field?.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(value) =>
								updateCreatedDevice('deviceTypeId', value?.name)
							}
							error={!!errors.deviceTypeId}
						/>
					)}
				/>
				{errors.deviceTypeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.deviceTypeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Stack direction={'row'} alignItems={'center'} gap={1}>
					<Box sx={{ width: '100%' }}>
						<Controller
							name='deviceGroupId'
							control={control}
							rules={{
								required: 'Please select a device type',
							}}
							render={({ field }) => (
								<DeviceGroupSelect
									id={field?.value}
									deviceTypeId={deviceTypeId} // Truyền deviceTypeId vào component select
									onChange={(value) => field.onChange(value?.id)}
									onSelect={(value) =>
										updateCreatedDevice('deviceGroupId', value?.name)
									}
									error={!!errors.deviceGroupId}
									disabled={!deviceTypeId} // Vô hiệu hóa nếu chưa chọn loại thiết bị
								/>
							)}
						/>
						{errors.deviceGroupId && (
							<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
								{errors.deviceGroupId.message}
							</Typography>
						)}
					</Box>
					<IconButton
						aria-label='config'
						onClick={() => setModalOpen(true)}
						disabled={!control._formValues.deviceGroupId}
						color='primary'
					>
						<Settings />
					</IconButton>
				</Stack>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='deviceSKUId'
					control={control}
					rules={{
						required: 'Please select a device type',
					}}
					render={({ field }) => (
						<DeviceSKUSelect
							id={field?.value}
							onChange={(value) => field.onChange(value?.id)}
							deviceGroupId={deviceGroupId}
							disabled={!deviceGroupId}
							onSelect={(value) =>
								updateCreatedDevice('deviceSKUId', value?.name)
							}
							error={!!errors.deviceSKUId}
						/>
					)}
				/>
				{errors.deviceSKUId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.deviceSKUId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='deviceModelId'
					control={control}
					rules={{
						required: 'Please select a device type',
					}}
					render={({ field }) => (
						<DeviceModelSelect
							id={field?.value}
							onChange={(value) => field.onChange(value?.id)}
							deviceSKUId={deviceSKUId}
							disabled={!deviceSKUId}
							onSelect={(value) =>
								updateCreatedDevice('deviceModelId', value?.name)
							}
							error={!!errors.deviceModelId}
						/>
					)}
				/>
				{errors.deviceModelId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.deviceModelId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='customerId'
					control={control}
					rules={{
						required: 'Please select a device type',
					}}
					render={({ field }) => (
						<CustomerSelect
							id={field?.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(value) =>
								updateCreatedDevice('customerId', value?.name)
							}
							error={!!errors.customerId}
						/>
					)}
				/>
				{errors.customerId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.customerId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='address'
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							label='Địa chỉ'
							fullWidth
							size='small'
							error={!!errors.rfid}
							helperText={errors.rfid?.message}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='installationDate'
					control={control}
					render={({ field, fieldState: { error } }) => (
						<DatePicker
							label='Ngày cài đặt'
							format='dd/MM/yyyy' // Định dạng hiển thị
							value={field.value}
							onChange={(newValue) => field.onChange(newValue)}
							slotProps={{
								textField: {
									fullWidth: true,
									size: 'small',
									error: !!error,
									helperText: error ? error.message : null,
								},
							}}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 12 }}>
				<Controller
					name='note'
					control={control}
					render={({ field }) => (
						<TextField
							label='Ghi chú'
							multiline
							rows={4}
							fullWidth
							{...field}
						/>
					)}
				/>
			</Grid2>
			<Grid2 container justifyContent={'flex-end'} width={'100%'}>
				<Button variant='contained' onClick={handleNext} sx={{ width: 'auto' }}>
					Tiếp tục
				</Button>
			</Grid2>
			<DeviceGroupItemsModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				deviceGroupId={control._formValues.deviceGroupId}
				onSelectionChange={(selectedIds) => {
					setSelectedGroupItems(
						selectedIds.map((id) => ({
							id: id.id,
							deviceId: '',
							attributeName: id.attributeName,
							value: id.value,
						})),
					)
				}}
			/>
		</Grid2>
	)
}

export default DeviceForm
