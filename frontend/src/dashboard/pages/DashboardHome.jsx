import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

const DashboardHome = () => {
  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#f4f6f8",
  },
  main: {
    marginTop:"30px",
    marginLeft: "240px", // Width of the sidebar
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    padding: "24px 32px",
    overflowY: "auto",
  },
};

export default DashboardHome;
