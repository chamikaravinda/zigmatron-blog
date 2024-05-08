import { Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { dispatchError } from "../actions/notifications.action.js";
import {
  uploadProfilePicture,
  updateProfile,
  deleteUser,
  signOut,
} from "../actions/user.action.js";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [showModle, setShowModel] = useState(null);
  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploadProgress(null);

    const inProgress = (progress) => {
      setImageFileUploadProgress(progress.toFixed(0));
    };

    const failure = () => {
      setImageFileUploadProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
    };

    const success = (downloadURL) => {
      setImageFileUrl(downloadURL);
      setFormData({ ...formData, profilePicture: downloadURL });
      setImageFileUploadProgress(null);
      setImageFile(null);
    };

    await uploadProfilePicture(imageFile, inProgress, failure, success);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    if (!e.target.value || e.target.value == "") {
      let data = formData;
      delete data[e.target.id];
      setFormData({ data });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      dispatchError("No changes made");
      return;
    }
    if (imageFileUploadProgress) {
      dispatchError("Please wait for image to upload");
      return;
    }
    await updateProfile(formData,currentUser);
  };

  const handleDeleteUser = async () => {
    setShowModel(false);
    await deleteUser(currentUser._id);
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => {
            filePickerRef.current.click();
          }}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba( 62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 boder-[lightgray]
            ${imageFileUploadProgress && imageFileUploadProgress < 100 && "opacity-60"} `}
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={imageFileUploadProgress}
        >
          {imageFileUploadProgress ? "Loading..." : "Update"}
        </Button>
        {currentUser.userRole === "ADMIN" && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer" onClick={() => setShowModel(true)}>
          Delete Account
        </span>
        <span className="cursor-pointer" onClick={signOut}>
          Sign out
        </span>
      </div>
      <Modal
        show={showModle}
        onClose={() => {
          setShowModel(false);
        }}
        popup
        size="md"
      >
        <Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account ?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={handleDeleteUser}>
                  Yes, I&apos;m sure
                </Button>
                <Button onClick={() => setShowModel(false)}>No, Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal.Header>
      </Modal>
    </div>
  );
}
