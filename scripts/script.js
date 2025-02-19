"use strict";

// Selected Elements
const navBar = document.querySelector(".navbar");
const closeNav = document.querySelector(".closenav");
const navBarBtn = document.querySelector(".navbarBtn");
const questionBtnAll = document.querySelectorAll(".question-btn");
const questionContainer = document.querySelector(".question-containor");
const questionAnswer = document.querySelectorAll(".answer");
const questionDiv = document.querySelectorAll(".question");

document.addEventListener("DOMContentLoaded", () => {
  /////////////////////////////
  // Inject style to force no horizontal overflow
  /////////////////////////////
  const style = document.createElement("style");
  style.innerHTML = `
    html, body {
      max-width: 100% !important;
      overflow-x: hidden !important;
      margin: 0;
      padding: 0;
    }
  `;
  document.head.appendChild(style);
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";
  window.addEventListener("resize", () => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
  });

  /////////////////////////////
  // Mobile Navigation:
  /////////////////////////////
  navBarBtn.addEventListener("click", function () {
    navBar.classList.remove("hidden");
  });
  closeNav.addEventListener("click", function () {
    navBar.classList.add("hidden");
  });

  /////////////////////////////
  // FAQ Toggling
  /////////////////////////////
  questionContainer.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("question") ||
      e.target.classList.contains("question-btn") ||
      e.target.classList.contains("question-check")
    ) {
      let answer;
      let btn;
      if (e.target.classList.contains("question")) {
        answer = e.target.nextElementSibling;
        btn = e.target.querySelector(".question-btn");
      } else {
        answer = e.target.parentElement.nextElementSibling;
        btn = e.target.parentElement.querySelector(".question-btn");
      }

      // Close all other open answers
      document.querySelectorAll(".answer.show").forEach((openAnswer) => {
        if (openAnswer !== answer) {
          let currentHeight = openAnswer.scrollHeight;
          openAnswer.style.height = `${currentHeight}px`;
          requestAnimationFrame(() => {
            openAnswer.style.transition =
              "height 0.5s ease-in-out, opacity 0.5s ease-in-out";
            openAnswer.style.height = "0px";
            openAnswer.style.opacity = "0";
          });
          openAnswer.addEventListener(
            "transitionend",
            () => {
              openAnswer.classList.remove("show");
              openAnswer.style.display = "none";
              openAnswer.style.height = "";
              openAnswer.style.opacity = "";
              openAnswer.style.transition = "";
            },
            { once: true }
          );
          let openBtn =
            openAnswer.previousElementSibling.querySelector(".question-btn");
          if (openBtn) {
            openBtn.style.transition = "transform 0.5s ease-in-out";
            openBtn.style.transform = "rotate(0deg)";
          }
        }
      });

      if (answer.classList.contains("show")) {
        // Close the clicked answer
        let currentHeight = answer.scrollHeight;
        answer.style.height = `${currentHeight}px`;
        requestAnimationFrame(() => {
          answer.style.transition =
            "height 0.5s ease-in-out, opacity 0.5s ease-in-out";
          answer.style.height = "0px";
          answer.style.opacity = "0";
        });
        answer.addEventListener(
          "transitionend",
          () => {
            answer.classList.remove("show");
            answer.style.display = "none";
            answer.style.height = "";
            answer.style.opacity = "";
            answer.style.transition = "";
          },
          { once: true }
        );
        if (btn) {
          btn.style.transition = "transform 0.5s ease-in-out";
          btn.style.transform = "rotate(0deg)";
        }
      } else {
        // Open the clicked answer
        answer.style.display = "block";
        answer.style.height = "auto";
        answer.style.opacity = "1";
        requestAnimationFrame(() => {
          let actualHeight = answer.scrollHeight;
          answer.style.height = "0px";
          requestAnimationFrame(() => {
            answer.style.transition =
              "height 0.5s ease-in-out, opacity 0.5s ease-in-out";
            answer.style.height = `${actualHeight}px`;
          });
        });
        answer.addEventListener(
          "transitionend",
          () => {
            answer.classList.add("show");
            answer.style.height = "auto";
            answer.style.transition = "";
          },
          { once: true }
        );
        if (btn) {
          btn.style.transition = "transform 0.5s ease-in-out";
          btn.style.transform = "rotate(180deg)";
        }
      }
    }
  });
});
/////////////////////////////
// On-scroll animations
/////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document.documentElement.style.overflowX = "hidden";
  document.body.style.overflowX = "hidden";

  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, observerOptions);

  // --- Animate the Header (from the top) ---
  const header = document.querySelector("header");
  if (header) {
    header.classList.add("animate-top");
    observer.observe(header);
  }

  // // --- Animate Main Home Content (from the right) ---
  // const homeContent = document.querySelector(".home-content");
  // if (homeContent) {
  //   homeContent.classList.add("animate-right");
  //   observer.observe(homeContent);
  // }

  // --- Animate Cards Section (from the bottom) ---
  const cards = document.querySelectorAll(".second-page-card");
  cards.forEach((card) => {
    card.classList.add("animate-bottom");
    observer.observe(card);
  });

  // --- Animate FAQ and Newsletter Sections (from the bottom) ---
  const faqNewsletter = document.querySelectorAll(
    ".question-containor, .emailList"
  );
  faqNewsletter.forEach((el) => {
    el.classList.add("animate-bottom");
    observer.observe(el);
  });

  // --- Animate Footer Inner Elements (from the bottom) ---
  const footerInner = document.querySelectorAll(".footer-up > div, .copyRight");
  footerInner.forEach((el) => {
    el.classList.add("animate-bottom");
    observer.observe(el);
  });
});
