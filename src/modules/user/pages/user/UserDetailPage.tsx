import UserDetail from '@modules/user/components/user/UserDetail'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const UserDetailPage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>Danh sách nhân viên</title>
				<meta name='description' content='Danh sách nhân viên' />
			</Helmet>
			<UserDetail id={id} />
		</>
	)
}

export default UserDetailPage
