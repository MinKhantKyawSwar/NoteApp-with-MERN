import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const NoteForm = ({ isCreate }) => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-5">
          {isCreate ? "Create New Note" : "Edit Your Note"}
        </h1>
        <Link to={"/"}>
          <ArrowLeftIcon width={22} />
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="font-medium block">
            Note Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
          />
        </div>
        <div className="">
          <label htmlFor="description" className="font-medium block">
            Note Description
          </label>
          <textarea
            rows={4}
            type="text"
            name="description"
            id="description"
            className="text-lg border-2 border-teal-600 py-1 w-full rounded-lg"
          />
        </div>
        <button className="text-white bg-teal-600 py-4 font-medium w-full text-center">
          Save
        </button>
      </form>
    </section>
  );
};

export default NoteForm;

//42-1
//20:39
