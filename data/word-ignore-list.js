const bannedWordsList = [
'being', 'from', 'have', 'with', "which", "this","been","where", "into",
'that', 'their', 'what', 'about', "there", "when", "still", "these","undefined",
'into', 'than', 'more', 'will', 'since', 'doing', 'last', 'just',
'could', 'should', 'would', 'year','cleared', 'first', 'said', 
'xwartsplitter', 'them', 'because', 'bold', 'images', 'other', 'before', 
'title', 'told', 'only', 'volt', 'names', 'most', 'also', 'column', 
'washingtonpost', 'content', 'some', 'after', 'they', "would","were","over", "your",
"bloc", "used", "else", "says", "wrote", "former", "second", "motdx"];

const ignoreBBCTitles = [
    'bbc news at ten',
    'bbc news channel'
];

const allowedWordsList = [
    'god', 
    'nasa', 
    'sex', 
    'usa'
];
module.exports = {bannedWordsList,  allowedWordsList, ignoreBBCTitles};