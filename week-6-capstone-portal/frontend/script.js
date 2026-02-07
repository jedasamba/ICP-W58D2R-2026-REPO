// DATA
let clients = [];
let projects = [];
let payments = [];
let tasks = [];

// ELEMENTS
const clientCount = document.getElementById("clientCount");
const projectCount = document.getElementById("projectCount");
const paymentTotal = document.getElementById("paymentTotal");

const newClient = document.getElementById("newClient");
const addClientBtn = document.getElementById("addClient");

const newProject = document.getElementById("newProject");
const addProjectBtn = document.getElementById("addProject");

const newPayment = document.getElementById("newPayment");
const addPaymentBtn = document.getElementById("addPayment");

const taskForm = document.getElementById("taskForm");
const taskClient = document.getElementById("taskClient");
const taskProject = document.getElementById("taskProject");
const taskList = document.getElementById("taskList");
const taskPayment = document.getElementById("taskPayment");

const toggleModeBtn = document.getElementById("toggleMode");
const body = document.body;

// FUNCTIONS
function updateClients() {
  clientCount.textContent = `${clients.length} active clients`;
  taskClient.innerHTML = '<option value="">Select Client</option>';
  clients.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    taskClient.appendChild(option);
  });
}

function updateProjects() {
  projectCount.textContent = `${projects.length} ongoing projects`;
  taskProject.innerHTML = '<option value="">Select Project</option>';
  projects.forEach(p => {
    const option = document.createElement("option");
    option.value = p;
    option.textContent = p;
    taskProject.appendChild(option);
  });
}

function updatePayments() {
  const total = payments.reduce((a,b)=>a+b,0);
  paymentTotal.textContent = `Ksh ${total} received`;
}

function updateTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task,i)=>{
    const li = document.createElement("li");
    li.textContent = `${task.name} | ${task.priority} | ${task.client || "-"} | ${task.project || "-"} | Ksh ${task.payment || 0}`;
    taskList.appendChild(li);
  });
}

// EVENT LISTENERS
addClientBtn.addEventListener("click", ()=>{
  if(newClient.value.trim()!==""){
    clients.push(newClient.value.trim());
    newClient.value="";
    updateClients();
  }
});

addProjectBtn.addEventListener("click", ()=>{
  if(newProject.value.trim()!==""){
    projects.push(newProject.value.trim());
    newProject.value="";
    updateProjects();
  }
});

addPaymentBtn.addEventListener("click", ()=>{
  const amount = parseFloat(newPayment.value);
  if(!isNaN(amount) && amount>0){
    payments.push(amount);
    newPayment.value="";
    updatePayments();
  }
});

taskForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const name = taskForm[0].value.trim();
  const priority = taskForm[1].value;
  const client = taskForm[2].value;
  const project = taskForm[3].value;
  const payment = parseFloat(taskForm[4].value) || 0;

  tasks.push({name,priority,client,project,payment});

  // add payment to payments array
  if(payment>0){
    payments.push(payment);
    updatePayments();
  }

  taskForm.reset();
  updateTasks();
});

// DARK MODE TOGGLE
toggleModeBtn.addEventListener("click", ()=>{
  body.classList.toggle("dark");
});
