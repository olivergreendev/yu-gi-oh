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
                const name = response.data[0].name;
                $('#card-title').text(name);
                const attribute = response.data[0].attribute;
                $('#card-attribute').text(attribute);
                $('#card-attribute-icon').attr("src", `/img/attributes/${attribute}.png`);

                $('#card-atk-def').css({"display": "block"});
                $('#card-level').css({"display": "block"});
                $('#card-level-icon').css({"display": "block"});

                const race = response.data[0].race;
                const type = response.data[0].type;
                const race_type = `[${race}/${type}]`;
                $('#card-type').text(race_type);

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
                    $('#card-attribute-icon').attr("src", `/img/attributes/${type.replace(' Card', '')}.png`);
                    $('#card-level').text(race);
                    $('#card-level-icon').attr("src", `/img/symbols/${race}.png`);
                    $('#card-atk-def').css({"display": "none"});
                }

                const description = response.data[0].desc;
                $('#card-description').text(description);

                const image = response.data[0].card_images[0].image_url;
                $('#card-image').attr('src', `${image}`);

                const level = response.data[0].level;
                $('#card-level').text(level);

                document.title = `${name} || Yu-Gi-Oh!`;
                history.pushState(undefined, '', name);
            }
        });
    }
});