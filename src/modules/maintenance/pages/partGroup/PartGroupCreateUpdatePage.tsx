import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartGroupCreateUpdate from '@modules/maintenance/components/partGroup/PartGroupCreateUpdate'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
const page = {
	title: 'Tạo mới nhóm thành phần',
	url: '/part-groups',
	component: <PartGroupCreateUpdate />,
}
const PartGroupCreateUpdatePage = () => {
	const { id } = useParams()
	return (
		<>
			<Helmet>
				<title>{page.title}</title>
				<meta name='description' content={page.title} />
			</Helmet>
			<Wrapper title={page.title}>
				<PartGroupCreateUpdate id={id} />
			</Wrapper>
		</>
	)
}

export default PartGroupCreateUpdatePage
