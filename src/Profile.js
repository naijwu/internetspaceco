import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database } from './firebase';

export default function Profile() {

    const params = useParams();

    const [title, setTitle] = useState('');
    const [uid, setUid] = useState('');

    // print params to console
    console.log(params.user_name);

    useEffect(() => {
        
        database.collection('pages').doc(params.user_name).get().then((doc) => {
            let profileData = doc.data();

            if (!doc.exists) {
                console.log("Page doesn't exist G");
            } else if (doc.exists) {
                setTitle(profileData.title);
                setUid(profileData.user_id ? profileData.user_id : 'n/a')
            } else {
                console.log("Something went wrong");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }, [params]);

    return (
        <div className='profile'>
            <h1>Title: {title}</h1>
            <h2>Created by user with user ID: {uid} </h2>
        </div>
    );
}