import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import React from 'react'

interface IDeviceAttribute {
	id: string
	attributeName: string
	value: string
}
const DeviceAttributeTable: React.FC<{ data: IDeviceAttribute[] }> = ({
	data,
}) => {
	return (
		<>
			<TableContainer
				component={Paper}
				sx={{ mt: 2, maxHeight: 340, overflow: 'auto' }}
			>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell
								sx={{
									fontWeight: 'bold',
									backgroundColor: '#648CC8',
									color: 'white',
								}}
							>
								STT
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 'bold',
									backgroundColor: '#648CC8',
									color: 'white',
								}}
							>
								Thông số
							</TableCell>
							<TableCell
								sx={{
									fontWeight: 'bold',
									backgroundColor: '#648CC8',
									color: 'white',
								}}
							>
								Giá trị
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((item, index) => (
							<TableRow key={item.id}>
								<TableCell>{index + 1}</TableCell>
								<TableCell>{item.attributeName}</TableCell>
								<TableCell>{item.value || '-'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	)
}

export default DeviceAttributeTable
