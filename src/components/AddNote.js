import React,{useContext, useState} from 'react'

import NoteContext from "../context/Note/NoteContext";

export default function AddNote() {

    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note,setNote] = useState({title:"", description:"", tag:""})

    const handleClick = (e) =>{
        e.preventDefault();
        addNote(note);
        setNote({title:"", description:"", tag:""})
    }

    const onChange = (e) =>{
       setNote({...note, [e.target.name] : e.target.value})
    }

  return (
    <div className='container'>
      <h3>Add Note</h3>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange}/>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" name="description" rows="3" value={note.description} onChange={onChange}></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label" name="tag" >Tag</label>
        <input type="email" className="form-control" name="tag" value={note.tag} id="tag" onChange={onChange} />
      </div>
      <button disabled={note.title < 5 || note.description < 5 || note.tag<3} type="submit" className="btn btn-dark mb-3"  onClick={handleClick}>Add Note</button>
    </div>
  )
}
