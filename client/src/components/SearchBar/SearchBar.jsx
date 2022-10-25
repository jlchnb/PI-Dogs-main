import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../actions/index";
import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setname] = useState("");

    function handleInput(e) {
        e.preventDefault(e)
        setname(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        if(name !== '' && isNaN(name)){
            dispatch(getBreed(name));
            setname("")
        }else{
            alert("Please submit an existing dog breed")
        }
    }

    return(
        <div className={style.searchbar_container}>
            <input className={`${style.searchbar}`} type="text" onChange={handleInput} placeholder="Search Breed..." value={name}/>
            <button className={`${style.searchbar_button}`} type="submit" onClick={handleSubmit}>
                Go
            </button>
        </div>
    )
}