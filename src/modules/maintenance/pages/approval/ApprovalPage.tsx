import Approval from "@modules/maintenance/components/approval/Approval";
import Wrapper from "@modules/maintenance/components/common/Wrapper";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs, Link } from "@mui/material";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";

const ApprovalPage = () => {
  const breadcrumbs = [
    <Link key="1" underline="none" component={RouterLink} to={"/approval"}>
      <span style={{ color: "#10428e", fontSize: "18px", fontWeight: 600 }}>
        Danh sách cần duyệt
      </span>
    </Link>,
  ];

  return (
    <div>
      <Helmet>
        <title>Danh sách cần duyệt</title>
        <meta name="description" content="Danh sách các thiết bị" />
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
      <Wrapper>
        <Approval />
      </Wrapper>
    </div>
  );
};

export default ApprovalPage;
