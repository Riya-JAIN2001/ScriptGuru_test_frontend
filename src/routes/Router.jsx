import { BrowserRouter , Routes, Route } from 'react-router-dom';
import CreateNote from '../components/CreateNote';
import NoteEditor from '../components/NoteEditor';
import Notes from '../components/Notes'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Notes/>} />
        <Route path="/create" element={<CreateNote/>} />
        <Route path="/note/:id" element={<NoteEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
