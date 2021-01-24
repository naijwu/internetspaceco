import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

export default function UpdateProfile() {

    const { currentUser, updatePassword, updateEmail } = useAuth();

    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();

        if(!(password === confirmPassword)) {
            return setError("Passwords do not match");
        }

        const promises = []; // ooh this is cool
        setLoading(true);
        setError('');
        if(email !== currentUser.email) {
            promises.push(updateEmail(email));
        }
        if(password) {
            promises.push(updatePassword(password));
        }

        Promise.all(promises).then(() => {
            history.push('/app/login');
        }).catch(() => {
            setError('Failed to update account. Try logging out and back in.');
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <div className='account-component'>
                <h1>Update Profile</h1>
                {error && (
                    <div className='error-alert'>
                        {error}
                    </div>
                )}
                <div className='input-group'>
                    <h3>Email</h3>
                    <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                </div>
                <div className='input-group'>
                    <h3>Password</h3>
                    <input type="text" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Leave blank to keep the same" />
                </div>
                <div className='input-group'>
                    <h3>Confirm Password</h3>
                    <input type="text" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Leave blank to keep the same" />
                </div>
                <div className='text-tray'>
                    <Link className='text-link' to='/app/preview'>
                        Cancel
                    </Link>
                </div>
                <div className='input-group'>
                    <input disabled={loading} onClick={handleSubmit} type="submit" value="Update" />
                </div>
            </div>
        </>
    )
}