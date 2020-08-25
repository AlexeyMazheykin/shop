
const navigator_el = document.querySelector('.showcase__nav-list');
const bags_container = document.querySelector('[type="bags"]');
const our_showcase_container = document.querySelector('[type="watches"]');


function onNavigatorClick(e) {
    console.log(e.target);
    document.querySelector('.showcase__item-selected').classList.toggle('showcase__item-selected');
    e.target.classList.add('showcase__item-selected');
}

Array.from(navigator_el.children).forEach((el) => {
    el.addEventListener('click', onNavigatorClick);
});

async function fillCardsContainer(container, database_url) {
    const response = await fetch(database_url);
    const data = await response.json();
    for(item of data) {
        let card_element = document.createElement('card-component');
        card_element.setAttribute('parameters', JSON.stringify(item));
        container.appendChild(card_element);
    }
}

fillCardsContainer(bags_container, 'https://alexeymazheykin.github.io/shop/mock-db/bags.json');
fillCardsContainer(our_showcase_container, 'https://alexeymazheykin.github.io/shop/mock-db/watches.json');