let lastActionWasEqual = false
let lastInputWasOperator = false

function btnClick(val) {
    let screen = document.getElementById("screen");
    let currentValue = screen.value

    if (isOperator(val)) {
        if (lastActionWasEqual) {
            lastActionWasEqual = false
        } else if (lastInputWasOperator) {
            screen.value = currentValue.slice(0, -1) + val
            return
        }
        lastInputWasOperator = true;
    } else {
        if (lastActionWasEqual) {
            screen.value = ""
            lastActionWasEqual = false
        }
        lastInputWasOperator = false
    }
    screen.value += val;
}

function btnClear() {
    document.getElementById("screen").value=""
    document.getElementById("prevResult").value=""
    lastActionWasEqual = false
    lastInputWasOperator = false
}

function btnbackspace() {
    let screen = document.getElementById("screen")
    let currentValue = screen.value

    if (lastActionWasEqual) {
        // Prevent backspace if the last action was an evaluation
        return;
    }

    if (currentValue.length > 0) {
        screen.value = currentValue.slice(0,-1)
        lastInputWasOperator = isOperator(currentValue.slice(-1))
    }
}


function btnEqual() {
    let text = document.getElementById("screen").value
    try {
        let result = new Function('return ' + text)()
        if (isNaN(result) || !isFinite(result)) {
            throw new Error("Invalid input")
        }
        document.getElementById("prevResult").value = "Last Result: " + result;
        document.getElementById("screen").value=result
        lastActionWasEqual=true
        lastInputWasOperator=false
    }   catch (error) {
        document.getElementById("screen").value = "Error"
        lastActionWasEqual=true
        lastInputWasOperator=false
    }
}


function isOperator(val) {
    return ['+', '-', '*', '/', '%'].includes(val)
}