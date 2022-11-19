let userform = document.getElementById("User-Form")

const retrieveEntries =() => {
    let entries = localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    }else{
        entries=[];
    }
    return entries;
}
window.onload = function() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    minYear = yyyy - 55; 
    maxYear = yyyy - 18; 

    var min = minYear + "-" + mm + "-" + dd;
    var max = maxYear + "-" + mm + "-" + dd;

    document.getElementById("dob").setAttribute("min", min);
    document.getElementById("dob").setAttribute("max", max);
  };

let Entries = retrieveEntries();

const displayentries = () =>{
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.acceptTerms}</td>`;

        const row = `<tr> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell} </tr>`;
        return row;

    }).join("\n");

    const table = `<table align='center' cellpadding='10'><tr><th>Name</th><th>Email</th><th>Password</th><th>Dob</th><th>Accepted terms?</th></tr>${tableEntries}</table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;

}
const saveuserform = event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptTerms = document.getElementById("acceptTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        acceptTerms
    };

    Entries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(Entries));
    displayentries();
}

userform.addEventListener("submit", saveuserform);
displayentries();
