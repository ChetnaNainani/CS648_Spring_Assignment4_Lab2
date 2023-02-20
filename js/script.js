// CREATE AN ARRAY OF EMPLOYEES
let arrayOfEmployees = [
    [94497874, "Chetna Nainani", 3222, "cnainani8802@sdsu.edu", "Engineering"],
    [37980055, "Joshua Hines", 2111, "joshuahines4867@sdsu.edu", "Executive"],
    [92551590, "Franco Mayo", 1036, "francomayo9511@sdsu.edu", "Sales"],
    [80661507, "Madison Wolf", 1271, "madisonwolf4333@sdsu.edu", "Administrative"],
    [72425550, "David Boyd", 7137, "davidboyd6778@sdsu.edu", "Marketing"]
]

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem('listOfTheEmployees') !== null) {
    arrayOfEmployees = JSON.parse(localStorage.getItem('listOfTheEmployees'));
}

// GET DOM ELEMENTS
let form = document.getElementById('addForm');
let empTable = document.getElementById('empTable');
let empCount = document.getElementById('empCount');

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault();
    // GET THE VALUES FROM THE TEXT BOXES
    let employeeId = parseInt(document.getElementById('id').value);
    let employeeName = document.getElementById('name').value;
    let employeeExtension = parseInt(document.getElementById('extension').value);
    let employeeEmail = document.getElementById('email').value;
    let employeeDepartment = document.getElementById('department').value;
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newArrayObject = [employeeId, employeeName, employeeExtension, employeeEmail, employeeDepartment];
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    arrayOfEmployees.push(newArrayObject);
    // BUILD THE GRID
    buildGrid();
    // RESET THE FORM
    form.reset();
    // SET FOCUS BACK TO THE ID TEXT BOX
    form.id.focus();
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
    // CONFIRM THE DELETE
        if (confirm('Do you wish to delete this employee?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let indexOfTheRow = e.target.parentNode.parentNode.rowIndex;
            // REMOVE EMPLOYEE FROM ARRAY
            arrayOfEmployees.splice(indexOfTheRow - 1, 1);
            // BUILD THE GRID
            buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove();
    // REBUILD THE TBODY FROM SCRATCH
    let tBody = document.createElement('tbody');
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let emp of arrayOfEmployees) {
        tBody.innerHTML += 
        `
        <tr>
            <td>${emp[0]}</td>
            <td>${emp[1]}</td>
            <td>${emp[2]}</td>
            <td>${emp[3]}</td>
            <td>${emp[4]}</td>
            <td><button class="btn btn-danger delete">X</button></td>
        </tr>
        `
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tBody);
    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${arrayOfEmployees.length})`;
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('listOfTheEmployees', JSON.stringify(arrayOfEmployees));
};