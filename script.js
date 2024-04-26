import { userData } from "./data.js";

const tableHeadElement = document.getElementById('table-head')
const tableBodyElement = document.getElementById('table-body')
const previousButton = document.getElementById('previous-btn')
const nextButton = document.getElementById('next-btn')
const pageNoText = document.getElementById('page-no')
const flexTableElem = document.getElementsByClassName('flex-table  aqp;')

let currentPage = 1
let dataLimit = 20
let filteredData = [];
const URL = "https://jsonplaceholder.typicode.com/photos";
function getPaginationData(data) {
  const startIndex = (currentPage - 1) * dataLimit;
  const endIndex = Math.min(startIndex + dataLimit, data.length)
  return data.slice(startIndex, endIndex)
}
function handleSearchInput(inputKey) {
  const searchInputValue = document.getElementById(`${inputKey}-search-input`).value

  const filterData = userData.filter((rowData) =>
    String(rowData[inputKey]).toLowerCase().includes(String(searchInputValue.toLowerCase()))
  )
  filteredData = filterData
  currentPage = 1
  pageNoText.innerText = currentPage
  createTableBody(getPaginationData(filteredData))
}

function createTableHead(tableData) {
  const tableHeaderKeys = Object.keys(tableData[0])
  tableHeaderKeys.forEach((headerKey) => {
    const tableHeaderKeyElement = document.createElement('th')
    tableHeaderKeyElement.innerText = headerKey
    tableHeadElement.appendChild(tableHeaderKeyElement)
    const searchInputElem = document.createElement('input');
    searchInputElem.type = 'search'
    searchInputElem.setAttribute('placeholder', `Search ${headerKey}`)
    tableHeaderKeyElement.appendChild(searchInputElem)
    const searchInputId = `${headerKey}-search-input`
    searchInputElem.setAttribute('id', searchInputId)
    searchInputElem.addEventListener('keyup', () => handleSearchInput(headerKey))
  })

}
function createTableBody(tableData) {
  tableBodyElement.innerHTML = ""
  tableData.forEach((rowData) => {
    const tableRowElement = document.createElement('tr')
    const tableRowValues = Object.values(rowData)
    tableRowValues.forEach((descriptionText) => {
      const tableDescriptionElement = document.createElement('td')
      tableDescriptionElement.innerText = descriptionText
      tableRowElement.appendChild(tableDescriptionElement)
    })
    tableBodyElement.appendChild(tableRowElement)
  })
}

previousButton.addEventListener('click', () => {
  const currentData = filteredData.length ? filteredData : userData

  currentPage = currentPage > 1 ? currentPage - 1 : 1
  pageNoText.innerHTML = currentPage
  createTableBody(getPaginationData(currentData))
})
nextButton.addEventListener('click', () => {
  const currentData = filteredData.length ? filteredData : userData
  const totalPages = Math.ceil(currentData.length / dataLimit)
  currentPage = currentPage < totalPages ? currentPage + 1 : totalPages
  pageNoText.innerHTML = currentPage
  createTableBody(getPaginationData(currentData))
})

pageNoText.innerHTML = currentPage

// createTableHead(userData)
// createTableBody(getPaginationData(userData))


// const fetchTableData = async () => {
//   const response = await fetch(URL)
//   const data = await response.json();
//   return data;
// }
// fetchTableData().then((data) => {
//   createTableHead(data)
//   createTableBody(getPaginationData(data))
// }).catch((error)=>console.log(error));

fetch(URL)
  .then(response => response.json())
  .then((data) => {
    createTableHead(data)
    createTableBody(getPaginationData(data))
  })
