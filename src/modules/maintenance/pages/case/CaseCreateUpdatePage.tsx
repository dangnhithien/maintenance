import CaseCreateUpdate from '@modules/maintenance/components/case/CaseCreateUpdate'
import Wrapper from '@modules/maintenance/components/common/Wrapper'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const CaseCreateUpdatePage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>Tạo ticket mới</title>
				<meta name='description' content='Create a new device' />
			</Helmet>
			<Wrapper>
				<CaseCreateUpdate id={id} />
			</Wrapper>
		</>
	)
}

export default CaseCreateUpdatePage
