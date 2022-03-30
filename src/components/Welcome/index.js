import React, {useState, Fragment, useContext, useEffect} from 'react';
import {FirebaseContext} from '../Firebase';
import Logout from '../Logout';
import Quiz from '../Quiz';
import {useNavigate} from 'react-router-dom';
import Loader from '../Loader';


const Welcome = () => {

    const [userSession, setUserSession] = useState(null);
    const firebase = useContext(FirebaseContext);
    const navigate = useNavigate()
    const [userData, setUserData] = useState({})

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user): navigate('/')
        })
        // !!userSession veut dire userSession différent de null
        if(!!userSession){
                firebase.user(userSession.uid)
                .get()
                .then( doc => {
                    if (doc && doc.exists){
                        const myData = doc.data()
                        setUserData(myData)
                    }
                })
                .catch( error => {
                    console.log(error)
                })

        }

        
        return () => {
            listener()
        }
    }, [userSession])
    

    return userSession === null ? (
        <Loader 
            loadingMsg={"Authentification ..."}
            styling= {{textAlign: 'center', color: '#ffffff'}}
        />
    ) : (
        <div className='quiz-bg'>
            <div className='container'> 
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    )

}

export default Welcome
