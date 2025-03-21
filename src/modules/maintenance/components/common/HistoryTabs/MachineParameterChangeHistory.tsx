import PaginatedDataGrid from '@components/PaginationDatagrid'
import { GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'
import { MaintenanceHistoryDto } from '@modules/maintenance/datas/taskCheck/TaskCheckDto'
import { format, parseISO } from 'date-fns'
import { vi } from 'date-fns/locale'

interface Props {
	data?: MaintenanceHistoryDto[]
}

const MachineParameterChangeHistory: React.FC<Props> = ({ data = [] }) => {
	const [params, setParams] = useState({
		takeCount: 5,
		skipCount: 0,
		searchTerm: '',
	})

	const columns: GridColDef[] = [
		{
			field: 'fieldName',
			headerName: 'Tên thông số',
			flex: 1,
			renderCell: (params) => params.row.maintenanceHistory.fieldName,
		},
		{
			field: 'oldValue',
			headerName: 'Giá trị cũ',
			flex: 1,
			renderCell: (params) => params.row.maintenanceHistory.oldValue,
		},
		{
			field: 'newValue',
			headerName: 'Giá trị mới',
			flex: 1,
			renderCell: (params) => params.row.maintenanceHistory.newValue,
		},
		{
			field: 'updateByUsername',
			headerName: 'Người cập nhật',
			flex: 1,
			renderCell: (params) => params.row.maintenanceHistory.updateByUsername,
		},
		{
			field: 'maintenanceUpdateAt',
			headerName: 'Ngày cập nhật',
			flex: 1,
			renderCell: (params) => {
				if (!params.row.maintenanceHistory.maintenanceUpdateAt) return '-'
				return format(
					parseISO(params.row.maintenanceHistory.maintenanceUpdateAt),
					'dd/MM/yyyy',
					{ locale: vi },
				)
			},
		},
	]

	return (
		<PaginatedDataGrid
			columns={columns}
			rows={data.slice(params.skipCount, params.skipCount + params.takeCount)}
			totalCount={data.length}
			setParams={setParams}
			initialTakeCount={params.takeCount}
			getRowId={(row) => row.maintenanceHistoryId}
			checkboxSelection={false}
		/>
	)
}

export default MachineParameterChangeHistory
