import { FileInput, Select, TextInput } from "flowbite-react";
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getPost, updatePost, uploadPostImage } from "../actions/post.action";

export default function UpdatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const { postId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    const success = (post) => {
      setFormData(post);
    };
    getPost(postId, success);
  }, []);

  const handleUploadImage = async () => {
    setImageUploadProgress(null);

    const inProgress = (progress) => {
      setImageUploadProgress(progress.toFixed(0));
    };

    const failure = () => {
      setImageUploadProgress(null);
      setFile(null);
    };

    const success = (downloadURL) => {
      setFormData({ ...formData, image: downloadURL });
      setImageUploadProgress(null);
      setFile(null);
    };

    await uploadPostImage(file, inProgress, failure, success);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = (slug) => {
      navigate(`/post/${slug}`);
    };
    await updatePost(formData, currentUser._id, success);
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
            value={formData.title}
          />
          <Select
            id="category"
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="java">Java</option>
            <option value="reactjs">React.JS</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress} || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {formData && formData.image && (
          <img
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          id="content"
          placeholder="Write something..... "
          className="h-72 mb-12"
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          Update
        </Button>
      </form>
    </div>
  );
}
