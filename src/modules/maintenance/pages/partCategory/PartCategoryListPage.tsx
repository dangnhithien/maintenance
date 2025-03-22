import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartCategoryList from '@modules/maintenance/components/partCategory/PartCategoryList'
import { Helmet } from 'react-helmet'
const page = {
	title: 'Danh mục thành phần',
	url: '/part-categories',
	component: <PartCategoryList />,
}
const PartCategoryListPage = () => {
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

export default PartCategoryListPage
