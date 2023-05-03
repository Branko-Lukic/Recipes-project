import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";
import { Recipe } from "./pages/Recipe";
import { SignUp } from "./pages/SignUp";
import { Overview } from "./components/profile/overview";
import { AddNewRecipe } from "./components/profile/addNewRecipe";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LogIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile/*" element={<Profile />}></Route>
          <Route path="/recipe" element={<Recipe />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
