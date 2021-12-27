// Dev Variables
const log = console.log;

const searchBar = $('#search-bar');
$('#search-button').bind('click', function() {
    let data = searchBar.val();
    let outputHTML = '';
    $(".card-grid__container").html('');
    $.ajax({
        type: "GET",
        url: `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${data}&desc=${data}`,
        data: data,
        dataType: "json",
        async: false,
        success: function(result) {
            let cards = result;
            if (cards.data) {
                for (let i = 0; i < cards.data.length; i++) {
                    outputHTML += `<div class="card-grid__item"><div class="card-grid__item__content-wrapper"><div class="content"><img src="${cards.data[i].card_images[0].image_url_small}"></div></div></div>`;
                }
            }
            $(".card-grid__container").append(outputHTML);
        }
    });
});