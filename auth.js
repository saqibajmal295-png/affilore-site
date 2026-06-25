/* ==========================================================================
   AFFILORE.COM — Client-Side Authentication Gate & Controller
   ========================================================================== */

(function() {
    // Inject custom CSS styling for the authentication overlay
    const style = document.createElement('style');
    style.textContent = `
        #authModal {
            transition: opacity 0.3s ease, backdrop-filter 0.3s ease;
        }
        #auth-modal-box {
            transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
        }
        .auth-blur-active {
            filter: blur(16px) cubic-bezier(0.16, 1, 0.3, 1) !important;
            pointer-events: none !important;
            user-select: none !important;
        }
        .auth-spinner {
            border: 3px solid rgba(255, 255, 255, 0.1);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border-left-color: #EAB308;
            animation: auth-spin 1s linear infinite;
        }
        @keyframes auth-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        /* Checkmark Animation */
        .checkmark-circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke: #EAB308;
            fill: none;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: block;
            stroke-width: 2;
            stroke: #fff;
            stroke-miterlimit: 10;
            margin: 10px auto;
            box-shadow: inset 0px 0px 0px #EAB308;
            animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s forwards;
        }
        .checkmark-check {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
            0%, 100% { transform: none; }
            50% { transform: scale3d(1.1, 1.1, 1); }
        }
        @keyframes fill {
            100% { box-shadow: inset 0px 0px 0px 30px #EAB308; }
        }
    `;
    document.head.appendChild(style);

    const isProductivityPage = window.location.pathname.includes('productivity');

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAuthGate);
    } else {
        initializeAuthGate();
    }

    function initializeAuthGate() {
        injectAuthModal();
        updateUI();

        // If on the protected productivity route and unauthenticated, lock the view immediately
        if (isProductivityPage && localStorage.getItem('affilore_session_state') !== 'true') {
            blurProductivityPage();
            showAuthModal();
        }

        // Setup global click listener to intercept unauthorized launches
        document.addEventListener('click', handleGlobalClicks, true);
    }

    function blurProductivityPage() {
        const mainEl = document.querySelector('main');
        if (mainEl) {
            mainEl.classList.add('auth-blur-active');
        }
    }

    function unblurProductivityPage() {
        const mainEl = document.querySelector('main');
        if (mainEl) {
            mainEl.classList.remove('auth-blur-active');
        }
    }

    function handleGlobalClicks(e) {
        const target = e.target.closest('a');
        if (!target) return;

        // Check if destination is a productivity path
        const href = target.getAttribute('href');
        let isProductivityLink = false;
        if (href) {
            const cleanHref = href.trim();
            if (cleanHref.includes('productivity')) {
                isProductivityLink = true;
            }
        }

        // Check if inside a card labeled "Productivity Tools" or "Productivity"
        let isProductivityCard = false;
        const card = target.closest('.glass-panel');
        if (card) {
            const badges = card.querySelectorAll('span, div');
            for (let badge of badges) {
                const text = badge.textContent.trim().toLowerCase();
                if (text === 'productivity tools' || text === 'productivity') {
                    isProductivityCard = true;
                    break;
                }
            }
        }

        if (isProductivityLink || isProductivityCard) {
            if (localStorage.getItem('affilore_session_state') !== 'true') {
                e.preventDefault();
                e.stopPropagation();
                showAuthModal(href || '/productivity.html');
            }
        }
    }

    function injectAuthModal() {
        if (document.getElementById('authModal')) return;

        const overlay = document.createElement('div');
        overlay.id = 'authModal';
        overlay.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md opacity-0 pointer-events-none';
        
        overlay.innerHTML = `
            <div class="relative w-full max-w-md p-8 rounded-2xl border border-[rgba(234,179,8,0.2)] bg-[#121414]/95 shadow-[0_0_50px_rgba(234,179,8,0.2)] flex flex-col gap-6 text-center transform scale-95 opacity-0 duration-300" id="auth-modal-box" style="backdrop-filter: blur(20px);">
                <!-- Close Button -->
                <button id="auth-modal-close" class="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer focus:outline-none" aria-label="Close modal">
                    <span class="material-symbols-outlined text-[20px]">close</span>
                </button>
                
                <!-- Modal Content Container -->
                <div id="auth-modal-content" class="flex flex-col gap-6">
                    <!-- Header -->
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-12 h-12 rounded-full bg-[#EAB308]/10 flex items-center justify-center text-[#EAB308] mb-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                            <span class="material-symbols-outlined text-[24px]">lock</span>
                        </div>
                        <h3 class="text-2xl font-bold tracking-tight text-white font-headline-lg">Unlock Premium Access</h3>
                        <p class="text-zinc-400 text-sm font-body-sm">Sign in to access our Productivity Tools and save your workspace state.</p>
                    </div>

                    <!-- OAuth Buttons -->
                    <div class="flex flex-col gap-3">
                        <button id="auth-google-btn" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-glass-border bg-glass-fill hover:bg-glass-border hover:border-[#EAB308]/40 text-white font-medium text-sm transition-all duration-200 cursor-pointer">
                            <svg class="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.57 14.99 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.92 3.04c.9-2.7 3.42-4.5 6.58-4.5z"/>
                                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.6z"/>
                                <path fill="#FBBC05" d="M5.42 10.54c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.5 3.1c-.81 1.62-1.27 3.44-1.27 5.4s.46 3.78 1.27 5.4l3.92-3.04z"/>
                                <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.1-4.26 1.1-3.16 0-5.68-1.8-6.58-4.5L1.5 16.86C3.39 20.7 7.35 23 12 23z"/>
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                        <button id="auth-github-btn" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-glass-border bg-glass-fill hover:bg-glass-border hover:border-[#EAB308]/40 text-white font-medium text-sm transition-all duration-200 cursor-pointer">
                            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                            </svg>
                            <span>Continue with GitHub</span>
                        </button>
                    </div>

                    <!-- Divider -->
                    <div class="flex items-center gap-3 text-zinc-500 text-xs uppercase tracking-widest my-1">
                        <div class="h-[1px] flex-1 bg-glass-border"></div>
                        <span>or</span>
                        <div class="h-[1px] flex-1 bg-glass-border"></div>
                    </div>

                    <!-- Email Form -->
                    <form id="auth-email-form" class="flex flex-col gap-3">
                        <input type="email" id="auth-email-input" required placeholder="Enter your email" class="w-full px-4 py-3 rounded-lg bg-[#1a1c1c] border border-glass-border focus:border-[#EAB308] text-white text-sm outline-none transition-all placeholder-zinc-500">
                        <button type="submit" class="w-full py-3 rounded-lg gradient-bg text-black font-bold font-label-md text-label-md hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_2px_10px_rgba(234,179,8,0.3)] cursor-pointer">
                            Continue with Email
                        </button>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Bind events
        document.getElementById('auth-modal-close').addEventListener('click', hideAuthModal);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) hideAuthModal();
        });

        document.getElementById('auth-google-btn').addEventListener('click', () => handleAuthSubmit('Google'));
        document.getElementById('auth-github-btn').addEventListener('click', () => handleAuthSubmit('GitHub'));
        document.getElementById('auth-email-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email-input').value;
            handleAuthSubmit(email);
        });
    }

    function showAuthModal(redirectPath) {
        injectAuthModal();
        const overlay = document.getElementById('authModal');
        const box = document.getElementById('auth-modal-box');
        if (!overlay || !box) return;

        if (redirectPath) {
            window.pendingRedirection = redirectPath;
        }

        resetModalContent();

        overlay.classList.remove('pointer-events-none');
        overlay.classList.add('opacity-100');
        
        setTimeout(() => {
            box.classList.remove('scale-95', 'opacity-0');
            box.classList.add('scale-100', 'opacity-100');
        }, 50);
    }

    function hideAuthModal() {
        const overlay = document.getElementById('authModal');
        const box = document.getElementById('auth-modal-box');
        if (!overlay || !box) return;

        box.classList.remove('scale-100', 'opacity-100');
        box.classList.add('scale-95', 'opacity-0');

        setTimeout(() => {
            overlay.classList.remove('opacity-100');
            overlay.classList.add('pointer-events-none');
            
            // Redirect to home if they bypass/close while on the protected productivity route
            if (isProductivityPage && localStorage.getItem('affilore_session_state') !== 'true') {
                window.location.href = '/';
            }
        }, 300);
    }

    function resetModalContent() {
        const content = document.getElementById('auth-modal-content');
        if (!content) return;

        content.innerHTML = `
            <!-- Header -->
            <div class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 rounded-full bg-[#EAB308]/10 flex items-center justify-center text-[#EAB308] mb-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                    <span class="material-symbols-outlined text-[24px]">lock</span>
                </div>
                <h3 class="text-2xl font-bold tracking-tight text-white font-headline-lg">Unlock Premium Access</h3>
                <p class="text-zinc-400 text-sm font-body-sm">Sign in to access our Productivity Tools and save your workspace state.</p>
            </div>

            <!-- OAuth Buttons -->
            <div class="flex flex-col gap-3">
                <button id="auth-google-btn" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-glass-border bg-glass-fill hover:bg-glass-border hover:border-[#EAB308]/40 text-white font-medium text-sm transition-all duration-200 cursor-pointer">
                    <svg class="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.57 14.99 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.92 3.04c.9-2.7 3.42-4.5 6.58-4.5z"/>
                        <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.41-4.92 3.41-8.6z"/>
                        <path fill="#FBBC05" d="M5.42 10.54c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.5 3.1c-.81 1.62-1.27 3.44-1.27 5.4s.46 3.78 1.27 5.4l3.92-3.04z"/>
                        <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.35 1.1-4.26 1.1-3.16 0-5.68-1.8-6.58-4.5L1.5 16.86C3.39 20.7 7.35 23 12 23z"/>
                    </svg>
                    <span>Continue with Google</span>
                </button>
                <button id="auth-github-btn" class="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-glass-border bg-glass-fill hover:bg-glass-border hover:border-[#EAB308]/40 text-white font-medium text-sm transition-all duration-200 cursor-pointer">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                    </svg>
                    <span>Continue with GitHub</span>
                </button>
            </div>

            <!-- Divider -->
            <div class="flex items-center gap-3 text-zinc-500 text-xs uppercase tracking-widest my-1">
                <div class="h-[1px] flex-1 bg-glass-border"></div>
                <span>or</span>
                <div class="h-[1px] flex-1 bg-glass-border"></div>
            </div>

            <!-- Email Form -->
            <form id="auth-email-form" class="flex flex-col gap-3">
                <input type="email" id="auth-email-input" required placeholder="Enter your email" class="w-full px-4 py-3 rounded-lg bg-[#1a1c1c] border border-glass-border focus:border-[#EAB308] text-white text-sm outline-none transition-all placeholder-zinc-500">
                <button type="submit" class="w-full py-3 rounded-lg gradient-bg text-black font-bold font-label-md text-label-md hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_2px_10px_rgba(234,179,8,0.3)] cursor-pointer">
                    Continue with Email
                </button>
            </form>
        `;

        document.getElementById('auth-google-btn').addEventListener('click', () => handleAuthSubmit('Google'));
        document.getElementById('auth-github-btn').addEventListener('click', () => handleAuthSubmit('GitHub'));
        document.getElementById('auth-email-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('auth-email-input').value;
            handleAuthSubmit(email);
        });
    }

    function handleAuthSubmit(identifier) {
        const content = document.getElementById('auth-modal-content');
        if (!content) return;

        // Show premium validation animation
        content.innerHTML = `
            <div class="flex flex-col items-center justify-center py-8 gap-4">
                <div class="auth-spinner"></div>
                <p class="text-zinc-300 font-medium text-sm">Authorizing with ${identifier.includes('@') ? 'Email' : identifier}...</p>
                <p class="text-zinc-500 text-xs">Simulating secure token handshake</p>
            </div>
        `;

        setTimeout(() => {
            content.innerHTML = `
                <div class="flex flex-col items-center justify-center py-6 gap-4">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path class="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                    <h4 class="text-xl font-bold text-white">Access Granted!</h4>
                    <p class="text-zinc-400 text-sm">Session successfully initialized</p>
                </div>
            `;

            const emailValue = identifier.includes('@') ? identifier : `${identifier.toLowerCase()}user@gmail.com`;
            localStorage.setItem('affilore_session_state', 'true');
            localStorage.setItem('affilore_session_user', emailValue);
            localStorage.setItem('affilore_user_email', emailValue);

            setTimeout(() => {
                hideAuthModal();
                updateUI();
                unblurProductivityPage();

                if (window.pendingRedirection) {
                    const target = window.pendingRedirection;
                    window.pendingRedirection = null;
                    window.location.href = target;
                }
            }, 1200);
        }, 1500);
    }

    function updateUI() {
        const authBtn = document.getElementById('auth-nav-btn');
        if (!authBtn) return;

        if (localStorage.getItem('affilore_session_state') === 'true') {
            const email = localStorage.getItem('affilore_user_email') || localStorage.getItem('affilore_session_user') || 'user@affilore.com';
            const wrapper = document.createElement('div');
            wrapper.id = 'auth-nav-btn-wrapper';
            wrapper.className = 'relative group inline-flex items-center mr-4';
            wrapper.innerHTML = `
                <button id="user-profile-badge" class="flex items-center justify-center w-9 h-9 rounded-full bg-glass-fill border border-[#EAB308]/30 hover:border-[#EAB308]/80 text-[#EAB308] transition-all shadow-[0_0_10px_rgba(234,179,8,0.1)] hover:scale-105 cursor-pointer focus:outline-none" aria-label="User Profile">
                    <span class="material-symbols-outlined text-[20px]">person</span>
                </button>
                <div class="absolute right-0 top-full mt-2 w-48 rounded-xl glass-panel border border-[rgba(234,179,8,0.2)] bg-[#121414]/95 py-2 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[1000]" style="backdrop-filter: blur(20px);">
                    <div class="px-4 py-2 border-b border-glass-border text-left">
                        <p class="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Account</p>
                        <p class="text-xs font-bold text-white truncate">${email}</p>
                    </div>
                    <button id="auth-signout-btn" class="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-glass-border transition-colors flex items-center gap-2 cursor-pointer focus:outline-none">
                        <span class="material-symbols-outlined text-[16px]">logout</span>
                        Sign Out
                    </button>
                </div>
            `;

            authBtn.parentNode.replaceChild(wrapper, authBtn);

            document.getElementById('auth-signout-btn').addEventListener('click', () => {
                localStorage.removeItem('affilore_session_state');
                localStorage.removeItem('affilore_session_user');
                localStorage.removeItem('affilore_user_email');
                window.location.reload();
            });
        } else {
            authBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showAuthModal();
            });
        }
    }
    window.showAuthModal = showAuthModal;
})();
