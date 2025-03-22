import { Box, Button, Grid2, Stack, Typography } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { Controller } from 'react-hook-form'
import SaveIcon from '@mui/icons-material/Save'

const CasePreview = ({
	loading,
	ticket,
	control,
	handleBack,
	handleSubmit,
}: any) => {
	return (
		<Box>
			<Grid2 container spacing={4}>
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
								width: 24, // Độ rộng icon
								height: 24, // Độ cao icon
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
				<Grid2 size={{ xs: 6 }}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Tên Ticket
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Thiết bị
					</Typography>
					<Typography variant='body2'>{ticket?.deviceName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Loại Ticket
					</Typography>
					<Typography variant='body2'>{ticket?.caseTypeName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
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
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Tên khách hàng
					</Typography>
					<Typography variant='body2'>{ticket?.customerName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Typography variant='body1' color='primary' fontWeight={600}>
						Người phụ trách
					</Typography>
					<Typography variant='body2'>{ticket?.assigneeName || '-'}</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
					<Controller
						name='scheduledTime'
						control={control}
						render={({ field }) => (
							<>
								<Typography variant='body1' color='primary' fontWeight={600}>
									Ngày lắp đặt
								</Typography>
								<Typography variant='body2'>{field.value || '-'}</Typography>
							</>
						)}
					/>
				</Grid2>
				<Grid2 size={{ xs: 6 }}>
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
				<Grid2 container justifyContent={'flex-end'} width={'100%'}>
					<Stack direction={'row'} gap={1}>
						<Button onClick={handleBack}>Quay lại</Button>
						<Button
							role={undefined}
							variant='contained'
							tabIndex={-1}
							startIcon={<SaveIcon />}
							loading={loading}
							type='submit'
							onClick={handleSubmit}
						>
							Lưu
						</Button>
					</Stack>
				</Grid2>
			</Grid2>
		</Box>
	)
}

export default CasePreview
