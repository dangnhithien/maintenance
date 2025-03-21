import { Chip, Grid2, Stack, Typography } from '@mui/material'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { useEffect } from 'react'
import SpinnerLoading from '@components/SpinerLoading'
import useDevice from '@modules/maintenance/hooks/useDevice'
import { IDevice } from '@modules/maintenance/datas/device/IDevice'
import DEFAULT from '@assets/images/Icon_Default.jpg'
interface Props {
	id?: string
	onSelect?: (device: IDevice) => void
}
const DeviceDetail: React.FC<Props> = ({ id, onSelect }) => {
	const { getDeviceById } = useDevice()
	const { data, isLoading } = getDeviceById(id || '', {
		includeProperties:
			'DeviceType,Customer,UsageType,MaintenanceHistories,AttributeDeviceValues',
	})

	useEffect(() => {
		if (data && onSelect) {
			onSelect(data)
		}
	}, [data])

	if (isLoading) {
		return <SpinnerLoading />
	}
	return (
		<Grid2 container spacing={4}>
			<Grid2 size={{ xs: 2 }}>
				<img
					src={
						!data?.deviceType?.imageUrl
							? DEFAULT // Ảnh mặc định nếu null
							: data?.deviceType?.imageUrl.startsWith('http')
							? encodeURI(data?.deviceType?.imageUrl) // Nếu đã có "http", chỉ encode URL
							: encodeURI(`http://${data?.deviceType?.imageUrl}`) // Nếu chưa có, thêm "http://" rồi encode
					}
					style={{
						maxWidth: '100%',
						height: '300px',
						objectFit: 'contain',
					}}
				/>
			</Grid2>
			<Grid2 size={{ xs: 10 }}>
				<Grid2 container spacing={3}>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Tên
						</Typography>
						<Typography variant='body2'>{data?.name || '-'}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Số seri
						</Typography>
						<Typography variant='body2'>{data?.serialNumber || '-'}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							RFID
						</Typography>
						<Typography variant='body2'>{data?.rfid || '-'}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Khách hàng
						</Typography>
						<Typography variant='body2'>
							{data?.customer?.name || '-'}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Địa chỉ
						</Typography>
						<Typography variant='body2'>
							{data?.address ? data?.address : data?.customer?.address || '-'}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Model
						</Typography>
						<Typography variant='body2'>
							{data?.deviceTypeCode || '-'}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							SKU
						</Typography>
						<Typography variant='body2'>
							{data?.deviceSKUCode || '-'}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Nhóm
						</Typography>
						<Typography variant='body2'>
							{data?.deviceGroupCode || '-'}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Loại
						</Typography>
						<Typography variant='body2'>
							{data?.deviceTypeCode || '-'}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Ngày lắp đặt
						</Typography>
						<Typography variant='body2'>
							{data?.installationDate &&
								format(new Date(data.installationDate || '-'), 'dd/MM/yyyy', {
									locale: vi,
								})}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Hình thức sử dụng
						</Typography>
						<Typography variant='body2'>
							{data?.usageType?.name || '-'}
						</Typography>
					</Grid2>
					<Grid2 size={{ xs: 4 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Ghi chú
						</Typography>
						<Typography variant='body2'>{data?.note || '-'}</Typography>
					</Grid2>
					<Grid2 size={{ xs: 12 }}>
						<Typography variant='body1' color='primary' fontWeight={600}>
							Thông số máy
						</Typography>

						{data?.attributeDeviceValues &&
						data.attributeDeviceValues.length > 0 ? (
							<Stack
								direction='row'
								spacing={1}
								sx={{ mt: 1, flexWrap: 'wrap' }}
							>
								{data.attributeDeviceValues.map((item) => (
									<Chip
										key={item.id}
										label={`${item.attributeName}`}
										color='primary'
										variant='outlined'
										sx={{ mb: 1 }}
									/>
								))}
							</Stack>
						) : (
							<Typography variant='body2'>-</Typography>
						)}
					</Grid2>
				</Grid2>
			</Grid2>
		</Grid2>
	)
}

export default DeviceDetail
