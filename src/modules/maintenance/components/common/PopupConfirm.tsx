import {
	Box,
	Button,
	Divider,
	Modal,
	Stack,
	SxProps,
	Theme,
	Typography,
} from '@mui/material'
import { ReactNode } from 'react'

interface PopupProps {
	isLoading?: boolean
	open: boolean
	message: string
	subMessage?: string
	icon?: ReactNode
	onClose: () => void
	onCancel: () => void
	onConfirm: () => void
	sx?: SxProps<Theme>
	haveButtons?: boolean
}

const PopupConfirm = ({
	isLoading,
	open,
	message,
	subMessage,
	icon,
	onClose,
	onCancel,
	onConfirm,
	sx,
	haveButtons = true,
}: PopupProps) => {
	const modalStyle = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 2,
		borderRadius: 1,
		borderTop: (theme: Theme) => `10px solid ${theme.palette.primary.main}`,
		...sx,
	} as SxProps<Theme>

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby='popup-modal'
			aria-describedby='popup-modal-description'
		>
			<Box sx={modalStyle}>
				{icon && (
					<Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
						{icon}
					</Box>
				)}

				<Typography
					variant='h6'
					component='h2'
					textAlign='center'
					mb={1}
					color='primary'
					fontWeight='bold'
				>
					{message}
				</Typography>

				{subMessage && (
					<Typography
						variant='body2'
						color='text.secondary'
						textAlign='center'
						mb={3}
					>
						{subMessage}
					</Typography>
				)}
				{haveButtons && (
					<>
						{subMessage && <Divider sx={{ mb: 2, width: '100%' }} />}
						<Stack direction='row' spacing={2} justifyContent='flex-end' mt={2}>
							<Button variant='text' onClick={onCancel}>
								Đóng
							</Button>
							<Button
								variant='contained'
								onClick={onConfirm}
								color='primary'
								loading={isLoading}
							>
								Xác nhận
							</Button>
						</Stack>
					</>
				)}
			</Box>
		</Modal>
	)
}

export default PopupConfirm
