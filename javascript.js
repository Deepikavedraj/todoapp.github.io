const adduserbtn = document.getElementById('adduser');
// const btntext = adduserbtn.innerText;
const usernamefield = document.getElementById('username');
const recordsdisplay = document.getElementById('records');


let userArray = [];
let edit_id = null;
let objstr = localStorage.getItem('users');



if (objstr != null) {
  userArray = JSON.parse(objstr);
}

DisplayInfo();
adduserbtn.onclick = () => {
  const name = usernamefield.value;
  if (edit_id != null) {
    userArray.splice(edit_id, 1, { "name": name })
    edit_id=null;
  }
  else {
    userArray.push({ 'name': name })
  }

  SaveInfo(userArray);
  usernamefield.value = '';
  DisplayInfo();
  adduserbtn.innerText = 'Add Name';
}

function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem('users', str);

}

function DisplayInfo() {
  let statement = '';
  userArray.forEach((user, i) => {
    statement += `<tr>
  <th scope="row">${i + 1}</th>
  <td>${user.name}</td>
  <td> <button type="button" class="btn btn-info shadow"><i class="fa fa-pencil text-white" onclick='EditInfo(${i})' aria-hidden="true"></i></button>
  <button type="button" class="btn btn-danger shadow"><i class="fa fa-trash text-white" onclick='DeleteInfo(${i})' aria-hidden="true"></i></button></td>
</tr>`;

  });
  recordsdisplay.innerHTML = statement;
}

function EditInfo(id) {
  edit_id = id;
  usernamefield.value = userArray[id].name;
  adduserbtn.innerText = "Save Changes";
}
function DeleteInfo(id) {
  userArray.splice(id, 1);
  SaveInfo(userArray);
  DisplayInfo();
}