import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import dateFormat from "dateformat";
import { Footer } from "./Footer";
import { Dialog } from "./Dialog";
export const Invoice = () => {
  const [data, setData] = useState([]);
  const [listTotals, setListTotals] = useState([]);
  const location = useLocation();
  const userId = location.state.userId;
  const cartId = location.state.cartId;
  const email = location.state.email;

  const isAdmin = userId === 7 ? "true" : "false";

  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
    bookName: "",
  });

  console.log("in invoice: ", userId, cartId, email, isAdmin);
  useEffect(() => {
    loadBooks();
  }, []);
  const loadBooks = async () => {
    const result = await axios.get(
      "http://localhost:5000/invoices/get-all-invoices-by-userId/" + userId
    );
    setData(result.data);
    const listAmount = [];
    for (const element of result.data) {
      let tmp = 0;
      for (let j = 0; j < element.cartitems.length; j++) {
        tmp += element.cartitems[j].quantity * element.cartitems[j].book.price;
      }
      listAmount.push(tmp);
    }
    setListTotals(listAmount);
  };
  const url = "http://localhost:5000/invoices/";
  const idInvoiceRef = useRef();
  const areUSureDelete = (choose) => {
    if (choose) {
      console.log("book id doan nay la: ", idInvoiceRef.current);
      handlerCancel(idInvoiceRef.current);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };
  const handleDialog = (message, isLoading, bookName) => {
    setDialog({
      message,
      isLoading,
      bookName,
    });
  };
  const deleteInvoice = async (id) => {
    handleDialog("Ban co chac chan muon xoa khong?", true, "");
    console.log("book id in deleteBook is: ", id);
    idInvoiceRef.current = id;
  };
  const handlerCancel = async (id) => {
    await axios.delete(`${url}${id}`);
    loadBooks();
  };
  const test = (name) => {
    console.log("hi ", name);
  };
  return (
    <div>
      <Navbar isAdmin={isAdmin} cartId={cartId} userId={userId} email={email} />
      <div className="mt-3">
        {data.map((item, index) => {
          return (
            <div>
              Ngày mua: {dateFormat(item.create_at, "dd/mm/yyyy")}
              <table className="table-auto ml-auto mr-auto mb-4">
                <thead>
                  <tr>
                    <th className="border-solid border-2 w-10">STT</th>
                    <th className="border-solid border-2 w-80">Tiêu đề</th>
                    <th className="border-solid border-2 w-64">Tác giả</th>
                    <th className="border-solid border-2 w-64">Thể loại</th>
                    <th
                      className="border-solid border-2"
                      style={{ width: "163px" }}
                    >
                      Số lượng
                    </th>

                    <th className="border-solid border-2 w-32">Đơn giá</th>
                    <th className="border-solid border-2">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {item.cartitems.map((ele, index) => (
                    <tr>
                      <td className="border-solid border-2">{index + 1}</td>
                      <td className="border-solid border-2">
                        {ele.book.title}
                      </td>
                      <td className="border-solid border-2">
                        {ele.book.author}
                      </td>
                      <td className="border-solid border-2">
                        {ele.book.category}
                      </td>
                      <td className="border-solid border-2">{ele.quantity}</td>
                      <td className="border-solid border-2">
                        {ele.book.price.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                      <td className="border-solid border-2">
                        {(ele.book.price * ele.quantity).toLocaleString(
                          "it-IT",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colSpan={7}
                      className="border-solid border-2 font-medium text-orange-700"
                    >
                      Tổng tiền:{" "}
                      {listTotals[index]?.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                class="bg-transparent hover:bg-red-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-red-500 hover:border-transparent rounded mb-10"
                onClick={() => deleteInvoice(item.id)}
              >
                Cancel
              </button>
            </div>
          );
        })}
      </div>
      <Footer posFooter={listTotals.length <= 2 ? true : false} />
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
