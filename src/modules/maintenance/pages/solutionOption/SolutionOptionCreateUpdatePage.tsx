import SolutionOptionCreateUpdate from "@modules/maintenance/components/soluitionOption/SolutionOptionCreateUpdate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useParams } from "react-router-dom";

const page = {
  title: "Tạo mới giải pháp",
  url: "/solution-option",
  subUrl: "/solution-option/create",
};
const SolutionOptionCreateUpdatePage = () => {
  const { id } = useParams();
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to={page.url}>
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách giải pháp
      </span>
    </Link>,

    <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
      Tạo mới
    </span>,
  ];

  return (
    <div>
      <Helmet>
        <title> {page.title}</title>
        <meta name="description" content={page.title} />
      </Helmet>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          margin: "10px 0",
        }}
      >
        {breadcrumbs}
      </Breadcrumbs>
      <SolutionOptionCreateUpdate id={id} />
    </div>
  );
};

export default SolutionOptionCreateUpdatePage;
