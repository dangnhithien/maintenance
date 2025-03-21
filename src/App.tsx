import TheLayout from '@components/Layout'
import RequireAuth from '@components/RequireAuth'
import { NoistackProvider } from '@modules/maintenance/components/common/Notistack'
import { createTheme, ThemeProvider } from '@mui/material'
import AllRoutes from './routes/AllRoutes'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import RequireGuest from '@components/RequireGuest'
import Login from '@modules/login/pages/Login'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { de } from 'date-fns/locale/de'

const mdTheme = createTheme({
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					padding: '7px 10px !important',
					minWidth: '0px',
				},
				containedPrimary: {
					color: 'white', // Màu chữ ghi đè
					backgroundColor: '#10428E', // Màu nền ghi đè
				},
				containedSecondary: {
					color: '#24416F', // Màu chữ ghi đè
					backgroundColor: '#C3D5F1', // Màu nền ghi đè
					':hover': {
						color: '#24416F', // Màu chữ ghi đè
						backgroundColor: '#EBF1FA', // Màu nền ghi đè
					},
				},
				containedSuccess: {
					color: 'white', // Màu chữ ghi đè
					backgroundColor: '#0ABF06', // Màu nền ghi đè
					':hover': {
						color: 'white', // Màu chữ ghi đè
						backgroundColor: '#109e0e', // Màu nền ghi đè
					},
				},
			},
		},
	},
	typography: {
		button: {
			textTransform: 'none',
			boxShadow: 'none',
		},
	},
	palette: {
		primary: {
			main: '#10428E', // Màu primary mà bạn muốn áp dụng
		},
		info: {
			main: '#648CC8',
		},
	},
})

function App() {
	return (
		<ThemeProvider theme={mdTheme}>
			<LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
				<NoistackProvider>
					<Suspense fallback={<div>Loading...</div>}>
						<Routes>
							<Route
								path='/login'
								element={
									<RequireGuest redirectTo='/'>
										<Login />
									</RequireGuest>
								}
							/>
							<Route
								path='/*'
								element={
									<RequireAuth redirectTo='/login'>
										<TheLayout>
											<AllRoutes />
										</TheLayout>
									</RequireAuth>
								}
							/>
						</Routes>
					</Suspense>
				</NoistackProvider>
			</LocalizationProvider>
		</ThemeProvider>
	)
}

export default App
