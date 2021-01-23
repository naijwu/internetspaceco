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
            setMessage('Check inbox for further instructions g');
        } catch {
            setError('Failed to reset password');
        }

        setLoading(false);
    }

    return (
        <>
            <div className='account-component'>
                <h1>Forgot Password</h1>
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
                <div className='input-group'>
                    <h3>Email</h3>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className='text-tray'>
                    <Link className='text-link' to='/app/login' >
                        Go to login
                    </Link>
                </div>
                <div className='input-group'>
                    <input disabled={loading} onClick={handleSubmit} type="submit" value="Reset Password" />
                </div>
            </div>
        </>
    )
}