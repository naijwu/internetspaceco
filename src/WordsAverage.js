import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WordsAverage = (props) => {

    const [words, updateWords] = useState('');
    const [averageWords, updateAverageWords] = useState(0);

    useEffect(() => {

        let wordsInArr = words.split(" ");

        let wordsInArrFiltered = [];

        wordsInArr.forEach((item) => {
            if((item !== "") && (item !== "↵")) {
                wordsInArrFiltered.push(item);
            }
        })

        let totalCharacters = 0;

        wordsInArrFiltered.forEach((item) => {
            totalCharacters += item.length;
        });

        let average = totalCharacters / wordsInArrFiltered.length;

        updateAverageWords(average);
        
    })

    return (
        <div className='container'>

            <div className='lawrence'>
                <input type="text" value={words} onChange={(e) => updateWords(e.target.value)}>
                </input>
                <div>
                    Average: {averageWords.toFixed(2)}
                </div>
            </div>
        </div>
    );
}

export default WordsAverage