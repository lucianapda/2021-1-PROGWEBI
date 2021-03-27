const characterStore = {};

characterStore.getCharacters = function() {
    const characters = localStorage.getItem("characters");

    if (characters == null)
        return [];

    return JSON.parse(characters);
}

characterStore.getCharacterById = function(characterId) {
    const characters = characterStore.getCharacters();
    return characters.filter(character => character.id == characterId)[0];
}

characterStore.getCharacterId = function() {
    const characters = characterStore.getCharacters();

    if ((characters == null) || (characters == undefined))
        return 0;

    return characters.length;
}

characterStore.registerCharacter = function(character) {
    let characters = characterStore.getCharacters();
    characters.push(character);
    localStorage.setItem("characters", JSON.stringify(characters));
}

characterStore.updateCharacter = function(character) {
    const characters = characterStore.getCharacters();
    let charPos = 0;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id == character.id) {
            charPos = i;
            break;
        }
    }
    characters[charPos] = character;
    localStorage.setItem("characters", JSON.stringify(characters));
}

characterStore.deleteCharacter = function(characterId) {
    const characters = characterStore.getCharacters();
    let charPos = 0;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].id == characterId) {
            charPos = i;
            break;
        }
    }
    characters.splice(charPos, 1);
    localStorage.setItem("characters", JSON.stringify(characters));
}