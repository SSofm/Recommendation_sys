import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../upload.css";
import { Navbar } from "./Navbar";

export const BookDetailAdmin = (props) => {
  const location = useLocation();
  const { bookId } = useParams();
  const url = "http://localhost:5000/books/";
  const [canEdit, setCanEdit] = useState(false);
  const [book, setBook] = useState({});

  const email = location.state.email || props.email;
  const userId = location.state.userId || props.userId;
  const cartId = location.state.cartId || props.userId;
  const isAdmin = userId === 7 ? "true" : "false";

  const [uploadNote, setUploadNote] = useState("");
  const [exitsNote, setExitsNote] = useState("Please fill out this field.");
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const navigate = useNavigate();

  const [imagePaths, setImagePaths] = useState([]);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  const onFileUpload = async (event) => {
    const formData = new FormData();
    for (const element of selectedFile) {
      formData.append("file", element, element.name);
    }
    await event.preventDefault();
    try {
      const resp = await axios.post(
        "http://localhost:5000/images/upload-files",
        formData
      );
      setUploadNote("Upload successfully!");
      setImagePaths(resp.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    const loadBook = async () => {
      const result = await axios.get(`${url}${bookId}`);
      setBook(result.data);
    };
    loadBook();
  }, [bookId]);
  const newLocal = canEdit ? "Save" : "Edit";
  const buttonText = bookId === "0" ? "Add" : newLocal;

  const deleteHandler = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  const onSubmit = async (e) => {
    if (buttonText === "Edit") {
      setCanEdit(true);
    } else if (buttonText === "Save") {
      try {
        e.preventDefault();
        await axios.patch(`http://localhost:5000/books/${bookId}`, book);
        navigate(-1);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else if (buttonText === "Add") {
      e.preventDefault();
      try {
        await axios.post("http://localhost:5000/books/create-new-book", {
          ...book,
          imagePaths,
        });
        navigate(-1);
      } catch (error) {
        setExitsNote("This book title already exists, please try again!");
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div>
      <Navbar isAdmin={isAdmin} cartId={cartId} userId={userId} email={email} />
      <div className="w-2/3 ml-auto mr-auto mt-5">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-title"
            >
              Tiêu đề
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-title"
              type="text"
              required
              value={book.title}
              disabled={buttonText === "Add" ? canEdit : !canEdit}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />

            <p className="text-red-500 text-xs italic">{exitsNote}</p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-author"
            >
              Tác giả
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-author"
              type="text"
              required
              value={book.author ? book.author : ""}
              disabled={buttonText === "Add" ? canEdit : !canEdit}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
          </div>
        </div>

        <div className="w-full">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-desc"
          >
            Mô tả về sách
          </label>
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
            value={book.desc ? book.desc : ""}
            onChange={(e) => setBook({ ...book, desc: e.target.value })}
            disabled={buttonText === "Add" ? canEdit : !canEdit}
          ></textarea>
        </div>

        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-released-date"
            >
              Ngày phát hành
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-released-date"
              type="date"
              required
              value={book.releasedDate ? book.releasedDate.slice(0, 10) : ""}
              disabled={buttonText === "Add" ? canEdit : !canEdit}
              onChange={(e) =>
                setBook({ ...book, releasedDate: e.target.value })
              }
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-pages"
            >
              Số trang
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-pages"
              name="grid-pages"
              type="number"
              required
              value={book.pages ? book.pages : ""}
              disabled={buttonText === "Add" ? canEdit : !canEdit}
              onChange={(e) =>
                setBook({ ...book, pages: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/2 pr-3 mb-6 md:mb-0 pl-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Thể loại
            </label>

            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                disabled={buttonText === "Add" ? canEdit : !canEdit}
                value={book.category ? book.category : ""}
                onChange={(e) => setBook({ ...book, category: e.target.value })}
              >
                <option>Công nghệ thông tin</option>
                <option>An toàn thông tin</option>
                <option>Truyền thông đa phương tiện</option>
                <option>Kế toán</option>
                <option>Công nghệ đa phương tiện</option>
                <option></option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-price"
            >
              Giá
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-price"
              name="grid-price"
              type="number"
              required
              value={book.price ? book.price : ""}
              disabled={buttonText === "Add" ? canEdit : !canEdit}
              onChange={(e) =>
                setBook({ ...book, price: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="mt-7 mb-2">
          <input
            type="file"
            onChange={onFileChange}
            multiple
            accept="image/png , image/jpeg, image/webp"
            disabled={buttonText === "Add" ? canEdit : !canEdit}
          />
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={onFileUpload}
          >
            Upload!
          </button>
          <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
            {uploadNote}
          </h6>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {book.images &&
            book.images.map((item) => {
              const imagePath = "/images/" + item.url.split("\\").pop();
              return (
                <div key={item.url} className="image">
                  <img
                    src={imagePath}
                    alt="upload"
                    className="border-4 shadow-sm"
                  />
                </div>
              );
            })}
        </div>

        <div className="upload-form-images">
          <div className="grid grid-cols-5 gap-4">
            {selectedImages &&
              selectedImages.map((image, index) => {
                return (
                  <div key={image} className="image">
                    <img
                      src={image}
                      alt="upload"
                      className="border-4 shadow-sm"
                    />

                    <button
                      className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow"
                      onClick={() => deleteHandler(image)}
                    >
                      Delete image
                    </button>
                    <p>{index + 1}</p>
                  </div>
                );
              })}
          </div>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
          onClick={onSubmit}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};
