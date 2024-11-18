import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { getUsers, deleteAnyUser } from "../../actions/user.action";
import TwoOptionModel from "../../components/TwoOptionModel";

export default function DashUsers() {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const success = (users) => {
      setUsers(users);
      if (users.length < 9) {
        setShowMore(false);
      }
    };
    if (currentUser.userRole === "ADMIN") {
      getUsers(0, success);
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    const success = (users) => {
      setUsers((prev) => [...prev, ...users]);
      if (users.length < 9) {
        setShowMore(false);
      }
    };
    if (currentUser.userRole === "ADMIN") {
      getUsers(startIndex, success);
    }
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    const success = () => {
      setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
    };
    await deleteAnyUser(userIdToDelete, success);
  };

  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300
      dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"
    >
      {currentUser.userRole === "ADMIN" && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell className="bg-gray-200">
                Date created
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">
                User image
              </Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Username</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Email</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Admin</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {users.map((user) => (
                <Table.Row
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  key={user._id}
                >
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounder-full"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.userRole === "ADMIN" ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModel(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:text-red-700"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
          <TwoOptionModel
            showModel={showModel}
            onClose={() => {
              setShowModel(false);
            }}
            ModelMessage="Are you sure you want to delete this user"
            AcceptBtnText="Yes,I'm sure"
            CancelBtnText="No,Cancel"
            AcceptAction={handleDeleteUser}
            CancelAction={() => {
              setShowModel(false);
            }}
          />
        </>
      ) : (
        <p> You have no users yet </p>
      )}
    </div>
  );
}
