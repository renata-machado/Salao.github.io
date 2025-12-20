// Getting grom HTML
const menu = document.querySelector('#showMenu')
const promotions = document.querySelector('#showPromotions')

// Buttons show menu
const showAll = document.querySelector('#showAll')
const showServicos = document.querySelector('#showServicos')
const showCremes = document.querySelector('#showCremes')
const showShampoo = document.querySelector('#showShampoo')
const showKits = document.querySelector('#showKits')

// Items
let items

// Functions
const clearItems = type => {
    items = ''

    if (type === 'normal')
        menu.innerHTML = ''
    else
        promotions.innerHTML = ''
}

const removeClasses = () => {
    showAll.classList.remove('active')
    showServicos.classList.remove('active')
    showCremes.classList.remove('active')
    showShampoo.classList.remove('active')
    showKits.classList.remove('active')
}

const checkIfHaveItem = items => {
    if (items === '')
        menu.innerHTML = '<p>Nenhum produto encontrado!</p>'
    else
        menu.innerHTML = items
}

const addItemToArray = prod => {
    const price = prod.price.toFixed(2).replace('.', ',')
    const lastPrice = prod.lastPrice
        ? prod.lastPrice.toFixed(2).replace('.', ',')
        : null

    items += `
        <div class="card">
            <div>
                <div class="cardImg">
                    <img src="./img/${prod.img}" alt="Imagem de um(a) ${prod.name}">
                </div>
                <h4>${prod.name}</h4>
                <p>${prod.description}</p>
            </div>

            <div>
                ${
                    lastPrice
                        ? `
                        <p class="lastPrice">R$ <span>${lastPrice}</span></p>`
                        : ''
                }

                <p class="price">R$ <span>${price}</span></p>

                <button class="btn" onclick="addToCart(${prod.id})">
                    <span class="iconify-inline" data-icon="mdi:cart-plus"></span>
                    Adicionar
                </button>
            </div>
        </div>
    `
}


const showProducts = type => {
    clearItems('normal')

    if (type === 0) {
        products.forEach(prod => {
            
                addItemToArray(prod)
        })
    } else {
        products.forEach(prod => {
            if (prod.type === type )
                addItemToArray(prod)
        })
    }

    checkIfHaveItem(items)
    removeClasses()

    if (type === 0 )
        showAll.classList.add('active')
    else if (type === 1)
        showServicos.classList.add('active')
    else if (type === 2)
        showCremes.classList.add('active')
    else if (type === 3)
        showShampoo.classList.add('active')
    else if (type === 4)
        showKits.classList.add('active')
    
}

const renderPromotionCard = prod => {
    const price = prod.price.toFixed(2).replace('.', ',')
    const lastPrice = prod.lastPrice.toFixed(2).replace('.', ',')

    return `
    <div class="card">
        <div>
            <div class="cardImg">
                <img src="./img/${prod.img}" alt="Imagem de ${prod.name}">
                <span class="badge">Promoção</span>
            </div>
            <h4>${prod.name}</h4>
            <p>${prod.description}</p>
        </div>
        <div>
            <p class="lastPrice">R$ <span>${lastPrice}</span></p>
            <p class="price">R$ <span>${price}</span></p>
            <button class="btn" onclick="addToCart(${prod.id})">
                <span class="iconify-inline" data-icon="mdi:cart-plus"></span> Adicionar
            </button>
        </div>
    </div>`
}

const allPromotions = () => {
    clearItems('promotions')

    products.forEach(prod => {
        if (prod.lastPrice && prod.lastPrice > 0) {
            items += renderPromotionCard(prod)
        }
    })

    promotions.innerHTML = items || 
        '<p>Nenhuma promoção  =(</p>'
}
//Capturing button clicks
showAll.addEventListener('click', function () { showProducts(0) })
showServicos.addEventListener('click', function () { showProducts(1) })
showCremes.addEventListener('click', function () { showProducts(2) })
showShampoo.addEventListener('click', function () { showProducts(3) })
showKits.addEventListener('click', function () { showProducts(4) })

showProducts(0)
allPromotions()