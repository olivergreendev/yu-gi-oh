// Dev Variables
const log = console.log;

const cardName = $('#card-title').html();
let outputHTML = '';
$.ajax({
    type: "GET",
    url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`,
    data: cardName,
    dataType: "json",
    async: false,
    success: function(response) {
        const attribute = response.data[0].attribute;
        $('#card-attribute').text(attribute);
        $('#card-attribute-icon').attr("src", `/img/attributes/${attribute}.png`);

        const type = response.data[0].type;
        const race = response.data[0].race;

        if (type === "Normal Monster" || type === "Synchro Monster" || type === "XYZ Monster") {
            const atk = response.data[0].atk;
            const def = response.data[0].def;
            $('#card-atk').text(`ATK / ${atk}`);
            $('#card-def').text(`DEF / ${def}`);

            if (type === "XYZ Monster") {
                $('#card-level-icon').attr("src", `/img/level-rank/rank.png`);
            } else {
                $('#card-level-icon').attr("src", `/img/level-rank/level.png`);
            }
        }
        else if (type === "Spell Card" || type === "Trap Card") {
            $('#card-attribute').text(type.replace(' Card', ''));
            $('#card-attribute-icon').attr("src", `/img/attributes/${type.replace(' Card', '')}.png`);
            $('#card-level').text(race);
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
        /*
         outputHTML += `<div class="card-grid__item">
                            <div class="card-grid__item__content-wrapper">
                                <div class="content">
                                    <a href="/cards/${cards.data[i].name}">
                                        <img src="${cards.data[i].card_images[0].image_url_small}">
                                    </a>
                                </div>
                            </div>
                        </div>`;
        */
    }
});