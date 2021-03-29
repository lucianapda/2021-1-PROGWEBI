$(document).ready(function() {
    updateDataTable();
    const charId = getUrlParameter("charId");
    if (charId)
        updateCharacterBtn(Number.parseInt(charId));
});

function registerOrUpdate() {
    const charId = $("#charId").val();

    const validation = validateFields();
    if (validation.success == false) {
        alert(validation.message);
        return;
    }

    if (charId != "")
        updateCharacter();
    else
        registerCharacter();
}

function validateFields() {
    const nome = $("#nome").val();
    const ego = $("#ego").val();
    const franquia = $("input[name='franquia']:checked").val();
    const perfil = $("input[name='perfil']:checked").val();
    const poderes = $("#poderes").val().split(",");

    if (nome == "")
        return { success: false, message: "Preencha o nome corretamente" };
    if (ego == "")
        return { success: false, message: "Preencha o ego corretamente" };
    if (franquia == null)
        return { success: false, message: "Selecione a franquia" };
    if (perfil == null)
        return { success: false, message: "Selecione o perfil" };
    if (poderes == "")
        return { success: false, message: "Adicione ao menos um poder" };
    
    return { success: true };
}


function updateCharacter() {
    const id = $("#charId").val();
    const nome = $("#nome").val();
    const ego = $("#ego").val();
    const franquia = $("input[name='franquia']:checked").val();
    const perfil = $("input[name='perfil']:checked").val();
    const poderes = $("#poderes").val().split(",");

    const character = {
        id,
        nome,
        ego,
        franquia,
        perfil,
        poderes,
    };
    characterStore.updateCharacter(character);
    updateDataTable();
    clearFields();
}

function registerCharacter() {
    const id = characterStore.generateCharacterId();
    const nome = $("#nome").val();
    const ego = $("#ego").val();
    const franquia = $("input[name='franquia']:checked").val();
    const perfil = $("input[name='perfil']:checked").val();
    const poderes = $("#poderes").val().split(",");
    
    const character = {
        id,
        nome,
        ego,
        franquia,
        perfil,
        poderes,
    };

    characterStore.registerCharacter(character);
    updateDataTable();
    clearFields();
}

function clearFields() {
    $("#charId").val('');
    $("#nome").val('');
    $("#ego").val('');
    $("#poderes").val('');
    $("#registerOrUpdateBtn").html("Cadastrar");
}

function updateDataTable() {
    $("#listagem-body").empty();
    const characters = characterStore.getAllCharacters();
    characters.forEach(character => {
        $("#listagem-body").append(`<tr id='tr-character-${character.id}'><td>${character.nome}</td><td>${character.ego}</td><td>${character.franquia}</td><td>${character.perfil}</td><td>${character.poderes}</td><td><button type="button" name="updateCharacter${character.id}" class='update-btn' id="updateCharacter${character.id}" onclick="updateCharacterBtn(${character.id});"><img src="edit.png" alt="editar"></button><button type="button" class='delete-btn' name="deleteCharacter${character.id}" id="deleteCharacter${character.id}" onclick="deleteCharacterBtn(${character.id});"><img src="trash.png" alt="deletar"></button></td></tr>`);
    });
}

function updateCharacterBtn(characterId) {
    const character = characterStore.getCharacterById(characterId);
    if (!character)
        return;
    $("#charId").val(character.id);
    $("#nome").val(character.nome);
    $("#ego").val(character.ego);
    $(`input:radio[name='franquia'][value='${character.franquia}']`).prop('checked', true);
    $(`input:radio[name='perfil'][value='${character.perfil}']`).prop('checked', true);
    $("#poderes").val(character.poderes);
    $("#registerOrUpdateBtn").html("Editar");
}

function deleteCharacterBtn(characterId) {
    characterStore.deleteCharacter(characterId);
    const charId = $("#charId").val();
    if (charId == characterId)
        clearFields();

    updateDataTable();
}