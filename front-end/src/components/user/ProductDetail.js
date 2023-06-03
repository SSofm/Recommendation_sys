import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { BsFillCartPlusFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dateFormat from "dateformat";
import { Navbar } from "../Navbar";

const user = JSON.parse(localStorage.getItem("user"));
export const ProductDetail = (props) => {
  console.log('dang ở trong compoent product')


  return (
    <div>
      <Navbar />
    </div>
  );
};
