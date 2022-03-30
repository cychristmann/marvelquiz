import React, {useState, useEffect, useContext} from 'react';
import {FirebaseContext} from '../Firebase';
import ReactTooltip from 'react-tooltip';

const Logout = () => {

    const firebase = useContext(FirebaseContext);
    const [checked, setChecked] = useState(false)

    const handleChange = event => {
        setChecked(event.target.checked)
    }

    useEffect(() => {
        if (checked){
            firebase.signoutUser();
        }
    
    }, [checked, firebase])
    

    return (
        <div className='logoutContainer'>
                
                <label className='switch' >
                    <input
                        onChange={handleChange}
                        type="checkbox"
                        checked ={checked}
                    />
                    <span className='slider round' data-tip="Déconnexion"></span>
                </label>
                <ReactTooltip place='left' effect='solid'/>
        </div>
    )
}

export default Logout


