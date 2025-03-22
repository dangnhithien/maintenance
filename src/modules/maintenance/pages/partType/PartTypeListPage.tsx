import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartTypeList from '@modules/maintenance/components/partType/PartTypeList'
import { Helmet } from 'react-helmet'
const page = {
	title: 'Danh sách loại thành phần',
	url: '/part-types',
	component: <PartTypeList />,
}
const PartTypeListPage = () => {
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>

			<Wrapper title={page.title}>{page.component}</Wrapper>
		</>
	)
}

export default PartTypeListPage
