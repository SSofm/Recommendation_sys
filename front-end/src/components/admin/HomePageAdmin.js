import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

import { Dialog } from "../Dialog";
import { Navbar } from "../Navbar";
import { Carousel } from "../Carousel";
import { Footer } from "../Footer";

const user = JSON.parse(localStorage.getItem("user"));
export const HomePageAdmin = (props) => {
  const url = "http://localhost:5000/sneakers/";
  const [sneakers, setSneakers] = useState([]);
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    bookName: "",
  });

  const navigate = useNavigate();
  useEffect(() => {
    loadBooks().then((r) => {});
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
    await loadBooks();
  };

  const deleteBook = async (id) => {
    handleDialog("Ban co chac chan muon xoa khong?", true, "");
    idBookRef.current = id;
  };

  const areUSureDelete = (choose) => {
    if (choose) {
      handleDelete(idBookRef.current).then((r) => {});
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  const loadBooks = async () => {
    const result = await axios.get(`${url}get-all-sneakers`);
    setSneakers(result.data);
  };

  const { email, id: userId, isAdmin } = user;
  const cartId = user?.cart.id;

  return (
    <div style={{ background: "#F1F1F1" }}>
      <Navbar />

      {userId ? (
        <div className="flex justify-between mt-5">
          <div>
            <h6 className="font-medium text-gray-900 ml-72">
              Xin chao {email} {isAdmin ? "🔧" : ""}
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
      <div style={{ marginLeft: "-1570px" }}>
        {userId ? (
          <button
            className="mb-2 mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/admin/products/product-detail/0")}
          >
            Add new sneaker
          </button>
        ) : (
          ""
        )}
      </div>

      <table className="table-auto ml-auto mr-auto mb-10">
        <thead>
          <tr>
            <th className="border-solid border-2 w-10">STT</th>
            <th className="border-solid border-2 w-80">Code</th>
            <th className="border-solid border-2 w-64">Name</th>
            <th className="border-solid border-2 w-64">Brand</th>
            <th className="border-solid border-2 w-64">Product Type</th>
            <th className="border-solid border-2">Stars</th>
            <th className="border-solid border-2 w-32">Đơn giá</th>
            <th className="border-solid border-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {sneakers.map((sneaker, index) => (
            <tr key={sneaker.id}>
              <td className="border-solid border-2">{index + 1}</td>
              <td className="border-solid border-2">{sneaker.productCode}</td>
              <td className="border-solid border-2">
                {_.startCase(sneaker.name)}
              </td>
              <td className="border-solid border-2">
                {sneaker.productType.brand.name}
              </td>
              <td className="border-solid border-2">
                {_.startCase(sneaker.productType.name)}
              </td>
              <td className="border-solid border-2" contentEditable={false}>
                {sneaker.stars}
              </td>
              <td className="border-solid border-2">
                {sneaker.price?.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </td>
              <td className="border-solid border-2">
                {userId ? (
                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    onClick={() =>
                      navigate(`/admin/products/product-detail/${sneaker.id}`, {
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
                    onClick={() => deleteBook(sneaker.id)}
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
