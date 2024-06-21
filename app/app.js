// set each phrase as an object with a name and a checked property

const squares = [
    { phrase: "Pet Tater", checked: false },
    { phrase: "Pick a berry", checked: false },
    { phrase: "Meet someone new", checked: false },
    { phrase: "Learn a new word", checked: false },
    { phrase: "Pull some bindweed", checked: false },
    { phrase: "Make a flower crown", checked: false },
    { phrase: "Get a henna tattoo", checked: false },
    { phrase: "Smell a flower", checked: false },
    { phrase: "Observe a bee", checked: false },
    { phrase: "Laugh", checked: false },
    { phrase: "Give a high five", checked: false },
    { phrase: "Take a photo", checked: false },
    { phrase: "Sign in", checked: false },
    { phrase: "Drink some water", checked: false },
    { phrase: "Listen to the birds", checked: false },
    { phrase: "Paint on the party canvas", checked: false },
    { phrase: "Eat some food", checked: false },
    { phrase: "Get recommended a book", checked: false },
    { phrase: "Eat a popsicle", checked: false },
    { phrase: "Take a break", checked: false },
    { phrase: "Breathe", checked: false },
    { phrase: "Put on sunscreen", checked: false },
    { phrase: "Talk about the weather", checked: false },
    { phrase: "Eat something sweet", checked: false },
    { phrase: "Eat something spicy", checked: false },
    { phrase: "Eat something bitter", checked: false },
    { phrase: "Eat something salty", checked: false },
    { phrase: "Recommend a book", checked: false }
]

const bingoContainer = document.getElementById('bingo-container')
const resetButton = document.getElementById('reset-button')

function saveState() {
    const checkboxes = document.querySelectorAll('.bingo-item input[type="checkbox"]')
    const state = Array.from(checkboxes).map(checkbox => ({ phrase: checkbox.id, checked: checkbox.checked }))
    localStorage.setItem('bingoState', JSON.stringify(state))
}

function shuffle(array) {
    for (let i = 24; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

function handleCheckboxChange(event) {
    const checkbox = event.target
    if (checkbox.checked) {
        checkbox.parentElement.classList.add('checked')
    } else {
        checkbox.parentElement.classList.remove('checked')
    }
    saveState()
}

function newBingoCard() {
    shuffle(squares)
    squares.forEach((square, index) => {
        if (index < 25) {
            const item = document.createElement('label')
            item.className = 'bingo-item'
            item.innerHTML = `
                ${square.phrase}
                <input type="checkbox" id="${square.phrase}">
            `
            item.querySelector('input').addEventListener('change', handleCheckboxChange)
            bingoContainer.appendChild(item)
        }
    })
}

function restoreBingoCard() {
    const state = JSON.parse(localStorage.getItem('bingoState'))
    state.forEach((square, index) => {
        if (index < 25) {
            const item = document.createElement('label')
            item.className = 'bingo-item'
            item.innerHTML = `
            ${square.phrase}
            <input type="checkbox" id="${square.phrase}">
        `
            item.querySelector('input').addEventListener('change', handleCheckboxChange)
            if (square.checked) {
                item.classList.add('checked')
                item.querySelector('input').checked = true
            }
            bingoContainer.appendChild(item)
        }
    })
}

function createBingoCard() {
    bingoContainer.innerHTML = ''
    // shuffle the squares only if there is no saved state
    if (!localStorage.getItem('bingoState')) {
        newBingoCard()
    } else {
        restoreBingoCard()
    }
}

resetButton.addEventListener('click', () => {
    localStorage.removeItem('bingoState')
    createBingoCard()
})

window.addEventListener('load', () => {
    createBingoCard()
})