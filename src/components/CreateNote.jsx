
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent]=useState('')
  const navigate = useNavigate();

  const handleCreate = async () => {
    const res = await axios.post('https://scriptguru-test-backend.onrender.com/notes', { title ,content});
    navigate(`/`);
  };

  return (
    <div className='grid grid-rows gap-4'>
      <h1>Create Note</h1>
      <div className='bg-white text-black border-4 rounded'> <input placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} /></div>
     <div className='bg-white text-black border-4 rounded'> <textarea placeholder='Content' value={content} onChange={(e) => setContent(e.target.value)} /></div>
      <button onClick={handleCreate} className='text-black'>Create</button>
    </div>
  );
}

export default CreateNote;
