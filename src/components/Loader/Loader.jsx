import React from "react";
import { MdHourglassEmpty, MdHourglassFull } from "react-icons/md";

import './Loader.css'

export default function Loader() {
  return (
    <div className="loader__contenedor">
      <MdHourglassEmpty/>
    </div>
  );
}