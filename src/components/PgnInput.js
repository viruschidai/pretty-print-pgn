import React from "react";
import "./PgnInput.css";

function PgnInput({ setPgn }) {
    const onTextChange = function (e) {
        console.log("e", e, e.target.value);
        setPgn(e.target.value);
    };
    return (
        <div className="PgnInput">
            <textarea
                className="PgnInputTextArea"
                placeholder="Please paste pgn here..."
                onChange={onTextChange}
            ></textarea>
        </div>
    );
}

export default PgnInput;
