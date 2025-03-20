import FrameVMS from '@components/FrameVMS'
import SpinnerLoading from '@components/SpinerLoading'
import CaseDetail from '@modules/maintenance/components/case/CaseDetail'
import PopupConfirm from '@modules/maintenance/components/common/PopupConfirm'
import Wrapper from '@modules/maintenance/components/common/Wrapper'
import TaskCheckList from '@modules/maintenance/components/taskCheck/TaskCheckList'
import { EnumStatusTicket } from '@modules/maintenance/datas/enum/EnumStatusTicketCheck'
import useCase from '@modules/maintenance/hooks/useCase'
import { getStatusButtonText } from '@modules/maintenance/utils/getButtonTextByStatus'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import { Button } from '@mui/material'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'

const CaseDetailPage = () => {
	const { id } = useParams()
	const [openConfirm, setOpenConfirm] = useState(false)
	const { getCaseById, approveCase, loading } = useCase()
	const { data: caseDetail, isLoading } = getCaseById(id || '', {
		includeProperties: 'CaseType,Customer',
	})

	const handleStatusTicketAction = () => {
		if (!id) return
		setOpenConfirm(true)
	}

	const handleConfirm = () => {
		if (!id) return
		if (caseDetail!.caseTaskStatus === EnumStatusTicket.WAITING) {
			//TODO: Confirm case
		} else if (caseDetail!.caseTaskStatus === EnumStatusTicket.CREATED) {
			approveCase(id)
		}
		setOpenConfirm(false)
	}

	const handleCancel = () => {
		setOpenConfirm(false)
	}

	if (isLoading) {
		return <SpinnerLoading />
	}

	return (
		<>
			<Helmet>
				<title>Chi tiết Tikcet</title>
				<meta name='description' content='Chi tiết Ticket' />
			</Helmet>
			<Wrapper title=''>
				<FrameVMS
					title='Chi tiết Ticket'
					icon={<ManageSearchIcon />}
					action={
						caseDetail?.caseTaskStatus !== EnumStatusTicket.CLOSED &&
						caseDetail?.caseTaskStatus !== EnumStatusTicket.CANCEL && (
							<Button
								onClick={handleStatusTicketAction}
								variant='outlined'
								color='primary'
								loading={loading}
							>
								{getStatusButtonText(caseDetail?.caseTaskStatus)}
							</Button>
						)
					}
				>
					{caseDetail && <CaseDetail data={caseDetail} />}
				</FrameVMS>
			</Wrapper>
			<Wrapper title='Danh sách task' sx={{ mt: 2 }}>
				<TaskCheckList
					param={{ caseTaskId: id, takeCount: 3 }}
					mode='ticketView'
				/>
			</Wrapper>
			<PopupConfirm
				open={openConfirm}
				message='Bạn có chắc chắn muốn cập nhật trạng thái không?'
				subMessage='Hành động này không thể hoàn tác.'
				onClose={handleCancel}
				onCancel={handleCancel}
				onConfirm={handleConfirm}
				isLoading={loading}
			/>
		</>
	)
}

export default CaseDetailPage
