import Wrapper from '@modules/maintenance/components/common/Wrapper'
import DeviceList from '@modules/maintenance/components/device/DeviceList'
import { Helmet } from 'react-helmet'
const page = {
	title: 'Danh sách thiết bị',
	url: '/devices',
	component: <DeviceList />,
}
const DeviceListPage = () => {
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content='Danh sách thiết bị' />
			</Helmet>

			<Wrapper title={page.title}>{page.component}</Wrapper>
		</>
	)
}

export default DeviceListPage
