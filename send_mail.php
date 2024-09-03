<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $nom = htmlspecialchars($_POST['nom']);
    $prenom = htmlspecialchars($_POST['prenom']);
    $email = htmlspecialchars($_POST['email']);
    $telephone = htmlspecialchars($_POST['telephone']);
    $company = htmlspecialchars($_POST['company']);
    $message = htmlspecialchars($_POST['message']);

    // Vérification de la checkbox
    if (!isset($_POST['privacyPolicy'])) {
        echo "Vous devez accepter les politiques de confidentialité.";
        exit;
    }

    $to = "votre-adresse-email@domaine.com"; // Remplacez par votre adresse e-mail
    $subject = "Nouveau message de $nom $prenom";
    
    $body = "Nom: $nom\n";
    $body .= "Prénom: $prenom\n";
    $body .= "Email: $email\n";
    $body .= "Numéro de Téléphone: $telephone\n";
    $body .= "Nom de l'entreprise: $company\n\n";
    $body .= "Message:\n$message\n";

    $headers = "From: $email";

    // Envoi de l'e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Votre message a été envoyé avec succès.";
    } else {
        echo "Une erreur est survenue lors de l'envoi du message.";
    }
} else {
    echo "Méthode de requête non autorisée.";
}
?>

