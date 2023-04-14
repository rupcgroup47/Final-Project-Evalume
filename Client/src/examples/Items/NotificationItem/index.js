import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const NotificationItem = ({title}) => (
    <MDBox py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1, color:"red" }}>
        {title}
      </MDTypography>
    </MDBox>
);

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  title: PropTypes.string.isRequired,
};
export default NotificationItem;
