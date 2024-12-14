import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../state/user/userSlice";
import { useNavigate } from "react-router-dom";
import {
  loadingStart,
  loadingStop,
  errorNotification,
} from "../state/notifications/notificationSlice";

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      dispatch(loadingStart())
      const res = await fetch("/api/auth//google-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        dispatch(errorNotification(data.message));
        return;
      }
      
      dispatch(signInSuccess(data));
      dispatch(loadingStop())
      navigate('/')
    } catch (error) {
        dispatch(errorNotification(error));
    }
  };

  return (
    <Button
      type="button"
      onClick={handleGoogleClick}
      gradientDuoTone="pinkToOrange"
      outline
    >
      <AiFillGoogleCircle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
}
