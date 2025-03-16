import { Navigate } from 'react-router-dom'

interface Props {
	children?: any
	redirectTo?: any
}

const RequireGuest = (props: Props) => {
	const { children, redirectTo } = props
	const userTokenString = localStorage.getItem('token')

	return userTokenString ? <Navigate to={redirectTo} /> : children
}

export default RequireGuest
