import { animate, stagger } from "motion";

document.addEventListener("DOMContentLoaded", () => {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  };

  const observerCallback = (entries) => {
    const fadeInElements = []; // Store elements for staggered animation
    const skillElements = []; // Store skill items for staggered animation

    entries.forEach((entry) => {
      const target = entry.target;

      if (entry.isIntersecting) {
        if (target.classList.contains("animate-fade-in")) {
          fadeInElements.push(target); // Collect elements for stagger animation
        } else if (target.classList.contains("skills-category")) {
          animate(target, { opacity: [0, 1], y: [20, 0] }, { duration: 0.8 });
        } else if (target.classList.contains("skills-grid")) {
          const items = target.querySelectorAll(".skill");
          skillElements.push(...items);
        } else if (target.classList.contains("social-icons")) {
          const icons = target.querySelectorAll("img");
          animate(
            icons,
            { opacity: [0, 1], scale: [0.5, 1] },
            { delay: stagger(0.1), duration: 0.5, easing: "easeOutBounce" }
          );
        }
      } else {
        if (target.classList.contains("animate-fade-in")) {
          target.style.opacity = "0";
          target.style.transform = "translateY(20px)";
        } else if (target.classList.contains("skills-category")) {
          target.style.opacity = "0";
          target.style.transform = "translateY(20px)";
        } else if (target.classList.contains("skills-grid")) {
          target.querySelectorAll(".skill").forEach((skill) => {
            skill.style.opacity = "0";
            skill.style.transform = "translateY(20px)";
          });
        } else if (target.classList.contains("social-icons")) {
          const icons = target.querySelectorAll("img");
          icons.forEach((icon) => {
            icon.style.opacity = "0";
            icon.style.transform = "scale(0.5)";
          });
        
        }
      }
    });

    // Apply staggered animation to collected `.animate-fade-in` elements
    if (fadeInElements.length > 0) {
      animate(fadeInElements, { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.5), duration: 0.5 });
    }

    // Apply staggered animation to skills
    if (skillElements.length > 0) {
      animate(skillElements, { opacity: [0, 1], y: [20, 0] }, { delay: stagger(0.1), duration: 0.5 });
    }
  };

  const observer = new IntersectionObserver(observerCallback, options);

  document
    .querySelectorAll(".animate-fade-in, .skills-category, .skills-grid, .social-icons")
    .forEach((element) => observer.observe(element));
    
});
