(function($) {
  "use strict";

  jQuery(document).ready(function($) {
    /*  Linke to About us section*/

    $(".link-portfolio-one").on("click", function(e) {
      let tabNum = $(this).index();
      let nthChild = tabNum + 2;
      $("#main > section.active").removeClass("active");
      $("#main > section:nth-child(" + nthChild + ")").addClass("active");
      e.preventDefault();
    });

    /*  Linke to Contact us section */

    $(".link-portfolio-two").on("click", function(e) {
      let tabNum = $(this).index();
      let nthChild = tabNum + 2;
      $("#main > section.active").removeClass("active");
      $("#main > section:nth-child(" + nthChild + ")").addClass("active");
      e.preventDefault();
    });
  });
})(jQuery);
// let aboutbtn = document.getElementsByClassName("link-portfolio-one");
// let aboutbtn = document.getElementById("btn1");
// let home = document.getElementById("home");
// let about = document.getElementById("about");
// let contact = document.getElementById("contact");
// let section = document.getElementsByTagName("section");
// aboutbtn.addEventListener("click", function() {
//   alert("hi");
//   if (home.style.display == "none" || contact.style.display == "none") {
//     about.style.display == "block";
//     section.addClass("active");
//   } else {
//     about.style.display == "none";
//     // contact.style.display = "none";
//   }
// });

/*  text type */
let TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 100 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  let elements = document.getElementsByClassName("typewrite");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-type");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
};

//

// let about = document.getElementsByClassName("link-portfolio-one");
// let secabout = document.getElementById("about");
// let sechome = document.getElementById("home");
// let seccontact = document.getElementById("contact");
// about.addEventListener("click", function() {
//   secabout.style.display = "block";
//   sechome.style.display = "hidden";
//   seccontact.style.display = "hidden";
// });
fetch("http://localhost:3000/nawal")
  .then(resp => resp.json())
  .then(json => {
    for (const element in json) {
      console.log(json[element]);
      let card = document.createElement("li");
      // card.id = "card"

      let img = document.createElement("img");
      img.id = "image";
      img.setAttribute("src", json[element]["image"]);
      card.appendChild(img);

      let title = document.createElement("h5");
      title.id = "title";
      title.innerHTML = json[element]["name"];
      card.appendChild(title);
    }
  });
