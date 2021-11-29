import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Editor from './Editor';
import { database } from './firebase';

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
)

export default function Preview() {
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    const [needSetup, setNeedSetup] = useState(false);
    const [needPreSetup, setNeedPreSetup] = useState(false);

    const [pages, setPages] = useState({});
    const [pageData, setPageData] = useState({});
    const [pageDataLoaded, setPageDataLoaded] = useState(false);

    const [usedCreate, setUsedCreate] = useState(false);

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

                    database.collection('pages').doc(`${docData.pages[0]}`).get().then((pageDoc) => {
                        let page = pageDoc.data();

                        setPageData(page);
                        setPageDataLoaded(true);

                    }).catch(function(err) {
                        console.log("Error reading the user's document:", err);
                    });

                } else if (docData.pages[0] === undefined) {
                    // if there doesn't exist -- SETUP
                    
                    setNeedSetup(true);
                }
            } else {
                // doc.data() will be undefined in this case
                console.log("Something went wrong");
            }
        }).catch(function(error) {
            // TODO: Make the error appear 
            console.log("Error getting document:", error);
        });

    }, [currentUser]);

    function handleSetup(e) {
        e.preventDefault();

        setError('');
        setMessage('');
        
        let allowedAction = (needSetup) && (!needPreSetup) && newPageName;
        let cleanedNewPageName = newPageName.replace(/ /g, '-').replace(/#|@|\/|\.|\\|!|~|\||\+|\?|\^|&|\*|\(|\)|<|>|\{|\}|`|;/g, '').substring(0, 20);

        if(allowedAction) {

            database.collection('pages').doc(cleanedNewPageName).get().then((doc) => {
                if(doc.exists) {
                    setError('Error creating - Name already exists');
                } else {
                    database.collection("users").doc(currentUser.uid).set({
                        pages: [cleanedNewPageName]
                    })
                    .then(function() {
    
                        let dataConstruct = {
                            user_id: currentUser.uid,
                            data: {
                                biography: '',
                                name: ''
                            },
                            images: {
                                background: '',
                                profile: ''
                            },
                            socialsData: {},
                            websitesData: {}
                        };
    
                        database.collection("pages").doc(cleanedNewPageName).set(dataConstruct)
                        .then(function() {
                            setMessage(`Document successfully written! Link: /${cleanedNewPageName}`);
                            setUsedCreate(true);
                            history.go(0);
                        })
                        .catch(function(error) {
                            setError("Error writing document: " + error);
                        });
    
    
                    }).catch(function(err) {
                        setError("Error writing name of page under users collection: " + err);
                    })
    
                }
            });

        } else {
            setError('Error creating - already have a page or need to fill in name!')
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
        <div className='preview'>
            {(needSetup) && (
                // User need setup
                <>
                    <div className='setup'>
                        <div className='account-bar'>
                            Logged In as {currentUser.email}
                        </div>
                        {(message) && (
                            <div className='gospel-alert'>
                                {message}
                            </div>
                        )}
                        {(error) && (
                            <div className='error-alert'>
                                {error}
                            </div>
                        )}
                        <div className='setup-inner'>
                            <h2>Welcome!</h2>
                            <p>
                                Set your URL. Make sure you like it-you can't change it after!
                            </p>
                            <div className='setup-input'>
                                internetspace.co/<input value={newPageName} onChange={e=>setNewPageName(e.target.value.toLowerCase())} type="text" />
                            </div>
                            <h3>Your URL will look like this:</h3>
                            <div className='setup-input-demo'>
                                internetspace.co/{newPageName.replace(/ /g, '-').replace(/#|@|\/|\.|\\|!|~|\||\+|\?|\^|&|\*|\(|\)|<|>|\{|\}|`|;/g, '').substring(0, 20)}
                            </div>
                            <input type="submit" disabled={usedCreate} value="Create Page" onClick={handleSetup} />
                        </div>
                    </div>
                </>
            )}

            {(!needSetup && !needPreSetup) && (
                <>
                    <div className='editor'>
                        <Editor
                            loaded={pageDataLoaded}
                            pageURL={pages.pages ? pages.pages[0] : ''}
                            recentState={pageData}
                            
                            // "logged in as..."
                            email={currentUser.email}
                            pages={pages} />
                    </div>
                </>
            )}

            <div className='sidebar'>
                <h1 style={{ userSelect:"none" }}>🌌</h1>
                
                {/* <Link className='button' to='/app/update'>
                    Edit Profile
                </Link> */}
                <Link className='circle-button' onClick={handleLogout}>
                    <LogoutIcon />
                </Link>
            </div>
        </div>
    )
}