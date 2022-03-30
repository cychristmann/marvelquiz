import React, {useState, useEffect, useContext} from 'react'
import {FirebaseContext} from '../Firebase';
import {Link, useNavigate} from 'react-router-dom';

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [btn, setBtn] = useState(false)
    const firebase = useContext(FirebaseContext);
    const navigate = useNavigate()
    const [error, setError] = useState('')

    useEffect(() => {
        if (password.length > 5 && email !=='' ){
            setBtn(true)
        }else if (btn === true){
            setBtn(false) 
        }
        // si les variables d'états password email btn changent on relance useEffect
    }, [password, email, btn])

    const handleSubmit = e => {
        // empeche la page de se recharger à la validation du formulaire pour ne pas perdre les variables d'états
        e.preventDefault();
        firebase.loginUser(email, password)
            .then (user => {
                setPassword('');
                setEmail('');
                navigate('/welcome');
            })
            .catch(error => {
                setError(error)
                setPassword('');
                setEmail('');
                
            })
    }

    return (
        <div className='signUpLoginBox'>
            <div className="slContainer">
                <div className='formBoxLeftLogin'>

                </div>
                <div className='formBoxRight'>
                    <div className='formContent'>
                        
                        <h2>Connexion</h2>

                        <form onSubmit={handleSubmit}>
                            {error !=='' &&  <span>{error.message}</span> }
                            <div className='inputBox'>
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email"  autoComplete='off' required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className='inputBox'>
                                <input onChange={e => setPassword(e.target.value)} value={password} type="password" autoComplete='off' required/>
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {btn ? <button >Connexion</button> : <button disabled>Connexion</button> }

                        </form>
                        <div className='linkContainer'>
                            <Link className='simpleLink' to="/signup">Nouveau sur Marvel quiz? Inscrivez vous. </Link><br/>
                            <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié ? Récupérez-le en cliquant ici </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login