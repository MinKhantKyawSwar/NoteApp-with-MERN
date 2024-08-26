import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";

const nav = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null);
  };

  return (
    <nav className="bg-slate-50 py-4 px-10 flex items-center justify-between font-mono">
      <Link to={"/"} className="text-teal-600 font-bold text-4xl">
        ShareNote.io
      </Link>
      <div className="flex gap-3">
        {token ? (
          <>
            <Link to={"/create"} className="text-teal-600 font-medium">
              {" "}
              SHARE NOTE{" "}
            </Link>
            <button
              type="button"
              className="text-teal-600 font-medium"
              onClick={logoutHandler}
            >
              {" "}
              LOGOUT{" "}
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="text-teal-600 font-medium">
              {" "}
              LOGIN{" "}
            </Link>
            <Link to={"/register"} className="text-teal-600 font-medium">
              {" "}
              REGISTER{" "}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default nav;
