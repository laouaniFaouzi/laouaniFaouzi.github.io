function isMorning() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 6 && currentHour < 12) {
      return true;
    }
    return false;
  }
  
  function isNoon() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 12 && currentHour < 14) {
      return true;
    }
    return false;
  }
  
  function isAfternoon() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 14 && currentHour < 18) {
      return true;
    }
    return false;
  }
  
  function isEvening() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 18 && currentHour < 23) {
      return true;
    }
    return false;
  }
  
  function isNight() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    if (currentHour >= 23 && currentHour < 6) {
      return true;
    }
    return false;
  }

if (isMorning()) {
    console.log("Morniiiing!");
} else if (isNoon()) {
    console.log("Enjoy your meal!");
} else if (isAfternoon()) {
    console.log("Hi there !");
} else if (isEvening()) {
    console.log("it's dinner tiiiiiime!");
} else if (isNight()) {
    console.log("You are a late sleeper!");
}