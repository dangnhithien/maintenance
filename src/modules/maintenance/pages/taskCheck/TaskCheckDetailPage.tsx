import Wrapper from '@modules/maintenance/components/common/Wrapper'
import TaskCheckDetail from '@modules/maintenance/components/taskCheck/TaskCheckDetail'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import AssignmentIcon from '@mui/icons-material/Assignment'
import FrameVMS from '@components/FrameVMS'
import TabHistory from '@modules/maintenance/components/taskCheck/TabHistory'
import { Button } from '@mui/material'
import { useState } from 'react'
import RowCheckValue from '@modules/maintenance/components/survey/RowCheckValue'
import { RowCheckValueDto } from '@modules/maintenance/datas/rowCheckValue/RowCheckValueDto'
import { TaskCheckDto } from '@modules/maintenance/datas/taskCheck/TaskCheckDto'
import TaskCheckVote from '@modules/maintenance/components/taskCheck/TaskCheckVote'

const TaskCheckDetailPage: React.FC = () => {
	const { id } = useParams()
	const [activeTab, setActiveTab] = useState(0)
	const [taskCheck, setTaskCheck] = useState<TaskCheckDto>({} as TaskCheckDto)
	const onSelectTaskCheck = (taskCheck: TaskCheckDto) => {
		setTaskCheck(taskCheck)
	}
	return (
		<>
			<Helmet>
				<title>Thông tin Task</title>
				<meta name='Thông tin Task' content='Thông tin Task' />
			</Helmet>
			<Wrapper sx={{ mb: 2 }}>
				<FrameVMS
					title='Thông tin Task'
					icon={<AssignmentIcon />}
					action={
						<Button
							onClick={() => setActiveTab((prev) => (prev === 0 ? 1 : 0))}
							sx={{ fontWeight: 600 }}
						>
							{activeTab === 0 ? 'Xem lịch sử' : 'Xem Phiếu'}
						</Button>
					}
				>
					<TaskCheckDetail id={id} onSelect={onSelectTaskCheck} />
				</FrameVMS>
			</Wrapper>

			{activeTab === 0 && (
				<Wrapper>
					<TaskCheckVote data={taskCheck} />
				</Wrapper>
			)}

			{activeTab === 1 && (
				<Wrapper>
					<TabHistory data={taskCheck} />
				</Wrapper>
			)}
		</>
	)
}

export default TaskCheckDetailPage
