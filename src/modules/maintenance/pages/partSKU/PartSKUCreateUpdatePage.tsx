import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartSKUCreateUpdate from '@modules/maintenance/components/partSKU/PartSKUCreateUpdate'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const page = {
	title: 'Tạo mới SKU thành phần',
	url: '/part-SKUs',
	component: <PartSKUCreateUpdate />,
}
const PartSKUCreateUpdatePage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>
			<Wrapper title={page.title}>
				<PartSKUCreateUpdate id={id} />
			</Wrapper>
		</>
	)
}

export default PartSKUCreateUpdatePage
