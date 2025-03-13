import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartTypeCreateUpdate from '@modules/maintenance/components/partType/PartTypeCreateUpdate'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const page = {
	title: 'Tạo mới loại thành phần',
	url: '/part-types',
	component: <PartTypeCreateUpdate />,
}
const PartTypeCreateUpdatePage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>
			<Wrapper title={page.title}>
				<PartTypeCreateUpdate id={id} />
			</Wrapper>
		</>
	)
}

export default PartTypeCreateUpdatePage
