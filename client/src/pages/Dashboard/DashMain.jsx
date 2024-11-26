import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../../actions/user.action";
import { getRecentPosts } from "../../actions/post.action";
import { getComments } from "../../actions/comment.action";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashMain() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([{}]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUsersSuccess = (data) => {
      setUsers(data.users);
      setTotalUsers(data.totalUsers);
      setLastMonthUsers(data.lastMonthUsers);
    };

    const getRecentPostsSuccess = (data) => {
      setPosts(data.posts);
      setTotalPosts(data.totalPost);
      setLastMonthPosts(data.lastMonthPosts);
    };

    const getCommentsSuccess = (data) => {
      setComments(data.comments);
      setTotalComments(data.totalComments);
      setLastMonthComments(data.lastMonthComments);
    };

    if (currentUser.userRole === "ADMIN") {
      getUsers(0, getUsersSuccess);
      getRecentPosts(5, getRecentPostsSuccess);
      getComments(0, getCommentsSuccess);
    }
  }, [currentUser]);

  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className=" flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Users</h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            {lastMonthUsers ? (
              <span className="text-green-500 flex item-center">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
            ) : (
              <span className="text-gray-500">0</span>
            )}
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className=" flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComments}</p>
            </div>
            <HiAnnotation className="bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            {lastMonthComments ? (
              <span className="text-green-500 flex item-center">
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
            ) : (
              <span className="text-gray-500">0</span>
            )}
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
        <div className=" flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex justify-between">
            <div>
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>
            <HiDocumentText className="bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            {lastMonthPosts ? (
              <span className="text-green-500 flex item-center">
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
            ) : (
              <span className="text-gray-500">0</span>
            )}
            <div className="text-gray-500">Last month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-3 justify-center">
        <div className="flxe flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1>Recent Users</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=users"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {users &&
                users.map((user) => {
                  return (
                    <Table.Row
                      key={user._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-700"
                    >
                      <Table.Cell>
                        <img
                          src={user.profilePictue}
                          className="w-10 h-10 rounded-full bg-gray-500"
                          alt=""
                        />
                      </Table.Cell>
                      <Table.Cell>{user.username}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
        <div className="flxe flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1>Recent Comments</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=comments"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comments Content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {comments &&
                comments.map((comment) => {
                  console.log(comment);
                  return (
                    <Table.Row
                      key={comment._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-700"
                    >
                      <Table.Cell className="w-96">
                        <p className="line-clamp-2">{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
        <div className="flxe flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1>Recent Post</h1>
            <Button outline gradientDuoTone="purpleToPink">
              <Link to={"/dashboard?tab=posts"}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {posts &&
                posts.map((post) => {
                  return (
                    <Table.Row
                      key={post._id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-700"
                    >
                      <Table.Cell>
                        <img
                          src={post.image}
                          className="w-14 h-10 rounded-md bg-gray-500"
                          alt=""
                        />
                      </Table.Cell>
                      <Table.Cell className="w-96">{post.title}</Table.Cell>
                      <Table.Cell className="w-5">{post.category}</Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
}
