import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const DashboardHome = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/dashboard";

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.main}>
        <div style={styles.topbar}>
          <Topbar />
        </div>
        <div style={styles.content}>
          {isHomePage && (
            <>
              {/* Welcome Section */}
              <div style={styles.welcome}>
                <h1 style={styles.title}>Welcome Back 👋</h1>
                <p style={styles.subtitle}>
                  Here's what's happening in your store today.
                </p>
              </div>

              {/* Summary Cards */}
              <div style={styles.cards}>
                <div style={styles.card}>
                  <h3>150</h3>
                  <p>Products</p>
                </div>
                <div style={styles.card}>
                  <h3>45</h3>
                  <p>Orders</p>
                </div>
                <div style={styles.card}>
                  <h3>85</h3>
                  <p>Customers</p>
                </div>
              </div>
            </>
          )}

          {/* Route Content */}
          <div style={{ marginTop: isHomePage ? "30px" : "0" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    backgroundColor: "#f4f6f8",
    overflow: "hidden",
  },
  sidebar: {
    width: "240px",
    backgroundColor: "#fff",
    borderRight: "1px solid #e0e0e0",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  },
  main: {
    marginLeft: "240px",
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 240px)",
    height: "100vh",
  },
  topbar: {
    height: "64px",
    backgroundColor: "#fff",
    borderBottom: "1px solid #e0e0e0",
    position: "sticky",
    top: 0,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    padding: "0 24px",
  },
  content: {
    flex: 1,
    padding: "24px 32px",
    overflowY: "auto",
    backgroundColor: "#f4f6f8",
  },
  welcome: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    margin: 0,
  },
  subtitle: {
    color: "#666",
    marginTop: "4px",
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    flex: "1",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    textAlign: "center",
    border: "1px solid #e0e0e0",
  },
};

export default DashboardHome;
