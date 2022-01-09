const navSearchBar = $('#nav-search-bar');
navSearchBar.keyup(function(event) {
    let code = event.keycode || event.which;
    if (code === 13) {
        let data = navSearchBar.val();
        $.ajax({
            type: "GET",
            url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${data}`,
            dataType: "json",
            async: false,
            success: function(response) {
                const data = response.data[0];
                const name = data.name;
                const type = data.type;
                const description = data.desc;
                const image = data.card_images[0].image_url;
                $('#card-level-icon').css({"display": "block"});
                $('#card-level').css({"display": "block"});
                $('#card-type').css({"display": "block"});
                $('#card-atk-def').css({"display": "block"});
                // Add card artwork to localStorage
                const cardArtwork = data.card_images;
                localStorage.setItem(`${data.name}`, JSON.stringify(cardArtwork));
                artwork = JSON.parse(localStorage.getItem(`${name}`));
                c = 0;
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
                    $('#card-atk-def').css({"display": "none"});
                    $('#card-type').css({"display": "none"});
                }

                $('#card-title').text(name)
                $('#card-description').text(description);
                $('#card-image').attr('src', `${image}`);

                document.title = `${name} || Yu-Gi-Oh!`;
                history.pushState(undefined, '', name);
            }
        });
    }
});