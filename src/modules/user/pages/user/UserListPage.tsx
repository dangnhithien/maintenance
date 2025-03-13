import Wrapper from '@modules/maintenance/components/common/Wrapper'
import UserList from '@modules/user/components/user/UserList'
import { Helmet } from 'react-helmet'
const UserListPage = () => {
	return (
		<div>
			<Helmet>
				<title>Danh sách nhân viên</title>
				<meta name='description' content='Danh sách nhân viên' />
			</Helmet>

			<Wrapper title='Danh sách nhân viên'>
				<UserList />
			</Wrapper>
		</div>
	)
}

export default UserListPage
