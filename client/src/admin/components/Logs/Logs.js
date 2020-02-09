import React from 'react';

const Logs = (props) => {
    return (
        <ul>
            <div className="d-flex p-2">
                <div className="p-2 flex-grow-1">
                    <div>Log</div>
                </div>
                <div className="p-2">
                    <button className="btn btn-outline-success">edit</button>
                    <button className="btn btn-outline-danger">delete</button>
                </div>
            </div>
        </ul>
    )
}

export default Logs