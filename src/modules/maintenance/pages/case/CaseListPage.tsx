import CaseList from '@modules/maintenance/components/case/CaseList'
import Wrapper from '@modules/maintenance/components/common/Wrapper'
import { Helmet } from 'react-helmet'

const CaseListPage = () => {
	return (
		<>
			<Helmet>
				<title>Danh sách ticket</title>
				<meta name='description' content='Danh sách ticket' />
			</Helmet>
			<Wrapper title='Danh sách ticket'>
				<CaseList />
			</Wrapper>
		</>
	)
}

export default CaseListPage
