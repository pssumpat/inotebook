import React, { useContext, useState } from "react";

import NoteContext from "../context/Note/NoteContext";

export default function NoteItem(props) {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const {note, updateNote} = props;

  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title fw-light"> {note.title}</h5>
            <div className="ml-auto">
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={()=>{updateNote(note)}}
              ></i>
              <i className="fa-solid fa-trash mx-2"
              onClick={() => {deleteNote(note._id)}}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
