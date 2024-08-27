import React, { useContext } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import formatISO9075 from "date-fns/formatISO9075";
import { UserContext } from "../contexts/UserContext";

const Note = ({ note, getNotes, customAlert }) => {
  const { token } = useContext(UserContext);
  const { _id, title, content, createdAt } = note;

  const handleDeleteNote = async () => {
    const localToken = JSON.parse(localStorage.getItem("token"));

    if (!localToken) {
      localStorage.setItem("token", null);
      window.location.reload(false);
    }

    const response = await fetch(`${import.meta.env.VITE_API}/status`, {
      headers: {
        Authorization: `Bearer ${localToken.token}`,
      },
    });

    if (response.status === 401) {
      localStorage.setItem("token", null);
      window.location.reload(false);
    } else {
      deleteNote();
    }
  };

  const deleteNote = async () => {
    const response = await fetch(`${import.meta.env.VITE_API}/delete/${_id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });
    if (response.status === 204) {
      customAlert("Post Deleted");
      getNotes();
    } else {
      customAlert("You are not authorized.", true);
    }
  };

  return (
    <div className="w-2/5 border border-t-4 border-t-teal-600 mt-10 shadow-lg p-3 h-fit">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-xs">{content.slice(0, 150)}</p>
      <div className="flex items-center justify-between mt-2 border-t pt-2">
        <p className="text-s font-medium">
          {formatISO9075(new Date(createdAt), { representation: "date" })}
        </p>
        <div className="flex items-center justify-end gap-2">
          <Link to={"/notes/" + _id}>
            <EyeIcon width={20} className="text-grey-500 cursor-pointer" />
          </Link>
          {token && (
            <>
              {note.author.toString() === token.userId && (
                <>
                  <Link to={"/edit/" + _id}>
                    <PencilSquareIcon
                      width={20}
                      className="text-teal-600 cursor-pointer"
                    />
                  </Link>
                  <TrashIcon
                    width={20}
                    className="text-red-600 cursor-pointer"
                    onClick={handleDeleteNote}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
