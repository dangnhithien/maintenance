import Dashboard from '@modules/maintenance/components/dashboard/Dashboard'
import { Helmet } from 'react-helmet'

const DashboardPage = () => {
	return (
		<>
			<Helmet>
				<title>Dashboard</title>
				<meta name='description' content='Dashboard' />
			</Helmet>
			<Dashboard />
		</>
	)
}

export default DashboardPage
