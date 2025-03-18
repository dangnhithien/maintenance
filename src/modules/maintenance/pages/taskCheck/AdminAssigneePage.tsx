import Wrapper from '@modules/maintenance/components/common/Wrapper'
// import AdminAssignee from '@modules/maintenance/components/taskCheck/AdminAssignee'
import TaskCheckList from '@modules/maintenance/components/taskCheck/TaskCheckList'
import { Helmet } from 'react-helmet'
const page = {
	title: 'Danh sách task',
	url: '/assignee',
	component: <TaskCheckList param={{ takeCount: 10 }} />,
}
const AdminAssigneePage = () => {
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>
			<Wrapper title={page.title}>{page.component}</Wrapper>
		</>
	)
}

export default AdminAssigneePage
