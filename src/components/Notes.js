import React, { useContext, useEffect, useRef, useState } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/Note/NoteContext";
import {useNavigate} from 'react-router-dom';

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, editNote, getAllNotes } = context;
  const [note, setNote] = useState({id:"", etitle: "", edescription: "", etag: "" });

  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("token"))
    {
      getAllNotes();
    }
    else{
      navigate("/login");
    }
    
  }, []);

  const updateNote = (currentNote) => {
    setNote({id: currentNote._id, etitle : currentNote.title, edescription : currentNote.description, etag : currentNote.tag});
    ref.current.click();
  };

  const handleClick = (e) => {
    editNote(note);
    refClose.current.click();
  };

  const onChange = (e) => {
    setNote({...note,[e.target.name]:e.target.value});
  };

  return (
    <div className="container">
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal" >Launch demo modal</button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"> {" "}Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">  Description </label>
                <textarea className="form-control"  id="edescription" name="edescription" rows="3" value={note.edescription} onChange={onChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label"> Tag</label>
                <input type="email" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChange}/>
              </div>
            </div>
            <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary d-none" data-bs-dismiss="modal">Close</button>
           <button disabled={note.etitle < 5 || note.edescription < 5 || note.etag<3} type="button" onClick={handleClick} className="btn btn-dark">
                Save Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h3>Your Notes</h3>
      <div className="row my-3">
        <div className="container">{notes.length === 0 && "Please add notes."}</div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} note={note} updateNote={updateNote} />
          );
        })}
      </div>
    </div>
  );
}
