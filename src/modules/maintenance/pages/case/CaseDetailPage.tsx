import CaseDetail from '@modules/maintenance/components/case/CaseDetail'
import Wrapper from '@modules/maintenance/components/common/Wrapper'
import TaskCheckList from '@modules/maintenance/components/taskCheck/TaskCheckList'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

const CaseDetailPage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>Chi tiết</title>
				<meta name='description' content='Chi tiết' />
			</Helmet>

			<Wrapper title=''>
				<CaseDetail />
			</Wrapper>

			<Wrapper title='Danh sách task' sx={{ mt: 2 }}>
				<TaskCheckList
					param={{ caseTaskId: id, takeCount: 3 }}
					mode='ticketView'
				/>
			</Wrapper>
		</>
	)
}

export default CaseDetailPage
