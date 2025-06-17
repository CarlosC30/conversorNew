const form = document.getElementById("convertForm")
const amount = document.getElementById("amount")
const fronCurrency = document.getElementById("fronCurrency")
const convertedAmount = document.getElementById("convertedAmount")
const toCurrency = document.getElementById("toCurrency")
const loading = document.querySelector(".loading")
const result = document.querySelector(".result")
const error = document.querySelector(".error")

const API_URL = "https://api.exchangerate-api.com/v4/latest/"


async function convertMoney() {

    loading.style.display = "block"
    error.style.display = "none"
    result.style.display = "none"

    try {

        const response = await fetch(API_URL + fronCurrency.value)
        const data = await response.json()
        const rate = data.rates[toCurrency.value]
        const convertedValue = (amount.value * rate).toFixed(2)

        convertedAmount.value = convertedValue
       
        result.style.display = "block"

        result.innerHTML = `
        <div style="font-size: 1.4rem;">
            ${amount.value} ${fronCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
        </div>
        <div style="font-size: 0.8rem; opacity:0.8; margin-top: 10px;">
            Taxa: 1 ${fronCurrency.value} = ${rate} ${toCurrency.value}
        </div>
        `



    }
    catch (err) {
        error.style.display = "block"
        error.innerHTML = `Falha ao converter moeda! Tentar novamente`
    }

    loading.style.display ="none"

}

form.addEventListener("submit", function (event) {
    event.preventDefault()
    convertMoney()
})