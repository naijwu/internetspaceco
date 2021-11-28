import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { database } from './firebase';
import SocialLink from './components/SocialLink';
import WebsiteLink from './components/WebsiteLink';

// TODO: Fix the issue that Firebase doesn't recognize :user_name
// Immediate TODO: Fix up UI so I can actually navigate the site lol

export default function Profile() {

    const params = useParams();

    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [uid, setUid] = useState('');

    const [websites, setWebsites] = useState([]); // {img: 'img url', name: 'link name', link: '',}
    const [socials, setSocials] = useState([]);

    // TODO: Add support for profile pictures (at EDITOR side)
    const [pfpURL, setPfpURL] = useState('');
    const [bgpURL, setBgpURL] = useState('');

    // OPTIONS baby
    const [pageAlign, setPageAlign] = useState('');
    const [colourBackground, setColourBackground] = useState('#FFFFFF');
    const [colourContainer, setColourContainer] = useState('#FFFFFF');
    const [colourBox, setColourBox] = useState('#FFFFFF');
    const [colourText, setColourText] = useState('#000000');

    // print params to console
    console.log(params.user_name);

    useEffect(() => {
        database.collection('pages').doc(params.user_name).get().then((doc) => {
            let profileData = doc.data();

            if (!doc.exists) {
                console.log("Page doesn't exist G");
            } else if (doc.exists) {
                setUid(profileData.user_id ? profileData.user_id : '');

                setName(profileData.data.name ? profileData.data.name : '');
                setBio(profileData.data.biography ? profileData.data.biography : '');

                setSocials(profileData.socialsData ? profileData.socialsData : {});
                setWebsites(profileData.websitesData ? profileData.websitesData : {});

                setPfpURL(profileData.images.profile ? profileData.images.profile : '');
                setBgpURL(profileData.images.background ? profileData.images.background : '');

                setPageAlign(profileData.options.align ? profileData.options.align : '')
                setColourBackground(profileData.options.colour_bg ? profileData.options.colour_bg : '')
                setColourContainer(profileData.options.colour_container ? profileData.options.colour_container : '')
                setColourBox(profileData.options.colour_box ? profileData.options.colour_box : '')
                setColourText(profileData.options.colour_text ? profileData.options.colour_text : '')
            } else {
                console.log("Something went wrong"); // TODO: Graphically show the errors
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

    }, [params]);

    
    const displaySocials = () => {
        let returnData = [];

        for (let item in socials) {
            returnData.push(
                <SocialLink
                    key={item}
                    url={socials[item]} />
            )
        }

        return returnData;
    }

    const displayWebsite = () => {
        let returnData = [];

        for (let item in websites) {
            if(websites[item].url && websites[item].title) {
                returnData.push(
                    <WebsiteLink
                        colour={colourBox}
                        key={item}
                        id={item}
                        url={websites[item].url}
                        title={websites[item].title} />
                );

            }
        }

        return returnData;
    }


    // TODO: Check if user is signed in; if signed in, check if UID matches UID of doc, if does, show option to edit 

    return (
        <div 
          className={`profile-container-wrapper ${pageAlign} prod`} 
          style={{ backgroundColor: colourBackground }}>
            <div 
              className={`profile-container ${((bgpURL && !pfpURL) ? 'bg-alone' : '') || ((pfpURL && !bgpURL) ? 'pf-alone' : '') || ((!pfpURL && !bgpURL) ? 'none' : '')}`}
              style={{
                background: bgpURL ? colourContainer : 'transparent',
                color: colourText
              }}>
                <div className='profile'>
                    <div className='photos'>
                        <img className='bgp' src={bgpURL} alt="background" />
                        <img className='pfp' src={pfpURL} alt="profile" />
                    </div>
                    <div className='info'>
                        <h3>{name}</h3>
                        <p>{bio}</p>
                    </div>
                    <div className='socials'>
                        {socials && displaySocials()}
                    </div>
                    <div className='links'>
                        {websites && displayWebsite()}
                    </div>
                </div>
            </div>
        </div>
    );
}