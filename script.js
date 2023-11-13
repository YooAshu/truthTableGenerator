let inputField = document.getElementById('input-field')
let doneButton = document.getElementById('done-button')
let outputTable = document.getElementById('output-table')
let exprsnWithAscii = ""
let inputExprsn = ""
let resultHead = ""
let inputArray = []
let headingPrinted = false
doneButton.addEventListener('click', function () {
    outputTable.innerHTML = ""
    submitExprsn()
    printTruthTable()
})
inputField.addEventListener('keyup', e => {
    if (e.code == 'Enter') {
        outputTable.innerHTML = ""
        submitExprsn()
        printTruthTable()
    }
})

// console.log(inputArray)

let noOfVariables = inputArray.length
let expression




function getVarValue(x) {
    return inputArray.find((element) => element.code == x).value;
}

function replaceInputWithASCIIValue(str) {
    let replacedStr = "";
    for (let i = 0; i < str.length; i++) {
        if (/[A-Za-z]/g.test(str[i])) {
            replacedStr += `getVarValue(${str.charCodeAt(i)})`;
        } else {
            replacedStr += str[i];
        }
    }
    return replacedStr;
}

function submitExprsn() {
    inputArray = []
    inputExprsn = inputField.value
    inputExprsn = inputExprsn.toUpperCase()
    resultHead = inputExprsn
    inputExprsn = inputExprsn.replace(/[.]/g, "&")
    inputExprsn = inputExprsn.replace(/[+]/g, "|")
    exprsnWithAscii = replaceInputWithASCIIValue(inputExprsn)
    let inputArraywithDupes = inputExprsn.match(/[A-Za-z]/g)
    let inputArraywithoutDupes = [...new Set(inputArraywithDupes)]
    inputArraywithoutDupes.sort()


    inputArraywithoutDupes.forEach(e => {
        inputArray.push({ code: e.charCodeAt(0), value: 0 })
    })
    noOfVariables = inputArray.length
}

function printTruthTable() {
    let varIndex = -1
    let tableRow = document.createElement("tr")
    tableRow.style.background = `linear-gradient(47deg, rgba(80, 16, 196, 1) 3%, rgba(136, 59, 235, 1) 57%)`
    tableRow.style.color = 'white'
    while (varIndex < noOfVariables - 1) {
        let tableHead = document.createElement("th")
        let content = document.createTextNode(String.fromCharCode(inputArray[++varIndex].code));
        tableHead.appendChild(content)
        tableRow.appendChild(tableHead)

    }
    let tableHead = document.createElement("th")
    let content = document.createTextNode(resultHead);
    tableHead.appendChild(content)
    tableRow.appendChild(tableHead)
    outputTable.appendChild(tableRow)
    varIndex = 0

    for (i = 0; i < 2 ** noOfVariables; i++) {
        let binNum = i.toString(2)
        while (binNum.length != noOfVariables) {
            binNum = "0" + binNum
        }
        // console.log(binNum)
        varIndex = -1
        let tableRow = document.createElement("tr")
        while (varIndex < noOfVariables - 1) {

            inputArray[++varIndex].value = Number(binNum[varIndex])


            let tableData = document.createElement("td")
            let content = document.createTextNode(inputArray[varIndex].value);
            tableData.appendChild(content)
            tableRow.appendChild(tableData)


            // console.log(String.fromCharCode(inputArray[varIndex].code) + "=" + inputArray[varIndex].value + "  ")
        }
        varIndex = 0

        expression = eval(exprsnWithAscii)

        let result = expression
        let tableData = document.createElement("td")
        let content = document.createTextNode(Number(result));
        tableData.appendChild(content)
        tableRow.appendChild(tableData)
        outputTable.appendChild(tableRow)
        // console.log(`Result = ${Number(result)}`)
    }
}