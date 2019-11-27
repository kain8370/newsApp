const apiKey = 'aadd0ae0380945d19313950a3b7e5de6';
const url = 'https://newsapi.org/v2';
const xhr = new XMLHttpRequest();
const xhr2 = new XMLHttpRequest();
let country = document.querySelector('.select');
console.log(document.querySelector('.select').value);

xhr.open('GET', `${url}/top-headlines?country=${document.querySelector('.select').value}&apiKey=${apiKey}`);
xhr.addEventListener('load', (res) => {
    console.log(JSON.parse(xhr.responseText).articles);
    renderingCards(JSON.parse(xhr.responseText).articles);
});
xhr.addEventListener('error', (err) => {
    console.log(err);
});
xhr.send();

function renderingCards(cards) {
    const content = document.querySelector('.content');
    cards.forEach(item => {
        content.appendChild(render(item));
    });
}

function render(item) {
    let div = document.createElement('div');
    div.classList.add("card");
    let cardTitle = document.createElement('h3');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = item.title;
    div.appendChild(cardTitle);
    let source = document.createElement('div');
    source.classList.add('card-source');
    source.contentTitle = `Источник: ${item.source.name}`;
    div.appendChild(source);
    let p = document.createElement('p');
    p.classList.add('description');
    p.textContent = item.description;
    div.appendChild(p);
    let img = document.createElement('img');
    img.classList.add('card-image');
    img.src = item.urlToImage;
    div.appendChild(img);
    let link = document.createElement('a');
    link.classList.add('card-link');
    link.textContent = 'Ссылка на ресурс';
    link.href = item.url;
    div.appendChild(link);
    return div;
}

const form  = document.querySelector('.myform');
console.log(form);
form.addEventListener('submit', e => {
    e.preventDefault();
    console.log(document.querySelector('.search').value.length);
    if (document.querySelector('.search').value.length === 0) {
        console.log("Событие!");
        xhr2.open('GET', `${url}/top-headlines?category=${document.querySelector('.type-news').value}&country=${document.querySelector('.select').value}&apiKey=${apiKey}`);
        xhr2.addEventListener('load', () => {
            console.log(JSON.parse(xhr2.responseText));
            document.querySelector('.content').innerHTML = '';
            renderingCards(JSON.parse(xhr2.responseText).articles);
        })
        xhr2.send();
    } else {
        xhr2.open('GET', `${url}/everything?q=${document.querySelector('.search').value}&apiKey=${apiKey}`);
        xhr2.addEventListener('load', () => {
            console.log(JSON.parse(xhr2.responseText));
            document.querySelector('.content').innerHTML = '';
            renderingCards(JSON.parse(xhr2.responseText).articles);
        })
        xhr2.send();
    }
});

document.querySelector('.select').addEventListener('change', () => {
    document.querySelector('.search').value = '';
});

document.querySelector('.type-news').addEventListener('change', () => {
    document.querySelector('.search').value = '';
});