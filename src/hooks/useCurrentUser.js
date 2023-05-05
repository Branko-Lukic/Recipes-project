import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  //   setError,
  //   startLoading,
  //   finishLoading,
} from "../store/reducers/authSlice";

export const useCurrentUser = () => {
  const [curr, setCurr] = useState(null);
  const dispatch = useDispatch();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const userRef = doc(db, `users`, uid);
          getDoc(userRef).then((user) => {
            setCurr(user.data());
          });

          // ...
        } else {
          setCurr(null);
        }
      }),
    []
  );

  useEffect(() => {
    dispatch(setCurrentUser(curr));
  }, [curr]);
};
