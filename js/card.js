const template = document.createElement('template');
template.innerHTML = `
<style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');

    .card {
        font-size: 18px;
        font-weight: 400;
        color: #777777;
        line-height: 25px;
        padding-left: 20px;
        padding-right: 20px;
        padding-top: 23px;
        position: relative;
        transition: all .3s;
        text-align: center;
    }

    .card-stats {
        display: flex;
        justify-content: space-between;
        color: #bbbbbb;
        font-size: 14px;
        visibility: hidden;
    }

    .card-stats p {
        padding-left: 31px;
    }

    .card-stats-likes {
        background: url(https://alexeymazheykin.github.io/shop/image/heart.png) no-repeat left center;
    }

    .card-stats-comm {
        background: url(https://alexeymazheykin.github.io/shop/image/comment.png) no-repeat left center;
    }

    .card-pic {
        margin-bottom: 50px;
    }

    .card-desc {
        margin-bottom: 10px;
        text-align: center;
    }

    .card-price {
        color: #333333;
        font-weight: 600;
        text-align: center;
        font-size: 25px;
    }

    .add-to-cart {
        box-shadow: 0px 5px 23.75px 1.25px rgba(240, 239, 254, 0.75);
        background-image: linear-gradient(64deg, rgb(140, 132, 249) 0%, rgb(161, 101, 244) 100%);
        font-size: 20px;
        color: #fff;
        border: none;
        border-radius: 50px;
        padding: 18px 50px 18px 50px;
        display: block;
        margin: 0 auto;
        transform: translateY(50%);
        visibility: hidden;
    }

    .card:hover .add-to-cart,
    .card:hover .card-stats {
        visibility: visible;
    }

    .card:hover {
        box-shadow: 0px 5px 47.5px 2.5px rgba(221, 223, 224, 0.75);
        transform: translateY(-20px);
    }
    .arrow {
        opacity: 0;
        position: absolute;
        top: 40%;
        text-decoration: none;
        width: auto;
        padding: 10px;
        font-weight: 700;
        font-size: 25px;
        user-select: none;
        border-radius: 10px;
        color: #8d83f9;
        transition: all .2s;
    }
    
    .card:hover .arrow {
        opacity: unset;
    }
    
    .arrow:hover {
        background-color: rgba(205, 164, 230, 0.164);
    }
    
    .arrow__next {
        right: 0;
    }
    
    .arrow__prev {
        left: 0;
    }
</style>
<div class="card">
    <div class="card-stats" >
        <p class="card-stats-likes" name="likes-count">
         
        </p>
        <p class="card-stats-comm" name="comments-count">
        </p>
    </div>
        <div class="card-pic">
            <img class="card-thumb">
        </div>
        <p class="card-desc" name="product-name">
        </p>
        <p class="card-price" name="price">
        </p>
        <button class="add-to-cart">Add to cart</button>
        <a href="#!" class="arrow arrow__prev">&lt;</a>
        <a href="#!" class="arrow arrow__next">&gt;</a>
    </div>
`;
class Card extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.index = 0;
    }
    
      previousCard() {
        this.index = (this.length + this.index - 1) %  this.length;
        console.log(this.index);
        this.setCardParameters()
      }
  
      nextCard() {
        this.index = (this.index + 1) % this.length;
        console.log(this.index);
        this.setCardParameters();
      }
      
      setCardParameters() {
        this.shadowRoot.querySelector('.card-thumb').src = JSON.parse(this.getAttribute('parameters'))[this.index]["image"];
        this.shadowRoot.querySelector('[name="product-name"]').innerText = JSON.parse(this.getAttribute('parameters'))[this.index]["product-name"];
        this.shadowRoot.querySelector('[name="price"]').innerText = '$ ' + JSON.parse(this.getAttribute('parameters'))[this.index]["price"];
        this.shadowRoot.querySelector('[name="likes-count"]').innerText = ' ' + JSON.parse(this.getAttribute('parameters'))[this.index]["favourite-count"];
        this.shadowRoot.querySelector('[name="comments-count"]').innerText = ' ' + JSON.parse(this.getAttribute('parameters'))[this.index]["comments-count"];
      }
  
  
      connectedCallback() {
        this.length = JSON.parse(this.getAttribute('parameters')).length;
        this.setCardParameters();
       
  
        this.shadowRoot.querySelector('.arrow__prev').addEventListener('click', () => this.previousCard());
        this.shadowRoot.querySelector('.arrow__next').addEventListener('click', () => this.nextCard());
      }
  
      disconnectedCallback() {
        this.shadowRoot.querySelector('.arrow__prev').removeEventListener();
        this.shadowRoot.querySelector('.arrow__next').removeEventListener();
      }
  }
  
  window.customElements.define('card-component', Card);