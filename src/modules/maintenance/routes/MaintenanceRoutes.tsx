import SpinnerLoading from '@components/SpinerLoading'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

const DashBoardPage = React.lazy(
	() => import('../pages/dashBoard/DashBoardPage'),
)
const CustomerCreateUpdatePage = React.lazy(
	() => import('../pages/customer/CustomerCreateUpdatePage'),
)
const AdminAssigneePage = React.lazy(
	() => import('../pages/taskCheck/AdminAssigneePage'),
)
const CustomerListPage = React.lazy(
	() => import('../pages/customer/CustomerListPage'),
)
const CustomerDetailPage = React.lazy(
	() => import('../pages/customer/CustomerDetailPage'),
)
const ApprovalPage = React.lazy(() => import('../pages/approval/ApprovalPage'))
const ApprovalDetailPage = React.lazy(
	() => import('../pages/approval/ApprovalDetailPage'),
)

const TaskCheckDetailPage = React.lazy(
	() => import('../pages/taskCheck/TaskCheckDetailPage'),
)
const TaskCheckListPage = React.lazy(
	() => import('../pages/taskCheck/TaskCheckListPage'),
)
const TemplateCheckListCreateUpdatePage = React.lazy(
	() => import('../pages/templateCheckList/TemplateCheckListCreateUPdatePage'),
)
const TemplateCheckListPage = React.lazy(
	() => import('../pages/templateCheckList/TemplateCheckListPage'),
)
const DeviceTypeListPage = React.lazy(
	() => import('../pages/deviceType/DeviceTypeListPage'),
)
const DeviceTypeCreateUpdatePage = React.lazy(
	() => import('../pages/deviceType/DeviceTypeCreateUpdatePage'),
)
const DeviceGroupListPage = React.lazy(
	() => import('../pages/deviceGroup/DeviceGroupListPage'),
)
const DeviceGroupCreateUpdatePage = React.lazy(
	() => import('../pages/deviceGroup/DeviceGroupCreateUpdatePage'),
)
const DeviceSKUListPage = React.lazy(
	() => import('../pages/deviceSKU/DeviceSKUListPage'),
)
const DeviceSKUCreateUpdatePage = React.lazy(
	() => import('../pages/deviceSKU/DeviceSKUCreateUpdatePage'),
)
const DeviceModelListPage = React.lazy(
	() => import('../pages/deviceModel/DeviceModelListPage'),
)
const DeviceModelCreateUpdatePage = React.lazy(
	() => import('../pages/deviceModel/DeviceModelCreateUpdatePage'),
)
const DeviceListPage = React.lazy(
	() => import('../pages/device/DeviceListPage'),
)
const DeviceCreateUpdatePage = React.lazy(
	() => import('../pages/device/DeviceCreateUpdatePage'),
)
const DeviceDetailPage = React.lazy(
	() => import('../pages/device/DeviceDetailPage'),
)
const DeviceActionPage = React.lazy(
	() => import('../pages/device/DeviceActionPage'),
)
const PartCategoryListPage = React.lazy(
	() => import('../pages/partCategory/PartCategoryListPage'),
)
const PartCategoryCreateUpdatePage = React.lazy(
	() => import('../pages/partCategory/PartCategoryCreateUpdatePage'),
)
const PartTypeListPage = React.lazy(
	() => import('../pages/partType/PartTypeListPage'),
)
const PartTypeCreateUpdatePage = React.lazy(
	() => import('../pages/partType/PartTypeCreateUpdatePage'),
)
const PartGroupListPage = React.lazy(
	() => import('../pages/partGroup/PartGroupListPage'),
)
const PartGroupCreateUpdatePage = React.lazy(
	() => import('../pages/partGroup/PartGroupCreateUpdatePage'),
)
const PartSKUListPage = React.lazy(
	() => import('../pages/partSKU/PartSKUListPage'),
)
const PartSKUCreateUpdatePage = React.lazy(
	() => import('../pages/partSKU/PartSKUCreateUpdatePage'),
)
const PartDetailListPage = React.lazy(
	() => import('../pages/partDetail/PartDetailListPage'),
)
const PartDetailCreateUpdatePage = React.lazy(
	() => import('../pages/partDetail/PartDetailCreateUpdatePage'),
)
const CaseListPage = React.lazy(() => import('../pages/case/CaseListPage'))
const CaseCreateUpdatePage = React.lazy(
	() => import('../pages/case/CaseCreateUpdatePage'),
)
const CaseDetailPage = React.lazy(() => import('../pages/case/CaseDetailPage'))
const TaskCheckCreatePage = React.lazy(
	() => import('../pages/taskCheck/TaskCheckCreatePage'),
)

const MaintenanceRoutes = () => (
	<Routes>
		{/* <Route
      path="/"
      element={
        <React.Suspense fallback={<SpinnerLoading />}>
          <NotificationWindow />
        </React.Suspense>
      }
    /> */}
		<Route
			path='/'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DashBoardPage />
					{/* <ProductListDetailPage /> */}
				</React.Suspense>
			}
		/>

		<Route
			path='/approval'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<ApprovalPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/approval/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<ApprovalDetailPage />
				</React.Suspense>
			}
		/>
		{/* survey */}
		<Route
			path='/template-check-list'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<TemplateCheckListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/template-check-list/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<TemplateCheckListCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/template-check-list/create/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<TemplateCheckListCreateUpdatePage />
				</React.Suspense>
			}
		/>

		{/* taskCheck */}
		<Route
			path='/task-check'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<TaskCheckListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/task-check/detail/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<TaskCheckDetailPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/customer'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CustomerListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/customer/detail/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CustomerDetailPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/customer/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CustomerCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/customer/create/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CustomerCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/assignee'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<AdminAssigneePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-types'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceTypeListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-types/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceTypeCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-types/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceTypeCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-groups'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceGroupListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-groups/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceGroupCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-groups/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceGroupCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-SKUs'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceSKUListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-SKUs/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceSKUCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-SKUs/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceSKUCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-models'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceModelListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-models/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceModelCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/device-models/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceModelCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/devices'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/devices/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceDetailPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/devices/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceActionPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/devices/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<DeviceCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-categories'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartCategoryListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-categories/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartCategoryCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-categories/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartCategoryCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-types'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartTypeListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-types/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartTypeCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-types/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartTypeCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-groups'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartGroupListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-groups/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartGroupCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-groups/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartGroupCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-SKUs'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartSKUListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-SKUs/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartSKUCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-SKUs/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartSKUCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-details'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartDetailListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-details/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartDetailCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-details/create/device/:deviceId'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartDetailCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/part-details/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<PartDetailCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/cases'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CaseListPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/cases/create'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CaseCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/cases/update/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CaseCreateUpdatePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/cases/detail/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<CaseDetailPage />
				</React.Suspense>
			}
		/>
		<Route
			path='/tasks/assignee'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<AdminAssigneePage />
				</React.Suspense>
			}
		/>
		<Route
			path='/tasks/assignee/create/:id'
			element={
				<React.Suspense fallback={<SpinnerLoading />}>
					<TaskCheckCreatePage />
				</React.Suspense>
			}
		/>
	</Routes>
)

export default MaintenanceRoutes
