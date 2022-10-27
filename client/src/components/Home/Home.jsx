import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { filterDogsByTemperament, getDogs, getTemperaments, OrderByName, OrderByWeight } from './../../actions/index';
import {Link} from 'react-router-dom'
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';
import SearchBar from '../SearchBar/SearchBar';
import h from './h.module.css';


export default function Home (){

    const dispatch = useDispatch()
    const allDoggos = useSelector((state) => {return state.allDogs})
    const allTemperaments = useSelector(state => state.temperaments);
    // constantes para el paginado
    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDoggos.slice(indexOfFirstDog,indexOfLastDog)
    const [order, setOrder] = useState("");

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getDogs());
        dispatch(getTemperaments());
    },[dispatch]);
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1);
    }

    const handleFilterTemp = (e) => {
        e.preventDefault();    
        dispatch(filterDogsByTemperament(e.target.value));
        setCurrentPage(1);
    };

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
        setCurrentPage(1);
    };

    const handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(OrderByWeight(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
        setCurrentPage(1);
      };

    return (
        <div className={h.container}>
            <div className={h['arriba']}>
                <h2>Can't find the dog?
                <Link to= '/dogs'> Click here to add</Link></h2>
                    <h1 className={h.title}>Dog World🐾</h1>
                
            <div>
                <div className={h['select-container']}>
                <select className={h['select-box']} onChange={handleOrderByName}>
                    <option value= {null} hidden>Alphabetic Order 🔤</option>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select className={h['select-box']} onChange={handleOrderByWeight}>
                    <option value= {null} hidden>Find by weight ⚖</option>
                    <option value= 'min_weight'>Min weight</option>
                    <option value= 'max_weight'>Max weight</option>
                </select>
                <select className={h['select-box']} onChange={handleFilterTemp}>
                <option value= {null} hidden>Find by temperament 🎭</option>
                  <option value="All">All</option>
                  {
                    allTemperaments?.map(temp => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))
                  }
                </select>
                <button className={h['button-design']} onClick={e =>{handleClick(e)}}>
                    Refresh
                </button>
                </div>
                <SearchBar/>
                <Pagination
                dogsPerPage={dogsPerPage}
                allDoggos={allDoggos.length}
                pagination={pagination}
                />
            </div>
            </div>
                <div className={h['cards-container']}>
                {currentDogs?.map((dog) =>{
                    return(
                                <Card
                                    key={dog.id}
                                    id={dog.id}
                                    name={dog.name}
                                    img={dog.img}
                                    weight={dog.weight}
                                    temperaments={dog.temperaments}
                                    className={h['dog-card']}
                                />
                    )
                })}
                </div>
            
        </div>
    )

}