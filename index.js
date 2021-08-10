const cashSelector = document.getElementById("cash_recieved");
const billAmountSelector = document.getElementById("bill_amount");
const calculateButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const invalidMessage = document.getElementById("message");
const invalidSelector = document.getElementById("invalid-input");
const tableSelector = document.getElementsByTagName("table")[0];

const sumOfDigits = (dateString) => {
  let sum = 0;
  for (const x of dateString.split("")) sum += Number.parseInt(x, 10);
  return sum;
};

const reset = () => {
  invalidSelector.style.display = "none";
  tableSelector.style.display = "none";
};

const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

nextButton.addEventListener("click", () => {
  reset();
  const billAmount = billAmountSelector.value;

  if (isNaN(billAmount) || billAmount === "") {
    invalidMessage.innerText = "Invalid Input";
    invalidSelector.style.display = "block";
    return;
  }
  nextButton.style.display = "none";
  cashSelector.style.display = "block";
  calculateButton.style.display = "block";
});

const calculateBalance = (billAmount, cashRecievedAmount) => {
  const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];
  let balanceAmt = [];

  let balance = cashRecievedAmount - billAmount;

  if (balance === 0) {
    invalidMessage.innerText = "No change to be returned";
    invalidSelector.style.display = "block";
    return;
  }

  let i = 0;
  while (i != arrayNoteAmt.length) {
    const notes = Math.floor(balance / arrayNoteAmt[i]);
    balance = balance % arrayNoteAmt[i];
    balanceAmt.push(notes);
    i++;
  }

  const row = document.getElementById("notes");
  removeAllChildNodes(row);
  const head = document.createElement("th");
  head.innerText = "No. Of Notes";
  row.appendChild(head);

  balanceAmt.map((e) => {
    const td = document.createElement("td");
    if (e !== 0) td.innerText = e;
    row.appendChild(td);
  });

  tableSelector.style.display = "table";
};

calculateButton.addEventListener("click", () => {
  reset();

  /** @type {Date} */
  const cashRecievedAmount = Number.parseInt(cashSelector.value);
  const billAmount = Number.parseInt(billAmountSelector.value);

  if (
    isNaN(billAmount) ||
    billAmount === "" ||
    cashRecievedAmount === "" ||
    isNaN(cashRecievedAmount)
  ) {
    invalidMessage.innerText = "Invalid Input";
    invalidSelector.style.display = "block";
    return;
  }

  if (cashRecievedAmount < billAmount) {
    invalidMessage.innerText = "Cash recieved can't be lesser than bill amount";
    invalidSelector.style.display = "block";
    return;
  }

  calculateBalance(billAmount, cashRecievedAmount);
});
