import React from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import formatISO9075 from "date-fns/formatISO9075";

const Note = ({ note }) => {
  const { _id, title, content, createdAt } = note;
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
          <Link to={"/edit/" + _id}>
            <PencilSquareIcon
              width={20}
              className="text-teal-600 cursor-pointer"
            />
          </Link>
          <TrashIcon width={20} className="text-red-600 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Note;
