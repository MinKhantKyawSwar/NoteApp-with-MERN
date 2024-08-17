import React from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Note = () => {
  return (
    <div className="w-2/5 border border-t-4 border-t-teal-600 mt-10 shadow-lg p-3">
      <h3 className="text-xl font-medium">Lorem ipsum dolor sit amet</h3>
      <p className="text-xs">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo rem
        possimus, culpa perspiciatis
      </p>
      <div className="flex items-center justify-end gap-2">
        <Link to={"/notes/1"}>
          <EyeIcon width={20} className="text-grey-500 cursor-pointer" />
        </Link>
        <Link to={"/edit/1"}>
          <PencilSquareIcon
            width={20}
            className="text-teal-600 cursor-pointer"
          />
        </Link>
        <TrashIcon width={20} className="text-red-600 cursor-pointer" />
      </div>
    </div>
  );
};

export default Note;
