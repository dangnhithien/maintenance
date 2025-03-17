import LOGOVMS from '@assets/images/logo-vms.svg'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import GroupOutlined from '@mui/icons-material/GroupOutlined'
import DashboardIcon from '@mui/icons-material/Dashboard'
import WorkIcon from '@mui/icons-material/Work'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import SettingsIcon from '@mui/icons-material/Settings'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LogoutIcon from '@mui/icons-material/Logout'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import GroupsIcon from '@mui/icons-material/Groups'
import {
	Box,
	Collapse,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface MenuItem {
	id: string
	label: string
	icon?: React.ReactNode
	path?: string
	children?: MenuItem[]
}

const menuItems: MenuItem[] = [
	{
		id: 'overview',
		label: 'Tổng quan',
		icon: <DashboardIcon />,
		path: '/',
	},
	{
		id: 'cong-viec',
		label: 'Công việc',
		icon: <WorkIcon />,
		children: [
			{ id: 'case', label: 'Case', path: '/cases' },
			{ id: 'dieu-phoi', label: 'Điều phối', path: '/tasks/assignee' },
		],
	},
	{
		id: 'khach-hang',
		label: 'Khách hàng',
		icon: <GroupsIcon />,
		path: '/customer',
	},
	{
		id: 'nhan-vien',
		label: 'Nhân viên',
		icon: <GroupOutlined />,
		path: '/user',
	},
	{
		id: 'thiet-bi',
		label: 'Thiết bị',
		icon: <PrecisionManufacturingIcon />,
		path: '/devices',
	},
	{
		id: 'phieu',
		label: 'Phiếu',
		icon: <AssignmentIcon />,
		path: '/template-check-list',
	},
	{
		id: 'config',
		label: 'Cấu hình',
		icon: <SettingsIcon />,
		children: [
			{
				id: 'thiet-bi-config',
				label: 'Cấu hình thiết bị',
				children: [
					{
						id: 'loai-thiet-bi',
						label: 'Loại thiết bị',
						path: '/device-types',
					},
					{
						id: 'nhom-thiet-bi',
						label: 'Nhóm thiết bị',
						path: '/device-groups',
					},
					{ id: 'sku-thiet-bi', label: 'SKU thiết bị', path: '/device-SKUs' },
					{ id: 'doi-thiet-bi', label: 'Đời thiết bị', path: '/device-models' },
				],
			},
			{
				id: 'thanh-phan-config',
				label: 'Cấu hình thành phần',
				children: [
					{
						id: 'danh-muc-thanh-phan',
						label: 'Danh mục thành phần',
						path: '/part-categories',
					},
					{
						id: 'loai-thanh-phan',
						label: 'Loại thành phần',
						path: '/part-types',
					},
					{
						id: 'nhom-thanh-phan',
						label: 'Nhóm thành phần',
						path: '/part-groups',
					},
					{
						id: 'sku-thanh-phan',
						label: 'SKU thành phần',
						path: '/part-SKUs',
					},
				],
			},
		],
	},
]

interface SidebarProps {
	isCollapsed: boolean
	toggleSidebar: () => void
}

const drawerCollapsedWidth = 80
const drawerWidth = 250

const SidebarMenu: React.FC<SidebarProps> = ({
	isCollapsed,
	toggleSidebar,
}) => {
	const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({})
	const location = useLocation()
	const navigate = useNavigate()

	const toggleMenu = (menuId: string) => {
		setOpenMenus((prev) => ({
			...prev,
			[menuId]: !prev[menuId], // Toggle trạng thái mở menu con
		}))
	}

	const isItemActive = (item: MenuItem): boolean => {
		if (item.path) return location.pathname === item.path
		if (item.children) return item.children.some((child) => isItemActive(child)) // Kiểm tra sâu hơn
		return false
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
		window.location.href = '/login'
	}

	const renderMenuItems = (items: MenuItem[], level = 1) => {
		return items.map((item) => {
			const hasChildren = item.children && item.children.length > 0
			const isActive = isItemActive(item)

			return (
				<React.Fragment key={item.id}>
					<ListItemButton
						sx={{ pl: level * 2, justifyContent: 'center' }} // Tăng padding dựa trên cấp
						selected={isActive}
						onClick={() => {
							if (hasChildren) {
								toggleMenu(item.id) // Mở menu con
							} else if (item.path) {
								navigate(item.path)
							}
						}}
					>
						<ListItemIcon
							sx={{
								minWidth: isCollapsed ? 'unset' : 40, // Khi thu gọn, icon không chiếm khoảng trống lớn
								justifyContent: 'center',
								alignItems: 'center',
								display: 'flex',
								transition: 'min-width 0.3s ease-in-out',
								'& svg': {
									fontSize: 22, // Kích thước icon cố định
								},
							}}
						>
							{item.icon}
						</ListItemIcon>
						<ListItemText
							primary={item.label}
							primaryTypographyProps={{
								sx: {
									fontSize: '14px',
									fontWeight: isActive ? 'bold' : 'normal',
									whiteSpace: 'nowrap',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									color: isActive ? '#000' : '#999',
								},
							}}
							sx={{
								opacity: isCollapsed ? 0 : 1, // Ẩn hoàn toàn khi thu gọn
								maxWidth: isCollapsed ? 0 : '100%', // Không chiếm không gian
								transition:
									'max-width 0.3s ease-in-out, opacity 0.3s ease-in-out',
							}}
						/>
						{hasChildren &&
							!isCollapsed &&
							(openMenus[item.id] ? (
								<ArrowDropUpIcon />
							) : (
								<ArrowDropDownIcon />
							))}
					</ListItemButton>

					{hasChildren && (
						<Collapse
							in={openMenus[item.id] && !isCollapsed}
							timeout='auto'
							unmountOnExit
						>
							<List component='div' disablePadding>
								{renderMenuItems(item.children!, level + 1)}
							</List>
						</Collapse>
					)}
				</React.Fragment>
			)
		})
	}

	return (
		<div style={{ position: 'relative', height: '100vh' }}>
			{/* expand sidebar */}
			<IconButton
				onClick={toggleSidebar}
				sx={{
					position: 'absolute',
					top: 15,
					right: isCollapsed ? -45 : -15,
					backgroundColor: '#FFF',
					borderRadius: isCollapsed ? '0' : '8px',
					width: 32,
					height: 32,
					boxShadow: isCollapsed ? 'none' : '0px 4px 6px rgba(0,0,0,0.1)',
					zIndex: 2,
					'&:hover': { backgroundColor: '#F0F0F0' },
					transition:
						'right 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out',
				}}
			>
				{isCollapsed ? (
					<ArrowRightIcon sx={{ fontSize: 20, color: '#000000' }} />
				) : (
					<ChevronLeft sx={{ fontSize: 20, color: '#000000' }} />
				)}
			</IconButton>
			<Drawer
				variant='permanent'
				sx={{
					width: isCollapsed ? drawerCollapsedWidth : drawerWidth,
					flexShrink: 0,
					transition: 'width 0.3s ease-in-out',
					'& .MuiDrawer-paper': {
						width: isCollapsed ? drawerCollapsedWidth : drawerWidth,
						boxSizing: 'border-box',
						transition: 'width 0.3s ease-in-out',
						backgroundColor: '#FFF',
						color: '#333',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						zIndex: 1,
						height: '100%',
						overflow: 'hidden',
					},
				}}
			>
				{/* Logo */}
				<Box
					sx={{
						minHeight: 64,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						width: isCollapsed ? drawerCollapsedWidth : '100%',
						transition: 'width 0.3s ease-in-out',
						px: 2,
					}}
				>
					<img
						alt='Logo VMS'
						src={LOGOVMS}
						style={{
							width: 64,
							height: 64,
							transition: 'margin-left 0.3s ease-in-out',
						}}
					/>
				</Box>
				<Divider />
				{/* Danh sách menu */}
				<List sx={{ flex: 1, overflowY: 'auto' }}>
					{renderMenuItems(menuItems)}
				</List>
				<Divider />
				{/* Đăng xuất */}
				<List>
					<ListItemButton onClick={handleLogout}>
						<ListItemIcon
							sx={{
								color: '#000',
								minWidth: 40,
								justifyContent: 'center',
							}}
						>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText
							primary='Đăng xuất'
							sx={{
								fontSize: '14px',
								maxWidth: isCollapsed ? 0 : '100%',
								opacity: isCollapsed ? 0 : 1,
								whiteSpace: 'nowrap',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								transition:
									'max-width 0.3s ease-in-out, opacity 0.3s ease-in-out',
							}}
						/>
					</ListItemButton>
				</List>
			</Drawer>
		</div>
	)
}

export default SidebarMenu
