import AlertContext from "./AlertContext";
import { useState } from "react";

const AlertState = (props) => {
  // const initialAlerts = { type: "", message:"" };


  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message : message,
      type : type
    })

    setTimeout(()=>{
      setAlert(null);
    },1500)
  }

  return (
    <AlertContext.Provider value={{ alert, setAlert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
