let users = [
    { name: "Özge Stenström", username: "özge", password: "pass1", balance: 1000 },
    { name: "Salar Askar", username: "salar", password: "pass2", balance: 1000 },
];

let currentUser = null; // för  hå koll på inloggad användare
let input = ""; // För nummerinmatning
    

const btnlogin = document.getElementById('btnlogin');

btnlogin.addEventListener ('click', ()=>{
    let u = document.getElementById('username').value.trim();
    let p = document.getElementById ('password').value.trim();

    //validerar input
    if (!u || !p) {
        alert('Vänligen fyll i både användarnamn och lösenord.');
        return;
    }
   // Hittar  användaren
   const user = users.find(
    (user) => user.username === u && user.password === p
);

if (user) {
    currentUser = user; // Uppdatera `currentUser`
    
// Rensa tidigare meddelanden
    document.getElementById("message").textContent = ""; 
    document.getElementById('user-info').textContent = `Inloggad som: ${currentUser.name}`;
    document.querySelector(".login-container").style.display = "none";
    updateUI(); // Uppdatera gränssnittet
} else {
    alert("Felaktigt användarnamn eller lösenord. Försök igen.");
}
});

// Uppdatera UI beroende på om användaren är inloggad eller inte
function updateUI() {
    if (currentUser) {
        document.querySelector('.controls').style.display = 'flex'; // Visa kontroller för inloggad användare
        document.querySelector('.input-container').style.display = 'block';
        document.querySelector('.login-container').style.display = 'none'; // Dölj login när inloggad
    } else {
        document.querySelector('.controls').style.display = 'none'; // Dölj kontroller om ingen är inloggad
        document.querySelector('.input-container').style.display = 'none';
        document.querySelector('.login-container').style.display = 'block';
    }
}

// Funktion som hanterar inmatning av siffror från numreringstangentbordet
function inputNumber(num) {
    input += num; // Lägg till siffran till inmatningssträngen
    document.getElementById("inputField").value = input; // Uppdatera inputfältet med den nya strängen
}

function clearInput() {
    input = "";
    document.getElementById("inputField").value = "";
}

function logout() {
    if (!currentUser) {
        showMessage("Ingen användare är inloggad.");
        return;
        
    }
    showMessage("Du har loggat ut.");
    currentUser = null; // Töm inloggad användare
    document.getElementById("user-info").textContent = ""; // Rensa användarinformation
    document.getElementById("balance").textContent = ""; // Rensa saldo
    

      // Visa login-container igen och dölja kontroller
      document.querySelector(".login-container").style.display = "block"; 
      updateUI(); // Uppdatera UI
      
}

// Funktion för att visa saldo
function showBalance() {
    if (!currentUser) {
        showMessage("Du måste logga in först.");
        return;
    }

    const balanceElement = document.getElementById("balance");
    balanceElement.textContent = `Ditt saldo är: ${currentUser.balance} kr.`;
}
// Funktion för insättning
function deposit() {
    if (!currentUser) {
        showMessage("Du måste logga in först.");
        return;
    }
    const amount = parseFloat(input.replace(",", ".")); // Ersätt komma med punkt för decimaler 
    if (isNaN(amount) || amount <= 0) {
        showMessage("Felaktig inmatning. Endast positiva nummer är tillåtna.");
        clearInput();
        return;
    }
    currentUser.balance += amount; //uppdattera saldot
    showMessage(`Insättning lyckades. Nytt saldo: ${currentUser.balance} kr.`);
    clearInput();
    showBalance(); // Visa det uppdaterade saldot direkt
}

//funktion för uttag
function withdraw() {
    if (!currentUser) {
        showMessage("Du måste logga in först.");
        return;
    }
    const amount = parseFloat(input.replace(",", ".")); // Ersätt komma med punkt för decimaler
    if (isNaN(amount) || amount <= 0) {
        showMessage("Felaktig inmatning. Endast positiva nummer är tillåtna.");
        clearInput();
        return;
    }
    if (amount > currentUser.balance) {
        showMessage("Otillräckligt saldo för detta uttag.");
        clearInput();
        return;
    }
    currentUser.balance -= amount;
    showMessage(`Uttag lyckades. Nytt saldo: ${currentUser.balance} kr.`);
    clearInput();
    showBalance(); // Visa det uppdaterade saldot direkt
}
// Funktion för att visa meddelanden
function showMessage(message) {
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
}