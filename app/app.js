// set each phrase as an object with a name and a checked property

const squares = [
    { phrase: "Outdated libraries", checked: false },
    { phrase: "Code on GitHub", checked: false },
    { phrase: "No 2FA", checked: false },
    { phrase: "Plain text passwords", checked: false },
    { phrase: "Unpatched vulnerability", checked: false },
    { phrase: "Understaffed security", checked: false },
    { phrase: "Reused passwords", checked: false },
    { phrase: "No logging", checked: false },
    { phrase: "Inconsistent backups", checked: false },
    { phrase: "No security audit", checked: false },
    { phrase: "Hard-coded API keys", checked: false },
    { phrase: "Personal laptop for work", checked: false },
    { phrase: "Credentials over email", checked: false },
    { phrase: "Outdated firewall rules", checked: false },
    { phrase: "No encryption", checked: false },
    { phrase: "Expired SSL certificate", checked: false },
    { phrase: "Direct production push", checked: false },
    { phrase: "Too many admin accounts", checked: false },
    { phrase: "Local sensitive data", checked: false },
    { phrase: "Public server config", checked: false },
    { phrase: "Manual QA", checked: false },
    { phrase: "Improper version control", checked: false },
    { phrase: "Fragile deployment", checked: false },
    { phrase: "Default configurations", checked: false },
    { phrase: "Unencrypted database", checked: false }
]

const bingoContainer = document.getElementById('bingo-container')
const resetButton = document.getElementById('reset-button')

function saveState() {
    const checkboxes = document.querySelectorAll('.bingo-item input[type="checkbox"]')
    const state = Array.from(checkboxes).map(checkbox => ({ phrase: checkbox.id, checked: checkbox.checked }))
    localStorage.setItem('bingoState', JSON.stringify(state))
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
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
    squares.forEach(square => {
        const item = document.createElement('label')
        item.className = 'bingo-item'
        item.innerHTML = `
            ${square.phrase}
            <input type="checkbox" id="${square.phrase}">
        `
        item.querySelector('input').addEventListener('change', handleCheckboxChange)
        bingoContainer.appendChild(item)
    })
}

function restoreBingoCard() {
    const state = JSON.parse(localStorage.getItem('bingoState'))
    state.forEach(square => {
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