import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function ForgotPass() {

    const [email, setEmail] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const { resetPassword } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage('');
            setError('')
            setLoading(true);
            await resetPassword(email);
            setMessage('check inbox for further instructions g');
        } catch {
            setError('failed to reset password');
        }

        setLoading(false);
    }

    return (
        <>
            <div>
                <h1>Password Reset</h1>
                {error && (
                    <div className='error-alert'>
                        {error}
                    </div>
                )}
                {message && (
                    <div className='message-alert'>
                        {message}
                    </div>
                )}
                email:
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                <br/>
                <Link to='/app/login' >
                    Go to login
                </Link>
                <br/>
                <input disabled={loading} onClick={handleSubmit} type="submit" value="Forgot Password" />
            </div>
        </>
    )
}