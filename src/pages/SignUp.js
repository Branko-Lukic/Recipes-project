import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { auth, db } from "../firebase/config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  setCurrentUser,
  setError,
  startLoading,
  finishLoading,
} from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../hooks/useCurrentUser";

import { Form, Button, Card, Container, Alert } from "react-bootstrap";
import { current } from "@reduxjs/toolkit";

export const SignUp = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  const loading = useSelector((state) => state.recipes.loading);
  const error = useSelector((state) => state.auth.error);
  // const currentUser = useSelector((state) => state.auth.currentUser);

  const emailRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const authSlice = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [userUid, setUserUid] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return dispatch(setError("Password do not match"));
    }
    // dispatch(setError(""));
    dispatch(startLoading());
    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then(() => {
        // setUserUid(res.user.uid);
        const userRef = doc(db, `users`, auth?.currentUser?.uid);
        // console.log(res.user.uid);
        // console.log(userUid);
        setDoc(userRef, {
          username: `${usernameRef.current.value}`,
          favourites: [],
          added: [],
        });
      })
      .then(() => {
        const userRef = doc(db, `users`, auth?.currentUser?.uid);
        return getDoc(userRef);
      })
      .then((user) => {
        dispatch(setCurrentUser(user.data()));
        dispatch(finishLoading());
        navigate("/");
      })
      .catch((err) => {
        dispatch(finishLoading());
        dispatch(setError(err.message)); //'Failed to create an account'
      });
    // useCurrentUser();
    // console.log(currentUser);
    // console.log(error);
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
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {/* <Form onSubmit={handleSubmit}> */}
              <Form>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="username" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="username" ref={usernameRef} required />
                </Form.Group>
                <Form.Group id="password" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm" className="mb-4">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-100 "
                  style={{
                    background: "red",
                    border: "none",
                  }}
                  onClick={handleSubmit}
                >
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <span onClick={() => navigate(`/login`)}>Log In</span>
          </div>
        </div>
      </Container>
    </>
  );
};
