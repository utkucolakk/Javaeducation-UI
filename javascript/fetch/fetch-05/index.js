document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:8080/employee', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updateDiv(data);
        }) 
        .catch(error => {
            console.error('Error:'.error);
        })
})


function updateDiv(data) {
    const employeeListDiv = document.getElementById('employee-list');
    data.forEach(employee => {
        const p = document.createElement('p');
        p.innerHTML = employee.username;
        employeeListDiv.appendChild(p);
    })
}