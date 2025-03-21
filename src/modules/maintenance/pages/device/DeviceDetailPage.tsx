import Wrapper from '@modules/maintenance/components/common/Wrapper'
import DeviceDetail from '@modules/maintenance/components/device/DeviceDetail'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const DeviceDetailPage = () => {
	const { id } = useParams<{ id: string }>()
	const page = {
		title: 'Chi tiết thiết bị',
		url: '/devices/:id',
		component: <DeviceDetail id={id} />,
	}
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

export default DeviceDetailPage
