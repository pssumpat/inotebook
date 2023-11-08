import React from "react";

export default function Alert(props) {
  const capatalize = (word) => {
    if(word === 'danger'){word="error"};
    const tp = word.toLowerCase();
    return tp.charAt(0).toUpperCase() + tp.slice(1).toLowerCase();
  };
  return (
    <div style={{ height: "60px" }}>
      {props.alert!==null && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capatalize(props.alert.type)}</strong> : {props.alert.message}
        </div>
      )}
    </div>
  );
}
