"use strict";

// Mark navber transparent when it is on the top
const navbar = document.querySelector("#navbar");
const menuItem = document.querySelectorAll(".navbar__menu__item");
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark-green");
    for(let item of menuItem) {
      item.classList.add("menuItem--white");
      item.classList.add("menuItem--borderNone");
    }
  } else {
    navbar.classList.remove("navbar--dark-green");
    for(let item of menuItem) {
      item.classList.remove("menuItem--white");
      item.classList.remove("menuItem--borderNone");
    }
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return; //end function execution
  }
  navbarMenu.classList.remove("navbar__menu--visible");
  scrollIntoView(link);
});

// Show navbar menu when toggle the button for small screen
const toggleBtn = document.querySelector(".navbar__toggle-btn");
toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("navbar__menu--visible");
});

// Handle click on the "contact me" button on home
const contactButton = document.querySelector(".home__contact");
contactButton.addEventListener("click", () => {
  scrollIntoView("#contact");
});

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height;
const home__right = document.querySelector(".home__right");
document.addEventListener("scroll", () => {
  home__right.style.opacity = 1 - window.scrollY / homeHeight;
});

// Show "arrow" button when scrolling down
const arrow = document.querySelector(".arrow");
document.addEventListener("scroll", () => {
  if (window.scrollY > homeHeight / 2) {
    arrow.classList.add("arrow--visible");
  } else {
    arrow.classList.remove("arrow--visible");
  }
});

// Handle click on the "arrow" button
arrow.addEventListener("click", () => {
  scrollIntoView("#home");
});

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
workBtnContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return; //만약의 경우라도
  }

  // Remove selected class from the previous item and add it to the new one
  const active = document.querySelector(".category__btn.selected");
  active.classList.remove("selected");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("selected");

  projectContainer.classList.add("anim-out");
  setTimeout(() => {
    projects.forEach((project) => {
      if (filter === "*" || filter === project.dataset.type) {
        project.classList.remove("invisible");
      } else {
        project.classList.add("invisible");
      }
    });
    projectContainer.classList.remove("anim-out");
  }, 300);
});

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({
    behavior: "smooth",
  });
}
