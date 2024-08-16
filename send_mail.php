<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nom = htmlspecialchars($_POST['nom']);
    $prenom = htmlspecialchars($_POST['prenom']);
    $email = htmlspecialchars($_POST['email']);
    $telephone = htmlspecialchars($_POST['telephone']);
    $vous_etes = htmlspecialchars($_POST['vous-etes']);
    $demande = htmlspecialchars($_POST['demande']);
    $message = htmlspecialchars($_POST['message']);

    $to = "laouanifaouzi@gmail.com"; // Remplacez par votre adresse e-mail
    $subject = "Nouveau message de $nom $prenom";
    
    $body = "Nom: $nom\n";
    $body .= "Prénom: $prenom\n";
    $body .= "Email: $email\n";
    $body .= "Numéro de Téléphone: $telephone\n";
    $body .= "Vous êtes: $vous_etes\n";
    $body .= "Demande: $demande\n\n";
    $body .= "Message:\n$message\n";

    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Votre message a été envoyé avec succès.";
    } else {
        echo "Une erreur est survenue lors de l'envoi du message.";
    }
} else {
    echo "Méthode de requête non autorisée.";
}
