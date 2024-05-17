import React, { useState, useEffect } from 'react';
import Item from "./Item";
import "../CSS/Info.css";
import { useParams } from 'react-router-dom';
import Api from '../Api';
import Tags from './Tags';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';

const Info = () => {
    const [infoState, setInfoState] = useState(null);
    const { id } = useParams(); // Gets ID From Params


    //Fetches Data for Page
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Api.get(`${id}`);
                console.log('Response:', response);
                
                //Shortcut Constants to grab relevant data.
                const videoData = response.data.items[0];
                const snippet = videoData.snippet;
                const statistics = videoData.statistics;
                
                //Gets Video Published Date
                const publishedDay = new Date(snippet.publishedAt);

                // Calculation of Views per Like
                const ViewLike = Math.round((statistics.viewCount / statistics.likeCount) * 10) / 10;

                //Get Current Date
                const currentDate = new Date();

                //Get Number of Days Video Has Been Live
                const difference = currentDate - publishedDay;

                //Makes difference into integer for calculations
                const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

                //Function to get Calculate Views Per Day from JSON
                function viewsPerDay(views, daysDifference) {
                return Math.floor(views / daysDifference);
                 } 

                //Function to get Calculate Comments Per Day from JSON
                function commentsPerDay(comments, daysDifference) {
                    return Math.floor(comments / daysDifference);
                }
                
                //Function to get Calculate Lkes Per Day from JSON
                function likesPerDay(likes, daysDifference) {
                    return Math.floor(likes / daysDifference);
                }

                const newInfoState = {
                    tags: snippet.tags,
                    title: snippet.title,
                    published: publishedDay.toLocaleDateString(),
                    channel: snippet.channelTitle,
                    likes: statistics.likeCount,
                    views: statistics.viewCount,
                    comments: statistics.commentCount,
                    "Views Per Like": ViewLike,
                    "Views Per Day": viewsPerDay(statistics.viewCount, daysDifference),
                    "Likes Per Day": likesPerDay(statistics.likeCount, daysDifference),
                    "Comments Per Day": commentsPerDay(statistics.commentCount, daysDifference),
                };
    
                setInfoState(newInfoState);
            } catch (error) {
                console.error('Error fetching video information:', error);
            }
        };
    
        fetchData();
    }, [id]);


    //If there is no state return loading.
    if (!infoState) {
        return <div className='maxWidth'><Spinner animation="border" variant="danger" /></div>;
       
    }

    //If there are no tags then do not display video tags
    const showTags = () => {
        if (infoState.tags === null) {
            return null;
        }
        
        return <Tags tags={infoState.tags}/>
    }
    

    // Rendering logic
    return (
        <div className='maxWidth'>
            <h4>Video Title</h4>
            <p>{infoState.title}</p>
            <p className='channel'>By {infoState.channel}</p>

            <h4>Video Stats</h4>

            <div className="flex">
            {Object.keys(infoState || {}).map((key) => {
    if (key !== 'title' && key !== "tags" && key !== 'channel') {
        let value = infoState[key];
        // Check if the value is an object
        if (typeof value === 'object') {
            // Extract a specific property or convert the object to a string
            value = value.someProperty; // Example: Extracting a specific property
            // value = JSON.stringify(value); // Example: Convert the object to a string
        }
        return (
            <Item key={key} label={key.charAt(0).toUpperCase() + key.slice(1)} value={value} />
        )
    }
    return null;
})}


            </div>
            <Accordion className='tagContainer'>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Tags</Accordion.Header>
            <Accordion.Body>
            {showTags()}
        </Accordion.Body>
            </Accordion.Item>
            </Accordion>
            
        </div>
    );
}

export default Info;
