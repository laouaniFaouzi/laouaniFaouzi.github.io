// Vérifier si le nom de l'utilisateur a déjà été enregistré
if (!localStorage.getItem('userName')) {
  // Sélectionner l'élément HTML de la popup et l'afficher
  const popup = document.querySelector('.popup');
  popup.style.display = 'flex';

  // Sélectionner les éléments HTML du formulaire de la popup
  const form = document.querySelector('#popupForm');
  const nameInput = document.querySelector('#nameInput');

  // Ajouter un écouteur d'événement sur la soumission du formulaire
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Récupérer la valeur du champ de saisie
    const name = nameInput.value;

    // Enregistrer le nom de l'utilisateur dans le stockage local
    localStorage.setItem('userName', name);

    // Cacher la popup et mettre à jour le nom dans l'élément HTML approprié
    popup.style.display = 'none';
    const profileName = document.querySelector('#profileName');
    profileName.textContent = name;
  });
} else {
  // Si le nom de l'utilisateur a déjà été enregistré, mettre à jour l'élément HTML approprié
  const profileName = document.querySelector('#profileName');
  profileName.textContent = localStorage.getItem('userName');
}
