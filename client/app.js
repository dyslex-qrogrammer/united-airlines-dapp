let web3;
let account;
let contract;

// Load ABI dynamically
async function loadABI() {
  const res = await fetch("AirlineContracts.json");
  return await res.json();
}

// Load accounts into dropdown
async function loadAccounts() {
  const accounts = await web3.eth.getAccounts();
  const sel = document.getElementById("accountList");
  sel.innerHTML = "";

  accounts.forEach((acc) => {
    const o = document.createElement("option");
    o.value = acc;
    o.textContent = acc;
    sel.appendChild(o);
  });

  account = accounts[0];
  sel.value = account;

  document.getElementById("currentAccount").innerText = "Active: " + account;
}

// Switch account
function switchAccount() {
  const sel = document.getElementById("accountList");
  account = sel.value;
  document.getElementById("currentAccount").innerText = "Active: " + account;
}

// Connect to Ganache
async function connectWallet() {
  try {
    web3 = new Web3("http://127.0.0.1:8545");

    const accounts = await web3.eth.getAccounts();
    if (!accounts || accounts.length === 0) {
      alert("No accounts found on Ganache.");
      return;
    }
    account = accounts[0];

    document.getElementById("account").innerText = "Connected: " + account;
    document.getElementById("currentAccount").innerText = "Active: " + account;

    await loadAccounts();

    const abiJson = await loadABI();
    const networkId = await web3.eth.net.getId();

    if (!abiJson.networks[networkId]) {
      alert("Contract not found on network: " + networkId);
      return;
    }

    contract = new web3.eth.Contract(
      abiJson.abi,
      abiJson.networks[networkId].address
    );

    console.log("Connected to contract:", abiJson.networks[networkId].address);
  } catch (err) {
    console.error(err);
    alert("Failed to connect: " + err.message);
  }
}

// USER ACTIONS
async function bookFlight() {
  try {
    const id = document.getElementById("flightID").value;
    await contract.methods.bookFlight(id).send({ from: account });
    alert("Flight Booked!");
  } catch (err) {
    console.error(err);
    alert("Book flight failed: " + err.message);
  }
}

async function checkIn() {
  try {
    await contract.methods.checkIn().send({ from: account });
    alert("Checked In!");
  } catch (err) {
    console.error(err);
    alert("Check-In failed: " + err.message);
  }
}

async function buyInsurance() {
  try {
    const tier = parseInt(document.getElementById("insuranceTier").value);
    let amount = "0";

    if (tier === 1) amount = web3.utils.toWei("0.005", "ether");
    if (tier === 2) amount = web3.utils.toWei("0.01", "ether");
    if (tier === 3) amount = web3.utils.toWei("0.02", "ether");

    await contract.methods.buyInsurance(tier).send({
      from: account,
      value: amount,
    });

    alert("Insurance Purchased!");
  } catch (err) {
    console.error(err);
    alert("Insurance failed: " + err.message);
  }
}

async function trackBaggage() {
  try {
    const data = await contract.methods.bookings(account).call();
    document.getElementById("bagStatus").innerText =
      "Bag Status: " + data.bagStatus;
  } catch (err) {
    console.error(err);
    alert("Baggage status failed: " + err.message);
  }
}

async function checkFlightStatus() {
  try {
    const data = await contract.methods.bookings(account).call();
    document.getElementById("flightStatus").innerText =
      "Flight Status: " + data.flightStatus;
  } catch (err) {
    console.error(err);
    alert("Flight status failed: " + err.message);
  }
}

// ADMIN
async function adminUpdateBag() {
  try {
    const p = document.getElementById("passengerAddress").value;
    const s = document.getElementById("newBagStatus").value;
    await contract.methods.updateBaggage(p, s).send({ from: account });
    alert("Baggage Updated!");
  } catch (err) {
    console.error(err);
    alert("Update baggage failed: " + err.message);
  }
}

async function adminUpdateFlight() {
  try {
    const p = document.getElementById("passengerAddress").value;
    const s = document.getElementById("newFlightStatus").value;
    await contract.methods.updateFlightStatus(p, s).send({ from: account });
    alert("Flight Status Updated!");
  } catch (err) {
    console.error(err);
    alert("Update flight failed: " + err.message);
  }
}

async function adminUpdateTime() {
  try {
    const p = document.getElementById("passengerAddress").value;
    const t = document.getElementById("newDepartureTime").value;
    await contract.methods.updateDepartureTime(p, t).send({ from: account });
    alert("Time Updated!");
  } catch (err) {
    console.error(err);
    alert("Update time failed: " + err.message);
  }
}

// SECTION SWITCHING
function showSection(id) {
  const sections = document.querySelectorAll(".section");
  sections.forEach((sec) => {
    if (sec.id === id) sec.classList.remove("hidden");
    else sec.classList.add("hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  showSection("bookFlightSection");
});
