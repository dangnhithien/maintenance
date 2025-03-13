import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartCategoryCreateUpdate from '@modules/maintenance/components/partCategory/PartCategoryCreateUpdate'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const page = {
	title: 'Tạo mới danh mục thành phần',
	url: '/part-categories',
	component: <PartCategoryCreateUpdate />,
}
const PartCategoryCreateUpdatePage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>
			<Wrapper title={page.title}>
				<PartCategoryCreateUpdate id={id} />
			</Wrapper>
		</>
	)
}

export default PartCategoryCreateUpdatePage
