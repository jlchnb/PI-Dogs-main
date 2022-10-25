import React from 'react';
import CardStyles from './card.module.css';
import { Link } from 'react-router-dom';


export default function Card({id, name, img, weight, className, temperaments }) {
    return (   
        <div className={`${CardStyles['card-container']} ${className}`} >
            <div className={CardStyles['card-header']}>
                <h3 className={CardStyles['card-title']}>{name}</h3>
                <Link to={`/dogs/${id}`}>
                    <img className={CardStyles['card-img']} src={img} alt='dog-image'/>
                </Link>
            </div>
            <div className={CardStyles['card-details']}>
                <label><strong>Min Weight:</strong> {weight[0]+" kg "}
                <strong>|| Max Weight:</strong> {weight[1]+" kg"}</label>
            </div>
            <div className={CardStyles['card-temps']}>
                <label><strong>Temperament:</strong></label>
                <div>
                {
                    temperaments.map((temps) => <span key={temps+Math.random}>{temps} </span>)
                }
                </div>
            </div>
            
        </div>
    )
}