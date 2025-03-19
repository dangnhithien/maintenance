import { Box, Grid2, Stack, Typography } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import ChipTaskCheckStatus from '../common/chip/ChipTaskCheckStatus'
import { EnumStatusTaskCheck } from '@modules/maintenance/datas/enum/EnumStatusTaskCheck'

const CaseDetail: React.FC = () => {
	return (
		<>
			<Grid2
				container
				spacing={4}
				sx={{
					width: '100%',
					border: '1px solid #E0E0E0',
					borderRadius: 2,
					padding: 2,
				}}
			>
				<Grid2 size={{ xs: 12 }}>
					<Stack
						direction={'row'}
						alignItems={'center'}
						sx={{ border: '1px solid #E0E0E0', borderRadius: 4, padding: 1.2 }}
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
						</Box>{' '}
						<Typography variant='body1' color='primary' fontWeight={600}>
							Chi tiết
						</Typography>
					</Stack>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Tên Ticket
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Loại Ticket
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Thiết bị
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Tình trạng
					</Typography>
					<ChipTaskCheckStatus status={EnumStatusTaskCheck.CREATED} />
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Tên khách hàng
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Người phụ trách
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Ghi chú
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Ngày bắt đầu
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
				<Grid2 size={{ xs: 4 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Địa chỉ
					</Typography>
					<Typography variant='body2'>Phòng hờ</Typography>
				</Grid2>
			</Grid2>
		</>
	)
}

export default CaseDetail
