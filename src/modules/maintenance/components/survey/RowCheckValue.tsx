import { RowCheckValueDto } from '@modules/maintenance/datas/rowCheckValue/RowCheckValueDto'
import { Box, Divider, Grid, Grid2, Typography } from '@mui/material'

interface Props {
	data: RowCheckValueDto
}

const RowCheckValue: React.FC<Props> = ({ data }) => {
	if (data.isHeader) {
		return (
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					p: 2,
					backgroundColor: '#e3f2fd',
					mb: 2,
				}}
			>
				<Typography variant='subtitle1' fontWeight='bold' color='#1565c0'>
					{data.rowCheckContent}
				</Typography>
			</Box>
		)
	}

	return (
		<Box sx={{ p: 1, mb: 1, pl: 5 }}>
			<Grid2 container spacing={2}>
				<Grid2 size={{ xs: 6 }}>
					<Typography
						variant='subtitle1'
						fontWeight='bold'
						color='text.primary'
					>
						{data.rowCheckContent}
					</Typography>
				</Grid2>
				<Grid2 size={{ xs: 6 }} sx={{ textAlign: 'right' }}>
					<Typography variant='body1' color='text.primary'>
						{data.value || 'Chưa trao đổi'}
					</Typography>
					{data.note && (
						<Typography variant='caption' color='text.secondary'>
							Ghi chú: {data.note || '-'}
						</Typography>
					)}
				</Grid2>
			</Grid2>
			<Divider sx={{ mt: 2 }} />
		</Box>
	)
}

export default RowCheckValue
