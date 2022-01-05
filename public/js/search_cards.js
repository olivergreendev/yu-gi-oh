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
        dataType: "json",
        async: false,
        success: function(result) {
            let cards = result;
            let length;
            cards.data.length < 50 ? (length = cards.data.length) : (length = 50);
            if (cards.data) {
                for (let i = 0; i < length; i++) { // cards.data.length
                    outputHTML += `<div class="card-grid__item">
                                        <div class="card-grid__item__content-wrapper">
                                            <div class="content">
                                                <a href="/cards/${cards.data[i].name}">
                                                    <img src="${cards.data[i].card_images[0].image_url_small}">
                                                </a>
                                            </div>
                                        </div>
                                    </div>`;
                }
            }
            $(".card-grid__container").append(outputHTML);
        }
    });
});
searchBar.keyup(function(event) {
    let code = event.keycode || event.which;
    if (code === 13) {
        $('#search-button').click();
    }
});