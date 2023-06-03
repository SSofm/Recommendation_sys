import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";
import { Carousel } from "../Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axiosInstance from "../../axios/instance";

const listBrandImage = [
  "https://btsneaker.vn/wp-content/uploads/2021/03/nike.png",
  "https://btsneaker.vn/wp-content/uploads/2021/03/adidas.png",
  "https://btsneaker.vn/wp-content/uploads/2022/08/company-new-balance-logo-png-20.png",
  "https://btsneaker.vn/wp-content/uploads/2021/03/gucci.png",
  "https://btsneaker.vn/wp-content/uploads/2021/03/converse.png",
  "https://btsneaker.vn/wp-content/uploads/2021/03/vans.png",
  "https://btsneaker.vn/wp-content/uploads/2021/03/mlb.png",
];

const user = JSON.parse(localStorage.getItem("user"));
export const HomePage = (props) => {
  const [listBrand, setListBrand] = useState([]);

  const { id: userId, email, isAdmin } = user;
  const cartId = user.cart.id;

  const navigate = useNavigate();

  useEffect(() => {
    getListBrands().then((r) => {});
  }, []);
  const getListBrands = async () => {
    const result = await axiosInstance.get("http://localhost:5000/brands");
    setListBrand(result.data);
  };

  let isLogin = true;
  if (email === "undefined") {
    isLogin = false;
  }

  return (
    <div style={{ background: "#F1F1F1" }}>
      <Navbar />
      {isLogin ? (
        <div className="flex justify-between mt-5">
          <div>
            <h6 className="font-medium text-gray-900 ml-72">
              Xin chao {email}
            </h6>
          </div>
          {/* <div style={{ marginLeft: "1890px" }}>
            <FaShoppingCart size={25} onClick={handlerCartBtn} />
          </div> */}
        </div>
      ) : (
        <div className="flex mt-6 ml-10">
          <div className="mr-8">
            <Link to={"users/login"}>Login</Link>
          </div>
          <div>
            <Link to={"users/register"}>Register</Link>
          </div>
        </div>
      )}
      <Carousel />
      <div className="text-left mb-2" style={{ marginLeft: "334px" }}>
        <h4 className="font-semibold leading-tight text-2xl mt-0 mb-2 text-blue-600 uppercase">
          Danh mục
        </h4>
      </div>

      <div className="grid grid-cols-4 gap-0 ml-auto mr-auto border-4 bg-black max-w-[1240px]">
        {listBrand &&
          listBrand.map((item, index) => {
            const imagePath = listBrandImage[index];
            const brandName = item.name;
            const toBrand = () => {
              navigate(`/users/brand/ ${item.id}`);
            };
            return (
              <div>
                <div
                  key={item.url}
                  className="flex justify-center items-center mt-9"
                >
                  <a href=" " onClick={toBrand}>
                    <img src={imagePath} alt="upload" />
                  </a>
                </div>
                <div className="mt-2 mb-9 text-center text-white">
                  {brandName}
                </div>
              </div>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};
