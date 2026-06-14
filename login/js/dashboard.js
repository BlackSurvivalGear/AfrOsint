/**
 * Dashboard Logic
 */

checkAuthState(true); // Protected page

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';

        // Check cache first for immediate UI rendering
        const cachedData = sessionStorage.getItem(`afrosint_user_${user.uid}_${currentNetworkId}`);
        let userData = cachedData ? JSON.parse(cachedData) : null;

        if (!userData) {
            const docId = currentNetworkId === 'afrosint-main' ? user.uid : `${user.uid}_${currentNetworkId}`;
            const userDoc = await firebase.firestore().collection('users').doc(docId).get();
            userData = userDoc.data();
            if (userData) {
                sessionStorage.setItem(`afrosint_user_${user.uid}_${currentNetworkId}`, JSON.stringify(userData));
            }
        }

        if (userData) {
            // Apply network branding
            if (currentNetworkId !== 'afrosint-main') {
                const netDoc = await firebase.firestore().collection('networks').doc(currentNetworkId).get();
                if (netDoc.exists && typeof applyNetworkBranding === 'function') {
                    applyNetworkBranding(netDoc.data());
                }
            }
            updateDashboardUI(userData);
        }
    }
});

function updateDashboardUI(userData) {
    document.getElementById('userName').textContent = userData.displayName || "Unknown Personnel";
    document.getElementById('welcomeName').textContent = userData.displayName || "";
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userRole').textContent = getRankName(userData.rank);
    document.getElementById('userPlan').textContent = (userData.plan || 'free').toUpperCase();
    document.getElementById('clearanceLevel').textContent = getClearanceLevel(userData);

    if (userData.isOnline) {
        const indicator = document.getElementById('onlineStatusIndicator');
        const statusText = document.getElementById('activeStatusText');
        if (indicator) indicator.classList.replace('bg-gray-600', 'bg-[#00E5FF]');
        if (statusText) {
            statusText.textContent = 'ACTIVE';
            statusText.classList.replace('text-gray-500', 'text-[#00E5FF]');
            statusText.classList.add('animate-pulse');
        }
    }

    if (userData.photoURL) {
        document.getElementById('userAvatar').src = userData.photoURL;
    }

    if (userData.lastLogin) {
        const date = (typeof userData.lastLogin.toDate === 'function') ? userData.lastLogin.toDate() : new Date(userData.lastLogin);
        document.getElementById('lastLoginTime').textContent = date.toLocaleString();
    }

    // Display nation flag on profile card
    if (userData.appearance && userData.appearance.flag) {
        const flagEl = document.getElementById('userFlagDisplay');
        if (flagEl) {
            flagEl.textContent = userData.appearance.flag;
            flagEl.classList.remove('hidden');
        }
    }

    // Upgrade Button Visibility (Free plan only)
    const upgradeBtn = document.getElementById('upgradePlanBtn');
    if (upgradeBtn) {
        if ((userData.plan || 'free').toLowerCase() === 'free') {
            upgradeBtn.classList.remove('hidden');
        } else {
            upgradeBtn.classList.add('hidden');
        }
    }

    // Report Submission Visibility (Analyst level 2+)
    if (typeof canSubmitReports === 'function' && (canSubmitReports(userData.rank) || canSubmitReports(userData.role))) {
        const el = document.getElementById('panelReportLink');
        if (el) el.classList.remove('hidden');
    }

    // Report Review Visibility (Senior Analyst level 3+)
    if (typeof canReviewReports === 'function' && (canReviewReports(userData.rank) || canReviewReports(userData.role))) {
        const el = document.getElementById('panelAnalystLink');
        if (el) el.classList.remove('hidden');
    }

    // Personnel Management Visibility (Admins or High Rank 5+)
    if (isAdmin(userData.role) || getRankLevel(userData.rank) >= 5) {
        const adminBtn = document.getElementById('adminPanelBtn');
        if (adminBtn) adminBtn.classList.remove('hidden');
    }

    // Switch Network Button (if user has multiple networks)
    firebase.firestore().collection('users').where('uid', '==', userData.uid).get().then(snap => {
        if (snap.size > 1) {
            const switchBtn = document.getElementById('switchNetworkBtn');
            if (switchBtn) switchBtn.classList.remove('hidden');
        }
    });

    // Network Setup Visibility (Fellows level 8+)
    if (getRankLevel(userData.rank) >= 8) {
        const setupBtn = document.getElementById('establishNetworkBtn');
        if (setupBtn) setupBtn.classList.remove('hidden');
    }

    // Handle initial routing if any
    const params = new URLSearchParams(window.location.search);
    if (params.get('view') === 'personnel' && (isAdmin(userData.role) || getRankLevel(userData.rank) >= 5)) {
        window.location.href = 'admin.html';
    }
}

function getClearanceLevel(userData) {
    const clearance = userData.clearance || getRankLevel(userData.rank);
    const rankName = getRankName(userData.rank).toUpperCase();
    return `LEVEL ${clearance} (${rankName})`;
}

/**
 * Handle account upgrade requests
 */
function upgradePlan() {
    alert("AfrOsint Subscription Services\n\nPlease contact central administration or your regional coordinator to upgrade to a PRO or ELITE account and unlock advanced surveillance modules.");
}
