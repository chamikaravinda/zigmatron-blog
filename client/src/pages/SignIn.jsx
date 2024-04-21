import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../state/user/userSlice";
import {
  loadingStart,
  loadingStop,
  errorNotification,
} from "../state/notifications/notificationSlice";
import OAuth from "../components/OAuth";
import { useEffect } from "react";

export default function Sig() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      dispatch(loadingStop());
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(errorNotification("Please fill out all the fields"));
    }
    try {
      dispatch(loadingStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(errorNotification(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      dispatch(loadingStop());
      navigate("/");
    } catch (error) {
      dispatch(errorNotification(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Zigmatron&apos;s
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            This is my simple blog page. Sign in to see what&apos;s inside.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Email" />
              <TextInput
                type="email"
                placeholder="E-mail"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Your Passoword" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign In
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>{"Don't have an account ?"}</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
