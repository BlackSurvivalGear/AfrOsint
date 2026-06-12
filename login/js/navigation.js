/**
 * AfroSINT Global Navigation & Header Management
 */

(function() {
    // 1. Auth State Listener for Navigation
    firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
            try {
                // Check cache first for faster header injection
                const cachedData = sessionStorage.getItem(`afrosint_user_${user.uid}`);
                let userData = cachedData ? JSON.parse(cachedData) : null;

                if (!userData) {
                    const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                    userData = userDoc.data();
                    if (userData) {
                        sessionStorage.setItem(`afrosint_user_${user.uid}`, JSON.stringify(userData));
                    }
                }

                if (userData) {
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    if (currentPage !== 'dashboard.html') {
                        injectHeader(userData);
                    }
                }
            } catch (error) {
                console.error("Navigation Error:", error);
            }
        } else {
            // Not logged in and on a protected page? Auth.js handles redirect.
        }
    });

    /**
     * Dynamically injects the AfroSINT header into the page
     */
    function injectHeader(userData) {
        // Remove existing header if any
        const existingHeader = document.querySelector('.main-header');
        if (existingHeader) existingHeader.remove();

        // Also remove old markets bar if it exists (legacy)
        const oldMarkets = document.querySelector('.markets-bar');
        if (oldMarkets) oldMarkets.remove();

        const header = document.createElement('header');
        header.className = 'main-header';

        // Left: Logo & Branding
        const left = `
            <div class="header-left">
                <img src="AFROSINT LOGO.png" alt="AfroSINT" class="logo-img">
                <div class="brand-text">
                    <span class="brand-title">AfroSINT</span>
                    <span class="brand-subtitle">Pan-African OSINT</span>
                </div>
            </div>
        `;

        // Center: Navigation Hub (Dashboard Only)
        let navButtons = `<a href="dashboard.html" class="osint-button px-6 py-2">DASHBOARD</a>`;
        if (isAdmin(userData.role)) {
            navButtons += `<a href="admin.html" class="osint-button px-6 py-2 text-[#00E5FF] border-[#00E5FF]/40">ADMIN</a>`;
        }

        const center = `
            <div class="header-center">
                <div class="nav-buttons">
                    ${navButtons}
                </div>
            </div>
        `;

        // Right: Authenticated User Card
        const right = `
            <div class="header-right">
                <div class="user-card">
                    <img src="${userData.photoURL || 'https://via.placeholder.com/32'}" class="user-avatar" alt="Avatar">
                    <div class="user-info">
                        <span class="user-name">${userData.displayName || 'Unnamed'}</span>
                        <span class="role-badge">${getRankName(userData.rank)}</span>
                        <span class="logout-link" onclick="logoutUser()">Logout</span>
                    </div>
                </div>
            </div>
        `;

        header.innerHTML = left + center + right;
        document.body.prepend(header);
    }

    /**
     * AfroSINT Styled Toast Notification
     */
    function showOSINTNotification(message) {
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-5 right-5 z-[200] bg-black/90 border border-[#00E5FF] p-4 rounded shadow-[0_0_20px_rgba(0,229,255,0.4)] text-[#00E5FF] text-xs font-bold uppercase tracking-widest animate-bounce';
        toast.innerHTML = `
            <div class="flex items-center gap-3">
                <span class="pulse-indicator"></span>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-gray-500 hover:text-white">[X]</button>
            </div>
        `;
        document.body.appendChild(toast);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 10000);
    }

})();
