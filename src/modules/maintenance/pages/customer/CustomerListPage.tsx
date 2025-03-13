import Wrapper from '@modules/maintenance/components/common/Wrapper'
import CustomerList from '@modules/maintenance/components/customer/CustomerList'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs } from '@mui/material'
import { Helmet } from 'react-helmet'
const CustomerListPage = () => {
	const breadcrumbs = [
		<span style={{ color: '#10428e', fontSize: '18px', fontWeight: 600 }}>
			Danh sách khách hàng
		</span>,
	]
	return (
		<>
			<Helmet>
				<title>Danh sách khách hàng</title>
				<meta name='description' content='Danh sách các khách hàng' />
			</Helmet>
			<Breadcrumbs
				separator={<NavigateNextIcon fontSize='small' />}
				aria-label='breadcrumb'
				sx={{
					margin: '10px 0',
				}}
			>
				{breadcrumbs}
			</Breadcrumbs>
			<Wrapper>
				<CustomerList />
			</Wrapper>
		</>
	)
}

export default CustomerListPage
