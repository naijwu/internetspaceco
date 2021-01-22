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
            history.push('/login');
        }).catch(() => {
            setError('failed to update account. Try logging out and back in');
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <>
            <div>
                <h1>Update Profile</h1>
                {error && (
                    <div className='error-alert'>
                        {error}
                    </div>
                )}
                email:
                <input type="text" value={email} onChange={e=>setEmail(e.target.value)} />
                <br/>
                password:
                <input type="text" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Leave blank to keep the same" />
                <br/>
                confirm password:
                <input type="text" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} placeholder="Leave blank to keep the same" />
                <br/>
                <input disabled={loading} onClick={handleSubmit} type="submit" value="Update" />
                <Link to='/app/preview'>
                    Cancel
                </Link>
            </div>
        </>
    )
}