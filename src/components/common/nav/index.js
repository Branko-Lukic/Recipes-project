import React from "react";
import styles from "./index.module.css";
import SearchBar from "./search";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import { auth } from "../../../firebase/config";
import { MdFoodBank } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  // console.log(auth?.currentUser);
  return (
    <nav>
      <div className={styles.container}>
        <h1 onClick={() => navigate(`/`)}>
          <MdFoodBank className={styles.logo} />
          GoodFood
        </h1>
        <SearchBar />
        <div className={styles.logInReg}>
          {currentUser === undefined ? (
            ""
          ) : auth?.currentUser ? (
            <span onClick={() => navigate(`/profile/overview`)}>
              <h4>
                <FaRegUser className={styles.user} /> {currentUser?.username}
              </h4>
            </span>
          ) : (
            <>
              <span onClick={() => navigate(`/signup`)}>
                <h4>Sign up</h4>
              </span>
              <span onClick={() => navigate(`/login`)}>
                <h4>Login</h4>
              </span>
            </>
          )}
        </div>
      </div>
    </nav>

    // <nav>
    //   <div className={styles.container}>
    //     <h1 onClick={() => navigate(`/`)}>
    //       <MdFoodBank className={styles.logo} />
    //       GoodFood
    //     </h1>
    //     <SearchBar />
    //     <div className={styles.logInReg}>
    //       {currentUser ? (
    //         <span onClick={() => navigate(`/profile/overview`)}>
    //           <h4>
    //             <FaRegUser className={styles.user} /> {currentUser?.username}
    //           </h4>
    //         </span>
    //       ) : (
    //         <>
    //           <span onClick={() => navigate(`/signup`)}>
    //             <h4>Sign up</h4>
    //           </span>
    //           <span onClick={() => navigate(`/login`)}>
    //             <h4>Login</h4>
    //           </span>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
