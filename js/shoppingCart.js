
const whatsappNumber = STORE_CONFIG.whatsappNumber

// Getting from HTML
const showItems = document.querySelector('#showItems') // Left

// Right
const showAllItemsValue = document.querySelector('#showAllItemsValue')
const showDiscount = document.querySelector('#showDiscount')
const showTotal = document.querySelector('#showTotal')
const inputPromotionCode = document.querySelector('#promotionCode')
const btnAddPromotionCode = document.querySelector('#addPromotionCode')
const btnGenerateOrder = document.querySelector('#generateOrder')


// Get
const getCart = () => {
    const cartData = localStorage.getItem('cart');

    if (cartData === null || cartData === 'undefined') {
        return [];
    }

    try {
        return JSON.parse(cartData);
    } catch (e) {
        console.error("Error parsing cart data from localStorage:", e);
        localStorage.removeItem('cart');
        return [];
    }
}

// Set
const setCart = cartData => localStorage.setItem('cart', JSON.stringify(cartData))

// Items
let cart
let itemsToShow
let allItemsValue
let discountValue = 0
const promotionCode = 'salao'

// Functions


const generateCart = () => {
    const cartItems = getCart()

    cart = []
    allItemsValue = 0

    cartItems.forEach(prod => {
        const item = products.find(element => element.id === prod.id)
        item.qtd = prod.qtd

        allItemsValue += item.price * item.qtd
        cart.push(item)
    })

    return cart
}

const addItemToItemsToShow = prod => {
    const price = (prod.price * prod.qtd).toFixed(2).toString().replace('.', ',')

    itemsToShow += `
    <div class="item">
        <img src="../img/${prod.img}" alt="Imagem de um(a) ${prod.name}">
        <div>
            <p class="title">${prod.name}</p>
            <p>${prod.description}</p>
            <div class="bottom">
                <div class="counter">
                    <button onclick="remItem(${prod.id})">-</button>
                    <input type="text" value="${prod.qtd}" disabled>
                    <button onclick="addItem(${prod.id})">+</button>
                </div>
                <p class="price">R$ <span>${price}</span></p>
            </div>
        </div>
    </div>
    <hr>`
}

const addItem = id => {
    const cartItems = getCart()
    const newCartItems = []

    cartItems.forEach(item => {
        if (item.id === id)
            newCartItems.push({ id: item.id, qtd: item.qtd + 1 })
        else
            newCartItems.push({ id: item.id, qtd: item.qtd })
    })

    setCart(newCartItems)
    init()
}

const remItem = id => {
    const cartItems = getCart()
    const newCartItems = []

    cartItems.forEach(item => {
        if (item.id === id && item.qtd > 1)
            newCartItems.push({ id: item.id, qtd: item.qtd - 1 })
        else if (item.id === id && item.qtd <= 1)
            itemRemovedNotification.showToast()
        else
            newCartItems.push({ id: item.id, qtd: item.qtd })
    })

    setCart(newCartItems)
    init()
}

const addDiscount = () => {
    const code = inputPromotionCode.value.trim().toLowerCase()

    if (code === promotionCode) {
        discountValue = 15
        appliedCode.showToast()

        init()
    } else codeNotFound.showToast()
}

const init = () => {
    const generatedCart = generateCart()
    generatedCart.length > 0 && generatedCart.sort((a, b) => a.type < b.type ? -1 : a.type > b.type ? 1 : 0 )

    itemsToShow = ''
    showItems.innerHTML = ''

    if (generatedCart.length > 0)
        generatedCart.forEach(data => addItemToItemsToShow(data));
    else
        itemsToShow = '<p>Você ainda não adicionou itens no carrinho.</p>'

    showOnPage()
}

const showOnPage = () => {
    showItems.innerHTML = itemsToShow

    showAllItemsValue.innerHTML = 'R$ ' + allItemsValue.toFixed(2).toString().replace('.', ',')
    showDiscount.innerHTML = '- R$ ' + ((allItemsValue * discountValue)/100).toFixed(2).toString().replace('.', ',')
    showTotal.innerHTML = 'R$ ' + (allItemsValue - ((allItemsValue * discountValue)/100)).toFixed(2).toString().replace('.', ',')
}

const generateOrder = () => {
    if (!cart || cart.length === 0) {
        noItemsInCart.showToast()
        return
    }

    let orderMessage = 'Olá! Gostaria de fazer o agendamento de:\n\n'

    cart.forEach(item => {
        orderMessage += `- ${item.qtd}x ${item.name}\n`
    })

    const discountAmount = (allItemsValue * discountValue) / 100
    const total = allItemsValue - discountAmount

    orderMessage += `\nSubtotal: R$ ${allItemsValue.toFixed(2).replace('.', ',')}`

    if (discountValue > 0) {
        orderMessage += `\nDesconto: R$ ${discountAmount.toFixed(2).replace('.', ',')}`
        orderMessage += `\nCupom aplicado: ${promotionCode}`
    }

    orderMessage += `\n\nTotal: R$ ${total.toFixed(2).replace('.', ',')}`

   
    orderMessage += `\nPara o dia 20/12 às 07h`
   

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`
    window.open(whatsappUrl, '_blank')
}

// Notifications
const itemRemovedNotification = Toastify({
    text: "Produto removido do carrinho de compras.",
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "#FF65C3",
        boxShadow: "0 0 160px 0 #0008"
    }
})

const appliedCode = Toastify({
    text: "Cupom aplicado com sucesso!",
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "#FF65C3",
        boxShadow: "0 0 160px 0 #0008"
    }
})

const codeNotFound = Toastify({
    text: "Cupom não encontrado!",
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "#FF65C3",
        boxShadow: "0 0 160px 0 #0008"
    }
})

const noItemsInCart = Toastify({
    text: "Não é possível gerar pedido sem ter item no carrinho.",
    duration: 5000,
    newWindow: true,
    close: true,
    gravity: "bottom",
    position: "right",
    stopOnFocus: true,
    style: {
        background: "#FF65C3",
        boxShadow: "0 0 160px 0 #0008"
    }
})


btnGenerateOrder.addEventListener('click', generateOrder);

init()

