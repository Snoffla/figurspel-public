import React, { useState} from 'react';

import { ChevronForwardOutline } from 'react-ionicons'
import { getPlayerByEmail } from '../util/server/players';

export default function EmailInput({onSubmit}) {
    const [email, setEmail] = useState('');

    function emailChange(event){
        setEmail(event.target.value);
    }

    function submitEmail(){
        getPlayerByEmail(email).then((player) => {
            if(player.id){
                onSubmit(player);
            }else{
                onSubmit({email: email});
            }
        }).catch((err) =>{});
    }

    function onKeyUp(e){
        if (e.keyCode === 13) {
            submitEmail();
        }
    }
   
    return (
        <div className='form'>
                <div className="mb-3">
                    <div className="form-floating">
                        <input type="email" className="form-control" id="codeInput" onChange={emailChange} onKeyUp={onKeyUp}/>
                        <label htmlFor="codeInput">Spelarens e-post</label>

                        {!validateEmail(email) &&
                            <div className="form-feedback error">
                            Ange epost
                            </div>
                        }
                            
                    </div>
                </div>

                <button onClick={submitEmail} className="btn btn-lg btn-primary d-block m-auto" disabled={!validateEmail(email)}>
                    <span>Fortsätt  </span>
                    <ChevronForwardOutline color={'#fff'} height="25px" width="25px" />
                </button>
        </div>
    );
}

const validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
}