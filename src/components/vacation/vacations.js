
import React, { useState, useEffect } from 'react';
import '../vacation/vacation.css'
import { MdEdit, MdDelete, MdPlace } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';

const Vacation = (props) => {

    const deleteFunc = () => {
        props.onDelete(props.index)
    }

    const edit = () => {
        props.onEdit(props.index);
    }

    let borderStyle = { border: "none" }
    if (props.onReqEdit && props.onReqEdit === props.index) {
        borderStyle.border = "2px #F86549 solid";
    }
    
    return (
        <div className="vacation">
            <div className="card" style={borderStyle}>
                <div className="up-card">
                    <div><img src={props.imageUrl} alt={props.name} title={props.name}></img></div>
                    <MdEdit className='edit-button' onClick={edit}></MdEdit>
                    <MdDelete className='delete-button' onClick={deleteFunc}></MdDelete>
                </div>
                <div className="down-card">
                    <div className="down-up">
                        <Tooltip describeChild title={props.name} arrow >
                            <div className="dots">{props.name}</div>
                        </Tooltip>
                    </div>
                    <div className="down-down">
                        <Tooltip describeChild title={props.location} arrow >
                            <div className="place dots">
                                <MdPlace className="place-icon"></MdPlace>
                                <span >&nbsp; {props.location}</span>
                            </div>
                        </Tooltip>
                        <Tooltip describeChild title={"$" + props.price.toLocaleString()} arrow>
                            <div className="price">
                                <span className="dots">{"$" + parseInt(props.price).toLocaleString()}</span>
                            </div>
                        </Tooltip>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Vacation;