import "./App.css";
import { HomePageAdmin } from "./components/HomePageAdmin";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { HomePageUser } from "./components/HomePageUser";
import { BookDetailAdmin } from "./components/BookDetailAdmin";
import { BookDetailUser } from "./components/BookDetailUser";
import { Cart } from "./components/Cart";
import { Invoice } from "./components/Invoice";
import { Footer } from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePageUser />} />
        <Route path="/admin" element={<HomePageAdmin />} />
        <Route path="/users/register" element={<SignUp />} />
        <Route path="/users/login" element={<Login />} />
        <Route
          path="admin/books/book-detail/:bookId"
          element={<BookDetailAdmin />}
        />
        <Route
          path="users/books/book-detail/:bookId"
          element={<BookDetailUser />}
        />
        <Route path="home/cart" element={<Cart />} />
        <Route path="home/invoice" element={<Invoice />} />
      </Routes>
      
    </div>
  );
}

export default App;
