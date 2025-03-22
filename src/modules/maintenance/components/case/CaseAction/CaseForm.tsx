import { ICaseCreate } from '@modules/maintenance/datas/case/ICaseCreate'
import { Button, Grid2, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'
import CaseTypeSelect from '../../common/select/CaseTypeSelect'
import CustomerSelect from '../../common/select/CustomerSelect'
import UserSelect from '../../common/select/UserSelect'
import SerialNumberSelect from '../../common/select/SerialNumberSelect'

interface CaseFormProps {
	control: any
	errors: any
	handleNext: () => void
	updateCreatedTicket: (key: keyof ICaseCreate, value: string) => void
	customerId: string | undefined
	createdTicket: ICaseCreate | null
}

const CaseForm: React.FC<CaseFormProps> = ({
	control,
	errors,
	handleNext,
	updateCreatedTicket,
	customerId,
	createdTicket,
}) => {
	return (
		<Grid2 container spacing={4}>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<TextField
							label='Tên'
							fullWidth
							size='small'
							error={!!errors.name}
							helperText={errors.name?.message}
							{...field}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='caseTypeId'
					control={control}
					render={({ field }) => (
						<CaseTypeSelect
							id={field.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(item) =>
								updateCreatedTicket('caseTypeName', item.name)
							}
							error={!!errors.caseTypeId}
						/>
					)}
				/>
				{errors.caseTypeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.caseTypeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='customerId'
					control={control}
					render={({ field }) => (
						<CustomerSelect
							id={field.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(item) => {
								updateCreatedTicket('customerId', item.id)
								updateCreatedTicket('customerName', item.name)
							}}
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
					name='assigneeId'
					control={control}
					render={({ field }) => (
						<UserSelect
							id={field.value}
							onChange={(value) => field.onChange(value?.id)}
							onSelect={(item) => {
								updateCreatedTicket('assigneeName', item.name)
							}}
							error={!!errors.assigneeId}
						/>
					)}
				/>
				{errors.assigneeId && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.assigneeId.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='deviceId'
					control={control}
					render={({ field }) => (
						<SerialNumberSelect
							id={customerId}
							onChange={(value) => field.onChange(value?.id)}
							error={!!errors.customerId}
							onSelect={(item) => {
								updateCreatedTicket('deviceId', item.id)
								updateCreatedTicket('deviceName', item.name)
							}}
							disabled={!customerId}
						/>
					)}
				/>
				{errors.serialNumber && (
					<Typography color='error' fontSize={12} margin={'4px 14px 0'}>
						{errors.serialNumber.message}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }} alignItems={'center'} p={1}>
				{createdTicket?.deviceName && (
					<Typography variant='body1' fontWeight={600}>
						{createdTicket?.deviceName}
					</Typography>
				)}
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='scheduledTime'
					control={control}
					render={({ field }) => (
						<TextField
							type='date'
							fullWidth
							size='small'
							label='Ngày lắp đặt'
							InputLabelProps={{ shrink: true }}
							error={!!errors.scheduledTime}
							helperText={errors.scheduledTime?.message}
							{...field}
						/>
					)}
				/>
			</Grid2>
			<Grid2 size={{ xs: 6 }}>
				<Controller
					name='address'
					control={control}
					render={({ field }) => (
						<TextField
							label='Địa chỉ'
							fullWidth
							size='small'
							error={!!errors.address}
							helperText={errors.address?.message}
							{...field}
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
		</Grid2>
	)
}

export default CaseForm
