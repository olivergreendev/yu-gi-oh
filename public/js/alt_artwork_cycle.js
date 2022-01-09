// get all the card artworks here from localStorage
let currentCard = $('#card-title').text();
let artwork = JSON.parse(localStorage.getItem(`${currentCard}`));
let c = 0;

$('#btn-left').click(function() {
    c--;
    if (c === -1) {
        c = 0;
    }
    $('#card-image').attr('src', `${artwork[c].image_url}`);
});

$('#btn-right').click(function() {
    c++;
    if (c === artwork.length) {
        c = 0;
    }
    $('#card-image').attr('src', `${artwork[c].image_url}`);
});