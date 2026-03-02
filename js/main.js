/**
 * AFFILORE Main JS
 * Consolidated logic for Cookie Banner, Mobile Menu, Categories Dropdown, and Header Scroll Effect.
 */

(function() {
    // ---- Cookie Consent ----
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const declineBtn = document.getElementById('cookie-decline');

    if (banner && acceptBtn && declineBtn) {
        const accepted = localStorage.getItem('affilore_cookies');
        if (!accepted) {
            setTimeout(() => { banner.classList.remove('translate-y-full'); }, 1000);
        }

        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('affilore_cookies', 'accepted');
            banner.classList.add('translate-y-full');
        });

        declineBtn.addEventListener('click', () => {
            localStorage.setItem('affilore_cookies', 'declined');
            banner.classList.add('translate-y-full');
        });
    }

    // ---- Mobile Menu ----
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuBtn && mobileMenu && menuIcon && closeIcon) {
        let isOpen = false;
        menuBtn.addEventListener('click', () => {
            isOpen = !isOpen;
            mobileMenu.classList.toggle('hidden', !isOpen);
            menuIcon.classList.toggle('hidden', isOpen);
            closeIcon.classList.toggle('hidden', !isOpen);
        });
    }

    // ---- Categories Dropdown ----
    const categoriesBtn = document.getElementById('categories-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownArrow = document.getElementById('dropdown-arrow');

    if (categoriesBtn && dropdownMenu && dropdownArrow) {
        let isDropdownOpen = false;

        categoriesBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            isDropdownOpen = !isDropdownOpen;
            if (isDropdownOpen) {
                dropdownMenu.classList.remove('opacity-0', 'invisible', 'translate-y-2');
                dropdownMenu.classList.add('opacity-100', 'visible', 'translate-y-0');
                dropdownArrow.classList.add('rotate-180');
            } else {
                dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
                dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                dropdownArrow.classList.remove('rotate-180');
            }
        });

        document.addEventListener('click', () => {
            if (isDropdownOpen) {
                isDropdownOpen = false;
                dropdownMenu.classList.add('opacity-0', 'invisible', 'translate-y-2');
                dropdownMenu.classList.remove('opacity-100', 'visible', 'translate-y-0');
                dropdownArrow.classList.remove('rotate-180');
            }
        });
    }

    // ---- Header Background on Scroll ----
    const mainHeader = document.getElementById('main-header');
    if (mainHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                mainHeader.classList.add('shadow-lg', 'shadow-black/20');
            } else {
                mainHeader.classList.remove('shadow-lg', 'shadow-black/20');
            }
        });
    }
})();
