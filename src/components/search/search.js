import React, { useState } from 'react';
import '../search/search.css'
import { MdOutlineSearch } from "react-icons/md";
import './search.css'

const Search = (props) => {
    const [valueToSearch, setValueToSearch] = useState("");

    const search = () => {
        props.onSearch(valueToSearch);
    }

    const onValueChange = (eventChangeSearchField) => {
        setValueToSearch(eventChangeSearchField.target.value);
    }

    return (
        <div className="search">
            <input type="text" placeholder="&#x1F50E;&#xFE0E; Search by name or location" onChange={onValueChange}></input>
            <div className="hover-search"><MdOutlineSearch className="search-button" onClick={search} /></div>
        </div>
    )
}
export default Search;

