/** 
 * Import banned words 
 * */
const {bannedWordsList,  allowedWordsList, ignoreBBCTitles} = require('../data/word-ignore-list.js');



/** Our Utility Module */
let textUtil = () => {

    let textArray;
    let bannedWordsListArray = bannedWordsList;
    let IgnoreBBCTitles = ignoreBBCTitles;
    let AllowedWordsList = allowedWordsList;

    function getTextArray() {
        return textArray;
    }

    function getIgnoreBBCTitles() {
        return IgnoreBBCTitles;
    }

    function setText(val) {
        textArray = val.replace(/\W+/g, " ").toLowerCase().split(" ");
    }

    function getPopularWords() {

        var wordAppearance = {}

        let IsThisWordAllowed = word.length > 4 ? true : AllowedWordsList.indexOf(word) === -1 ? false: true;


        textArray
          .forEach((word) => { 

            if (bannedWordsListArray.indexOf(word) == -1)

            ((word.length > 4 ? true : AllowedWordsList.indexOf(word) === -1 ? false: true) && bannedWordsListArray.indexOf(word) == -1) ? 
                wordAppearance[word] ? wordAppearance[word] + 1 : wordAppearance[word] = 1
                : '';
        });
        
    
        return wordAppearance;
    }

    function getLongestWords() {

        var wordAppearance = [];
        textArray
          .forEach((word) => { 
            (word.length > 4 
                && bannedWordsListArray.indexOf(word) == -1
                && wordAppearance.indexOf(word) == -1) ? 
                wordAppearance.push(word) 
                : '';
        });
        
    
        return wordAppearance[0];
    }

    return {
        setText,
        getTextArray,
        getPopularWords,
        getLongestWords,
        getIgnoreBBCTitles

    }

}
module.exports = textUtil();