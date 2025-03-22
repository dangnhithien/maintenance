import {
	Box,
	Button,
	Grid2,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { IDeviceCreate } from '@modules/maintenance/datas/device/IDeviceCreate'
import { IAttributeDeviceValue } from '@modules/maintenance/datas/attributeDeviceValue/IAttributeDeviceValueCreate'

interface DevicePreviewProps {
	device: IDeviceCreate | null
	loading: boolean
	control: any
	handleBack: () => void
	handleSubmit: () => void
	selectedGroupItems: IAttributeDeviceValue[]
}

const DevicePreview = ({
	device,
	loading,
	control,
	handleBack,
	handleSubmit,
	selectedGroupItems,
}: DevicePreviewProps) => {
	return (
		<Box>
			<Grid2 container spacing={4}>
				<Grid2 size={{ xs: 12 }}>
					<Stack
						direction={'row'}
						alignItems={'center'}
						sx={{
							border: '1px solid #E0E0E0',
							borderRadius: 4,
							padding: 1.2,
						}}
						gap={1}
					>
						<Box
							sx={{
								backgroundColor: '#EBF1FA',
								borderRadius: 1,
								padding: 0.7,
								width: 24,
								height: 24,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<ManageSearchIcon sx={{ color: '#648CC8', fontSize: 18 }} />
						</Box>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Chi tiết thiết bị
						</Typography>
					</Stack>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Tên thiết bị
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='serialNumber'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Seri
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='rfid'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									RFID
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Hình thức sử dụng
					</Typography>
					<Typography variant='body2'>{device?.usageTypeId || '-'}</Typography>
				</Grid2>

				{/* Loại thiết bị */}
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Loại thiết bị
					</Typography>
					<Typography variant='body2'>{device?.deviceTypeId || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Nhóm thiết bị
					</Typography>
					<Typography variant='body2'>
						{device?.deviceGroupId || '-'}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						SKU thiết bị
					</Typography>
					<Typography variant='body2'>{device?.deviceSKUId || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Model thiết bị
					</Typography>
					<Typography variant='body2'>
						{device?.deviceModelId || '-'}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Khách hàng
					</Typography>
					<Typography variant='body2'>{device?.customerId || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='address'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Địa chỉ
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='installationDate'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Ngày cài đặt
								</Typography>
								<Typography variant='body2'>
									{field.value
										? new Date(field.value).toLocaleDateString()
										: '-'}
								</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Controller
						name='note'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Ghi chú
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 8 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Thông số thiết bị được chọn
					</Typography>

					{selectedGroupItems.length > 0 ? (
						<TableContainer
							component={Paper}
							sx={{ mt: 1, maxHeight: 300, overflow: 'auto' }}
						>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<TableCell
											sx={{
												fontWeight: 'bold',
												backgroundColor: '#648CC8',
												color: 'white',
											}}
										>
											STT
										</TableCell>
										<TableCell
											sx={{
												fontWeight: 'bold',
												backgroundColor: '#648CC8',
												color: 'white',
											}}
										>
											Thông số
										</TableCell>
										<TableCell
											sx={{
												fontWeight: 'bold',
												backgroundColor: '#648CC8',
												color: 'white',
											}}
										>
											Giá trị
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{selectedGroupItems.map((item, index) => (
										<TableRow key={item.id}>
											<TableCell>{index + 1}</TableCell>
											<TableCell>{item.attributeName}</TableCell>
											<TableCell>{item.value || '-'}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					) : (
						<Typography variant='body2' sx={{ pl: 1, mt: 1 }}>
							Không có thông số nào được chọn
						</Typography>
					)}
				</Grid2>

				<Grid2 container justifyContent={'flex-end'} width={'100%'}>
					<Stack direction={'row'} gap={1}>
						<Button onClick={handleBack}>Quay lại</Button>
						<Button
							variant='contained'
							type='submit'
							onClick={handleSubmit}
							startIcon={<SaveIcon />}
							loading={loading}
						>
							Lưu
						</Button>
					</Stack>
				</Grid2>
			</Grid2>
		</Box>
	)
}

export default DevicePreview
