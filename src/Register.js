import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { database } from './firebase';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    const { register, currentUser } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        if(!(password === confirmPassword)) {
            return setError("Passwords do not match");
        }

        try {
            setError('')
            setLoading(true);
            let registeredUser = await register(email, password);

            if(registeredUser.user) {

                // create document with the account's UUID under users collection
                // TODO: Insecure, maybe have a verification process via email
                database.collection("users").doc(registeredUser.user.uid).set({
                    pages: [],
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }


            history.push('/app/login')
        } catch {
            setError('failed to create an account');
        }

        setLoading(false);
    }

    return (
        <>
            <div>
                <h1>Register</h1>
                {error && (
                    <div className='error-alert'>
                        {error}
                    </div>
                )}
                email:
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                <br/>
                password:
                <input type="text" value={password} onChange={e=>setPassword(e.target.value)} />
                <br/>
                confirm password:
                <input type="text" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
                <br/>
                <input disabled={loading} onClick={handleSubmit} type="submit" value="Sign Up" />
                <br />
                <Link to='/app/login' >
                    Login Instead
                </Link>
            </div>
        </>
    )
}