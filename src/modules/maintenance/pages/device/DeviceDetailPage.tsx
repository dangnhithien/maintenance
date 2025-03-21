import TabHistory from '@modules/maintenance/components/common/HistoryTabs/TabHistory'
import Wrapper from '@modules/maintenance/components/common/Wrapper'
import DeviceDetail from '@modules/maintenance/components/device/DeviceDetail'
import type { IDevice } from '@modules/maintenance/datas/device/IDevice'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const DeviceDetailPage = () => {
	const { id } = useParams<{ id: string }>()
	const [history, setHistory] = useState<IDevice>({} as IDevice)
	const page = {
		title: 'Chi tiết thiết bị',
		url: '/devices/:id',
		component: <DeviceDetail onSelect={setHistory} id={id} />,
	}
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>

			<Wrapper title={page.title}>{page.component}</Wrapper>

			<Wrapper sx={{ mt: 2 }} title='Lịch sử bảo dưỡng'>
				<TabHistory type='Device' payload={history} />
			</Wrapper>
		</>
	)
}

export default DeviceDetailPage
