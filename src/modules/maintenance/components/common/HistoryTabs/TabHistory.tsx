import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { TaskCheckDto } from '@modules/maintenance/datas/taskCheck/TaskCheckDto'
import { EnumTaskHistory } from '@modules/maintenance/datas/enum/EnumTaskHistory'
import PartChangeHistory from './PartChangeHistory'
import MaintenanceDateUpdateHistory from './MaintenanceDateUpdateHistory'
import MachineParameterChangeHistory from './MachineParameterChangeHistory'
import { IDevice } from '@modules/maintenance/datas/device/IDevice'
import { Stack } from '@mui/material'
import InputSearch from '../InputSearch'
import { MaintenanceHistoryDto } from '@modules/maintenance/datas/taskCheck/TaskCheckDto'
import DateFilter from '@components/DateFilter'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

interface TaskCheckData {
	type: 'TaskCheck'
	payload: TaskCheckDto
}

interface DeviceData {
	type: 'Device'
	payload: IDevice
}

type Props = TaskCheckData | DeviceData

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}
const TabHistory: React.FC<Props> = (props) => {
	const [value, setValue] = React.useState(0)
	const [dateFilter, setDateFilter] = React.useState<{
		fromDate: Date | null
		toDate: Date | null
	}>({
		fromDate: null,
		toDate: null,
	})

	const getFilteredData = React.useCallback(
		(type: string) => {
			let data: MaintenanceHistoryDto[] = []
			if (props.type === 'TaskCheck') {
				data = props.payload.maintenanceHistories || []
			} else if (props.type === 'Device') {
				data = props.payload.maintenanceHistories || []
			}

			// filter theo loại lịch sử
			let filtered = data.filter((h) => h?.maintenanceUpdateType === type)

			// filter thêm theo date nếu có
			if (dateFilter.fromDate && dateFilter.toDate) {
				filtered = filtered.filter((item) => {
					const itemDate = new Date(item.maintenanceUpdateAt)
					return (
						itemDate >= dateFilter.fromDate! && itemDate <= dateFilter.toDate!
					)
				})
			}

			return filtered
		},
		[props, dateFilter],
	)

	const handleFilter = (
		formattedStart: string | null,
		formattedEnd: string | null,
	) => {
		setDateFilter({
			fromDate: formattedStart ? new Date(formattedStart) : null,
			toDate: formattedEnd ? new Date(formattedEnd) : null,
		})
	}

	const partChangeData = React.useMemo(
		() => getFilteredData(EnumTaskHistory.REPLACE_PART_DETAIL),
		[getFilteredData],
	)
	const maintenanceDateData = React.useMemo(
		() => getFilteredData(EnumTaskHistory.UPDATE_LAST_MAINTENANCE_DATE),
		[getFilteredData],
	)
	const deviceAttributeData = React.useMemo(
		() => getFilteredData(EnumTaskHistory.UPDATE_LAST_ATTRIBUTE_DEVICE_VALUE),
		[getFilteredData],
	)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs example'
				>
					<Tab label='Lịch sử thay đổi thành phần' {...a11yProps(0)} />
					<Tab label='Lịch sử cập nhật ngày bảo trì' {...a11yProps(1)} />
					<Tab label='Lịch sử thay đổi thông số máy' {...a11yProps(2)} />
				</Tabs>
			</Box>
			<Stack
				direction='row'
				spacing={2}
				sx={{ mt: 2, mb: 2 }}
				justifyContent={'flex-end'}
			>
				<DateFilter onFilter={handleFilter} />
			</Stack>

			<CustomTabPanel value={value} index={0}>
				<PartChangeHistory data={partChangeData} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<MaintenanceDateUpdateHistory data={maintenanceDateData} />
			</CustomTabPanel>
			<CustomTabPanel value={value} index={2}>
				<MachineParameterChangeHistory data={deviceAttributeData} />
			</CustomTabPanel>
		</Box>
	)
}

export default TabHistory
