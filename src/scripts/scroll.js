document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".nav-links a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Compute correct scroll position
                const navbarHeight = document.querySelector(".nav-links").offsetHeight;
                const targetRect = targetElement.getBoundingClientRect();
                const offsetTop = targetRect.top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                });

                // Ensure focus for accessibility and better scrolling
                targetElement.setAttribute("tabindex", "-1");
                targetElement.focus();
            }
        });
    });
});