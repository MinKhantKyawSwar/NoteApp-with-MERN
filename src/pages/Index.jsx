import { useEffect, useState } from "react";
import Note from "../components/Note";
import { TailSpin } from "react-loader-spinner";

import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [notes, setNotes] = useState([]);

  const [loading, setLoading] = useState(false);

  const getNotes = async () => {
    setLoading(true);
    const response = await fetch(`${import.meta.env.VITE_API}/notes`);
    const notes = await response.json();
    setNotes(notes);
    setLoading(false);
  };

  useEffect((_) => {
    getNotes();
  }, []);

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
