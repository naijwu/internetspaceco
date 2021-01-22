import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { database } from './firebase';

export default function Preview() {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const [needSetup, setNeedSetup] = useState(false);
    const [needPreSetup, setNeedPreSetup] = useState(false);

    const [pages, setPages] = useState({});

    const [newPageName, setNewPageName] = useState('');

    useEffect(() => {

        // pulling data from the firebase (this data should've been created during reg)
        // if doc's value = null, enter pre-setup (need to create doc w/ user's ID under 'users' collection) 
        // if doc's value = dummy, enter setup
        // if doc's value = 1, show preview + regular controls
        setNeedPreSetup(false);
        setNeedSetup(false);
        database.collection('users').doc(currentUser.uid).get().then((doc) => {
            if (!doc.exists) {
                // PRE-SETUP
                
                setNeedPreSetup(true);
            } else if (doc.exists) {
                // SETUP (first-time) or DASHBOARD

                let docData = doc.data();
                setPages(docData);

                console.log('docdata: ' + docData.pages[0]);
                if(docData.pages[0]) {
                    // if there exists -- DASHBOARD

                    setNeedSetup(false);
                } else if (docData.pages[0] === undefined) {
                    // if there doesn't exist -- SETUP
                    
                    setNeedSetup(true);
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("Something went wrong");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }, [currentUser])

    function handleSetup(e) {
        e.preventDefault();

        let isDuplicate = false;

        database.collection('users').doc(newPageName).get().then((doc) => {
            if(doc.exist) {
                isDuplicate = true;
            } else {
                isDuplicate = false;
            }
        });
        
        let allowedAction = (needSetup) && (!needPreSetup) && !isDuplicate;
        console.log("is duplicate: " + isDuplicate);

        if(allowedAction) {
            database.collection("pages").doc(newPageName).set({
                title: 'new page',
                user_id: currentUser.uid,
            })
            .then(function() {
                setMessage(`Document successfully written! Link: /${newPageName}`);
            })
            .catch(function(error) {
                setMessage("Error writing document: ", error);
            });
        }
    }

    async function handleLogout() {
        setError('');

        try {
            await logout();
            history.push('/')
        } catch {
            setError('Failed to log out');
        }
    }

    return (
        <>
            {error && (
                <div className='error-alert'>
                    {error}
                </div>
            )}
            Logged In as {currentUser.email}

            {(needSetup) && (
                // User need setup
                <div className='setup'>
                    <h2>You're in setup</h2>
                    Your url:<br/>
                    internetspace.co/<input value={newPageName} onChange={e=>setNewPageName(e.target.value)} type="text" />
                    <br/>
                    <input type="submit" value="Create Page" onClick={handleSetup} />
                </div>
            )}

            {(!needSetup && !needPreSetup) && (
                <div className='main'>
                    <h2>You're in main page</h2>
                    <p>
                        Page that belongs to you: {pages.pages}
                    </p>
                </div>
            )}

            <div className='actions'>
                {(message) && (
                    <div className='message-alert'>
                        {message}
                    </div>
                )}
                <Link to='/app/update'>
                    Update Profile
                </Link>
                <button onClick={handleLogout}>
                    Log out
                </button>
            </div>
        </>
    )
}