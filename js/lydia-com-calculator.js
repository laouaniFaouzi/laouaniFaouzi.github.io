const form = document.getElementById("commission-form");
const table = document.getElementById("employee-table");
const list = document.getElementById("employee-list");
const totalCommissionDiv = document.getElementById("total-commission");
const totalSalesDiv = document.getElementById("total-sales");

let totalCommission = 0;
let totalSales = 0;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value;
  const position = form.elements.position.value;
  const sales = form.elements.sales.value;

  let commission = 0;
  let presence = 0;
  if (position === "junior") {
    commission = 50;
    presence = 50;
  } else if (position === "senior") {
    commission = 100;
    presence = 100;
  }

  if ( sales >= 15000 ) {
    commission += parseFloat((sales * 0.05).toFixed(2));
  }

  totalSales += parseFloat(sales);

  totalCommission += commission;

  const row = document.createElement("tr");

  const nameCell = document.createElement("td");
  nameCell.textContent = name;
  row.appendChild(nameCell);

  const positionCell = document.createElement("td");
  positionCell.textContent = position + " (+" + presence + "€)";
  row.appendChild(positionCell);

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
    totalCommissionDiv.textContent = totalCommission.toFixed(2) + "€";
  });
  
  const deleteCell = document.createElement("td");
  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);
  list.appendChild(row);

  totalCommissionDiv.textContent = totalCommission.toFixed(2) + "€";
  totalSalesDiv.textContent = totalSales.toFixed(2) + "€";

});

document.querySelector("#download-pdf").addEventListener("click", function() {
    // Code pour générer et enregistrer le PDF
    var doc = new jsPDF('p', 'pt', 'letter');
    var employeeTable = document.querySelector("#employee-table");
    var res = doc.autoTableHtmlToJson(employeeTable);
    doc.autoTable(res.columns, res.data, {
      startY: 60,
      theme: 'grid',
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
        cellPadding: 5,
        halign: 'center'
      }
    });
    doc.save('employee-table.pdf');
  });
