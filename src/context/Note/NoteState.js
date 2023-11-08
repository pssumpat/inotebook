import NoteContext from "./NoteContext";
import { useState,useContext } from "react";
import AlertContext from "../Alert/AlertContext";

const NoteState = (props) => {
  const baseUrl = "http://localhost:5000/";
  const alertContext = useContext(AlertContext);
  const {showAlert} = alertContext;
  const [notes, setNotes] = useState([]);

  // Get all Notes
  const getAllNotes = async () => {
    // API Call
    const getNotesUrl = baseUrl + "api/notes/fetchallnotes";
    const response = await fetch(getNotesUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add Notes
  const addNote = async (note) => {
    // API Call
    const addUrl = baseUrl + "api/notes/savenotes";
    const response = await fetch(addUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88",
      },
      body: JSON.stringify({
        title: note.title,
        description: note.description,
        tag: note.tag,
      }),
    });
    const json = await response.json();
    setNotes(notes.concat(json));
    showAlert("Note Added Successfully","success");
  };

  // Delete Note
  const deleteNote = async (id) => {

    // API call
    const dltNoteUrl = baseUrl + `api/notes/deletenote/${id}`;
    const response = await fetch(dltNoteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88",
      }
    });

  //  Delete on Client Side
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
    showAlert("Note Deleted Successfully","success");
  };

  // Edit Note
  const editNote = async (note) => {
    // API call
    const editUrl = baseUrl + `api/notes/updatenote/${note.id}`;
    const response = await fetch(editUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUzZGQxY2MwN2YwN2VkMjQ3ODg2Mzc2In0sImlhdCI6MTY5ODU1MDIyM30.EFhzrxPGZh7rdoUJbZwapaeWZhHUQq2CJFjDYLMRX88",
      },
      body: JSON.stringify({
        title: note.etitle,
        description: note.edescription,
        tag: note.etag,
      }),
    });
    const newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      if(newNotes[index]._id === note.id)
      {
        const elem = newNotes[index];
        elem.title = note.etitle;
        elem.description = note.edescription;
        elem.tag = note.etag;
        break;
      }
      setNotes(newNotes);
      showAlert("Note Edited Successfully","success");
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
