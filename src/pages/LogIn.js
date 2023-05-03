import React, { useEffect } from "react";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentUser,
  setError,
  startLoading,
  finishLoading,
} from "../store/reducers/authSlice";

export const LogIn = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log(currentUser);

  // useEffect(() => {
  //   console.log(21122);

  //   // console.log(21122);

  //   const userRef = doc(db, `users`, auth?.currentUser?.uid);
  //   getDoc(userRef)
  //     .then((currUser) => dispatch(setCurrentUser(currUser.data())))
  //     .then(() => {
  //       console.log(currentUser);
  //     });
  // }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // console.log(auth?.currentUser?.uid);

  const logIn = () => {
    dispatch(startLoading());
    return (
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res.user.uid);
          const userRef = doc(db, `users`, res.user.uid);
          return getDoc(userRef);
        })
        // .then((user) => {
        //   // console.log(authSlice.currentUser);
        //   user && user.exists() && dispatch(setCurrentUser(user.data()));
        //   dispatch(finishLoading());
        // })
        .then((userDoc) => {
          if (userDoc.exists()) {
            dispatch(setCurrentUser(userDoc.data()));
          } else {
            dispatch(setCurrentUser(null));
          }
          dispatch(finishLoading());
        })
        .catch((err) => {
          dispatch(finishLoading());
          dispatch(setError(err.message));
        })
    );
  };

  const logout = () => {
    return signOut(auth).then(() => dispatch(setCurrentUser(null)));
  };
  return (
    <>
      <div>
        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={logIn}>Login</button>
        <button onClick={logout}>Log out</button>
        <div></div>
      </div>
    </>
  );
};
