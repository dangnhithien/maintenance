import Wrapper from '@modules/maintenance/components/common/Wrapper'
import PartGroupList from '@modules/maintenance/components/partGroup/PartGroupList'
import { Helmet } from 'react-helmet'
const page = {
	title: 'Danh sách nhóm thành phần',
	url: '/part-groups',
	component: <PartGroupList />,
}
const PartGroupListPage = () => {
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

export default PartGroupListPage
