const form = document.getElementById("commission-form");
const table = document.getElementById("employee-table");
const list = document.getElementById("employee-list");
const totalCommissionDiv = document.getElementById("total-commission");
const totalSalesDiv = document.getElementById("total-sales");
const totalSalaryDiv = document.getElementById("total-salary");
const totalKpisDiv = document.getElementById("total-kpis");
const totalConsultantDiv = document.getElementById("total-consultant");

let totalCommission = 0;
let totalSales = 0;

let initialSalary = 6000;
let totalSalary = initialSalary;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value;
  const position = form.elements.position.value;
  const sales = form.elements.sales.value;
  const kpis = form.elements.kpis.value;
  const seniority = form.elements.seniority.value;

  let commission = 0;
  let presence = 0;
  if (position === "Junior") {
    commission = 50;
    presence = 50;
  } else if (position === "Senior") {
    commission = 100;
    presence = 100;
  } else if (position === "Team leader") {
    commission = 500;
    presence = 500;
  } else if (position === "Manager") {
    commission = 1000;
    presence = 1000;
  }

  let seniorityValue = 0;
  if (seniority === "6-12 mounth") {
    seniorityValue = 100;
  } else if (seniority === "12-18 mounth") {
    seniorityValue = 150;
  } else if (seniority === "18-24 mounth") {
    seniorityValue = 200;
  } else if (seniority === "+24 mounth") {
    seniorityValue = 250;
  }

  let kpisValue = 0;
  let kpisAmount = 0;
  if (kpis === "Yes") {
    kpisValue = 200;
    kpisAmount = 200;
  }

  if (sales >= 20000) {
    commission += parseFloat((sales * 0.05).toFixed(2));
  }

  commission += (kpisValue += seniorityValue);

  totalSales += parseFloat(sales);

  totalCommission += commission;

  let salary = initialSalary;
  let totalSalary = salary += totalCommission;

  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  row.appendChild(nameCell);

  const positionCell = document.createElement("td");
  positionCell.textContent = position + " (+" + presence + "€)";
  row.appendChild(positionCell);

  const seniorityCell = document.createElement("td");
  seniorityCell.textContent = seniority + " (+" + seniorityValue + "€)";
  row.appendChild(seniorityCell);

  const kpisCell = document.createElement("td");
  kpisCell.textContent = kpis + " (+" + kpisAmount + "€)";
  row.appendChild(kpisCell);

  const salesCell = document.createElement("td");
  salesCell.textContent = sales + "€";
  row.appendChild(salesCell);

  const commissionCell = document.createElement("td");
  commissionCell.textContent = commission + "€";
  row.appendChild(commissionCell);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-danger");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.addEventListener("click", () => {
    row.remove();
    totalCommission -= commission;
    totalSales -= sales;
    totalCommissionDiv.textContent = totalCommission.toFixed(2) + "€";
    totalSalesDiv.textContent = totalSales.toFixed(2) + "€";
    totalSalary = initialSalary + totalCommission;
    totalSalaryDiv.textContent = totalSalary.toFixed(2) + "€";
  });

  const deleteCell = document.createElement("td");
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);
  list.appendChild(row);

  totalCommissionDiv.textContent = totalCommission.toFixed(2) + "€";
  totalSalesDiv.textContent = totalSales.toFixed(2) + "€";
  totalSalaryDiv.textContent = totalSalary.toFixed(2) + "€";
});