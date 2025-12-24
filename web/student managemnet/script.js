let students = JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("studentForm").addEventListener("submit", saveStudent);

function saveStudent(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let dept = document.getElementById("dept").value;
    let index = document.getElementById("index").value;

    if (name === "" || roll === "" || dept === "") {
        alert("All fields are required");
        return;
    }

    let student = { name, roll, dept };

    if (index === "") {
        students.push(student); // ADD
    } else {
        students[index] = student; // UPDATE
    }

    localStorage.setItem("students", JSON.stringify(students));
    document.getElementById("studentForm").reset();
    document.getElementById("index").value = "";

    displayStudents();
}

function displayStudents() {
    let table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach((student, i) => {
        table.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.roll}</td>
                <td>${student.dept}</td>
                <td>
                    <button class="edit" onclick="editStudent(${i})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${i})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function editStudent(i) {
    document.getElementById("name").value = students[i].name;
    document.getElementById("roll").value = students[i].roll;
    document.getElementById("dept").value = students[i].dept;
    document.getElementById("index").value = i;
}

function deleteStudent(i) {
    if (confirm("Are you sure?")) {
        students.splice(i, 1);
        localStorage.setItem("students", JSON.stringify(students));
        displayStudents();
    }
}

displayStudents();
