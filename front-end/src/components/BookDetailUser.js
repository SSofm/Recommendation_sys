import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";
import { Navbar } from "./Navbar";
export const BookDetailUser = (props) => {
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9",
  };
  const [currentValue, setCurrentValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0);
  const location = useLocation();
  const { bookId } = useParams();
  const [content, setContent] = useState("");
  const url = "http://localhost:5000";
  const [book, setBook] = useState({});
  
  
  const [listComments, setListComments] = useState([]);
  const userId = location.state.userId || props.userId;
  const cartId = location.state.cartId || props.cartId;
  const email = location.state.email || props.email;
  const isAdmin = userId === 7 ? "true" : "false";

  const data = {
    userId,
    star: currentValue,
    content,
  };
  const styles = {
    stars: {
      marginBottom: "25px",
      display: "flex",
      flexDirection: "row",
    },

    stars_comment: {
      marginLeft: "18px",
      marginBottom: "5px",
      display: "flex",
      flexDirection: "row",
    },
    textarea: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      padding: 10,
      margin: "20px 0",
      minHeight: 100,
      width: 300,
    },
    button: {
      border: "1px solid #a9a9a9",
      borderRadius: 5,
      width: 300,
      padding: 10,
    },
  };
  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const notify = async () => {
    toast.success(book.title + " was successfully added to your cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    try {
      await axios.post(
        "http://localhost:5000/books/add-single-book-into-cart/" + book.id,
        { cartId: cartId, quantity: quantity }
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  const handlerPost = async (e) => {
    try {
      const path = url + "/comments/create-new-comment/" + book.id;
      await axios.post(path, data);
      window.location.reload(false);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    const loadBook = async () => {
      const result = await axios.get(`${url}/books/${bookId}`);
      setBook(result.data);
      setListComments(result.data.comments);
    };
    loadBook();
  }, [bookId]);
  const decrement = (e) => {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    if (value > 1) {
      value--;
      setQuantity(value);
    }
  };

  const increment = (e) => {
    const btn = e.target.parentNode.parentElement.querySelector(
      'button[data-action="decrement"]'
    );
    const target = btn.nextElementSibling;
    let value = Number(target.value);
    value++;
    setQuantity(value);
  };

  const [currentImage, setCurrentImage] = useState("/images/22-5392.jpg");
  const changeImage = (imagePath) => {
    setCurrentImage(imagePath);
  };


  return (
    
    <div>
      <Navbar isAdmin={isAdmin} cartId={cartId} userId={userId} email={email} />

      <div className="flex mt-3">
        <div className="ml-[478px]">
          <div class="max-w-sm rounded overflow-hidden shadow-lg border border-indigo-700">
            <img
              class="w-full"
              src={currentImage}
              alt="Sunset in the mountains"
              style={{ height: 600 }}
            />
          </div>

          <div class="grid grid-cols-3 gap-1 max-w-sm mt-2">
            <div
              class="max-w-[200px] rounded transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl border border-indigo-600"
              onClick={() => changeImage("/images/30-bf51.jpg")}
            >
              <img src="/images/30-bf51.jpg" alt="Sunset in the mountains" />
            </div>
            <div
              class="max-w-[200px] rounded transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl border border-indigo-600"
              onClick={() => setCurrentImage("/images/10-8d10d.png")}
            >
              <img src="/images/10-8d10d.png" alt="Sunset in the mountains" />
            </div>

            <div class="max-w-[200px] rounded transition-shadow ease-in-out duration-300 shadow-none hover:shadow-xl border border-indigo-600">
              <img
                src="/images/6-107b7.png"
                alt="Sunset in the mountains"
                onClick={() => setCurrentImage("/images/6-107b7.png")}
              />
            </div>
          </div>
        </div>

        <div className="ml-64">
          <div className=" ml-auto mr-auto">
            <h4 className="font-bold leading-tight text-2xl mt-3 mb-10 text-blue-600">
              {book.title}
            </h4>
            <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-black-600 text-left">
              Thông tin sản phẩm
            </h5>
            <div className="grid grid-cols-2 gap-3 text-left">
              <div>Mã hàng</div>
              <div>{book.id}</div>
              <div>Tên nhà cung cấp</div>
              <div className="text-blue-600">
                <a
                  target="_blank"
                  href="https://portal.ptit.edu.vn/"
                  rel="noreferrer"
                >
                  PTIT
                </a>
              </div>
              <div>Tác giả</div>
              <div>{book.author}</div>
              <div>NXB</div>
              <div>NXB Hà Nội</div>
              <div>Năm xuất bản</div>
              <div>{String(book.releasedDate).slice(0, 4)}</div>
              <div>Ngôn ngữ</div>
              <div>Tiếng Việt</div>
              <div>Trọng lượng</div>
              <div>300</div>
              <div>Số trang</div>
              <div>{book.pages}</div>
            </div>

            <div className="flex space-x-5 mt-10">
              <div className="custom-number-input w-48">
                <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent">
                  <button
                    data-action="decrement"
                    className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                    onClick={decrement}
                  >
                    <div className="text-2xl font-bold pb-1">−</div>
                  </button>
                  <input
                    className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                    name="custom-input-number"
                    value={quantity}
                  />

                  <button
                    data-action="increment"
                    className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                    onClick={increment}
                  >
                    <div className="text-2xl font-bold pb-1">+</div>
                  </button>
                </div>
              </div>
              <div>
                <button
                  className="w-52 h-10 bg-slate-700 rounded-md hover:bg-blue-500"
                  onClick={notify}
                >
                  <BsFillCartPlusFill
                    size={30}
                    color={"#FFFFFF"}
                    className="ml-auto mr-auto"
                  />
                </button>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="ml-auto mr-auto w-3/5 mt-12">
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 text-black-600 text-left">
          Đánh giá sản phẩm
        </h5>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>

        <textarea
          className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
          rows="3"
          id="grid-desc"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 
          dark:focus:ring-red-900 mt-3"
          onClick={handlerPost}
          disabled={!content}
        >
          Post
        </button>
      </div>

      {listComments.map((item) => (
        <div className="ml-auto mr-auto mt-12 w-3/5">
          <input
            className="appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none mb-1"
            type="text"
            value={item.user.username}
            disabled
          />

          <div></div>
          <div style={styles.stars_comment}>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <FaStar
                    key={index}
                    size={20}
                    color={index < item.star ? colors.orange : colors.grey}
                  />
                );
              })}
          </div>

          <input
            className="appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none mb-1"
            value={dateFormat(item.create_at, "dd/mm/yyyy")}
            disabled
          />

          <textarea
            className="
                form-control
                block
                w-full
                px-4
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
            rows="3"
            id="grid-desc"
            value={item.content}
            disabled
          ></textarea>
        </div>
      ))}
    </div>
  );
};
