import React from 'react';
import {Link} from 'react-router-dom';
import lp from '../LandingPage/lp.module.css'

export default function LandingPage(){
    return(
        <React.Fragment>
            <div className={lp.container}>
                <div className={lp.title}>
                    <h1>Welcome to Dog World</h1>
                </div>
                    <Link to ='/home'>
                        <button className={lp.btn}>Enter</button>
                    </Link>
            </div>
        </React.Fragment>
    )
}