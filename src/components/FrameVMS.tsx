import { Box, Stack, SvgIconProps, Typography } from '@mui/material'
import React from 'react'

interface Props {
	title: string
	icon: React.ReactElement<SvgIconProps>
	children: React.ReactNode
}
const FrameVMS: React.FC<Props> = ({ title, icon, children }) => {
	return (
		<Box
			sx={{
				width: '100%',
				border: '1px solid #E0E0E0',
				borderRadius: 2,
				padding: 2,
			}}
		>
			<Stack
				direction={'row'}
				alignItems={'center'}
				sx={{
					border: '1px solid #E0E0E0',
					borderRadius: 4,
					padding: 1.4,
					mb: 1.4,
				}}
				gap={1}
			>
				<Box
					sx={{
						backgroundColor: '#EBF1FA',
						borderRadius: 1,
						padding: 0.7,
						width: 24,
						height: 24,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{React.cloneElement(icon, {
						sx: { color: '#648CC8', fontSize: 18 },
					})}
				</Box>
				<Typography variant='body1' color='primary' fontWeight={600}>
					{title}
				</Typography>
			</Stack>
			{children}
		</Box>
	)
}

export default FrameVMS
