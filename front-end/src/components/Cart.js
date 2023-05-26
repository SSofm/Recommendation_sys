import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Dialog } from "./Dialog";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Cart = () => {
  const navigate = useNavigate();
  const [listBooks, setListBooks] = useState([]);
  const url = "http://localhost:5000/books/remove-single-book-from-cart/";
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    bookName: "",
  });

  const [total, setTotal] = useState(0);
  const location = useLocation();
  const cartId = location.state.cartId;
  const userId = location.state.userId;
  const email = location.state.email;
  const isAdmin = userId === 7 ? "true" : "false";

  useEffect(() => {
    loadBooks();
  }, []);
  const handleDialog = (message, isLoading, bookName) => {
    setDialog({
      message,
      isLoading,
      bookName,
    });
  };
  const handleDelete = async (id) => {
    /* https://github.com/axios/axios/issues/897 */
    try {
      const url =
        "http://localhost:5000/books/remove-single-book-from-cart/" + id;
      await axios({
        method: "DELETE",
        url,
        data: {
          cartId: cartId,
        },
      });
    } catch (error) {
      console.log("Error: ", error);
    }
    loadBooks();
  };
  const idBookRef = useRef();
  const areUSureDelete = (choose) => {
    if (choose) {
      console.log("book id doan nay la: ", idBookRef.current);
      handleDelete(idBookRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const deleteBook = async (id) => {
    handleDialog("Ban co chac chan muon xoa khong?", true, "");
    console.log("book id in deleteBook is: ", id);
    idBookRef.current = id;
  };

  const loadBooks = async () => {
    const result = await axios.get("http://localhost:5000/carts/" + cartId);
    let amount = 0;
    setListBooks(result.data[0].cartitems);
    for (const element of result.data[0].cartitems) {
      amount += element.quantity * element.book.price;
    }
    setTotal(amount);
  };

  const handlerPayment = async () => {
    if (listBooks.length === 0) {
      toast.error("Bạn chưa có sản phẩm nào trong giỏ hàng", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      try {
        const path = "http://localhost:5000/".concat(
          "invoices/create-new-invoice"
        );
        await axios.post(path, {
          userId,
        });
        toast.success("Thanh toan thanh cong", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/home/invoice", {
          state: {
            isAdmin,
            userId,
            cartId,
            email,
          },
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div>
      <Navbar cartId={cartId} userId={userId} email={email} isAdmin={isAdmin} />
      <table className="table-auto ml-auto mr-auto mt-10">
        <thead>
          <tr>
            <th className="border-solid border-2 w-14">STT</th>
            <th className="border-solid border-2 w-80">Tên Sách</th>
            <th className="border-solid border-2 w-60">Bìa sách</th>
            <th className="border-solid border-2 w-36">Đơn giá</th>
            <th className="border-solid border-2 w-32">Số lượng</th>
            <th className="border-solid border-2 w-40">Số tiền</th>
            <th className="border-solid border-2 w-32">Action</th>
          </tr>
        </thead>

        <tbody>
          {listBooks.map((item, index) => {
            const linkBookDetail = "/users/books/book-detail/" + item.book.id;
            const toBookDetailUser = () => {
              navigate(linkBookDetail, {
                state: {
                  email,
                  userId,
                  cartId,
                  isAdmin,
                },
              });
            };
            return (
              <tr key={item.id}>
                <td className="border-solid border-2">{index + 1}</td>
                <td className="border-solid border-2">{item.book.title}</td>
                <td className="border-solid border-2">
                  <a onClick={toBookDetailUser}>
                    <img
                      src={
                        `/images/` + item.book.images[0].url.split("\\").pop()
                      }
                      alt="book covers"
                      style={{ width: "300px" }}
                    />
                  </a>
                </td>
                <td className="border-solid border-2">
                  {item.book.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="border-solid border-2">{item.quantity}</td>
                <td className="border-solid border-2">
                  {item.book.price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </td>
                <td className="border-solid border-2">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                    onClick={() => deleteBook(item.book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h5 className="font-medium leading-tight text-xl mt-2 mb-2 text-blue-600">
        Tổng tiền:
        {` ` +
          total.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
          })}
      </h5>

      <button
        className="bg-transparent mb-8 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handlerPayment}
      >
        Thanh toán
      </button>
      <ToastContainer />
      <Footer posFooter={listBooks.length <= 1 ? true : false} />
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
