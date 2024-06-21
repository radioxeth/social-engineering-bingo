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

function checkBingo() {
    const checkboxes = document.querySelectorAll('.bingo-item input[type="checkbox"]')
    const state = Array.from(checkboxes).map(checkbox => ({ phrase: checkbox.id, checked: checkbox.checked }))
    for (i = 0; i < 5; i++) {
        // check rows
        const row = state.slice(i * 5, i * 5 + 5)
        const checked = row.filter(checkbox => checkbox.checked)
        if (checked.length === 5) {
            return { isBingo: true, squares: row, type: 'row' }
        }
        // check columns
        const column = state.filter((checkbox, index) => index % 5 === i)
        const checkedColumn = column.filter(checkbox => checkbox.checked)
        if (checkedColumn.length === 5) {
            return { isBingo: true, squares: column, type: 'column' }
        }

    }
    // check diagonals
    const diagonal1 = state.filter((checkbox, index) => index % 6 === 0)
    const checkedDiagonal1 = diagonal1.filter(checkbox => checkbox.checked)
    const diagonal2 = state.filter((checkbox, index) => index % 4 === 0 && index > 0 && index < 21)
    const checkedDiagonal2 = diagonal2.filter(checkbox => checkbox.checked)
    if (checkedDiagonal1.length === 5) {
        return { isBingo: true, squares: diagonal1, type: 'diagonal1' }
    }
    if (checkedDiagonal2.length === 5) {
        return { isBingo: true, squares: diagonal2, type: 'diagonal2' }
    }
    return { isBingo: false, squares: [], type: '' }
}

function handleCheckboxChange(event) {
    const checkbox = event.target
    if (checkbox.checked) {
        checkbox.parentElement.classList.add('checked')
    } else {
        checkbox.parentElement.classList.remove('checked')
    }
    saveState()
    const { isBingo, squares, type } = checkBingo()
    if (isBingo) {
        celebrateBingo(squares, type)
    } else {
        removeCelebration()
    }

}

function removeCelebration() {
    const items = document.querySelectorAll('.bingo-item')
    items.forEach(item => {
        item.classList.remove('celebrate-row')
        item.classList.remove('celebrate-column')
        item.classList.remove('celebrate-spin-right')
        item.classList.remove('celebrate-spin-left')
    })
}

function celebrateBingo(squares, type) {
    setTimeout(() => {
        squares.forEach((square, index) => {
            const item = document.getElementById(square.phrase)
            const spintime = 1000
            const delay = (index * spintime) / 5 // Delay for each square

            // Set a timeout to add the class after a delay
            setTimeout(() => {
                if (type === 'row') {
                    item.parentElement.classList.add('celebrate-row')
                    item.parentElement.classList.add('celebrate-spin-right')
                } else if (type === 'column') {
                    item.parentElement.classList.add('celebrate-column')
                    item.parentElement.classList.add('celebrate-spin-right')
                } else if (type === 'diagonal1') {
                    item.parentElement.classList.add('celebrate-column')
                    item.parentElement.classList.add('celebrate-spin-right')
                } else if (type === 'diagonal2') {
                    item.parentElement.classList.add('celebrate-column')
                    item.parentElement.classList.add('celebrate-spin-left')
                }


                setTimeout(() => {
                    item.parentElement.classList.remove('celebrate-spin-right')
                    item.parentElement.classList.remove('celebrate-spin-left')
                }, spintime)
            }, delay)
        })
    }, 300)

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
        const { isBingo, squares, type } = checkBingo()
        if (isBingo) {
            celebrateBingo(squares, type)
        }

    }
}

resetButton.addEventListener('click', () => {
    localStorage.removeItem('bingoState')
    createBingoCard()
})

window.addEventListener('load', () => {
    createBingoCard()
})