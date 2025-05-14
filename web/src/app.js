const tbody = document.querySelector('#tbody')
const saveButton = document.getElementById('saveButton')
const addButton = document.getElementById('addButton')

const idInput = document.getElementById('id')
const nameInput = document.getElementById('name')
const cityInput = document.getElementById('city')
const salaryInput = document.getElementById('salary')

const empModalLabel = document.getElementById('empModalLabel')

const url = 'http://localhost:8000/api/employees'
var addMode = true;


saveButton.addEventListener('click', ()=>{

    if(addMode){
        const emp = {
            name: nameInput.value,
            city: cityInput.value,
            salary: salaryInput.value
        }
        addEmployee(emp)
    }else{
        const emp = {
            id : idInput.value,
            name: nameInput.value,
            city: cityInput.value,
            salary: salaryInput.value
        }
        updateEmployee(emp)
    }
    
    clearFields()
    
})


addButton.addEventListener('click',()=>{
    clearFields()
    addMode = true
    empModalLabel.innerHTML = 'Hozzáadás'
})

function getEmployees(){
    fetch(url).then((response) => {
        return response.json()
    })
    .then((result) => {
        console.log(result)
        empList = result
        renderTbody(result.data)
    })
}

function renderTbody(empList){
    var tbodyContent = '';
    empList.forEach((emp) => {
        var row = `
        <tr class="miniRow">
            <td class="mini miniId">${emp.id}</td>
            <td class="mini miniName">${emp.name}</td>
            <td class="mini miniCity">${emp.city}</td>
            <td class="mini miniSalary">${emp.salary}</td>
            <td class="mini buttons"><button class="btn btn-secondary me-2" onclick="editEmployee()"
            data-id="${emp.id}"
            data-name="${emp.name}"
            data-city="${emp.city}"
            data-salary="${emp.salary}"
            data-bs-toggle="modal"
            data-bs-target="#empModal"
            >Szerkesztés
            <button class="btn btn-danger" onclick="deleteEmployee(${emp.id})">X
            </td>
        </tr>
        `;
        tbodyContent += row
    })
    tbody.innerHTML = tbodyContent
}

function clearFields(){
    idInput.value = ''
    nameInput.value = ''
    cityInput.value = ''
    salaryInput.value = ''
}

function addEmployee(emp){
    // console.log(emp)
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(emp),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(result => {
        console.log(result)
        getEmployees()
    })
    .catch(err => console.log(err))
}

function deleteEmployee(id){
    const delUrl = url + "/" + id;
    fetch(delUrl, {method: "DELETE"})
    .then(response=>response.json())
    .then(result=>{
        console.log(result)
        getEmployees()
    });
    
}

function editEmployee(){
    addMode = false

    empModalLabel.innerHTML = 'Szerkesztés'
    const emp = {
        id : this.event.target.getAttribute('data-id'),
        name : this.event.target.getAttribute('data-name'),
        city : this.event.target.getAttribute('data-city'),
        salary : this.event.target.getAttribute('data-salary')
    }

    idInput.value = emp.id;
    nameInput.value = emp.name;
    cityInput.value = emp.city;
    salaryInput.value = emp.salary;
    
}

function updateEmployee(emp){
    console.log("update...")
    console.log(emp)

    const extUrl = url + "/" + emp.id

    fetch(extUrl, {
        method: 'PUT',
        body: JSON.stringify(emp),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => response.json())
    .then(result => {
        console.log(result)
        getEmployees()
    })
    .catch(err => console.log(err))

    addMode = true
    empModalLabel.innerHTML = 'Hozzáadás'
}

getEmployees()