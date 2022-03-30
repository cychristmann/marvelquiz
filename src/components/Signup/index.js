import React, {useState, useContext} from 'react';
import {FirebaseContext} from '../Firebase';
import {Link, useNavigate} from 'react-router-dom';

const Signup = () => {

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const navigate = useNavigate()
    const firebase = useContext(FirebaseContext);
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState('')


    

    
    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value });
    }

    const handleSubmit = e => {
        // empeche la page de se recharger à la validation du formulaire
        e.preventDefault();
        //destructuring 
        const {email, password, pseudo} = loginData;

        firebase.signupUser(email, password)
            //réponse de firebase par user
            .then(authUser => {
                return firebase.user(authUser.user.uid).set({
                    //on aurait pu faire pseudo, email, car ils sont identiques 
                    pseudo: pseudo,
                    email: email
                })
            })
            .then( () => {
                // on prend toutes les valeurs de l'objet data. on vide la variable d'état, l'objet loginData
                setLoginData({...data});
                navigate('/welcome');
                //props.history.push('/welcome');
            })
            .catch(error => {
                setError(error)
                setLoginData({...data});
            })

    }
    
    // gestion du bouton inscription. Le bouton est activé si le formulaire est correctement rempli.
    const {pseudo, email, password, confirmPassword} = loginData;

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword 
    ? <button disabled>Inscription</button> 
    : <button >Inscription</button>

    //gérer les erreurs
    const errorMsg = error !=='' && <span>{error.message}</span> 

    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className='formBoxLeftSignup'>

                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        {errorMsg}
                        <h2>Inscription</h2>

                        <form onSubmit={handleSubmit}>
                            
                            <div className='inputBox'>
                                <input onChange={handleChange} value={pseudo} type="text" id="pseudo" autoComplete='off' required/>
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className='inputBox'>
                                <input onChange={handleChange} value={email} type="email" id="email" autoComplete='off' required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className='inputBox'>
                                <input onChange={handleChange} value={password} type="password" id="password" autoComplete='off' required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className='inputBox'>
                                <input onChange={handleChange} value={confirmPassword} type="password" id="confirmPassword" autoComplete='off' required/>
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>

                            {btn}

                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/login">Déjà inscrit ? Connectez vous. </Link>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Signup
