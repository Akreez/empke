const tbody = document.querySelector('#tbody')
const saveButton = document.getElementById('saveButton')
const idInput = document.getElementById('id')
const nameInput = document.getElementById('name')
const cityInput = document.getElementById('city')
const salaryInput = document.getElementById('salary')

//Read

const url = 'http://localhost:8000/api/employees'

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

getEmployees()

function renderTbody(empList){
    var tbodyContent = '';
    empList.forEach((emp) => {
        var row = `
        <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
            <td><button class="btn btn-secondary" onclick="updateEmployee()"
            data-id="${emp.id}"
            data-name="${emp.name}"
            data-city="${emp.city}"
            data-salary="${emp.salary}"
            >Szerkesztés</td>
            <td><button class="btn btn-danger" onclick="deleteEmployee(${emp.id})">X</td>
        </tr>
        `;
        tbodyContent += row
    })
    tbody.innerHTML = tbodyContent
}

/* Create művelet */

saveButton.addEventListener('click', ()=>{
    //JavaScript objektum
    const emp = {
        name: nameInput.value,
        city: cityInput.value,
        salary: salaryInput.value
    }

    // console.log(emp)

    addEmployee(emp)

    clearFields()
    
})

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
    }).then(response => response.json())
    .then(result => {
        console.log(result)
        getEmployees()
    })
    .catch(err => console.log(err))
}

/* Delete művelet */

function deleteEmployee(id){
    const delUrl = url + "/" + id;
    fetch(delUrl, {method: "DELETE"})
    .then(response=>response.json())
    .then(result=>{
        console.log(result)
        getEmployees()
    });
    
}

/* Update művelet */

function updateEmployee(){
    const emp = {
        id : this.event.target.getAttribute('data-id'),
        name : this.event.target.getAttribute('data-name'),
        city : this.event.target.getAttribute('data-city'),
        salary : this.event.target.getAttribute('data-salary')
    }
    
    console.log(emp)
}