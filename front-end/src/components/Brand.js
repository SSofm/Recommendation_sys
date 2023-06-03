import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import {Link, useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../axios/instance";
import { useEffect, useState } from "react";
import _ from "lodash";
import { FaCircle } from "react-icons/fa";

const user = JSON.parse(localStorage.getItem("user"));

export const Brand = (props) => {
  const navigate = useNavigate();

  const { id: userId, email, isAdmin } = user;
  const cartId = user.cart.id;
  const { brandId } = useParams();

  const [brand, setBrand] = useState({ productTypes: [] });

  useEffect(() => {
    const loadBrand = async () => {
      const result = await axiosInstance.get(
        `http://localhost:5000/brands/${brandId}`
      );
      setBrand(result.data);
    };
    loadBrand();
  }, [brandId]);

  return (
    <div>
      <Navbar />
      {brand.productTypes.length !== 0 ? (
        <div className="grid grid-cols-4 gap-0 ml-auto mr-auto border-4 mt-8 border-dashed bg-yellow-50 max-w-[1440px]">
          {brand.productTypes &&
            brand.productTypes.map((item, index) => {
              const productTypeName = item.name;
              const toProductType = () => {
                navigate(`/users/brand/${item.id}`);
              };
              return (
                <div key={item.url}>
                  <div

                    className="flex justify-center items-center mt-4 mb-4  text-blue-600"
                  >
                    <div>
                      <FaCircle className="text-blue-600 max-w-[6px] mr-2" />
                    </div>
                    <div>
                      <a href=" " onClick={toProductType} className="mb-3">
                        {_.startCase(productTypeName)}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : null}

      <div className="max-w-[1440px] ml-auto mr-auto mt-6">
        <h3 className="text-3xl font-bold dark:text-white mb-3">
          {brand.titleDesc}
        </h3>
        <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400 text-left">
          {brand.desc}
        </p>
      </div>

      <div className="max-w-[1440px] ml-auto mr-auto mt-6 mb-10">
        {brand.productTypes.map((item) => {
          return (
            <div key={item.id}>
              <h5 className="text-xl font-bold dark:text-white">
                {_.upperCase(item.name)}
              </h5>
              {
                <div className="grid grid-cols-5 gap-5">
                  {item.sneakers.map((sneaker) => {
                    const imagePath =
                      "/images/" + sneaker.images[1]?.url.split("\\").pop();

                    return (
                      <div key={sneaker.id}>
                        <Link to={`/users/brand/${brandId}/sneaker/${sneaker.id}`}>
                            <img
                                style={{ width: "350px", height: "350px" }}
                                src={imagePath}
                             alt='sth'/>
                        </Link>
                        <h6 className="text-lg font-bold dark:text-white">
                          {_.startCase(sneaker.name)}
                        </h6>
                        {sneaker.price}
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          );
        })}
      </div>
        <Footer/>
    </div>
  );
};
