import Wrapper from '@modules/maintenance/components/common/Wrapper'
import DeviceAction from '@modules/maintenance/components/device/DeviceAction'
import { Helmet } from 'react-helmet'
const page = {
	title: 'Tạo thiết bị mới',
	url: '/devices/create',
	component: <DeviceAction />,
}

const DeviceActionPage = () => {
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>

			<Wrapper>{page.component}</Wrapper>
		</>
	)
}

export default DeviceActionPage
