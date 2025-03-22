import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartSKUList from '@modules/maintenance/components/partSKU/PartSKUList'
import { Helmet } from 'react-helmet'
const page = {
	title: 'Danh sách SKU thành phần',
	url: '/part-SKUs',
	component: <PartSKUList />,
}
const PartSKUListPage = () => {
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

export default PartSKUListPage
