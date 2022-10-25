import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { showDogDetails, clearData } from "../../actions/index";
import style from "./DogDetails.module.css";
import { Link } from "react-router-dom";

export default function DogDetails(){
    const dispatch = useDispatch();
    const details2 = useSelector((state) => state.details)
    let { id } = useParams();

    useEffect(() => {
        dispatch(showDogDetails(id));
        return () => dispatch(clearData())
    }, [dispatch, id]);

    if(!details2){
        return null;
    }

      let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog;

      if(details2[0]){
          nameDog = details2[0].name;
          imageDog = details2[0].img;
          heightDog = details2[0].height;
          weightDog = details2[0].weight;
          lifeSpanDog = details2[0].years;
          if(!details2[0].temperaments){
            temperamentDog = [...details2[0].temperaments]
          }
    
      if (details2[0].temperaments[0]) {
          temperamentDog = [...details2[0].temperaments]
      }

      if (details2[0].temperaments[0].name) {
          temperamentDog = details2[0].temperaments.map(temp => temp.name)
      }
  };

    return (
        <div className={`${style.main_container}`}>
            <Link to="/home">
                <button className={`${style.button_home}`}>Home</button>
            </Link>
            <div className={`${style.sub_container}`}>
                    <div className={`${style.container_elements}`}>

                        <div className={`${style.image_container}`}>
                            <img src={imageDog} alt={`imagen de ${nameDog}`}/>
                        </div>
                        
                        <div className={`${style.right_container}`}>
                            <h1>{nameDog}🐾</h1>
                            <h3>{`Height: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} CM`}</h3>
                            <h3>{`Weight: ${heightDog &&  weightDog[0]} - ${weightDog && weightDog[1]} KG`}</h3>
                            <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                            <div>
                                <h3>Temperaments</h3>
                                <ul className={`${style.list_container}`}>
                                    {temperamentDog.map(t => <li key={t}>{t}</li>)}
                                </ul>
                            </div>
                        </div>   
                </div>
            </div>
        </div>
    )
}