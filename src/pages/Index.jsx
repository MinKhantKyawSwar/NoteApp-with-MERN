import { useEffect, useState } from "react";
import Note from "../components/Note";
import Plus from "../components/Plus";
import { TailSpin } from "react-loader-spinner";

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
  return (
    <section className="flex gap-6 px-10 flex-wrap">
      {!loading && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <Note key={note._id} note={note} />
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

      <Plus />
    </section>
  );
};

export default Index;
