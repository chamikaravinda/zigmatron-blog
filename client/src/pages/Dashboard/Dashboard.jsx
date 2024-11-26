import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "../../components/DashboardSidebar";
import DashProfile from "./DashProfile";
import DashPosts from "./DashPosts";
import DashUsers from "./DashUsers";
import DashComments from "./DashComments";
import DashMain from "./DashMain";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashboardSidebar tab={tab} />
      </div>
      {/* profile */}
      {tab === "profile" && <DashProfile />}
      {/* post */}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
      {/* comments */}
      {tab === "comments" && <DashComments />}
      {/* main dashboard */}
      {tab === "main" && <DashMain />}
    </div>
  );
}
