let inputField = document.getElementById('input-field')
let doneButton = document.getElementById('done-button')
let outputTable = document.getElementById('output-table')
// expression entered by user
let inputExprsn = ""
 changeSvgAsDevice()

// this array will contain all the alphabets used in the expression as objects with keys code (containing ascii code) and value ( containg the binary value of that aphabet ) at start all alphabets will be given zero value but later it will be given a binary value 0 or 1 as required like [{value:0,code:65}]
let inputArray = []


// this will contain the expressions where the variables(alphabets) will be replaced by a function getVarValue(ascii value of that alphabet) this function will fetch binary value of that variable from inputArray
let exprsnWithAscii = ""

let resultHead = ""

// both event listeners will check if the expression is submitted
doneButton.addEventListener('click', function() {
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



let noOfVariables = inputArray.length
let expression



// we scan the input expression using regex if an alphabet is found then we replace that alphabet  with the function getVarValue(ascii value of that alphabet) 
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


//in the string expressionWithASCII we will replace the alphabets with this function ,when this function is called it will find that alphabet in the inputArray and replace it with its binary value
function getVarValue(x) {
  return inputArray.find((element) => element.code == x).value;
}


function submitExprsn() {
  inputArray = []
  inputExprsn = inputField.value
  // will convert lowercase alphabets to uppercase cause if user entered A and a it dont take it as two seperate variables
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


  // this loop will run 2^ no. of variables i.e if  no, of variables are 2 it will run 4 times , if it is 3 it will run 8 times because a two bit number has 4 binary no. , 3 bit number has total of 8 binary no.
  for (i = 0; i < 2 ** noOfVariables; i++) {

    // will convert i from a decimal number to binary 
    let binNum = i.toString(2)

    // 0 will be converted to 0 , 1 will be conveted to 1, which is single bit but we need the same number of bits as no. of variables this loop will check if no. of bits is same as no. of variables if it is not it will added 0 at the beginning of that binary no.
    while (binNum.length != noOfVariables) {
      binNum = "0" + binNum
    }
    // console.log(binNum)
    varIndex = -1
    let tableRow = document.createElement("tr")

    // lets understand this with an example , when the number is 5 i.e 101 means there are three variables in inputArray so the first variable will be assigned a value of 1 in inputArray , the second variable will be 0 , third will be 1
    while (varIndex < noOfVariables - 1) {

      inputArray[++varIndex].value = Number(binNum[varIndex])


      let tableData = document.createElement("td")
      let content = document.createTextNode(inputArray[varIndex].value);
      tableData.appendChild(content)
      tableRow.appendChild(tableData)


    }
    varIndex = 0
    // now all binary values are replaced in the exprsn with its corresponding binary value now we will evaluate it , it will give either true(1) or false(0)
    expression = eval(exprsnWithAscii)

    let result = expression
    let tableData = document.createElement("td")
    let content = document.createTextNode(Number(result));
    tableData.appendChild(content)
    tableRow.appendChild(tableData)
    outputTable.appendChild(tableRow)
  }

  setJustifyContent()
}


function setJustifyContent() {
  if ((document.getElementById('output-table').clientWidth) >= (document.getElementById('table-holder').clientWidth)) {
    document.getElementById('table-holder').style.justifyContent = 'flex-start';
  }
  else {
    document.getElementById('table-holder').style.justifyContent = 'center';
  }
}

function changeSvgAsDevice() {
  if (window.innerWidth < 500) {
    document.getElementsByTagName('svg')[0].outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" width="430" height="800" preserveAspectRatio="none" viewBox="0 0 430 800">
          <g mask="url(&quot;#SvgjsMask1049&quot;)" fill="none">
              <rect width="430" height="800" x="0" y="0" fill="rgba(250, 242, 255, 1)"></rect>
              <path d="M220.92 822.38C265.06 725.24 219.51 419.32 296.85 402.39 374.18 385.46 390.04 580.03 448.7 602.39" stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
              <path d="M35.79 920.27C135.71 840.68 60.29 570.47 246.69 454.82 433.1 339.17 372.94 188.08 457.6 150.82" stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
              <path d="M91.24 806.58C154.08 755.08 141.32 519.97 222.86 509.45 304.4 498.93 288.67 609.45 354.48 609.45 420.29 609.45 445.14 514.9 486.1 509.45" stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
              <path d="M264.24 857.45C321.46 815.3 271.95 689.98 387.64 601.36 503.33 512.74 452.6 375.84 511.04 329.36" stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
              <path d="M235.5 869.44C310.98 739.19 233.11 426.31 369.83 282.47 506.56 138.63 454.45 138.47 504.17 122.47" stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
          </g>
          <defs>
              <mask id="SvgjsMask1049">
                  <rect width="430" height="800" fill="#ffffff"></rect>
              </mask>
          </defs>
      </svg>`
  }
  else{
    document.getElementsByTagName('svg')[0].outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:svgjs="http://svgjs.dev/svgjs" width="1600" height="843" preserveAspectRatio="none" viewBox="0 0 1600 843">
    <g mask="url(&quot;#SvgjsMask1012&quot;)" fill="none">
      <rect width="1600" height="843" x="0" y="0" fill="rgba(250, 242, 255, 1)"></rect>
      <path
        d="M353.69 895.79C474.33 892.63 577.5 718.68 802.74 718.62 1027.98 718.56 1027.27 824 1251.79 824 1476.32 824 1585.53 719.32 1700.84 718.62"
        stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
      <path d="M554.14 935.09C698.26 897.04 613.83 521.78 962.06 500.25 1310.29 478.72 1565.58 266.57 1777.89 264.21"
        stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
      <path d="M904.47 941.27C1048.36 861.62 981.21 377.61 1240.76 375.86 1500.31 374.11 1727.27 688.16 1913.34 696.2"
        stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
      <path d="M752.43 886.25C938.35 791.98 962.17 185.67 1197.81 181.34 1433.45 177.01 1496.67 550.31 1643.19 577.55"
        stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
      <path d="M661.91 884.08C794.16 860.16 715.85 554.85 1065.96 529.49 1416.07 504.13 1653.63 183.08 1874.06 175.43"
        stroke="rgba(147, 51, 194, 0.58)" stroke-width="2"></path>
    </g>
    <defs>
      <mask id="SvgjsMask1012">
        <rect width="1600" height="843" fill="#ffffff"></rect>
      </mask>
    </defs>
  </svg>`
  }
}

window.addEventListener('resize',function(){
  changeSvgAsDevice()
})