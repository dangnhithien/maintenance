import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Checkbox,
	Chip,
	Link,
	SxProps,
	Theme,
	Typography,
} from '@mui/material'
import React from 'react'

interface DeviceCardProps {
	deviceId: string // ID của thiết bị
	image: string // Đường dẫn ảnh thiết bị
	chips?: string[] // Các nhãn chip
	deviceName: string // Tên thiết bị
	mode: string // Chế độ hiện tại (vd: "selection", "chế độ khác", ...)
	linkBaseUrl: string // URL cơ sở cho liên kết, sẽ kết hợp với deviceId
	onCheckDelete?: (deviceId: string, checked: boolean) => void
	sx?: SxProps<Theme> // Tùy chọn style
}

const DeviceCard: React.FC<DeviceCardProps> = ({
	deviceId,
	image,
	chips,
	deviceName,
	mode,
	linkBaseUrl,
	onCheckDelete,
	sx,
}) => {
	// Khi checkbox thay đổi
	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onCheckDelete?.(deviceId, event.target.checked)
	}

	return (
		<Card
			variant='outlined'
			sx={{
				textAlign: 'center',
				borderRadius: 2,
				p: 1,
				position: 'relative', // để đặt checkbox ở góc
				...sx,

				height: '100%',
			}}
		>
			{/* Hiển thị checkbox khi mode === "selection" */}
			{mode === 'selection' && (
				<Box sx={{ position: 'absolute', top: 8, right: 8 }}>
					<Checkbox onChange={handleCheckboxChange} />
				</Box>
			)}

			<CardContent>
				{/* Hình ảnh thiết bị */}
				<Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
					<CardMedia
						component='img'
						image={image}
						alt={deviceName}
						sx={{
							maxWidth: '100%',
							maxHeight: 250,
							objectFit: 'contain',
						}}
					/>
				</Box>

				{/* Danh sách chip */}
				{chips &&
					chips?.map((chip) => (
						<Chip
							key={chip}
							label={chip}
							color='default'
							sx={{ mb: 1, mr: 1 }}
							size='small'
						/>
					))}

				{/* Tên thiết bị dưới dạng link */}
				<Link href={`${linkBaseUrl}/${deviceId}`} underline='hover'>
					<Typography
						variant='h6'
						component='div'
						color='primary'
						fontWeight='bold'
					>
						{deviceName}
					</Typography>
				</Link>
			</CardContent>
		</Card>
	)
}

export default DeviceCard
