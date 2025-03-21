import Wrapper from '@modules/maintenance/components/common/Wrapper'
import ComponentCreateUpdate from '@modules/maintenance/components/component/ComponentCreateUpdate'
import DeviceAction from '@modules/maintenance/components/device/DeviceAction'
import DeviceCreateUpdate from '@modules/maintenance/components/device/DeviceCreateUpdate'
import PartDetailTable from '@modules/maintenance/components/partDetail/PartDetailTable'
import TaskCheckList from '@modules/maintenance/components/taskCheck/TaskCheckList'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const page = {
	title: 'Tạo thiết bị mới',
	url: '/devices',
	component: <DeviceCreateUpdate />,
}
const DeviceCreateUpdatePage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content='Tạo mới thiết bị' />
			</Helmet>
			<Wrapper title={page.title}>
				<DeviceAction id={id} />
			</Wrapper>
			{id && (
				<>
					<Wrapper title='Tạo nhắc nhở cho thiết bị' sx={{ mt: 2 }}>
						<ComponentCreateUpdate deviceId={id} />
					</Wrapper>
					<Wrapper title='Danh sách  thành phần' sx={{ mt: 2 }}>
						<PartDetailTable deviceId={id} />
					</Wrapper>
					<Wrapper title='Lịch sử' sx={{ mt: 2 }}>
						<TaskCheckList param={{ deviceId: id }} />
					</Wrapper>
				</>
			)}
		</>
	)
}

export default DeviceCreateUpdatePage
