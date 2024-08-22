import { useEffect, useState } from "react";
import Note from "../components/Note";
import { TailSpin } from "react-loader-spinner";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getNotes = async (pageNum) => {
    setLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API}/notes?page=${pageNum}`
    );
    const { notes, totalNotes, totalPages } = await response.json();
    setTotalPages(totalPages);
    setNotes(notes);
    setLoading(false);
  };

  useEffect(
    (_) => {
      getNotes(currentPage);
    },
    [currentPage]
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const customAlert = (message, status) => {
    toast.success("Note is deleted", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
      />

      <section className="flex gap-6 px-10 flex-wrap mx-auto w-full justify-center">
        {!loading && notes.length > 0 ? (
          <>
            {notes.map((note) => (
              <Note
                key={note._id}
                note={note}
                getNotes={getNotes}
                customAlert={customAlert}
              />
            ))}
            <div className="w-full flex items-center justify-center gap-3">
              {currentPage > 1 && (
                <button
                  type="button"
                  className="text-white font-medium bg-teal-600 px-3 py-1"
                  onClick={handlePrev}
                >
                  Previous Page
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  type="button"
                  className="text-white font-medium bg-teal-600 px-3 py-1"
                  onClick={handleNext}
                >
                  Next Page
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center align-center w-full">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Index;
