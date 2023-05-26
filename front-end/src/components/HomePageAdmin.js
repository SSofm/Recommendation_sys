import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog } from "./Dialog";
import { Navbar } from "./Navbar";
import { Carousel } from "./Carousel";
import dateFormat from "dateformat";
import { Footer } from "./Footer";

export const HomePageAdmin = (props) => {
  const url = "http://localhost:5000/books/";
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    bookName: "",
  });
  const navigate = useNavigate();
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

  const handleDelete = async (id) => {
    await axios.delete(`${url}${id}`);
    loadBooks();
  };

  const deleteBook = async (id) => {
    handleDialog("Ban co chac chan muon xoa khong?", true, "");
    idBookRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      handleDelete(idBookRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const loadBooks = async () => {
    const result = await axios.get(`${url}get-all-books`);
    setBooks(result.data);
  };
  const email = location.state.email || props.email;
  const userId = location.state.userId || props.userId;
  const cartId = location.state.cartId || props.userId;
  const isAdmin = userId === 7 ? "true" : "false";

  return (
    <div style={{ background: "#F1F1F1" }}>
      <Navbar isAdmin="true" cartId={cartId} userId={userId} email={email} />

      {userId ? (
        <div className="flex justify-between mt-5">
          <div>
            <h6 className="font-medium text-gray-900 ml-72">
              Xin chao {email} {location.state.isAdmin ? "🔧" : ""}
            </h6>
          </div>
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
      <div style={{ marginLeft: "-1570px" }}>
        {userId ? (
          <button
            className="mb-2 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              navigate("/admin/books/book-detail/0", {
                state: {
                  isAdmin,
                  userId,
                  cartId,
                  email,
                },
              })
            }
          >
            Add book
          </button>
        ) : (
          ""
        )}
      </div>

      <table className="table-auto ml-auto mr-auto mb-10">
        <thead>
          <tr>
            <th className="border-solid border-2 w-10">STT</th>
            <th className="border-solid border-2 w-80">Tiêu đề</th>
            <th className="border-solid border-2 w-64">Tác giả</th>
            <th className="border-solid border-2 w-64">Thể loại</th>
            <th className="border-solid border-2" style={{ width: "163px" }}>
              Ngày phát hành
            </th>
            <th className="border-solid border-2">Số trang</th>
            <th className="border-solid border-2 w-32">Đơn giá</th>
            <th className="border-solid border-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td className="border-solid border-2">{index + 1}</td>
              <td className="border-solid border-2">{book.title}</td>
              <td className="border-solid border-2">{book.author}</td>
              <td className="border-solid border-2">{book.category}</td>
              <td className="border-solid border-2">
                <input
                  className="appearance-none block w-full rounded py-3 px-4 leading-tight focus:outline-none"
                  type="text  "
                  value={dateFormat(book.releasedDate, "dd/mm/yyyy")}
                  disabled
                />
              </td>
              <td className="border-solid border-2">{book.pages}</td>
              <td className="border-solid border-2">
                {book.price?.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="border-solid border-2">
                {userId ? (
                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() =>
                      navigate(`/admin/books/book-detail/${book.id}`, {
                        state: {
                          isAdmin,
                          userId,
                          cartId,
                          email,
                        },
                      })
                    }
                  >
                    View
                  </button>
                ) : (
                  ""
                )}
                {userId ? (
                  <button
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded"
                    onClick={() => deleteBook(book.id)}
                  >
                    Delete
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-10">
        Xem thêm
      </button>
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
