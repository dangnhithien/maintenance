import PaginatedDataGrid from '@components/PaginationDatagrid'
import { EnumStatusTaskCheck } from '@modules/maintenance/datas/enum/EnumStatusTaskCheck'
import { GetTaskCheckDto } from '@modules/maintenance/datas/taskCheck/GetTaskCheckDto'
import useTaskCheck from '@modules/maintenance/hooks/useTaskCheck'
import { Add, Warning } from '@mui/icons-material'
import {
	Box,
	Button,
	FormControl,
	Grid2,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Tooltip,
} from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChipTaskCheckStatus from '../common/chip/ChipTaskCheckStatus'
import InputSearch from '../common/InputSearch'
import PopupConfirm from '../common/PopupConfirm'
import DateFilter from '@components/DateFilter'

interface Props {
	param?: GetTaskCheckDto
	isViewMode?: boolean
	mode?: string
}

const TaskCheckList: React.FC<Props> = ({
	param,
	isViewMode = false,
	mode,
}) => {
	const [openPopupTemplateWarning, setOpenPopupTemplateWarning] =
		useState(false)
	const [filterStatus, setFilterStatus] = useState('0')
	const { taskChecks, fetchTaskChecks, loading, totalCount } = useTaskCheck()
	const [params, setParams] = useState<GetTaskCheckDto>({
		...param,
		includeProperties: 'Customer,Device',
		takeCount: param?.takeCount ?? 6,
		sortBy: 'CreatedDate DESC',
	})

	useEffect(() => {
		fetchTaskChecks(params)
	}, [params])

	const handleOpenTemplateWarning = () => {
		setOpenPopupTemplateWarning(true)
	}

	const handleCloseTemplateWarning = () => {
		setOpenPopupTemplateWarning(false)
	}

	// Hàm render chung cho các cell cần link
	const renderConditionalLink = (params: any, fieldValue: any) => {
		if (params.row.templateCheckId) {
			return (
				<Link to={`/task-check/detail/${params.row.id}`}>
					<Tooltip title={fieldValue}>{fieldValue}</Tooltip>
				</Link>
			)
		}
		return (
			<span style={{ cursor: 'pointer' }} onClick={handleOpenTemplateWarning}>
				{fieldValue}
			</span>
		)
	}

	const columns: GridColDef[] = [
		{
			field: 'code',
			headerName: 'Mã ',
			width: 100,
			renderCell: (params: any) =>
				renderConditionalLink(params, params.row.code),
		},
		{
			field: 'name',
			align: 'center',
			headerAlign: 'center',
			headerName: 'Tên ',
			flex: 1,
			renderCell: (params: any) =>
				renderConditionalLink(params, params.row.name),
		},
		{
			field: 'productName',
			headerName: 'Thiết bị',
			align: 'center',
			headerAlign: 'center',
			flex: 1,
			renderCell: (params: any) =>
				renderConditionalLink(params, params.row.device?.name),
		},
		{
			field: 'customerName',
			headerName: 'Khách hàng ',
			align: 'center',
			headerAlign: 'center',
			flex: 1,
			renderCell: (params: any) =>
				renderConditionalLink(params, params.row.customer?.name),
		},
		{
			field: 'scheduledTime',
			align: 'center',
			headerAlign: 'center',
			headerName: 'Ngày tiến hành',
			flex: 1,
			renderCell: (params: any) =>
				renderConditionalLink(
					params,
					params.row.scheduledTime &&
						new Date(params.row.scheduledTime).toLocaleDateString('vi-VN', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric',
						}),
				),
		},
		{
			field: 'assigneeName',
			headerName: 'Người phụ trách',
			align: 'center',
			headerAlign: 'center',
			flex: 1,
		},
		{
			field: 'taskCheckType',
			headerName: 'Loại',
			align: 'center',
			headerAlign: 'center',
			flex: 1,
		},
		{
			field: 'taskCheckStatus',
			headerName: 'Trạng thái',
			flex: 1,
			renderCell: (params: any) => (
				<ChipTaskCheckStatus status={params.row.taskCheckStatus} />
			),
		},
	]

	const handleFilter = (
		formattedStart: string | null,
		formattedEnd: string | null,
	) => {
		setParams((prev) => ({
			...prev,
			fromDate: formattedStart ? new Date(formattedStart) : new Date(),
			toDate: formattedEnd ? new Date(formattedEnd) : new Date(),
		}))
	}

	const filteredColumns = columns.filter(
		(col) =>
			!(
				mode === 'ticketView' &&
				(col.field === 'productName' || col.field === 'customerName')
			),
	)

	return (
		<>
			<Grid2 container direction='column' spacing={2}>
				<Grid2 container justifyContent={'space-between'}>
					<Stack direction='row' spacing={2}>
						<InputSearch
							onSearch={(searchText) => {
								setParams({ ...params, searchTerm: searchText })
							}}
						/>
						<DateFilter onFilter={handleFilter} />
					</Stack>
					{mode === 'ticketView' && (
						<Button
							variant='contained'
							color='success'
							component={Link}
							to={`/tasks/assignee/create/${param?.caseTaskId}`}
							size='small'
						>
							<Add />
						</Button>
					)}
				</Grid2>
				{isViewMode && (
					<Grid2 container spacing={2}>
						<Grid2>
							<InputSearch
								onSearch={(searchText) => {
									setParams({ ...params, searchTerm: searchText })
								}}
							/>
						</Grid2>
						<Grid2 width={150}>
							<FormControl fullWidth>
								<InputLabel id='status-filter-label'>Trạng thái</InputLabel>
								<Select
									labelId='status-filter-label' // Đã bỏ comment để liên kết đúng với InputLabel
									id='status-filter'
									value={filterStatus}
									label='Trạng thái'
									size='small'
									onChange={(e) => {
										const status = e.target.value
										setFilterStatus(status)
										setParams({
											...params,
											taskCheckStatus:
												status === '0'
													? undefined
													: (status as EnumStatusTaskCheck),
										})
									}}
								>
									<MenuItem value={'0'}>Tất cả</MenuItem>
									<MenuItem value={EnumStatusTaskCheck.CREATED}>
										Đã tạo
									</MenuItem>
									<MenuItem value={EnumStatusTaskCheck.WAITING}>
										Chờ duyệt
									</MenuItem>
									<MenuItem value={EnumStatusTaskCheck.DONE}>
										Hoàn Thành
									</MenuItem>
									<MenuItem value={EnumStatusTaskCheck.REJECTED}>
										Từ chối
									</MenuItem>
								</Select>
							</FormControl>
						</Grid2>
					</Grid2>
				)}
				<Grid2>
					<Box>
						<PaginatedDataGrid
							columns={filteredColumns}
							rows={taskChecks}
							totalCount={totalCount}
							setParams={setParams}
							rowSelection={false}
							loading={loading}
							disableRowSelectionOnClick
							checkboxSelection={false}
							initialTakeCount={params.takeCount}
						/>
					</Box>
				</Grid2>
			</Grid2>
			<PopupConfirm
				haveButtons={false}
				open={openPopupTemplateWarning}
				onClose={handleCloseTemplateWarning}
				onCancel={handleCloseTemplateWarning}
				onConfirm={handleCloseTemplateWarning}
				icon={<Warning fontSize='large' color='warning' />}
				message='Cảnh báo'
				subMessage='Không thể xem chi tiết vì task chưa lựa chọn loại phiếu'
				sx={{ width: 450 }}
			/>
		</>
	)
}

export default TaskCheckList
