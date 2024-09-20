
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesList from './components/NotesList';
import NoteModal from './components/NoteModal';

function App() {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error("There was an error fetching the notes!", error);
    }
  };

  const handleAddNote = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  // Save note handler (for both add and edit)
  const handleSaveNote = async (note) => {
    try {
      if (currentNote) {
        // If editing, send a PUT request
        await axios.put(`http://localhost:5000/api/notes/${currentNote.id}`, note);
      } else {
        // If adding new, send a POST request
        await axios.post('http://localhost:5000/api/notes', note);
      }
      fetchNotes(); // Refresh the notes list
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("There was an error saving the note!", error);
    }
  };


  // Delete note handler
  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes(); // Refresh the notes list
    } catch (error) {
      console.error("There was an error deleting the note!", error);
    }
  };

  return (
    <div className="App">
      {/* Pass notes, add and delete handlers to NotesList */}
      <NotesList 
        notes={notes} 
        onAdd={handleAddNote} 
        onDelete={handleDeleteNote}
        onEdit={(note) => { setCurrentNote(note); setIsModalOpen(true); }} // Open modal for edit
      />
      {/* Pass the modal open state and handlers */}
      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveNote} 
        note={currentNote} // Pass note for editing
      />
    </div>
  );
}

export default App;
