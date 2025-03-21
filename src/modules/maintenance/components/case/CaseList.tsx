import PaginatedDataGrid from '@components/PaginationDatagrid'
import { ICaseGet } from '@modules/maintenance/datas/case/ICaseGet'
import useCase from '@modules/maintenance/hooks/useCase'
import { Add, Warning } from '@mui/icons-material'
import RestoreIcon from '@mui/icons-material/Restore'
import { Button, Divider, Grid2, Stack, Tooltip } from '@mui/material'
import {
	GridColDef,
	GridDeleteIcon,
	GridRowSelectionModel,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import InputSearch from '../common/InputSearch'
import { useNotification } from '../common/Notistack'
import PopupConfirm from '../common/PopupConfirm'
import TrashButton from '../common/TrashButton'
import DateFilter from '@components/DateFilter'
import ChipTicketStatus from '../common/chip/ChipTicketStatus'
interface Props {
	isViewMode?: boolean
}
const CaseList: React.FC<Props> = ({ isViewMode = false }) => {
	const [openPopupSoftDelete, setOpenPopupsoftDelete] = useState(false)
	const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false)
	const [openPopupApprove, setOpenPopupApprove] = useState(false)
	const [caseIdApprove, setCaseIdApprove] = useState('')
	const { notify } = useNotification()
	const [params, setParams] = useState<ICaseGet>({
		takeCount: 10,
		fromDate: undefined,
		toDate: undefined,
	})
	const [rowSelectionModel, setRowSelectionModel] =
		useState<GridRowSelectionModel>([])

	const {
		cases,
		deleteCase,
		restoreCase,
		fetchCases,
		approveCase,
		loading,
		totalCount,
	} = useCase()

	useEffect(() => {
		fetchCases(params)
	}, [params])

	const columns: GridColDef[] = [
		{
			field: 'code',
			headerName: 'Mã',
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<Link to={`/cases/detail/${params.row.id}`}>{params.row.code}</Link>
			),
		},
		{
			field: 'name',
			headerName: 'Tên',
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<Link to={`/cases/detail/${params.row.id}`}>
					<Tooltip title={params.row.name}>{params.row.name}</Tooltip>
				</Link>
			),
		},
		{
			field: 'customerCode',
			headerName: 'Khách hàng',
			// width: 300,
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<Link to={`/cases/detail/${params.row.id}`}>
					<Tooltip title={params.row.customerCode}>
						{params.row.customerCode}
					</Tooltip>
				</Link>
			),
		},
		{
			field: 'scheduledTime',
			headerName: 'Ngày tiến hành',
			// minWidth: 300,
			headerAlign: 'center',
			align: 'center',
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<span>
					{params.row.scheduledTime &&
						new Date(params.row.scheduledTime).toLocaleDateString('vi-VN', {
							day: '2-digit',
							month: '2-digit',
							year: 'numeric', // Để đảm bảo lấy đủ 4 số của năm (yyyy)
						})}
				</span>
			),
		},
		{
			field: 'action',
			headerName: 'Trạng thái',
			headerAlign: 'center',
			align: 'center',
			// minWidth: 300,
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<ChipTicketStatus status={params.row.caseTaskStatus} size='small' />
			),
		},
	]

	// const handleClickApprove = (id: string) => {
	// 	setCaseIdApprove(id)
	// 	setOpenPopupApprove(true)
	// }

	const handleApprove = async () => {
		await approveCase(caseIdApprove)
			.then(() => {
				notify('Xét duyệt thành công', 'success')
				setOpenPopupApprove(false)
				fetchCases(params)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const handleCancelSoftDelete = () => {
		setOpenPopupsoftDelete(false)
	}
	const handleCancelHardDelete = () => {
		setOpenPopupHardDelete(false)
	}

	const onSoftDelete = () => {
		if (rowSelectionModel.length > 0) {
			setOpenPopupsoftDelete(true)
		}
	}
	const onHardDelete = () => {
		if (rowSelectionModel.length > 0) {
			setOpenPopupHardDelete(true)
		}
	}
	const handelConfirmSoftDelete = async () => {
		await deleteCase({
			isHardDeleted: false,
			ids: rowSelectionModel as string[],
		})
			.then(() => {
				notify('success', 'success')
				setOpenPopupsoftDelete(false)
			})
			.catch(() => {})
	}

	const handleConfirmHardDelete = async () => {
		await deleteCase({
			isHardDeleted: true,
			ids: rowSelectionModel as string[],
		})
			.then(() => {
				notify('success', 'success')
				setOpenPopupHardDelete(false)
			})
			.catch(() => {})
	}
	const restore = async () => {
		await restoreCase(rowSelectionModel as string[])
			.then(() => {
				notify('success', 'success')
			})
			.catch(() => {})
	}
	const handleFilter = (
		formattedStart: string | null,
		formattedEnd: string | null,
	) => {
		setParams((prev) => ({
			...prev,
			...(formattedStart && { fromDate: new Date(formattedStart) }), // ✅ Chỉ cập nhật nếu có giá trị
			...(formattedEnd && { toDate: new Date(formattedEnd) }), // ✅ Chỉ cập nhật nếu có giá trị
		}))
	}

	return (
		<>
			<Grid2 container direction={'column'} spacing={2}>
				<Grid2 container justifyContent={'space-between'}>
					<Stack direction='row' spacing={2}>
						<InputSearch
							onSearch={(searchText) => {
								setParams({ ...params, searchTerm: searchText })
							}}
						/>
						<DateFilter onFilter={handleFilter} />
					</Stack>
					{!isViewMode && (
						<Grid2 container spacing={1}>
							<Button
								variant='contained'
								color='success'
								component={Link}
								to={'/cases/create'}
								size='small'
							>
								<Add />
							</Button>
							{/* {rowSelectionModel.length > 0 && (
								<Button
									variant='contained'
									color='error'
									onClick={params.isDeleted ? onHardDelete : onSoftDelete}
									size='small'
								>
									<GridDeleteIcon />
								</Button>
							)}
							{rowSelectionModel.length > 0 && params.isDeleted && (
								<Button
									variant='contained'
									color='primary'
									onClick={restore}
									size='small'
								>
									<RestoreIcon />
								</Button>
							)}

							<Divider draggable={false} orientation='vertical' flexItem />

							<TrashButton
								onClick={(isDeleted) =>
									setParams({ ...params, isDeleted: isDeleted })
								}
							/> */}
						</Grid2>
					)}
				</Grid2>
				<Grid2>
					<PaginatedDataGrid
						columns={columns}
						rows={cases}
						totalCount={totalCount}
						setParams={setParams}
						onRowSelectionModelChange={(newRowSelectionModel) => {
							setRowSelectionModel(newRowSelectionModel)
						}}
						loading={loading}
						initialTakeCount={params.takeCount}
					/>
				</Grid2>
			</Grid2>
			<PopupConfirm
				isLoading={loading}
				open={openPopupApprove}
				onClose={() => setOpenPopupApprove(false)}
				onCancel={() => setOpenPopupApprove(false)}
				onConfirm={() => handleApprove()}
				icon={<Warning fontSize='large' color='warning' />}
				message='Bạn có chắc chắn duyệt?'
				sx={{ width: 450 }}
			/>
			<PopupConfirm
				open={openPopupSoftDelete}
				onClose={() => setOpenPopupsoftDelete(false)}
				onCancel={handleCancelSoftDelete}
				onConfirm={handelConfirmSoftDelete}
				icon={<Warning fontSize='large' color='warning' />}
				message='Bạn có chắc chắn muốn xóa?'
				subMessage='Sau khi xoá, danh sách sẽ được chuyển vào thùng rác.'
				sx={{ width: 450 }}
			/>
			<PopupConfirm
				open={openPopupHardDelete}
				onClose={() => setOpenPopupHardDelete(false)}
				onCancel={handleCancelHardDelete}
				onConfirm={handleConfirmHardDelete}
				icon={<Warning fontSize='large' color='warning' />}
				message='Bạn có chắc chắn muốn xóa?'
				subMessage='Sau khi xoá danh sách sẽ biến mất vĩnh viễn!'
				sx={{ width: 450 }}
			/>
		</>
	)
}

export default CaseList
