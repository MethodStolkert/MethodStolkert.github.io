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

const targetDate = new Date("2026-05-14T00:00:00").getTime();

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
const benefitsSlider = document.getElementById("benefitsSlider");
const benefitsPrev = document.querySelector(".benefits-prev");
const benefitsNext = document.querySelector(".benefits-next");
const benefitsDotsContainer = document.getElementById("benefitsDots");

if (benefitsSlider && benefitsPrev && benefitsNext && benefitsDotsContainer) {
  const benefitCards = Array.from(benefitsSlider.children);
  let benefitsIndex = 0;
  const benefitsGap = 12;

  function getBenefitsCardStep() {
    const cardWidth = benefitCards[0].getBoundingClientRect().width;
    return cardWidth + benefitsGap;
  }

  function buildBenefitsDots() {
    benefitsDotsContainer.innerHTML = "";

    benefitCards.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.classList.add("benefits-dot");
      if (i === benefitsIndex) dot.classList.add("active");

      dot.addEventListener("click", () => {
        benefitsIndex = i;
        updateBenefitsSlider();
      });

      benefitsDotsContainer.appendChild(dot);
    });
  }

  function updateBenefitsDots() {
    const dots = benefitsDotsContainer.querySelectorAll(".benefits-dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === benefitsIndex);
    });
  }

  function updateBenefitsArrows() {
    const isMobile = window.innerWidth <= 767;
    if (!isMobile) return;

    benefitsPrev.disabled = benefitsIndex === 0;
    benefitsNext.disabled = benefitsIndex >= benefitCards.length - 1;
    benefitsPrev.style.opacity = benefitsPrev.disabled ? "0.45" : "1";
    benefitsNext.style.opacity = benefitsNext.disabled ? "0.45" : "1";
  }

  function updateBenefitsSlider() {
    const isMobile = window.innerWidth <= 767;
    if (!isMobile) return;

    if (benefitsIndex < 0) benefitsIndex = 0;
    if (benefitsIndex > benefitCards.length - 1) {
      benefitsIndex = benefitCards.length - 1;
    }

    const step = getBenefitsCardStep();

    benefitsSlider.scrollTo({
      left: benefitsIndex * step,
      behavior: "smooth",
    });

    updateBenefitsDots();
    updateBenefitsArrows();
  }

  benefitsNext.addEventListener("click", () => {
    if (window.innerWidth > 767) return;
    if (benefitsIndex < benefitCards.length - 1) {
      benefitsIndex++;
      updateBenefitsSlider();
    }
  });

  benefitsPrev.addEventListener("click", () => {
    if (window.innerWidth > 767) return;
    if (benefitsIndex > 0) {
      benefitsIndex--;
      updateBenefitsSlider();
    }
  });

  benefitsSlider.addEventListener("scroll", () => {
    if (window.innerWidth > 767) return;

    const step = getBenefitsCardStep();
    benefitsIndex = Math.round(benefitsSlider.scrollLeft / step);
    updateBenefitsDots();
    updateBenefitsArrows();
  });

  window.addEventListener("resize", () => {
    buildBenefitsDots();
    updateBenefitsSlider();
  });

  buildBenefitsDots();
  updateBenefitsSlider();
}

const modalData = {
  module1: {
    title:
      "МОДУЛЬ 1. ВВЕДЕНИЕ В НЕЙРОСЕТИ: AI С НУЛЯ - ПЕРВЫЕ ИНСТРУМЕНТЫ И ПРОФЕССИОНАЛЬНЫЙ ВИЗУАЛ",
    items: [
      '1.1 Разбираем анатомию сильного промпта и перестаём получать "не то".',
      "1.2 Знакомство с АI-ассистентами: Chat GPT. От идеи до четкого промпта.",
      "1.3 Midjourney: как пользоваться и интерфейс.",
      "1.4 Midjourney: настройки и персонализация.",
      "1.5 Предметная съемка в Midjourney в связке с Nano Banana PRO.",
      "1.6 Платформа Rainfrog: оптимизируем Midjourney под себя и ускоряем рабочий процесс.",
      "1.7 Kora: учимся создавать ультра-реалистичные изображения.",
      "1.8 Sensitive content: авторский урок.",
    ],
    result:
      "Освоите базовые AI-инструменты и научитесь создавать профессиональный визуальный контент с нуля - без дизайнерского образования и дорогостоящих программ.",
  },
  module2: {
    title:
      "МОДУЛЬ 2. HIGGSFIELD: КИНЕМАТОГРАФИЧНЫЙ КОНТЕНТ И ДВИЖЕНИЕ БЕЗ ОПЕРАТОРА",
    items: [
      "2.1 Higgsfild - разбираемся в интерфейсе.",
      "2.2 Создаём нейрофотосессию за 1 минуту.",
      "2.3 Как убрать артефакты: чистый результат бпез косяков.",
      "2.4 Переносим товар в любую сцену без фотографа и студии.",
      "2.5 Кадр за кадром: раскадровка визуала.",
      "2.6 Секреты монтажных склеек.",
      "2.7 Kling как инструмент режиссера.",
      "2.8 Seedance: готовый ролик за 3 минуты.",
      "2.9 CapCut: основы функционала.",
    ],
    result:
      "Разберетесь в инструментах для создания видео и анимации - и сможете самостоятельно снимать кинематографичный контент, предметные съёмки и нейрофотосессии без оператора и фотографа.",
  },
  module3: {
    title:
      "МОДУЛЬ 3. FREEPIK: БЫСТРЫЙ ВИЗУАЛ И УДОБНАЯ СИСТЕМА ДЛЯ ЕЖЕДНЕВНЫХ ЗАДАЧ",
    items: [
      "3.1 Осваиваем Freepik: разбираемся в интерфейсе и находим нужное за секунды.",
      "3.2 Выстраиваем Workflow и создаём контент по отлаженной системе.",
      "3.3 Magnific AI: усиливаем детали доводим до идеала.",
    ],
    result:
      "Внедрите Freepik как полноценный инструмент для создания и управления визуальным контентом - и сможете выстроить удобное рабочее пространство для быстрой работы с изображениями.",
  },
  module4: {
    title:
      "МОДУЛЬ 4. VOICE, SOUND & DIGITAL PRESENCE: ГОЛОС, ЗВУК И ЦИФРОВОЙ ОБРАЗ ЧЕРЕЗ AI",
    items: [
      "4.1 Создаём цифрового аватара с мимикой и синхронизацией речи.",
      "4.2 Записываем полноценный музыкальный трек без студии и вокала.",
    ],
    result:
      "Научитесь создавать песню со своим голосом, озвучку и цифрового аватара - полностью через AI, без студии, оборудования и технического образования.",
  },
  module5: {
    title:
      "МОДУЛЬ 5. BEHANCE & UPWORK: ПОРТФОЛИО, УПАКОВКА И ПЕРВЫЕ ДЕНЬГИ НА ФРИЛАНСЕ",
    items: [
      "5.1 Создаём портфолио на Behance, которое привлекает клиентов и работодателей.",
      "5.2 Упаковываем профиль на Upwork и выходим на первый заказ.",
      "5.3 Авторские права, как защитить себя в соцсетях.",
    ],
    result:
      "Начнете презентовать свои AI-проекты на профессиональных платформах и найдёте первых клиентов - без опыта фриланса и личного бренда с нуля.",
  },
};

const programModal = document.getElementById("programModal");
const programModalContent = document.getElementById("programModalContent");
const programModalClose = document.getElementById("programModalClose");
const programMoreButtons = document.querySelectorAll(".program-more-btn");

function openProgramModal(moduleKey) {
  const module = modalData[moduleKey];
  if (!module) return;

  const itemsHtml = module.items.map((item) => `<p>${item}</p>`).join("");

  programModalContent.innerHTML = `
    <h3 id="programModalTitle">${module.title}</h3>
    <div class="program-modal-list">
      ${itemsHtml}
    </div>
    <div class="program-modal-result">
      <span class="program-modal-result-label">Результат</span>
      <p>${module.result}</p>
    </div>
  `;

  programModal.classList.add("active");
  programModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProgramModal() {
  programModal.classList.remove("active");
  programModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

programMoreButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openProgramModal(button.dataset.module);
  });
});

programModalClose.addEventListener("click", closeProgramModal);

programModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("program-modal-overlay")) {
    closeProgramModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && programModal.classList.contains("active")) {
    closeProgramModal();
  }
});

document.querySelectorAll(".program-more-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.modal;
    const modal = document.getElementById(id);
    modal.classList.add("active");
    document.body.classList.add("modal-open");
  });
});

document.querySelectorAll(".program-modal").forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("program-modal-overlay") ||
      e.target.classList.contains("program-modal-close")
    ) {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });
});
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faq) => faq.classList.remove("active"));

    if (!isActive) {
      item.classList.add("active");
    }
  });
});

document.querySelectorAll(".program-modal-actions a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelectorAll(".program-modal.active").forEach((modal) => {
      modal.classList.remove("active");
    });
    document.body.classList.remove("modal-open");
  });
});

const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.querySelector(".modal-close");

const modalDataDocs = {
  terms: `
    <h2>Условия и правила</h2>

    <p><b>Добро пожаловать на сайт курса The Method Stolkert.</b> Настоящие условия регулируют использование сайта, обучающих материалов и услуг.</p>

    <h3>1. Общая информация</h3>
    <p>Сайт предоставляет доступ к онлайн-курсу, обучающим материалам, консультациям и сопровождению в сфере создания AI-контента.</p>
    <p>Используя сайт, вы подтверждаете, что ознакомлены с условиями и принимаете их.</p>

    <h3>2. Формат обучения</h3>
    <p>Курс носит образовательный и практический характер.</p>
    <p>Результаты обучения зависят от уровня вовлеченности пользователя, выполнения заданий и личной практики.</p>

    <h3>3. Доступ к материалам</h3>
    <p>Доступ к курсу предоставляется после подтверждения оплаты.</p>
    <p>Срок доступа определяется выбранным тарифом.</p>
    <p>Передача доступа третьим лицам запрещена.</p>

    <h3>4. Интеллектуальная собственность</h3>
    <p>Все материалы курса (видео, тексты, визуалы, методики) являются собственностью автора.</p>
    <p>Запрещается копирование, распространение или передача материалов без разрешения.</p>

    <h3>5. Коммуникация и поддержка</h3>
    <p>Поддержка и обратная связь предоставляются в зависимости от выбранного тарифа.</p>

  `,

  refund: `
    <h2>Политика возврата средств</h2>

    <p>Оплачивая курс The Method Stolkert, вы соглашаетесь с условиями возврата.</p>

    <h3>1. Общие условия</h3>
    <p>Возврат средств возможен только до момента предоставления доступа к материалам курса.</p>

    <h3>2. После получения доступа</h3>
    <p>После открытия доступа к курсу возврат средств не осуществляется.</p>

    <h3>3. Индивидуальные случаи</h3>
    <p>В отдельных ситуациях запрос может рассматриваться индивидуально.</p>

    <h3>4. Перенос участия</h3>
    <p>Возможен перенос участия на следующий поток по согласованию.</p>
  `,

  legal: `
    <h2>Юридическая информация</h2>

  <p><b>ФОП Осипова Анна Витальевна</b></p>

  <h3>1. Регистрационные данные</h3>
  <p>Физическое лицо-предприниматель</p>
  <p>ИНН: 3131121248</p>

  <h3>2. Адрес регистрации</h3>
  <p>Украина, 65016, Одесская область, г. Одесса, ул. Баштанная, дом 22</p>

  <h3>3. Контактная информация</h3>
  <p>Email: annaosipova220@gmail.com</p>
  <p>Телефон: +38 (050) 157-38-02</p>

  <h3>4. Формат деятельности</h3>
  <p>Деятельность осуществляется в формате онлайн-образования, консультаций и цифровых продуктов.</p>

  <h3>5. Ограничение ответственности</h3>
  <p>Все материалы курса носят информационный и обучающий характер.</p>
  <p>Исполнитель не несет ответственности за решения и действия пользователей после прохождения обучения.</p>
`
  `,
};

document.querySelectorAll(".doc-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.modal;

    modalBody.innerHTML = modalDataDocs[type];
    modal.classList.add("active");
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.querySelector(".modal-overlay").addEventListener("click", () => {
  modal.classList.remove("active");
});
