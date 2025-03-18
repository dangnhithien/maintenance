import SearchIcon from '@mui/icons-material/Search'
import { InputAdornment, Stack, TextField } from '@mui/material'
import React, { useEffect, useRef, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

export interface Props {
	onSearch: (data: string) => void
}

interface FormData {
	searchText: string
}

const InputSearch: React.FC<Props> = ({ onSearch }) => {
	const { register, handleSubmit, watch } = useForm<FormData>()
	const searchText = watch('searchText', '').trim() // Trim để loại bỏ khoảng trắng dư thừa
	const debounceRef = useRef<NodeJS.Timeout | null>(null)
	const [prevSearch, setPrevSearch] = useState('') // Lưu giá trị tìm kiếm trước đó

	// ✅ Debounce tránh gọi API liên tục
	const debounceSearch = useCallback(() => {
		if (debounceRef.current) clearTimeout(debounceRef.current)

		debounceRef.current = setTimeout(() => {
			if (searchText !== prevSearch) {
				// 🔥 Chỉ gọi API nếu giá trị thực sự thay đổi
				setPrevSearch(searchText)
				onSearch(searchText)
			}
		}, 500)
	}, [searchText, prevSearch, onSearch])

	useEffect(() => {
		debounceSearch()
		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current)
		}
	}, [debounceSearch])

	const onSubmit = (data: FormData) => {
		const trimmedSearch = data.searchText.trim()
		if (trimmedSearch !== prevSearch) {
			// 🔥 Tránh gọi API nếu giá trị không thay đổi
			setPrevSearch(trimmedSearch)
			onSearch(trimmedSearch)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Stack direction='row' alignItems='center' sx={{ width: 250 }}>
				<TextField
					size='medium'
					fullWidth
					{...register('searchText')}
					placeholder='Tìm kiếm thông tin'
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							e.preventDefault()
							handleSubmit(onSubmit)()
						}
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position='start'>
								<SearchIcon color='action' fontSize='small' />
							</InputAdornment>
						),
						sx: { height: '40px', fontSize: '14px', padding: '4px 8px' },
					}}
					sx={{
						backgroundColor: 'white',
						borderRadius: '16px',
						'& .MuiOutlinedInput-root': {
							borderRadius: '16px',
							fontSize: '14px',
							height: '40px',
						},
						'& .MuiOutlinedInput-notchedOutline': { borderColor: '#ccc' },
						'&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#999' },
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: '#1976d2',
						},
					}}
				/>
			</Stack>
		</form>
	)
}

export default InputSearch
