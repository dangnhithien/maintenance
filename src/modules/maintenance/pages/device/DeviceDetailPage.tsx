import TabHistory from '@modules/maintenance/components/common/HistoryTabs/TabHistory'
import Wrapper from '@modules/maintenance/components/common/Wrapper'
import DeviceDetail from '@modules/maintenance/components/device/DeviceDetail'
import type { IDevice } from '@modules/maintenance/datas/device/IDevice'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import DeviceAttributeTable from '../../components/device/DeviceAction/DeviceAttributeTable'
import PartDetailTable from '@modules/maintenance/components/partDetail/PartDetailTable'
const DeviceDetailPage = () => {
	const { id } = useParams<{ id: string }>()
	const [device, setDevice] = useState<IDevice>({} as IDevice)
	const page = {
		title: 'Chi tiết thiết bị',
		url: '/devices/:id',
		component: <DeviceDetail onSelect={setDevice} id={id} />,
	}
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>

			<Wrapper title={page.title}>{page.component}</Wrapper>

			<Wrapper title='Danh sách  thành phần' sx={{ mt: 2 }}>
				<PartDetailTable deviceId={id} />
			</Wrapper>

			<Wrapper sx={{ mt: 2 }} title='Thông số thiết bị'>
				<DeviceAttributeTable
					data={(device.attributeDeviceValues || []).map((attr) => ({
						...attr,
						value: attr.value || '',
					}))}
				/>
			</Wrapper>

			<Wrapper sx={{ mt: 2 }} title='Lịch sử bảo dưỡng'>
				<TabHistory type='Device' payload={device} />
			</Wrapper>
		</>
	)
}

export default DeviceDetailPage
