import React from "react";
import { Link } from "react-router-dom";

const nav = () => {
  return (
    <nav className="bg-slate-50 py-4 px-10 flex items-center justify-between font-mono">
      <Link to={"/"} className="text-teal-600 font-bold text-4xl">
        ShareNote.io
      </Link>
      <div className="flex gap-3">
        <Link to={"/create"} className="text-teal-600 font-medium">
          {" "}
          SHARE{" "}
        </Link>
        <Link to={"/login"} className="text-teal-600 font-medium">
          {" "}
          LOGIN{" "}
        </Link>
        <Link to={"/register"} className="text-teal-600 font-medium">
          {" "}
          REGISTER{" "}
        </Link>
      </div>
    </nav>
  );
};

export default nav;
