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
    console.log(allTemperaments)
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
    }

    const handleFilterTemp = (e) => {
        e.preventDefault();    
        dispatch(filterDogsByTemperament(e.target.value));
    };

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
    };

    const handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(OrderByWeight(e.target.value));
        setOrder(`Ordenado ${e.target.value}`);
      };

    return (
        <div className={h.container}>
            <h2>Can't find the dog?
            <Link to= '/dogs'> Click here to add</Link></h2>
            <h1 className={h.title}>Doggos🐾</h1>
            <button onClick={e =>{handleClick(e)}}>
                Refresh 
            </button>
            <div>
                <select onChange={handleOrderByName}>
                    <option value="A-Z">A-Z</option>
                    <option value="Z-A">Z-A</option>
                </select>
                <select onChange={handleOrderByWeight}>
                    <option value= {null} hidden>Filter by weight</option>
                    <option value= 'min_weight'>Min weight</option>
                    <option value= 'max_weight'>Max weight</option>
                </select>
                <select onChange={handleFilterTemp}>
                  {/* <option disabled selected defaultValue>Temperaments</option> */}
                  <option value="Todos">All</option>
                  {
                    allTemperaments?.map(temp => (
                        <option value={temp.name} key={temp.id}>{temp.name}</option>
                    ))
                  }
                </select>
                <select>
                    <option value='All'>All</option>
                    <option value='created'>Created</option>
                    <option value='api'>Existing</option>
                </select>
                <Pagination
                dogsPerPage={dogsPerPage}
                allDoggos={allDoggos.length}
                pagination={pagination}
                />
                <SearchBar/>
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
        </div>
    )

}