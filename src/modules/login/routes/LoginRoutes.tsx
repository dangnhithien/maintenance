import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const Login = lazy(() => import('../pages/Login'))

const LoginRoutes = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<Routes>
			<Route path='/login' element={<Login />} />
		</Routes>
	</Suspense>
)

export default LoginRoutes
