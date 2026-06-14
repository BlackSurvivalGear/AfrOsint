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
            let networkName = "AfroSINT Main";
            // Apply network branding
            if (currentNetworkId !== 'afrosint-main') {
                const netDoc = await firebase.firestore().collection('networks').doc(currentNetworkId).get();
                if (netDoc.exists) {
                    const netData = netDoc.data();
                    networkName = netData.name || currentNetworkId;
                    if (typeof applyNetworkBranding === 'function') {
                        applyNetworkBranding(netData);
                    }
                }
            }
            updateDashboardUI(userData, networkName);
        }
    }
});

function updateDashboardUI(userData, networkName) {
    document.getElementById('userName').textContent = userData.displayName || "Unknown Personnel";
    document.getElementById('welcomeName').textContent = userData.displayName || "";
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userRole').textContent = getRankName(userData.rank);
    document.getElementById('userPlan').textContent = (userData.plan || 'free').toUpperCase();
    document.getElementById('clearanceLevel').textContent = getClearanceLevel(userData);
    const netEl = document.getElementById('currentNetworkDisplay');
    if (netEl && networkName) netEl.textContent = `Network: ${networkName.toUpperCase()}`;

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

    // Switch Network Button
    const switchBtn = document.getElementById('switchNetworkBtn');
    if (switchBtn) {
        switchBtn.classList.remove('hidden');
        switchBtn.href = 'networks.html';
        // Remove old modal click handler if any
        switchBtn.onclick = null;
    }

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

/**
 * Network Switcher Functions
 */
async function openNetworkSwitcher(uid) {
    const modal = document.getElementById('networkSwitcherModal');
    const listEl = document.getElementById('modalNetworkList');
    modal.classList.remove('hidden');
    listEl.innerHTML = '<div class="text-center py-10 text-[#00E5FF] animate-pulse font-mono uppercase text-xs">Loading Networks...</div>';

    try {
        const db = firebase.firestore();
        const userDoc = await db.collection('users').doc(uid).get();
        const myMemberships = userDoc.exists ? (userDoc.data().networkMemberships || []) : [];
        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';

        if (myMemberships.length === 0) {
            listEl.innerHTML = '<div class="text-center py-10 text-gray-500 font-mono uppercase text-xs">No authorized networks found.</div>';
            return;
        }

        let html = '';
        for (const m of myMemberships) {
            let netData = { name: m.networkId, logo: 'AFROSINT LOGO.png' };
            if (m.networkId === 'afrosint-main') {
                netData.name = 'AfroSINT Main Network';
            } else {
                const netDoc = await db.collection('networks').doc(m.networkId).get();
                if (netDoc.exists) netData = netDoc.data();
            }

            const isActive = m.networkId === currentNetworkId;

            html += `
            <div onclick="switchNetwork('${m.networkId}')" class="osint-card p-4 cursor-pointer hover:border-[#00E5FF] transition-all flex items-center gap-4 ${isActive ? 'border-[#00E5FF] bg-[#00E5FF]/5' : ''}">
                <img src="${netData.logo || 'AFROSINT LOGO.png'}" class="w-10 h-10 object-contain">
                <div class="flex-1">
                    <h3 class="text-white font-bold text-xs uppercase tracking-wider">${netData.name}</h3>
                    <p class="text-gray-500 text-[9px] uppercase">${getRankName(m.rank)}</p>
                </div>
                ${isActive ? '<span class="text-[#00E5FF]"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></span>' : ''}
            </div>
            `;
        }
        listEl.innerHTML = html;
    } catch (error) {
        console.error("Switcher Error:", error);
        listEl.innerHTML = '<div class="text-center py-10 text-red-500 font-mono uppercase text-xs">Failed to load networks.</div>';
    }
}

function closeNetworkSwitcher() {
    document.getElementById('networkSwitcherModal').classList.add('hidden');
}

function switchNetwork(netId) {
    sessionStorage.setItem('afrosint_networkId', netId);
    window.location.reload();
}
