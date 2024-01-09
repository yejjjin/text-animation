// window.addEventListener("scroll", function () {
//   // Filled Text and Outline Text animation
//   const textElements = document.querySelectorAll(".filled-text, .outline-text");
//   textElements.forEach(function (element) {
//     const rect = element.getBoundingClientRect();
//     if (rect.top < window.innerHeight && rect.bottom > 0) {
//       const progress = (rect.top + rect.height) / window.innerHeight;
//       const translateXValue = -200 * progress;
//       element.style.transform = `translateX(${translateXValue}px)`;
//     }
//   });

//   // Image animation
//   const imageElement = document.querySelector(".image");
//   const imageRect = imageElement.getBoundingClientRect();
//   if (imageRect.top < window.innerHeight && imageRect.bottom > 0) {
//     const imageProgress =
//       (imageRect.top + imageRect.height) / window.innerHeight;
//     const imageTranslateXValue = 250 * imageProgress;
//     imageElement.style.transform = `translateX(${imageTranslateXValue}px)`;
//   }
// });

// gpt1
// GSAP ScrollTrigger 설정
gsap.registerPlugin(ScrollTrigger);

// main 섹션의 top 부분을 기준으로 스크롤 애니메이션 설정
const mainSection = document.querySelector(".main");
const footerSection = document.querySelector(".footer");
const container = document.querySelector(".container");

// main 섹션의 높이를 고려하여 ScrollTrigger 설정
const mainTrigger = {
  trigger: ".main",
  start: "top top",
  endTrigger: ".footer",
  end: "top top",
  pin: true, // top에 도달하면 고정
  pinSpacing: false, // 고정된 상태에서의 간격 없음
  markers: true, // 테스트를 위한 마커 표시
};

ScrollTrigger.create(mainTrigger);

// .filled-text, .outline-text, .image 애니메이션 설정
const textElements = document.querySelectorAll(
  ".filled-text, .outline-text, .image"
);

textElements.forEach(function (element) {
  gsap.to(element, {
    scrollTrigger: {
      trigger: ".main",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    x: function () {
      return element.classList.contains("image") ? -3300 : 3500;
    },
  });
});

// main 섹션의 고정이 끝난 후 footer 섹션으로 스크롤 애니메이션 설정
gsap.to(container, {
  scrollTrigger: {
    trigger: ".main",
    start: "top top",
    end: "bottom top",
    scrub: 1,
    onLeave: () => {
      ScrollTrigger.getById("main-trigger").kill(); // main 섹션의 ScrollTrigger 제거
      window.scrollTo(0, footerSection.offsetTop); // footer 섹션으로 스크롤
    },
  },
});
