$(document).ready(function() {
    updateAllTables();
});


function updateAllTables() {
    const tableHeroes = $("#list-heroes-body");
    const tableAntiHeroes = $("#list-antiheroes-body");
    const tableVillains = $("#list-villains-body");

    updateTable(tableHeroes, characterStore.getAllHeroes());
    updateTable(tableAntiHeroes, characterStore.getAllAntiHeroes());
    updateTable(tableVillains, characterStore.getAllVillains());
}

function deleteCharacterBtn(characterId) {
    characterStore.deleteCharacter(characterId);
    updateAllTables();
}

function updateTable(table, characters) {
    table.empty();
    characters.forEach(character => {
        table.append(`<tr id='tr-character-${character.id}'><td>${character.nome}</td><td>${character.ego}</td><td>${character.franquia}</td><td>${character.perfil}</td><td>${character.poderes}</td><td><button type="button" name="updateCharacter${character.id}" class='update-btn padding-style' id="updateCharacter${character.id}" onclick="updateCharacterBtn(${character.id});"><img src="edit.png" alt="editar"></button><button type="button" class='delete-btn padding-style' name="deleteCharacter${character.id}" id="deleteCharacter${character.id}" onclick="deleteCharacterBtn(${character.id});"><img src="trash.png" alt="deletar"></button></td></tr>`);
    });
}

function updateCharacterBtn(characterId) {
    redirect(`index01.html?charId=${characterId}`);
}