fetch('https://mawaqit.net/fr/mosquee-assalam-de-tomblaine-tomblaine')
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(data, 'text/html');

    // Accédez aux éléments du document HTML récupéré ici
    const title = htmlDocument.querySelector('.time div');
    console.log(title.textContent);
  })
  .catch(error => console.error(error));