import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { FirebaseContext } from '../Firebase';

const ForgetPassword = () => {

    const [email, setEmail] = useState('');
    const firebase = useContext(FirebaseContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [success, setSucess] = useState(null);
    


    const handleSubmit = e => {
        e.preventDefault();
        firebase.passwordReset(email)
            .then(() => {
                setError(null);
                setSucess(`Consultez votre email: ${email} pour changer le mot de passe`)
                setEmail('')
                setTimeout(() => {
                    navigate('/login')
                }, 5000)
                
            })
            .catch( error => {
                setError(error)
                setEmail('')
            })
    }

    const disabled = email === '';


    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className='formBoxLeftForget'>

                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {success && <span style={{border: "1px solid green", background: "green", color: "white"}}>
                            {success}
                        </span> }

                        {error && <span>{error.message}</span> }

                        <h2>Récupération de mot de passe</h2>

                        <form onSubmit={handleSubmit}>
                            
                            <div className='inputBox'>
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email"  autoComplete='off' required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled} >Récupérer</button>

                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/login">Déjà inscrit ? Connectez vous.</Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword