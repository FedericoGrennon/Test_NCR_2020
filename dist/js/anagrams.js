const SearchSubString = (completeString, searchString) => {
    const regx = new RegExp(searchString.toLowerCase(), 'g');
    const matching = completeString.toLowerCase().match(regx);

    return matching ? matching.length : 0;
}

const btnStart = document.getElementById('btnStart');
btnStart.addEventListener('click', () => {
    const txtCompleteString = document.getElementById('txtCompleteString');
    const txtShortString = document.getElementById('txtShortString');

    const completeString = txtCompleteString.value;
    const searchableString = txtShortString.value;

    const RESULT = SearchSubString(completeString, searchableString);
    alert(`La palabra '${searchableString}' aparece ${RESULT} ${RESULT == 1 ? 'vez' : 'veces'} en la frase '${completeString}'`);
});