import PaginatedDataGrid from '@components/PaginationDatagrid'
import { GetCustomerDto } from '@modules/maintenance/datas/customer/GetCustomerDto'
import useCustomer from '@modules/maintenance/hooks/useCustomer'
import { Add, Warning } from '@mui/icons-material'
import RestoreIcon from '@mui/icons-material/Restore'
import { Button, Divider, Grid2 } from '@mui/material'
import {
	GridColDef,
	GridDeleteIcon,
	GridRowSelectionModel,
} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import InputSearch from '../common/InputSearch'
import { useNotification } from '../common/Notistack'
import PopupConfirm from '../common/PopupConfirm'
import TrashButton from '../common/TrashButton'
interface Props {
	isViewMode?: boolean
}
const CustomerList: React.FC<Props> = ({ isViewMode = false }) => {
	const [openPopupSoftDelete, setOpenPopupsoftDelete] = useState(false)
	const [openPopupHardDelete, setOpenPopupHardDelete] = useState(false)
	const { notify } = useNotification()
	const location = useLocation()
	const [params, setParams] = useState<GetCustomerDto>({
		takeCount: 10,
	})
	const [rowSelectionModel, setRowSelectionModel] =
		useState<GridRowSelectionModel>([])

	const {
		customers,
		deleteCustomer,
		restoreCustomer,
		fetchCustomers,
		error,
		loading,
		totalCount,
	} = useCustomer(params)

	useEffect(() => {
		fetchCustomers(params)
	}, [params])

	const columns: GridColDef[] = [
		// { field: "id", headerName: "ID", width: 90, editable: false, sortable: false },
		{
			field: 'code',
			headerName: 'Mã',
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<Link to={`/customer/detail/${params.row.id}`}>{params.row.code}</Link>
			),
		},
		{
			field: 'name',
			headerName: 'Tên biểu mẫu ',
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<Link to={`/customer/detail/${params.row.id}`}>{params.row.name}</Link>
			),
		},

		{
			field: 'createdDate',
			headerName: 'Ngày tạo',
			minWidth: 300,
			editable: false,
			sortable: false,
			flex: 1,
			renderCell: (params: any) => (
				<span>
					{params.row.createdDate &&
						new Date(params.row.createdDate).toLocaleDateString('vi-VN', {
							day: '2-digit',
							month: '2-digit',
							year: '2-digit',
						})}
				</span>
			),
		},
	]

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
		await deleteCustomer({
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
		await deleteCustomer({
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
		await restoreCustomer(rowSelectionModel as string[])
			.then(() => {
				notify('success', 'success')
			})
			.catch(() => {})
	}
	return (
		<>
			<Grid2 container direction={'column'} spacing={2}>
				<Grid2 container justifyContent={'space-between'}>
					<InputSearch
						onSearch={(searchText) => {
							setParams((prev) => {
								if (prev.searchTerm === searchText) return prev // 🔥 Không thay đổi nếu giá trị giống nhau
								return { ...prev, searchTerm: searchText }
							})
						}}
					/>

					{!isViewMode && (
						<Grid2 container spacing={1}>
							<Button
								variant='contained'
								color='success'
								component={Link}
								to={'/customer/create'}
								size='small'
							>
								<Add />
							</Button>
							{rowSelectionModel.length > 0 && (
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
							/>
						</Grid2>
					)}
				</Grid2>
				<Grid2>
					<PaginatedDataGrid
						columns={columns}
						rows={customers}
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

export default CustomerList
