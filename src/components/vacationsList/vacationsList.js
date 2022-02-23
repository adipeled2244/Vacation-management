import React from 'react';
import '../vacationsList/vacationsList.css'
import Vacation from '../vacation/vacations';

const VacationList = (props) => {

    const createOneVacation = (vacation, keyIterator) => {
        return <Vacation key={keyIterator} index={vacation.id} imageUrl={vacation.imageUrl} name={vacation.name} location={vacation.location} price={vacation.price} onDelete={props.funcOnDelete} onEdit={props.funcOnEdit} onReqEdit={props.vacationRequestToEdit}>
        </Vacation>
    }

    const renderVacations = (filter) => {
        let resultVacations;
        let filterVacations = props.vacations.filter((vacation) => {
            if (vacation.name.toLowerCase().includes(filter.toLowerCase()) || vacation.location.toLowerCase().includes(filter.toLowerCase())) {
                return true;
            }
            else {
                return false;
            }
        });
        resultVacations = props.vacations.map((vacation, keyIterator) => {
            if (filter == "") {
                return createOneVacation(vacation, keyIterator);
            }

            else if (vacation.name.toLowerCase().includes(filter.toLowerCase()) || vacation.location.toLowerCase().includes(filter.toLowerCase())) {
                return createOneVacation(vacation, keyIterator);
            }

        })

        if (filterVacations.length > 0) {
            return resultVacations;
        }
        else {
            return <p> &#9992; Sorry, no search results are found for: "{props.filter}" &#128532; </p>
        }
    }

    return (
        <div className="vacations-list">
            {renderVacations(props.filter)}
        </div>
    )
}

export default VacationList;