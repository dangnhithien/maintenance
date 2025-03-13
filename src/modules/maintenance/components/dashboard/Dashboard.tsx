import { ReactECharts } from '@components/ReactChart'
import { Grid2, Paper, Stack, Typography } from '@mui/material'
import * as echarts from 'echarts'

import {
	unwrapListReponse,
	unwrapObjectReponse,
} from '@datas/comon/ApiResponse'
import overviewApi from '@modules/maintenance/apis/overviewApi'
import { OverviewKeyMetricDto } from '@modules/maintenance/datas/overview/OverviewKeyMetricsDto'
import userApi from '@modules/user/apis/UserApi'
import { OverviewUser } from '@modules/user/datas/user/OverviewUser'
import { useEffect, useMemo, useState } from 'react'
import Wrapper from '../common/Wrapper'
import CustomerList from '../customer/CustomerList'
import TaskCheckOverview from '../taskCheck/components/TaskcheckOverview'
import TaskCheckList from '../taskCheck/TaskCheckList'

// Hàm tạo khoảng thời gian 7 ngày (3 ngày trước và 3 ngày sau ngày được chọn)
function getSevenDayRange(inputDate: string): { fromDate: Date; toDate: Date } {
	const date = new Date(inputDate)
	const fromDate = new Date(date)
	fromDate.setDate(date.getDate() - 3)
	const toDate = new Date(date)
	toDate.setDate(date.getDate() + 3)
	return { fromDate, toDate }
}

// Hàm tạo khoảng thời gian 1 ngày (từ ngày được chọn đến ngày kế tiếp)
function getOneDayRange(dateStr: string): { fromDate: Date; toDate: Date } {
	const fromDate = new Date(dateStr)
	const toDate = new Date(fromDate)
	toDate.setDate(fromDate.getDate())
	return { fromDate, toDate }
}

const MaintainedDevicesLineChart: React.FC = () => {
	const [keyMetric, setKeyMetric] = useState<OverviewKeyMetricDto>()
	const [userListTask, setUserListTask] = useState<OverviewUser[]>([])
	const [date, setDate] = useState<string>(
		new Date().toISOString().split('T')[0],
	)

	// Lấy số liệu key metrics cho ngày được chọn
	useEffect(() => {
		const selectedDate = new Date(date)
		overviewApi
			.getKeyMetric({ fromDate: selectedDate, toDate: selectedDate })
			.then(unwrapObjectReponse)
			.then(setKeyMetric)
			.catch((error) => {
				console.log(error)
			})
	}, [date])

	// Lấy danh sách task của người dùng cho khoảng 1 ngày
	useEffect(() => {
		const { fromDate, toDate } = getOneDayRange(date)
		userApi
			.getOverviewUserTask({ fromDate, toDate })
			.then(unwrapListReponse)
			.then(setUserListTask)
			.catch((error) => {
				console.log(error)
			})
	}, [date])

	// Dữ liệu cho pie chart (nếu cần sử dụng trong tương lai)
	const taskStatusData = [
		{ value: 40, name: 'Đã hoàn thành' },
		{ value: 25, name: 'Đang tiến hành' },
		{ value: 35, name: 'Chưa bắt đầu' },
	]

	const pieOption: echarts.EChartsOption = {
		tooltip: { trigger: 'item' },
		legend: {
			orient: 'vertical',
			left: 'left',
		},
		series: [
			{
				name: 'Trạng thái task',
				type: 'pie',
				radius: '50%',
				data: taskStatusData,
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
			},
		],
	}

	const userList = [
		{
			assigneeName: 'Nguyễn Văn A',
			totalTask: 6,
			totalTaskDone: 2,
			totalComponentReplaced: 1,
		},
		{
			assigneeName: 'Trần Thị B',
			totalTask: 6,
			totalTaskDone: 2,
			totalComponentReplaced: 2,
		},
		{
			assigneeName: 'Lê Văn C',
			totalTask: 5,
			totalTaskDone: 0,
			totalComponentReplaced: 0,
		},
		{
			assigneeName: 'Phạm Thị D',
			totalTask: 3,
			totalTaskDone: 1,
			totalComponentReplaced: 0,
		},
	]

	const barOption: echarts.EChartsOption = useMemo(
		() => ({
			tooltip: {
				trigger: 'axis',
			},
			legend: {
				data: [
					'Task được giao',
					'Task đã hoàn thành',
					'thành phần đã thay thế',
				],
				top: 0,
			},
			xAxis: {
				type: 'category',
				data: userList.map((employee) => employee.assigneeName),
				axisLabel: {
					fontSize: 9,
					rotate: 45, // Xoay nhãn trục x 45 độ
				},
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: 'Task được giao',
					type: 'bar',
					data: userList.map((employee) => employee.totalTask),

					itemStyle: {
						color: '#749fdf',
					},
				},
				{
					name: 'Task đã hoàn thành',
					type: 'bar',
					data: userList.map((employee) => employee.totalTaskDone),

					itemStyle: {
						color: '#aee8a1',
					},
				},
				{
					name: 'thành phần đã thay thế',
					type: 'bar',
					data: userList.map((employee) => employee.totalComponentReplaced),

					itemStyle: {
						color: '#ffc107', // Màu sắc ví dụ cho series này
					},
				},
			],
			grid: {
				top: '40px',
				left: '16px',
				right: '16px',
				bottom: '16px',
				containLabel: true,
			},
		}),
		[userListTask],
	)

	const cardPaperStyle = {
		p: 3,
		width: '100%',
		height: '100%',
	}

	const metrics = [
		{
			title: 'Tổng số thiết bị trong hệ thống',
			value: keyMetric?.totalProduct || 1192,
			subValue: keyMetric?.totalRFID || 50,
			subText: 'thiết bị đã gắn RFID',
		},
		{
			title: 'Thiết bị cần bảo trì hôm nay',
			value: keyMetric?.totalProductNeedToMaintenance || 20,
			subValue: keyMetric?.totalProductMaintenanced || 5,
			subText: 'thiết bị đã được bảo trì',
		},
		{
			title: 'Tổng số khách hàng',
			value: keyMetric?.totalCustomer || 495,
			subValue: keyMetric?.totalCustomerNeedMaintenance || 20,
			subText: 'khách hàng cần bảo trì hôm nay',
		},
		{
			title: 'Tổng số task kiểm tra hôm nay',
			value: keyMetric?.totalTaskCheck || 20,
			subValue: keyMetric?.totalTaskCheckDone || 5,
			subText: 'task đã hoàn thành',
		},
		// {
		//   title: "Tổng số nhân viên",
		//   value: keyMetric?.totalUser,
		//   subValue: keyMetric?.totalUserHaveTask,
		//   subText: "nhân viên có task hôm nay",
		// },
		// {
		//   title: "Task cần duyệt hôm nay",
		//   value: keyMetric?.totalTaskCheckNeedToApprove,
		//   subValue: keyMetric?.totalTaskCheckApproved,
		//   subText: "task đã được duyệt",
		// },
	]

	const pieChartOption: echarts.EChartsOption = {
		tooltip: {
			trigger: 'item',
		},
		legend: {
			bottom: 0, // Tăng khoảng cách từ đáy container đến legend
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: ['60%', '90%'],
				center: ['50%', '40%'], // Di chuyển biểu đồ lên trên để tạo khoảng cách với legend
				avoidLabelOverlap: false,
				label: {
					show: false,
					position: 'center',
				},
				labelLine: {
					show: false,
				},
				data: [
					{ value: 1048, name: 'Search' },
					{ value: 735, name: 'Direct' },
				],
			},
		],
		// Lưu ý: Thuộc tính grid không ảnh hưởng đến biểu đồ pie nên có thể bỏ qua hoặc xóa nếu không cần thiết.
	}

	return (
		<Grid2 container spacing={2}>
			{/* <Grid2 container size={12} mb={1}>
        <Typography variant="h5" color="primary" fontWeight="bold">
          Tổng quan
        </Typography>
        <TextField
          value={date}
          type="date"
          size="small"
          placeholder="Tìm kiếm"
          color="primary"
          onChange={(e) => setDate(e.target.value)}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            "& .MuiInputBase-input": {
              fontSize: "12px",
            },
          }}
          InputProps={{
            style: {
              borderRadius: "20px",
              fontSize: "12px",
            },
          }}
        />
      </Grid2> */}

			{/* Hàng 1: Metrics và Line Chart */}
			<Grid2 size={12} container spacing={2} alignItems='center'>
				<Grid2 size={12} container spacing={2}>
					{metrics.map((metric, index) => (
						<Grid2 key={index} size={3}>
							<Paper sx={cardPaperStyle} variant='outlined'>
								<Typography
									variant='caption'
									sx={{ color: '#555', fontWeight: 500 }}
								>
									{metric.title}
								</Typography>
								<Typography
									variant='h5'
									sx={{ color: '#333', fontWeight: 'bold' }}
								>
									{metric.value || 0}
								</Typography>
								<Typography
									variant='overline'
									sx={{ mt: 2 }}
									color='success'
									fontWeight='bold'
									mr={0.5}
									fontSize={14}
								>
									{metric.subValue || 0}
								</Typography>
								<Typography variant='caption' sx={{ color: '#888', mt: 1 }}>
									{metric.subText}
								</Typography>
							</Paper>
						</Grid2>
					))}
				</Grid2>
				{/* <Grid2 container size={12} sx={{ height: "100%" }}>
          <Wrapper
            title="Theo dõi bảo trì thiết bị"
            sx={{ height: "100%", width: "100%" }}
          >
            <LineChartProduct params={getSevenDayRange(date)} />
          </Wrapper>
        </Grid2> */}
			</Grid2>

			{/* Hàng 2: Biểu đồ cột theo dõi task */}
			<Grid2 container size={12}>
				<Grid2 size={8}>
					<Wrapper title='Theo dõi công việc bảo trì'>
						<ReactECharts
							option={barOption}
							style={{ height: '300px', width: '100%' }}
						/>
					</Wrapper>
				</Grid2>
				<Grid2 size={2}>
					<Paper sx={cardPaperStyle} variant='outlined'>
						<Stack direction='column' sx={{ height: '100%' }}>
							<div>
								<Typography
									variant='caption'
									sx={{ color: '#555', fontWeight: 500 }}
								>
									Số task phát sinh
								</Typography>
								<Typography
									variant='h5'
									sx={{ color: '#333', fontWeight: 'bold' }}
								>
									0
								</Typography>
								<Typography
									variant='overline'
									sx={{ mt: 2 }}
									color='success'
									fontWeight='bold'
									mr={0.5}
									fontSize={14}
								>
									0
								</Typography>
								<Typography variant='caption' sx={{ color: '#888', mt: 1 }}>
									Số task đã hoàn thành
								</Typography>
							</div>
							{/* Sử dụng marginTop: 'auto' để đẩy biểu đồ xuống dưới */}
							<div style={{ marginTop: 'auto' }}>
								<ReactECharts
									option={pieChartOption}
									style={{ height: '230px', width: '100%' }}
								/>
							</div>
						</Stack>
					</Paper>
				</Grid2>

				<Grid2 size={2}>
					<Paper sx={cardPaperStyle} variant='outlined'>
						<Typography
							variant='caption'
							sx={{ color: '#555', fontWeight: 500 }}
						>
							Tổng số nhân viên viên
						</Typography>
						<Typography variant='h5' sx={{ color: '#333', fontWeight: 'bold' }}>
							4
						</Typography>
						<Typography
							variant='overline'
							sx={{ mt: 2 }}
							color='success'
							fontWeight='bold'
							mr={0.5}
							fontSize={14}
						>
							4
						</Typography>
						<Typography variant='caption' sx={{ color: '#888', mt: 1 }}>
							Số nhân viên có task trong hôm nay
						</Typography>
						<ReactECharts
							option={pieChartOption}
							style={{ height: '230px', width: '100%' }}
						/>
					</Paper>
				</Grid2>
			</Grid2>
			{/* Hàng 2: Biểu đồ cột theo dõi task */}
			<Grid2 container size={12}>
				<Grid2 size={12}>
					<Wrapper title='Danh sách khách hàng'>
						<CustomerList isViewMode={true} />
					</Wrapper>
				</Grid2>
			</Grid2>
			{/* Hàng 2: Biểu đồ cột theo dõi task */}
			<Grid2 container size={12}>
				<Grid2 size={12}>
					<Wrapper title='Theo dõi kĩ thuật bảo trì'>
						<CustomerList isViewMode={true} />
					</Wrapper>
				</Grid2>
			</Grid2>

			{/* Hàng 3: Danh sách task cần duyệt và Task Check Overview */}
			<Grid2 size={12} container spacing={2}>
				<Grid2 size={8}>
					<Wrapper title='Danh sách task'>
						<TaskCheckList isViewMode={false} />
					</Wrapper>
				</Grid2>
				<Grid2 size={4}>
					<Wrapper title='Tình trạng task'>
						<TaskCheckOverview param={getOneDayRange(date)} />
					</Wrapper>
				</Grid2>
			</Grid2>
		</Grid2>
	)
}

export default MaintainedDevicesLineChart
