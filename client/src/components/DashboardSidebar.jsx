import { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "flowbite-react";
import PropTypes from "prop-types";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUser,
} from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { signOut } from "../actions/user.action";

export default function DashboardSidebar(props) {
  const { currentUser } = useSelector((state) => state.user);
  const { tab } = useState(props.tab);

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.userRole}
              labelColor="dark"
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.userRole === "ADMIN" && (
            <>
              <Sidebar.Collapse icon={HiDocumentText} label="Posts">
                <Sidebar.Item
                  href="/dashboard?tab=posts"
                  active={tab === "posts"}
                >
                  All posts
                </Sidebar.Item>
                <Sidebar.Item href="/create-post">Create Post</Sidebar.Item>
              </Sidebar.Collapse>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUser}
                  labelColor="dark"
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={FaRegCommentDots}
                  labelColor="dark"
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={signOut}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

DashboardSidebar.propTypes = {
  tab: PropTypes.any.isRequired,
};
