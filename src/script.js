import './styles/style.css'

const numContainer = document.getElementById("num");
const increase = document.querySelector(".add");
const decrease = document.querySelector(".minus");
const reset = document.querySelector(".reset");
let amount


chrome.storage.local.get(["number"], (data) => {
  if (typeof data.number == "undefined" || data.number == "") {
    amount = numContainer.value
  } else {
    amount = data.number
    numContainer.value = amount
  }
})

function updateCount(count) {
  chrome.runtime.sendMessage({type: 'updateValue', number: JSON.stringify(count)},(response) => {
    if(response == 'success') {
      return true
    } else 
    alert("database disconnected, refresh chrome extension")
  });
}

const setStorage = (value) => {
  chrome.storage.local.set({"number": value || 0})
}

numContainer.addEventListener("input", () => {
  amount = parseInt(numContainer.value)
  setStorage(amount)
  updateCount(amount)
})

increase.addEventListener("click", () => {
  amount = numContainer.value || 0
  amount++
  numContainer.value = amount;
  setStorage(amount)
  updateCount(amount)
});

decrease.addEventListener("click", () => {
  amount = numContainer.value || 0
  amount == 0 ? amount == 0 : amount--;
  numContainer.value = amount;
  setStorage(amount)
  updateCount(amount)
});

reset.addEventListener("click", () => {
  amount = 0;
  numContainer.value = amount;
  setStorage(amount)
  updateCount(amount)
});