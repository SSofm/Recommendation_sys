import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "../../upload.css";
import { Navbar } from "../Navbar";
import axiosInstance from "../../axios/instance";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

const generateProductCode = () => {
  return uuidv4().substr(0, 5).toUpperCase();
};

const user = JSON.parse(localStorage.getItem("user"));

export const ProductDetailAdmin = (props) => {
  const { sneakerId } = useParams();
  const [canEdit, setCanEdit] = useState(false);
  const [sneaker, setSneaker] = useState({
    productType: {
      brand: {
        name: "",
      },
      name: "",
    },
  });

  const [brand, setBrand] = useState([]);
  const [productType, setProductType] = useState("");
  const [productCode, setProductCode] = useState("");

  const { email, isAdmin, id: userId } = user;

  const cartId = user.cart.id;

  const [uploadNote, setUploadNote] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const navigate = useNavigate();

  const [imagePaths, setImagePaths] = useState([]);
  const onFileChange = (event) => {
    setSelectedFile(event.target.files);
  };

  async function handleUploadImages() {
    const formData = new FormData();
    for (const element of selectedFile) {
      formData.append("file", element, element.name);
    }
    try {
      const resp = await axiosInstance
        .post("http://localhost:5000/images/upload-files", formData)
        .then((r) => r);
      setUploadNote("Upload successfully!");
      setImagePaths(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  const onSubmitImages = (e) => {
    e.preventDefault();
    handleUploadImages().then(r => {});
  }

  useEffect(() => {
    try {
      if (sneakerId !== "0") {
        const loadSneaker = async () => {
          const result = await axiosInstance.get(
            `http://localhost:5000/sneakers/${sneakerId}`
          );
          setSneaker(result.data);
        };
        loadSneaker().then((r) => {});
      }

      const loadBrand = async () => {
        const result = await axiosInstance.get("/brands");
        setBrand(result.data);
      };
      setProductCode(generateProductCode());
      loadBrand().then((r) => {});
    } catch (e) {
      console.log("error: ", e);
    }
  }, [sneakerId]);

  const newLocal = canEdit ? "Save" : "Edit";
  const buttonText = sneakerId === "0" ? "Add" : newLocal;

  const onSubmit = async (e) => {
    if (buttonText === "Edit") {
      setCanEdit(true);
    } else if (buttonText === "Save") {
      try {
        await axios.patch(
          `http://localhost:5000/sneakers/${sneakerId}`,
          sneaker
        );
        navigate(-1);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else if (buttonText === "Add") {
      try {
        await axiosInstance.post(
          "http://localhost:5000/sneakers/create-new-sneaker",
          {
            ...sneaker,
            imagePaths,
          }
        );
        navigate(-1);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-2/3 ml-auto mr-auto mt-5">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-title"
            >
              Code
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-title"
              type="text"
              value={productCode}
              disabled
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-author"
            >
              Name
            </label>

            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 mb-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-author"
              type="text"
              required
              value={sneaker.name ?? ""}
              disabled={buttonText === "Add" ? canEdit : !canEdit}
              onChange={(e) => {
                setSneaker({
                  ...sneaker,
                  name: e.target.value,
                  productCode: productCode,
                });
              }}
            />
          </div>
        </div>
        <div className="w-full">
          <label
            className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-desc"
          >
            Description
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
            value={sneaker.desc ? sneaker.desc : ""}
            onChange={(e) => setSneaker({ ...sneaker, desc: e.target.value })}
            disabled={buttonText === "Add" ? canEdit : !canEdit}
          ></textarea>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 mt-3">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-state"
            >
              Brand
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                disabled={buttonText === "Add" ? canEdit : !canEdit}
                value={sneaker.productType.brand.name ?? ""}
                onChange={(e) => {
                  setSneaker({
                    ...sneaker,
                    productType: {
                      ...sneaker.productType,
                      brand: {
                        ...sneaker.productType.brand,
                        name: e.target.value,
                      },
                    },
                  });
                  const checkBrand = brand.find(
                    (item) => item.name === e.target.value
                  );
                  setProductType(checkBrand?.productTypes);
                }}
              >
                {brand?.map((brand) => (
                  <option key={brand.id} value={brand.value}>
                    {brand.name}
                  </option>
                ))}
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
              htmlFor="grid-pages"
            >
              Stars
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-pages"
              name="grid-pages"
              type="number"
              disabled
              value={sneaker.stars ?? 0}
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2 mt-3">
          <div className="w-full md:w-1/2 pr-3 mb-6 md:mb-0 pl-3">
            <label
              className="block tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-product-type"
            >
              Product Type
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-product-type"
                disabled={buttonText === "Add" ? canEdit : !canEdit}
                value={sneaker.productType.name ?? ""}
                onChange={(e) =>
                  setSneaker({
                    ...sneaker,
                    productType: {
                      ...sneaker.productType,
                      name: e.target.value,
                    },
                  })
                }
              >
                {productType.length
                  ? productType.map((item) => (
                      <option key={item.id} value={item.value}>
                        {_.startCase(item.name)}
                      </option>
                    ))
                  : ""}
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
              value={sneaker.price ? sneaker.price : ""}
              disabled={buttonText === "Add" ? canEdit : !canEdit}
              onChange={(e) =>
                setSneaker({ ...sneaker, price: Number(e.target.value) })
              }
            />
          </div>
        </div>

        <div className="mt-7 mb-2">
          <input
            type="file"
            onChange={onFileChange}
            multiple
            accept="image/png, image/jpg , image/jpeg, image/webp"
            disabled={buttonText === "Add" ? canEdit : !canEdit}
          />
          <button
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            onClick={onSubmitImages}
          >
            Upload!
          </button>
          <h6 className="font-medium leading-tight text-base mt-0 mb-2 text-blue-600">
            {uploadNote}
          </h6>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {sneaker.images &&
            sneaker.images.map((item) => {
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
