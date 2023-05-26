import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog } from "./Dialog";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Carousel } from "./Carousel";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export const HomePageUser = (props) => {
  const url = "http://localhost:5000/books/";
  const location = useLocation();

  const userId = location.state.userId || props.userId;
  const cartId = location.state.cartId || props.cartId;
  const email = location.state.email || props.email;
  const isAdmin = userId === 7 ? "true" : "false";

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    initialSlide: 0,
  };

  const [books, setBooks] = useState([]);
  const [covers, setCovers] = useState([]);
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    bookName: "",
  });
  useEffect(() => {
    loadBooks();
  }, []);
  const idBookRef = useRef();
  const handleDialog = (message, isLoading, bookName) => {
    setDialog({
      message,
      isLoading,
      bookName,
    });
  };

  const handlerDelete = async (id) => {
    await axios.delete(`${url}${id}`);
    try {
      loadBooks();
    } catch (error) {}
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      handlerDelete(idBookRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const loadBooks = async () => {
    const result = await axios.get(`${url}get-all-books`);
    const listCovers = [];
    for (const element of result.data) {
      listCovers.push(element.images[0]);
    }
    setCovers(listCovers);
    setBooks(result.data);
  };
  let isLogin = true;
  if (typeof location.state?.email === "undefined") {
    isLogin = false;
  }

  return (
    <div style={{ background: "#F1F1F1" }}>
      <Navbar isAdmin={isAdmin} cartId={cartId} userId={userId} email={email} />
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
        <h4 className="font-semibold leading-tight text-2xl mt-0 mb-2 text-blue-600">
          Danh mục sản phẩm
        </h4>
      </div>
      <div className="max-w-[1709px] ml-auto mr-auto">
        <div className="grid grid-cols-5 gap-3">
          {books.map((book, index) => {
            const imagePath = "/images/" + covers[index].url.split("\\").pop();
            const linkBookDetail = "/users/books/book-detail/" + book.id;
            const toBookDetailUser = () => {
              navigate(linkBookDetail, {
                state: {
                  userId,
                  cartId,
                  email,
                },
              });
            };

            return (
              <div>
                <div className="flex flex-wrap justify-center">
                  <a href=" " onClick={toBookDetailUser}>
                    <img
                      src={imagePath}
                      className="h-auto transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl"
                      alt=""
                      style={{ height: 400 }}
                    />
                  </a>
                </div>
                <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
                  {book.title}
                </h6>
                {book.author}
              </div>
            );
          })}
        </div>
      </div>

      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-10 mt-5">
        Xem thêm
      </button>

      <div className="text-left w-56 mb-2" style={{ marginLeft: "330px" }}>
        <h4 className="font-semibold leading-tight text-2xl mt-0 mb-2 text-blue-600">
          Data Science
        </h4>
      </div>
      <div className="max-w-[73%] mr-auto ml-auto mb-10">
        <Slider {...settings}>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/1-5d74.png "
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Build A Carrier In Data Science
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/7-4bbd.png "
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Data Science For Beginners
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/6-d1810.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Python For Data Analysis
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/5-897a.png "
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Deep Learning For Beginners
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/4-3ae3.png "
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Python For Data Analysis
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/3-0bd6.png "
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Mining Of Massive Datasets
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/8-42ee.png "
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                The Elements Of Statistical Learning
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/9-729b.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                The Art Of Data Science
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
          <div className="max-w-[330px] rounded overflow-hidden shadow-lg">
            <img
              className="w-full"
              src="/images/10-8d10d.png"
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                Fundamentals Of Data Visualization
              </div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia
              </p>
            </div>
          </div>
        </Slider>
      </div>
      <Footer />
      {dialog.isLoading && (
        <Dialog
          bookName={dialog.bookName}
          onDialog={areUSureDelete}
          message={dialog.message}
        />
      )}
    </div>
  );
};
