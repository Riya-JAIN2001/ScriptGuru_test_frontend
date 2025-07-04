// NoteEditor.js
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
const socket = io('https://scriptguru-test-backend.onrender.com');

function NoteEditor() {
  const { id } = useParams();
  const [note, setNote] = useState({ title: '', content: '', updatedAt: '' });
  const [activeUsers, setActiveUsers] = useState(0);
  const saveTimeout = useRef(null);

  useEffect(() => {
    axios.get(`https://scriptguru-test-backend.onrender.com/notes/${id}`).then((res) => {
      setNote(res.data);
    });

    socket.emit('join_note', id);

    socket.on('note_update', (newContent) => {
      setNote((prev) => ({ ...prev, content: newContent }));
    });

    socket.on('active_users', setActiveUsers);

    return () => socket.disconnect();
  }, [id]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setNote((prev) => ({ ...prev, content: newContent }));

    socket.emit('note_update', { noteId: id, content: newContent });

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      axios.put(`https://scriptguru-test-backend.onrender.com/notes/${id}`, { content: newContent });
    }, 5000);
  };

  return (
    <div className='text-pretty bg-white text-black rounded-sm mb-2 p-4 shadow '>
      <h2 >{note.title}</h2>
      <p>Last updated: {new Date(note.updatedAt).toLocaleTimeString()}</p>
      <div className='text-pretty border-2  bg-white text-black rounded-sm mb-2 p-4 shadow w-96 min-h-64'>
        <TextareaAutosize
        minRows={10}
        value={note.content}
        onChange={handleChange}
        style={{ width: '100%', fontSize: '1rem' }}
      />
      </div>
    </div>
  );
}

export default NoteEditor;
