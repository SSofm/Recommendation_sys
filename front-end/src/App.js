import "./App.css";
import { HomePageAdmin } from "./components/admin/HomePageAdmin";
import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { HomePage } from "./components/user/HomePage";
import { ProductDetailAdmin } from "./components/admin/ProductDetailAdmin";
import { ProductDetail } from "./components/user/ProductDetail";
import { Cart } from "./components/Cart";
import { Invoice } from "./components/Invoice";
import { Brand } from "./components/Brand";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<HomePageAdmin />} />
        <Route path="/users/register" element={<SignUp />} />
        <Route path="/users/login" element={<Login />} />
        <Route
          path="admin/products/product-detail/:sneakerId"
          element={<ProductDetailAdmin />}
        />

        <Route path="home/cart" element={<Cart />} />
        <Route path="home/invoice" element={<Invoice />} />
        <Route path="users/brand"  >
          <Route path=":brandId" element={<Brand />}/>
          <Route path=":brandId/sneaker/:sneakerId" element={<ProductDetail />}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
