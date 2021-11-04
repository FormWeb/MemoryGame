const board = document.getElementById("board")
const btnEasy = document.getElementById("btn_easy")
const btnNormal = document.getElementById("btn_normal")
const btnHard = document.getElementById("btn_hard")

let settings = {
    lines: 4,
    columns: 4,
    colors: ["#ff0000", "#0000ff", "#ff9900", "#00cc00", "#ff00ff", "#ffff00", "#666633", "#00ffff"]
}

let colorsToFind = []
let colorsNotFound = []
let colorsTested = []
let timeOutSet = false

btnEasy.addEventListener("click", () => {
    settings = {
        lines: 3,
        columns: 4,
        colors: ["#ff0000", "#0000ff", "#ff9900", "#00cc00", "#ff00ff", "#ffff00"]
    }

    setupColor()
    setupGame()
})

btnNormal.addEventListener("click", () => {
    settings = {
        lines: 4,
        columns: 4,
        colors: ["#ff0000", "#0000ff", "#ff9900", "#00cc00", "#ff00ff", "#ffff00", "#666633", "#00ffff"]
    }

    setupColor()
    setupGame()
})

btnHard.addEventListener("click", () => {
    settings = {
        lines: 5,
        columns: 4,
        colors: ["#ff0000", "#0000ff", "#ff9900", "#00cc00", "#ff00ff", "#ffff00", "#666633", "#00ffff", "#03fc66", "#db03fc"]
    }

    setupColor()
    setupGame()
})

function setupColor() {
    colorsToFind = []
    for (i = 0; i < settings["colors"].length; i++) {
        colorsToFind.push(settings["colors"][i])
        colorsToFind.push(settings["colors"][i])
    }
}

function setupGame() {

    board.innerHTML = ""

    for (let i = settings["lines"]; i > 0; i--) {
        const line = document.createElement("tr")
    
        for (let j = 0; j < settings["columns"]; j++) {

            const cell = document.createElement("td")
            cell.style.width = "64px"
            cell.style.height = "118px"
            cell.style.background = "#000000"
            cell.id = "card"+(i-1)+"-"+j

            const randomColorIndex = Math.floor(Math.random()*(colorsToFind.length)) 
            let colorOfCurrentCell = colorsToFind[randomColorIndex]

            cell.name = colorOfCurrentCell

            colorsToFind.splice(randomColorIndex, 1)

            cell.addEventListener("click", () => {

                if (!timeOutSet) {
                    cell.style.background = cell.name

                    colorsTested.push({
                        id: cell.id,
                        colors: cell.name
                    })
    
                    if (colorsTested.length > 1) {
                        testColor()
                    }
                }

                
            })

            
    
            line.appendChild(cell)
        }
    
        board.appendChild(line)
    }
}

function testColor() {

    let win = true
    let cells = document.querySelectorAll('#board > tr > td')

    console.log(cells)

    for (let cell of cells) {
        if (cell.style.background === "rgb(0, 0, 0)") {
            win = false
        }
    }

    if (colorsTested[1]["colors"] !== colorsTested[0]["colors"]) {
        timeOutSet = true
        setTimeout(function() {

            timeOutSet = false
            const cell1 = document.getElementById(colorsTested[0]["id"])
            const cell2 = document.getElementById(colorsTested[1]["id"])
            cell1.style.background = "#000000"
            cell2.style.background = "#000000"

            colorsTested = []
        }, 1000)
        
    }

    else if (win === true) {
        timeOutSet = true
        setTimeout(function() {
            colorsTested = []
            timeOutSet = false
            setupColor()
            setupGame()
        }, 1000)
        
    }

    else {
        colorsTested = []
    }
}

setupColor()
setupGame()


