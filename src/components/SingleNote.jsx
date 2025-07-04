import React from 'react';
import {useNavigate} from 'react-router-dom'

function SingleNote({id, title, content}) {
    const navigate = useNavigate()
  const onEdit =()=>{
    navigate(`/note/${id}`)
  }
  return (
    <div className="text-pretty bg-white text-black rounded-sm mb-2 p-4 shadow w-96 min-h-64">
      <div className="antialiased text-lg font-semibold mb-2">{title}</div>
      <div className="mt-8 mb-4">{content}</div>
      <button
        onClick={onEdit}
        className="text-black px-3 py-2 border-4 shadow rounded hover:bg-blue-600"
      >
        Edit
      </button>
    </div>
  );
}

export default SingleNote;
