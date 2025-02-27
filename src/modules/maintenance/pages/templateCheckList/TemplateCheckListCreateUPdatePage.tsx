import TemplateCheckListCreateUpdate from "@modules/maintenance/components/templateCheckList/TemplateCheckListCreateUPdate";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Container, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

const TemplateCheckListCreateUpdatePage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Trở lại trang trước đó
  };
  const breadcrumbs = [
    <Link
      key="1"
      underline="none"
      component={RouterLink}
      to=""
      onClick={goBack}
    >
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách biểu mẫu
      </span>
    </Link>,

    <span style={{ color: "#c3c3c3", fontSize: "18px", fontWeight: 600 }}>
      Tạo mới
    </span>,
  ];

  return (
    <div>
      <Helmet>
        <title>Create Device</title>
        <meta name="description" content="Create a new device" />
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
      <Container>
        <TemplateCheckListCreateUpdate id={id} />
      </Container>
    </div>
  );
};

export default TemplateCheckListCreateUpdatePage;
