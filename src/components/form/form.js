import React, { useState, useEffect } from 'react';
import '../form/form.css'
import { IoIosAdd, IoIosCheckmark, IoIosClose } from "react-icons/io";

const Form = (props) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [prevEditMode, setEditMode] = useState(false);

    const clearStateFields = () => {
        setId("");
        setName("");
        setLocation("");
        setPrice("");
        setImageUrl("");
        setErrorMsg("");
    }

    useEffect(() => {
        if (props.editMode && (props.editMode != prevEditMode || props.vacationToEdit.id != id)) {
            setId(props.vacationToEdit.id);
            setName(props.vacationToEdit.name);
            setLocation(props.vacationToEdit.location);
            setPrice(props.vacationToEdit.price);
            setImageUrl(props.vacationToEdit.imageUrl);
            setEditMode(true);

            if (errorMsg) {
                setErrorMsg("");
            }
        }
        if (props.deleteMode) {
            props.onAfterDelete();
            clearStateFields();
        }

    })

    const onValueChange = (eventChangeField, setter) => {
        setter(eventChangeField.target.value);

    }

    const save = () => {
        props.onSave({ id, name, location, price, imageUrl });
        clearStateFields();
    }

    const cancelSave = () => {
        props.onCancel();
        clearStateFields();
    }

    const validateInputs = () => {
        let errorMsgToSave = ""
        let counter = 1;
        if (name == "" || location == "" || price == "" || imageUrl == "") {
            if (counter == 1) {
                errorMsgToSave += "Please check the following:\n"
            }
            errorMsgToSave += `${counter++}. All fields are required !\n`
        }

        if (price < 0) {
            if (counter == 1) {
                errorMsgToSave += "Please check the following:\n"
            }
            errorMsgToSave += `${counter++}. Negative price is not valid !\n`

        }

        const validURL = (urlToCheck) => {
            var pattern = new RegExp('^(https?:\\/\\/)?' +
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
                '((\\d{1,3}\\.){3}\\d{1,3}))' +
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                '(\\?[;&a-z\\d%_.~+=-]*)?' +
                '(\\#[-a-z\\d_]*)?$', 'i');
            return !!pattern.test(urlToCheck);
        }

        if (!validURL(imageUrl) && imageUrl != "") {
            if (counter == 1) {
                errorMsgToSave += "Please check the following:\n"
            }
            errorMsgToSave += `${counter++}. Url is not valid!\n`
        }

        if (errorMsgToSave == "")
            return true;

        setErrorMsg(errorMsgToSave);

    }

    const add = () => {
        if (validateInputs()) {
            props.onAdd({ id: null, name: name, location: location, price: price, imageUrl: imageUrl });
            clearStateFields();
        }
        else {
            return;
        }
    }

    return (
        <form className={props.editMode ? "form" : "form form-add"} >
            <div className="form-title"> {props.editMode ? <div>Edit a Vacation</div> : <div>Add a New Vacation</div>}</div>

            <div className="all-input-elements">

                <div className="inputelement">
                    <label>Name</label>
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onValueChange(e, setName)} ></input>
                </div>
                <div className="inputelement">
                    <label>Location</label>
                    <input type="text" placeholder="Location" name="location" value={location} onChange={e => onValueChange(e, setLocation)}></input>
                </div>
                <div className="inputelement">
                    <label>Price</label>
                    <input type="number" placeholder="Price" name="price" value={price} onChange={e => onValueChange(e, setPrice)}></input>
                </div>
                <div className="inputelement">
                    <label>Image Url</label>
                    <input type="text" placeholder="Image Url" name="imageUrl" value={imageUrl} onChange={e => onValueChange(e, setImageUrl)}></input>
                </div>
                <div className="error-msg">{errorMsg}</div>

            </div>
            <div className="form-buttons">{props.editMode ?
                <div><IoIosClose className="cancel-button" onClick={cancelSave}/><IoIosCheckmark className="check-button" onClick={save}/>  </div> :
                <IoIosAdd className='plus-button' onClick={add}/>}
            </div>
        </form>
    )
}
export default Form;