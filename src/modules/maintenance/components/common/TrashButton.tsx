import { Button } from '@mui/material'
import { GridDeleteIcon } from '@mui/x-data-grid'
import React from 'react'
interface Props {
	onClick: (isDeleted: boolean) => void
}
const TrashButton: React.FC<Props> = ({ onClick }) => {
	const [isDeleted, setIsDeleted] = React.useState(true)

	const handleToggle = () => {
		onClick(isDeleted)
		setIsDeleted(!isDeleted)
	}

	return (
		<Button
			onClick={handleToggle}
			endIcon={isDeleted ? <GridDeleteIcon /> : null}
			variant='contained'
			color='primary'
			size='small'
		>
			{!isDeleted ? 'Trở lại' : 'Gỡ bỏ'}
		</Button>
	)
}

export default TrashButton
