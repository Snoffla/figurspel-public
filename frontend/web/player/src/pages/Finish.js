import React , { useState }from 'react';

import { CheckmarkCircleOutline } from 'react-ionicons'

function Finish({onBack}) {
    
    return (
        <div className='form justify-center'>
            <div className='d-flex align-center'>
                <CheckmarkCircleOutline color='#198754' height="25px" width="25px" className='me-2'/>
                <p className='m-0 text-center fs-5'>Ditt resultat har registrerats</p>
            </div>
            <a href='.' className='text-center d-block'>Registrera igen</a>
        </div>
    );
  }
  
export default Finish;