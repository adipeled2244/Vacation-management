import React, { Component } from 'react';
import Search from '../search/search.js'
import VacationList from '../vacationsList/vacationsList';
import '../mainSection/mainSection.css'

const MainSection = (props) => {
        return (
            <div className="main-section"> 
                <Search onSearch={props.funcSetFilter}></Search>
                <VacationList vacations={props.vacations} funcOnDelete={props.funcOnDelete} funcOnEdit={props.funcOnEdit} filter={props.filter} vacationRequestToEdit={props.vacationRequestToEdit}></VacationList> 
            </div>
        )
}
export default MainSection;

