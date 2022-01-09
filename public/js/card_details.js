// Dev Variables
const log = console.log;

const cardName = $('#card-title').html();
$.ajax({
    type: "GET",
    url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`,
    dataType: "json",
    async: false,
    success: function(response) {
        const data = response.data[0];
        const type = data.type;
        const description = data.desc;
        const image = data.card_images[0].image_url;
        // Add card artwork to localStorage
        const cardArtwork = data.card_images;
        localStorage.setItem(`${data.name}`, JSON.stringify(cardArtwork));
        artwork = JSON.parse(localStorage.getItem(`${data.name}`));
        // Monster, Synchro, XYZ
        if (type !== "Spell Card" && type !== "Trap Card" && type !== "Link Monster") {
            const attribute = data.attribute;
            const level = data.level;
            const race = data.race;
            const type = data.type;
            const race_type = `${race} / ${type}`;
            const atk = data.atk;
            const def = data.def;
            $('#card-attribute-icon').attr("src", `/img/attributes/${attribute.toLowerCase()}.png`);
            $('#card-attribute').text(attribute);
            type === "XYZ Monster" ? $('#card-level-icon').attr("src", `/img/level-rank/rank.png`) : $('#card-level-icon').attr("src", `/img/level-rank/level.png`);
            $('#card-level').text(level);
            $('#card-type').text(race_type);
            $('#card-atk').text(`ATK / ${atk}`);
            $('#card-def').text(`DEF / ${def}`);
        }
        // Link
        else if (type === "Link Monster") {
            const attribute = data.attribute;
            const atk = data.atk;
            const linkVal = data.linkval;
            $('#card-attribute-icon').attr("src", `/img/attributes/${attribute.toLowerCase()}.png`);
            $('#card-attribute').text(attribute);
            $('#card-level-icon').css({"display": "none"});
            $('#card-level').css({"display": "none"});
            $('#card-atk').text(`ATK / ${atk}`);
            $('#card-def').text(`LINK - ${linkVal}`);
        }
        // Trap, Spell
        else if (type === "Trap Card" || type === "Spell Card") {
            const attribute = data.type;
            const trap_spell_type = data.race;
            $('#card-attribute-icon').attr("src", `/img/attributes/${attribute.replace(" Card", "").toLowerCase()}.png`);
            $('#card-attribute').text(attribute);
            $('#card-level-icon').attr("src", `/img/symbols/${trap_spell_type.toLowerCase()}.png`);
            $('#card-level').text(trap_spell_type);
            $('#card-type').css({"display": "none"});
        }

        $('#card-description').text(description);
        $('#card-image').attr('src', `${image}`);
    }
});

/*
const attribute = response.data[0].attribute;
$('#card-attribute').text(attribute);
// convert to lower case so the string is matched with the image name
$('#card-attribute-icon').attr("src", `/img/attributes/${attribute.toLowerCase()}.png`);

const type = response.data[0].type;
const race = response.data[0].race;

if (type !== "Spell Card" && type !== "Trap Card" && type !== "Link Monster") {
    const atk = response.data[0].atk;
    $('#card-atk').text(`ATK / ${atk}`);
    const def = response.data[0].def;
    $('#card-def').text(`DEF / ${def}`);

    if (type === "XYZ Monster") {
        $('#card-level-icon').attr("src", `/img/level-rank/rank.png`);
    } else {
        $('#card-level-icon').attr("src", `/img/level-rank/level.png`);
    }
}
else if (type === "Link Monster") {
    const atk = response.data[0].atk;
    $('#card-atk').text(`ATK / ${atk}`);
    const linkval = response.data[0].linkval;
    $('#card-def').text(`LINK - ${linkval}`);
    $('#card-level').css({"display": "none"});
    $('#card-level-icon').css({"display": "none"});
}
else if (type === "Spell Card" || type === "Trap Card") {
    $('#card-attribute').text(type.replace(' Card', ''));
    // convert to lower case so the string is matched with the image name
    $('#card-attribute-icon').attr("src", `/img/attributes/${type.replace(' Card', '')}.png`);
    $('#card-level').text(race);
    // convert to lower case so the string is matched with the image name
    $('#card-level-icon').attr("src", `/img/symbols/${race}.png`);
    $('#card-atk-def').css({"display": "none"});
}

const race_type = `[${race}/${type}]`;
$('#card-type').text(race_type);

const description = response.data[0].desc;
$('#card-description').text(description);

const image = response.data[0].card_images[0].image_url;
$('#card-image').attr('src', `${image}`);

const level = response.data[0].level;
$('#card-level').text(level);
*/