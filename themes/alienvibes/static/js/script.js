function setNewCookie(key="refresh_cache", value=true) {
  // Set the cookie name and value
  var cookieName = key;
  var cookieValue = value;

// Set the expiration date to 30 days from now
  var expirationDate = new Date();  
  expirationDate.setDate(expirationDate.getDate() + 30);

// Set the cookie with the name, value, and expiration date
  document.cookie = cookieName + "=" + cookieValue + "; expires=" + expirationDate.toUTCString() + "; path=/";
}

function checkRefreshCacheCookie(cookieName) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName+"=")) {
      return true;
    }
  }
  return false;
}


(function(){

  // get the current url

  let url =  new URL(location.href)

  // get the current query params

  let params = new URLSearchParams(url.searchParams)

  const refreshFlag = params.get("token")


  // if there is no frefresh flag set, check if a cookie exists, set one if there isn't one, bail out of the function if we already refreshed the cache
  if (!refreshFlag) {

    const cookieExists = checkRefreshCacheCookie("refresh_cache")

    if (!cookieExists) {
      setNewCookie("refresh_cache", true)
    } else {
      return
    }



    // create new query params
    const queryParams = {
      token: "refresh_cache",
      timestamp: Date.now(),
    }
    // copy the url from location.href and reset the query params
    const redirectURL = url

    Object.keys(queryParams).forEach(key => redirectURL.searchParams.append(key, queryParams[key]))

    // redirect

    location.assign(redirectURL)
    
    
  }

})()


const images = document.querySelectorAll(".lazy");
const bgImages = document.querySelectorAll(".lazy-bg");

let options = {
  rootMargin: "10px",
  threshold: 0.5,
};

function lazyLoadImages(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.src = entry.target.getAttribute("data-src");
      setTimeout(() => {
        entry.target.classList.add("fadeIn");
        observer.unobserve(entry.target)
      }, 500);
    }
  });
}

// Lazy backgrounds

function lazyBackground(entries, observer) {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.style.background = `linear-gradient(0.25turn, hsla(155, 67%, 45%, 0.5), hsla(155, 67%, 45%, 0.5)), url(${entry.target.getAttribute(
        "data-background"
      )}) no-repeat center center / cover`;
    }
  });
}

const bgObserver = new IntersectionObserver(lazyBackground, options);

const observer = new IntersectionObserver(lazyLoadImages, options);

images.forEach((image) => {
  observer.observe(image);
});

bgImages.forEach((image) => {
  bgObserver.observe(image);
});

// Bold Day Of the Week On Schedule

const currentDay = new Date().getDay();
const scheduleRange = document.querySelectorAll("span.day");
scheduleRange.forEach((day) => {
  if (day.getAttribute("id").split("-")[1] == currentDay) {
    day.classList.add("fw-bold");
    day.classList.add("text-warning");
  }
});

// Year Stamp

const yearContainer = document.getElementById("year");

year.textContent = new Date().getFullYear();

// Elevator to top

const elevator = document.querySelector(".elevator");

document.body.addEventListener("scroll", (e) => {
  if (e.target.scrollTop > 250) {
    elevator.style.opacity = 1;
    elevator.style.transform = `translateY(0)`;
  } else {
    elevator.style.opacity = 0;
    elevator.style.transform = `translateY(calc(150% + 1rem))`;
  }
  if (e.target.scrollTop >= e.target.scrollHeight - window.innerHeight - 100) {
    elevator.style.opacity = 0;
    elevator.style.transform = `translateY(calc(150% + 1rem))`;
  }
});

// THe Wave 

document.body.addEventListener('scroll', (e) => {
    if (e.target.scrollTop >= e.target.scrollHeight - window.innerHeight - 100) {
        document.querySelector('.wave').classList.add('animate');
    } else {
        document.querySelector('.wave').classList.remove('animate');
    }
})

// Parallax
const parallax = (id, rate) => {
  const transformObj = document.getElementById(id);
  const initParallax = () => {
    let x = transformObj.getBoundingClientRect().top / rate;
    let y = Math.round((x * 100) / 100);
    transformObj.style.backgroundPosition = `center ${y}px`;
    initParallax();
    window.addEventListener("scroll", initParallax(id, rate));
  };
};












