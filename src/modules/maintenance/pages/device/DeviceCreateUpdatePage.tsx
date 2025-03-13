import Wrapper from '@modules/maintenance/components/common/Wrapper'
import ComponentCreateUpdate from '@modules/maintenance/components/component/ComponentCreateUpdate'
import DeviceCreateUpdate from '@modules/maintenance/components/device/DeviceCreateUpdate'
import { Link } from '@mui/material'
import { Helmet } from 'react-helmet'
import { Link as RouterLink, useParams } from 'react-router-dom'
const page = {
	title: 'Tạo mới thiết bị',
	url: '/devices',
	component: <DeviceCreateUpdate />,
}
const DeviceCreateUpdatePage = () => {
	const { id } = useParams()
	const breadcrumbs = [
		<Link key='1' underline='none' component={RouterLink} to={page.url}>
			<span style={{ color: '#10428e', fontSize: '18px', fontWeight: 600 }}>
				{page.title}
			</span>
		</Link>,
	]

	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content='Tạo mới thiết bị' />
			</Helmet>

			<Wrapper title={page.title}>
				<DeviceCreateUpdate id={id} />
			</Wrapper>

			{id && (
				<Wrapper title='Tạo nhắc nhở cho thiết bị' sx={{ mt: 2 }}>
					<ComponentCreateUpdate deviceId={id} />
				</Wrapper>
			)}
		</>
	)
}

export default DeviceCreateUpdatePage
