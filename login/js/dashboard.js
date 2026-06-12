/**
 * Dashboard Logic
 */

checkAuthState(true); // Protected page

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        // Check cache first for immediate UI rendering
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
            document.getElementById('userName').textContent = userData.displayName || "Unknown Personnel";
            document.getElementById('welcomeName').textContent = userData.displayName || "";
            document.getElementById('userEmail').textContent = userData.email;
            document.getElementById('userRole').textContent = getRankName(userData.rank);
            document.getElementById('userPlan').textContent = (userData.plan || 'free').toUpperCase();
            document.getElementById('clearanceLevel').textContent = getClearanceLevel(userData);

            if (userData.isOnline) {
                document.getElementById('onlineStatusIndicator').classList.replace('bg-gray-600', 'bg-[#00E5FF]');
                document.getElementById('activeStatusText').textContent = 'ACTIVE';
                document.getElementById('activeStatusText').classList.replace('text-gray-500', 'text-[#00E5FF]');
                document.getElementById('activeStatusText').classList.add('animate-pulse');
            }

            if (userData.photoURL) {
                document.getElementById('userAvatar').src = userData.photoURL;
            }

            if (userData.lastLogin) {
                const date = userData.lastLogin.toDate();
                document.getElementById('lastLoginTime').textContent = date.toLocaleString();
            }

            // Display nation flag on profile card
            if (userData.appearance && userData.appearance.flag) {
                const flagEl = document.getElementById('userFlagDisplay');
                flagEl.textContent = userData.appearance.flag;
                flagEl.classList.remove('hidden');
            }

            // Admin Panel Visibility
            if (isAdmin(userData.role)) {
                const adminLink = document.getElementById('panelAdminLink');
                if (adminLink) adminLink.classList.remove('hidden');

                const profileAdminLink = document.getElementById('profileAdminLink');
                if (profileAdminLink) profileAdminLink.classList.remove('hidden');
            }

            // Report Submission Visibility
            if (typeof canSubmitReports === 'function' && canSubmitReports(userData.rank)) {
                const profileReportLink = document.getElementById('profileReportLink');
                if (profileReportLink) profileReportLink.classList.remove('hidden');

                const panelReportLink = document.getElementById('panelReportLink');
                if (panelReportLink) panelReportLink.classList.remove('hidden');

                const panelAnalystLink = document.getElementById('panelAnalystLink');
                if (panelAnalystLink) panelAnalystLink.classList.remove('hidden');
            }

        }
    }
});

function getClearanceLevel(userData) {
    const clearance = userData.clearance || 1;
    const rankName = getRankName(userData.rank).toUpperCase();
    return `LEVEL ${clearance} (${rankName})`;
}
