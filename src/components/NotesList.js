import React, { useState } from 'react';
import NoteModal from './NoteModal';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNewNote = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleSaveNote = (note) => {
    if (selectedNote) {
      setNotes(
        notes.map((n) =>
          n.id === selectedNote.id ? { ...n, ...note } : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: note.title,
        content: note.content,
      };
      setNotes([...notes, newNote]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <header className="text-center p-4 bg-gray-100 shadow-md rounded-md">
        <h1 className="text-2xl font-bold">My Notes</h1>
      </header>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 mb-8 space-y-4 md:space-y-0">
        <button
          onClick={handleAddNewNote}
          className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600"
        >
          Add New Note
        </button>
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Notes listing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-md transition-transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-800">{note.title}</h3>
              <p className="text-gray-600 mt-2">{note.content.substring(0, 100)}...</p>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleEditNote(note)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-2xl text-gray-500 font-semibold text-center col-span-full mt-10">
            No notes found.
          </p>
        )}
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        note={selectedNote}
      />
    </div>
  );
};

export default NotesList;
