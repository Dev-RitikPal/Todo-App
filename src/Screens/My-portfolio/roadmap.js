import React from "react";

import './roadmap.css'

export const Roadmap = () => {
    return(
        <>
<h2>What i can do</h2>
<div className="timeline"> 
  <div className="timeline__event  animated fadeInUp delay-3s timeline__event--type1 w-75">
    <div className="timeline__event__icon ">
    <i className="fas fa-code text-dark"></i>
    </div>
    <div className="timeline__event__date">
      Web Design
    </div>
    <div className="timeline__event__content ">
      <div className="timeline__event__title">
      Cretive Designing
            </div>
      <div className="timeline__event__description">
        <p>Disigns static and dynamic page using HTML, CSS</p>
      </div>
    </div>
  </div>

  <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3 w-75">
    <div className="timeline__event__icon">
    <i className="fal fa-phone-laptop text-dark"></i>
     </div>
    <div className="timeline__event__date">
      Responsive
    </div>
    <div className="timeline__event__content">
      <div className="timeline__event__title">
      Responsive Designing      </div>
      <div className="timeline__event__description">
        <p>Creating Platform supporting UI accordingly.</p>
      </div>

    </div>
  </div>

  <div className="timeline__event animated fadeInUp timeline__event--type1  w-75">
    <div className="timeline__event__icon">
    <i className="fab fa-react text-dark"></i>
    </div>
    <div className="timeline__event__date">
      React.js
    </div>
    <div className="timeline__event__content">
      <div className="timeline__event__title">
       React js / React Native
      </div>
      <div className="timeline__event__description">
        <p>Expert in React.</p>
      </div>
    </div>
  </div>

  <div className="timeline__event animated fadeInUp delay-1s timeline__event--type3  w-75">
    <div className="timeline__event__icon">
    <i className="fab fa-python text-dark"></i>
    </div>
    <div className="timeline__event__date">
      Python
    </div>
    <div className="timeline__event__content">
      <div className="timeline__event__title">
        Python Programming language
      </div>
      <div className="timeline__event__description">
        <p>Expert in python programming language. Building restfull api's, creating database. <br/> Some Importent libraries like Numpy, Panda, Matplotlib</p>
      </div>
    </div>
  </div>

  <div className="timeline__event animated fadeInUp timeline__event--type1  w-75">
    <div className="timeline__event__icon">
    <i className="fas fa-database text-dark"></i>
    </div>
    <div className="timeline__event__date">
      Database
    </div>
    <div className="timeline__event__content">
      <div className="timeline__event__title">
        Sql, Mysql, Mongodb
      </div>
      <div className="timeline__event__description">
        <p>Can Work on Sql or Mysql. <br/>Also a basic knowledge Mongodb</p>
      </div>
    </div>
  </div>
</div>
       

</>
    )
}