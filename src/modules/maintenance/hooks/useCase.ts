import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import caseApi from '../apis/caseApi'
import { ICase } from '../datas/case/ICase'
import { ICaseCreate } from '../datas/case/ICaseCreate'
import { ICaseDelete } from '../datas/case/ICaseDelete'
import { ICaseGet } from '../datas/case/ICaseGet'

const KEY = 'Cases'
export const useCase = () => {
	const queryClient = useQueryClient()
	const [cases, setCases] = useState<ICase[]>([])
	const [totalCount, setTotalCount] = useState(0)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<null | string>(null)

	// Fetch function to be called manually
	const fetchCases = async (params: ICaseGet) => {
		setLoading(true)
		setError(null)
		try {
			const response = await caseApi.get(params)
			setCases(response?.result?.items || [])
			setTotalCount(response.result.totalCount)
		} catch (error) {
			const axiosError = error as AxiosError
			if (
				axiosError?.response?.status === 400 ||
				axiosError?.response?.status === 401
			) {
				setError('Unauthorized or bad request')
			} else {
				setError(axiosError.message)
			}
		} finally {
			setLoading(false)
		}
	}

	const getCaseById = (id: string, params?: any) => {
		return useQuery<ICase, AxiosError>({
			queryKey: [KEY, id], // Cache theo từng ID case
			queryFn: () => caseApi.getById(id, params).then((res) => res.result),
			enabled: !!id, // Chỉ gọi API khi có ID
		})
	}

	// Create a new checklist
	const createCase = useMutation({
		mutationFn: (newData: ICaseCreate) => caseApi.post(newData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [KEY] }) // Refresh list
		},
	})

	// Update a checklist
	const updateCase = useMutation({
		mutationFn: ({
			id,
			updatedData,
		}: {
			id: string
			updatedData: ICaseCreate
		}) => caseApi.update(id, updatedData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [KEY] })
		},
	})

	// Approve a checklist
	const approveCase = useMutation({
		mutationFn: (id: string) => caseApi.updateStatus(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [KEY] })
		},
	})

	// Delete a checklist
	const deleteCase = useMutation({
		mutationFn: (data: ICaseDelete) =>
			caseApi.delete(data.isHardDeleted, data.ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [KEY] })
		},
	})

	const restoreCase = useMutation({
		mutationFn: (ids: string[]) => caseApi.restore(ids),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [KEY] })
		},
	})

	return {
		fetchCases,
		getCaseById,
		createCase: createCase.mutateAsync,
		updateCase: updateCase.mutateAsync,
		approveCase: approveCase.mutateAsync,
		deleteCase: deleteCase.mutateAsync,
		restoreCase: restoreCase.mutateAsync,
		cases,
		totalCount,
		loading,
		error,
	}
}

export default useCase
