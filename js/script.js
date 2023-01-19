// Récupère les différentes périodes de la journée
function getTimeOfDay() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 6 && currentHour < 10) {
      return "earlyMorning";
    } else if (currentHour >= 10 && currentHour < 12) {
        return "morning";
    } else if (currentHour >= 12 && currentHour < 13) {
      return "noon";
    } else if (currentHour >= 13 && currentHour < 18) {
      return "afternoon";
    } else if (currentHour >= 18 && currentHour < 23) {
      return "evening";
    } else {
      return "night";
    }
}

const timeOfDayDiv = document.getElementById("time-of-day");
const time = getTimeOfDay();

if (time === "earlyMorning") {
    timeOfDayDiv.innerHTML = "Bonjour ! Réveille-toi et sent l'odeur du café, ou reste endormi et sent l'odeur de l'échec.";
} else if (time === "morning") {
    timeOfDayDiv.innerHTML = "Bonjour ! Le matin est comme un cadeau, on ne sait jamais à quoi s'attendre, sauf que c'est généralement du café.";
} else if (time === "noon") {
    timeOfDayDiv.innerHTML = "Bon appétit ! Mange comme si ta vie en dépendait, parce que tu sais bien que c'est le cas.";
} else if (time === "afternoon") {
    timeOfDayDiv.innerHTML = "Bonjour ! On dirait que c'est l'après-midi, temps idéal pour faire une pause, prendre un café et se rappeler pourquoi on a détesté le matin.";
} else if (time === "evening") {
    timeOfDayDiv.innerHTML = "Bonsoir ! C'est l'heure de mettre de côté les soucis de la journée et de s'occuper de l'essentiel : manger des pâtes et regarder des films où encore regarder ma page.";
} else if (time === "night") {
    timeOfDayDiv.innerHTML = "Bonsoir ! Il est tard, il est temps de mettre fin à cette journée et de laisser les rêves prendre le relais, ou de continuer à scroll sur ma page jusqu'à l'aube.";
}