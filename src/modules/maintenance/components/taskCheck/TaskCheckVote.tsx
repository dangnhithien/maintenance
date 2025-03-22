import { TaskCheckDto } from '@modules/maintenance/datas/taskCheck/TaskCheckDto'
import { Box, Grid2, Paper, Typography } from '@mui/material'
import Wrapper from '../common/Wrapper'
import RowCheckValue from './RowCheckValue'
interface Props {
	data?: TaskCheckDto
}
const TaskCheckVote: React.FC<Props> = ({ data }) => {
	return (
		<>
			<Grid2 container spacing={2}>
				<Grid2 flex={1}>
					<Paper
						variant='outlined'
						sx={{ p: 4, width: '100%', height: '100%', borderRadius: 4 }}
					>
						<Typography variant='h6' color='primary' mb={2} fontWeight={'bold'}>
							{data?.templateCheck?.name}
						</Typography>
						<Box
							sx={{
								overflowY: 'auto',
								overflowX: 'hidden',
								height: '600px',
								p: 2,
							}}
						>
							<Grid2 container size={12} spacing={1} direction={'column'}>
								{data?.rowCheckValues?.map((rowCheckValue, index) => (
									<Grid2 key={index} size={12} spacing={1}>
										<RowCheckValue data={rowCheckValue} />
									</Grid2>
								))}
							</Grid2>
						</Box>
					</Paper>
				</Grid2>
			</Grid2>
			<Grid2 size={12} container spacing={2}>
				{data?.reason && (
					<Wrapper title='Lí do' sx={{ mt: 2 }}>
						{data?.reason}
					</Wrapper>
				)}
			</Grid2>
		</>
	)
}

export default TaskCheckVote
