var appLinkButton = document.getElementById("lydiaApps");

appLinkButton.addEventListener("click", function () {
    var password = window.prompt("Entrez le mot de passe :"); // affiche une boîte de dialogue demandant le mot de passe

    if (password === "Lydia") {
        window.location.href = "https://laouanifaouzi.github.io/mini-apps.html"; // redirige vers la page protégée
    } else {
        alert("Mot de passe incorrect. Veuillez réessayer."); // affiche une alerte si le mot de passe est incorrect
    }
});