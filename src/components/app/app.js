import React, { useState, useEffect } from 'react';
import MainSection from '../mainSection/mainSection.js'
import FormSection from '../formSection/formSection.js'
import './app.css';
import vacationsData from '../../Data/vacations.json'

const App = () => {
    const [vacations, setVacations] = useState([]);
    const [editing, setEditing] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [vacationToEdit, setVacationToEdit] = useState({});
    const [filter, setFilter] = useState("");
    let i = 0;

    const nextId = (vacations = []) => {
        let max = vacations.reduce((prev, curr) => prev.id > curr.id ? prev.id : curr.id, 0);
        return ++max;
    }

    const addToVacationsData = ({ id = null, name, location, price, imageUrl }) => {
        setVacations([
            ...vacations, {
                id: id !== null ? id : nextId(vacations),
                name: name,
                location: location,
                price: price,
                imageUrl: imageUrl
            }
        ])
    }

    useEffect(() => {
        const tempVacations = vacationsData.map(item => ({ id: item.id, name: item.name, location: item.location, price: item.price, imageUrl: item.imageUrl }));
        setVacations(tempVacations);
    }, [])

    const deleteVacation = (vacationIdToDelete) => {
        setVacations(vacations.filter(vacation => vacation.id !== vacationIdToDelete));
        setEditing(false);
        setDeleting(true);
    }

    const requestToEdit = (vacationIdToEdit) => {
        setEditing(true);
        setVacationToEdit(vacations.find(vacation => vacation.id === vacationIdToEdit));
    }

    const updateVacation = (newVacation) => {
        setEditing(false);
        setVacationToEdit({})
        setVacations(vacations.map(vacation => vacation.id != newVacation.id ? vacation : newVacation))
    }

    const cancelUpdateVacation = () => {
        setEditing(false);
        setVacationToEdit({})
    }

    const changeDeleteMode = () => {
        setDeleting(false)
    }

    const changeFilter = (filter) => {
        setFilter(filter)
    }

    return (
        <div className="app">
            <MainSection vacations={vacations} funcOnDelete={deleteVacation} funcOnEdit={requestToEdit} funcSetFilter={changeFilter} filter={filter} vacationRequestToEdit={vacationToEdit.id} ></MainSection>
            <FormSection vacationToEdit={vacationToEdit} editMode={editing} funcToUpdate={updateVacation} funcToCancel={cancelUpdateVacation} funcToAdd={addToVacationsData} deleteMode={deleting} changeDeleteMode={changeDeleteMode}></FormSection>
        </div>

    )

}
export default App;

