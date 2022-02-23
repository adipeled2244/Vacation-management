import React from 'react';
import Form from '../form/form.js'
import './formSection.css';

const FormSection = (props) => {
    return (
        <div className="form-section">
            <Form vacationToEdit={props.vacationToEdit} editMode={props.editMode} onSave={props.funcToUpdate} onCancel={props.funcToCancel} onAdd={props.funcToAdd} deleteMode={props.deleteMode} onAfterDelete={props.changeDeleteMode}></Form>
        </div>
    )
}
export default FormSection;

