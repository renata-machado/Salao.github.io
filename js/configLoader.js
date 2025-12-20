const phoneElement = document.querySelector('#storePhone')

if (phoneElement) {
    phoneElement.textContent = STORE_CONFIG.displayPhone
}

const phoneLink = document.querySelector('#storePhoneLink')

if (phoneLink) {
    phoneLink.href = `https://wa.me/${STORE_CONFIG.whatsappNumber}`
}