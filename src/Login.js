import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('')
            setLoading(true);
            await login(email, password);
            history.push('/app/preview');
        } catch {
            setError('failed to log in');
        }

        setLoading(false);
    }

    return (
        <>
            <div>
                <h1>Login</h1>
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
                <div className='forgot-password'>
                    <Link to='/app/forgot' >
                        Forgot password
                    </Link>
                </div>
                <Link to='/app/register' >
                    Register instead
                </Link>
                <br/>
                <input disabled={loading} onClick={handleSubmit} type="submit" value="Login" />
            </div>
        </>
    )
}