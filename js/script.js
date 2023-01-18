function getTimeOfDay() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      return "morning";
    } else if (currentHour >= 12 && currentHour < 14) {
      return "noon";
    } else if (currentHour >= 14 && currentHour < 18) {
      return "afternoon";
    } else if (currentHour >= 18 && currentHour < 23) {
      return "evening";
    } else {
      return "night";
    }
}
  
const time = getTimeOfDay();

if (time === "morning") {
    console.log("Morniiiing!");
} else if (time === "noon") {
    console.log("Enjoy your meal!");
} else if (time === "afternoon") {
    console.log("Hi there !");
} else if (time === "evening") {
    console.log("it's dinner tiiiiiime!");
} else if (time === "night") {
    console.log("You are a late sleeper!");
}