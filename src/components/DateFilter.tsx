import React, { useState } from 'react'
import { Button, Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { format } from 'date-fns'
import { de } from 'date-fns/locale/de'

export interface IFilterDate {
	fromDate: Date
	toDate: Date
}

interface DateFilterProps {
	onFilter: (formattedStart: string | null, formattedEnd: string | null) => void
}

const DateFilter: React.FC<DateFilterProps> = ({ onFilter }) => {
	const [startDate, setStartDate] = useState<Date | null>(null)
	const [endDate, setEndDate] = useState<Date | null>(null)

	const handleApply = () => {
		const formattedStart = startDate ? format(startDate, 'yyyy-MM-dd') : null
		const formattedEnd = endDate ? format(endDate, 'yyyy-MM-dd') : null
		onFilter(formattedStart, formattedEnd)
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
			<Box display='flex' alignItems='center' gap={2}>
				<DatePicker
					label='Từ ngày'
					value={startDate}
					onChange={(newValue) => setStartDate(newValue)}
					slotProps={{ textField: { size: 'small' } }}
				/>

				<DatePicker
					label='Đến ngày'
					value={endDate}
					onChange={(newValue) => setEndDate(newValue)}
					slotProps={{ textField: { size: 'small' } }}
				/>

				<Button variant='contained' color='primary' onClick={handleApply}>
					Áp dụng
				</Button>
			</Box>
		</LocalizationProvider>
	)
}

export default DateFilter
