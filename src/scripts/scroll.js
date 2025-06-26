document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const header = document.querySelector("header");
                const navbarHeight = header ? header.offsetHeight + 20 : 0;

                const titleElement = targetElement.querySelector(
                    ".section-title, [class*='-title']"
                );

                const scrollTarget = titleElement || targetElement;

                const targetPosition = scrollTarget.getBoundingClientRect().top;
                const currentPosition = window.pageYOffset;
                const scrollPosition = currentPosition + targetPosition - navbarHeight;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: "smooth"
                });

                scrollTarget.setAttribute("tabindex", "-1");
                setTimeout(() => {
                    scrollTarget.focus({ preventScroll: true });
                }, 300);
            }
        });
    });
});