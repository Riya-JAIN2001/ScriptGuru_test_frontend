import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SingleNote from './SingleNote';
import { useNavigate } from 'react-router-dom';

function Notes() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('https://scriptguru-test-backend.onrender.com/notes/all');
        setNotes(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotes();
  }, [notes]);

  const handleAddNote = () => {
    navigate('/create')
  };

  return (
    <>
    <button
        onClick={handleAddNote}
        className="bg-blue-500 text-black px-4 py-2 rounded mb-4"
      >
        Add Note
      </button>
    <div className="p-4">
      

      {notes.length > 0 ? (
        notes.map((note) => (
          <SingleNote
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
          />
        ))
      ) : (
        <p>No notes found.</p>
      )}
    </div>
    </>
  );
}

export default Notes;
