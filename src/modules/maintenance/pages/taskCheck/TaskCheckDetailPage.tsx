import Wrapper from '@modules/maintenance/components/common/Wrapper'
import TaskCheckDetail from '@modules/maintenance/components/taskCheck/TaskCheckDetail'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import AssignmentIcon from '@mui/icons-material/Assignment'
import FrameVMS from '@components/FrameVMS'
import TabHistory from '@modules/maintenance/components/taskCheck/TabHistory'

const TaskCheckDetailPage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>Thông tin Task</title>
				<meta name='Thông tin Task' content='Thông tin Task' />
			</Helmet>
			<Wrapper sx={{ mb: 2 }}>
				<FrameVMS title='Thông tin Task' icon={<AssignmentIcon />}>
					<TaskCheckDetail id={id} />
				</FrameVMS>
			</Wrapper>
			<Wrapper sx={{ mb: 2 }}>
				<TabHistory />
			</Wrapper>
		</>
	)
}

export default TaskCheckDetailPage
