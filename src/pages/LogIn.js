// import React, { useEffect } from "react";
// import { useState } from "react";
// import { auth, db } from "../firebase/config";
// import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setCurrentUser,
//   setError,
//   startLoading,
//   finishLoading,
// } from "../store/reducers/authSlice";

// export const LogIn = () => {
//   const currentUser = useSelector((state) => state.auth.currentUser);

//   console.log(currentUser);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const dispatch = useDispatch();

//   // console.log(auth?.currentUser?.uid);

//   const logIn = () => {
//     dispatch(startLoading());
//     return (
//       signInWithEmailAndPassword(auth, email, password)
//         .then((res) => {
//           console.log(res.user.uid);
//           const userRef = doc(db, `users`, res.user.uid);
//           return getDoc(userRef);
//         })
//         // .then((user) => {
//         //   // console.log(authSlice.currentUser);
//         //   user && user.exists() && dispatch(setCurrentUser(user.data()));
//         //   dispatch(finishLoading());
//         // })
//         .then((userDoc) => {
//           if (userDoc.exists()) {
//             dispatch(setCurrentUser(userDoc.data()));
//           } else {
//             dispatch(setCurrentUser(null));
//           }
//           dispatch(finishLoading());
//         })
//         .catch((err) => {
//           dispatch(finishLoading());
//           dispatch(setError(err.message));
//         })
//     );
//   };

//   const logout = () => {
//     return signOut(auth).then(() => dispatch(setCurrentUser(null)));
//   };
//   return (
//     <>
//       <div>
//         <input
//           type="email"
//           placeholder="Email..."
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password..."
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={logIn}>Login</button>
//         <button onClick={logout}>Log out</button>
//         <div></div>
//       </div>
//     </>
//   );
// };
//........................................

import React, { useEffect, useRef } from "react";
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
import { useNavigate } from "react-router-dom";

import { Form, Button, Card, Container, Alert } from "react-bootstrap";

export const LogIn = () => {
  // const currentUser = useSelector((state) => state.auth.currentUser);

  // console.log(currentUser);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  const loading = useSelector((state) => state.recipes.loading);
  const error = useSelector((state) => state.auth.error);
  // const currentUser = useSelector((state) => state.auth.currentUser);

  const emailRef = useRef();
  const passwordRef = useRef();

  // const authSlice = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [userUid, setUserUid] = useState("");

  // console.log(auth?.currentUser?.uid, "user uid ");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(startLoading());
    return (
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((res) => {
          console.log(res.user.uid);
          // console.log(auth?.currentUser, "user uid ");

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
            dispatch(finishLoading());
            navigate("/");
          } else {
            dispatch(setCurrentUser(null));
            dispatch(finishLoading());
          }
        })
        .catch((err) => {
          dispatch(finishLoading());
          dispatch(setError(err.message));
        })
    );
  };

  // const logout = () => {
  //   return signOut(auth).then(() => dispatch(setCurrentUser(null)));
  // };
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {/* <Form onSubmit={handleSubmit}> */}
              <Form>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100"
                  style={{
                    background: "red",
                    border: "none",
                  }}
                  onClick={handleSubmit}
                >
                  Log In
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account?{" "}
            <span onClick={() => navigate(`/signup`)}>Sign Up</span>
          </div>
        </div>
      </Container>
    </>
  );
};
