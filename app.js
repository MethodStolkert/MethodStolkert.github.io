const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

const runs = document.querySelectorAll(".run div");

runs.forEach((run, index) => {
  run.innerHTML += " — " + run.innerHTML;

  let position = 0;

  const speed = 0.3 + index * 0.1;

  function animate() {
    position -= speed;

    if (Math.abs(position) >= run.scrollWidth / 2) {
      position = 0;
    }

    run.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
});

const targetDate = new Date("2026-04-10T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) return;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(
    2,
    "0",
  );
}

setInterval(updateCountdown, 1000);
updateCountdown();

const programSlider = document.getElementById("programSlider");
const prev = document.querySelector(".program-prev");
const next = document.querySelector(".program-next");
const dotsContainer = document.getElementById("programDots");

if (programSlider && prev && next && dotsContainer) {
  const cards = Array.from(programSlider.children);
  const gap = 20;
  let index = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 767) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
  }

  function getTotalPages() {
    return Math.max(1, cards.length - getVisibleCards() + 1);
  }

  function getCardStep() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    return cardWidth + gap;
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    const total = getTotalPages();

    for (let i = 0; i < total; i++) {
      const dot = document.createElement("button");
      dot.classList.add("program-dot");
      if (i === index) dot.classList.add("active");

      dot.addEventListener("click", () => {
        index = i;
        updateSlider();
      });

      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".program-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
  }

  function updateArrows() {
    const total = getTotalPages();
    prev.disabled = index === 0;
    next.disabled = index >= total - 1;
  }

  function updateSlider() {
    const total = getTotalPages();

    if (index > total - 1) index = total - 1;
    if (index < 0) index = 0;

    const step = getCardStep();
    programSlider.scrollTo({
      left: index * step,
      behavior: "smooth",
    });

    updateDots();
    updateArrows();
  }

  next.addEventListener("click", () => {
    const total = getTotalPages();
    if (index < total - 1) {
      index++;
      updateSlider();
    }
  });

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  programSlider.addEventListener("mousedown", (e) => {
    isDown = true;
    programSlider.classList.add("is-dragging");
    startX = e.pageX - programSlider.offsetLeft;
    scrollLeft = programSlider.scrollLeft;
  });

  programSlider.addEventListener("mouseleave", () => {
    isDown = false;
    programSlider.classList.remove("is-dragging");
  });

  programSlider.addEventListener("mouseup", () => {
    if (!isDown) return;
    isDown = false;
    programSlider.classList.remove("is-dragging");

    const step = getCardStep();
    index = Math.round(programSlider.scrollLeft / step);
    updateSlider();
  });

  programSlider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - programSlider.offsetLeft;
    const walk = (x - startX) * 1.2;
    programSlider.scrollLeft = scrollLeft - walk;
  });

  programSlider.addEventListener("scroll", () => {
    const step = getCardStep();
    index = Math.round(programSlider.scrollLeft / step);
    updateDots();
    updateArrows();
  });

  window.addEventListener("resize", () => {
    buildDots();
    updateSlider();
  });

  buildDots();
  updateSlider();
}
