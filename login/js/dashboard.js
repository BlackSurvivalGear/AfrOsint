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

            // Load User Reports
            loadUserReports(user.uid);
        }
    }
});

/**
 * Load and display reports for the current user
 */
async function loadUserReports(uid) {
    const tableBody = document.getElementById('myReportsTableBody');
    if (!tableBody) return;

    try {
        // Fetch both reports and drafts
        const reportsSnapshot = await firebase.firestore().collection('reports')
            .where('authorUid', '==', uid)
            .orderBy('createdAt', 'desc')
            .limit(10)
            .get();

        const draftsSnapshot = await firebase.firestore().collection('reportDrafts')
            .where('authorUid', '==', uid)
            .orderBy('updatedAt', 'desc')
            .get();

        const reports = reportsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isDraft: false }));
        const drafts = draftsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isDraft: true }));

        const allItems = [...drafts, ...reports].sort((a, b) => {
            const dateA = (a.updatedAt || a.createdAt)?.toDate() || 0;
            const dateB = (b.updatedAt || b.createdAt)?.toDate() || 0;
            return dateB - dateA;
        });

        if (allItems.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="5" class="py-10 text-center text-gray-600 uppercase italic">No reports found.</td></tr>`;
            return;
        }

        tableBody.innerHTML = allItems.map(item => `
            <tr class="hover:bg-[#00E5FF]/5 transition">
                <td class="py-3 px-2 font-mono text-[10px] text-[#00E5FF]">${item.reportId || 'DRAFT'}</td>
                <td class="py-3 px-2 truncate max-w-[150px]" title="${item.title}">${item.title || 'Untitled Report'}</td>
                <td class="py-3 px-2 text-gray-500">${item.createdAt ? item.createdAt.toDate().toLocaleDateString() : '---'}</td>
                <td class="py-3 px-2">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusClass(item)}">
                        ${item.isDraft ? 'Draft' : (item.status || 'Pending')}
                    </span>
                </td>
                <td class="py-3 px-2 text-right">
                    <a href="report.html?${item.isDraft ? 'draftId' : 'id'}=${item.id}" class="text-[#00E5FF] hover:underline text-[10px] font-bold uppercase">
                        ${item.isDraft || item.status === 'Pending Review' ? 'Edit' : 'View'}
                    </a>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error("Error loading reports:", error);
        tableBody.innerHTML = `<tr><td colspan="5" class="py-4 text-center text-red-500 text-[10px] uppercase">Failed to load signals.</td></tr>`;
    }
}

function getStatusClass(item) {
    if (item.isDraft) return 'bg-gray-800 text-gray-400 border border-gray-700';
    switch (item.status) {
        case 'Verified': return 'bg-green-500/10 text-green-500 border border-green-500/20';
        case 'Published': return 'bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20';
        case 'Rejected': return 'bg-red-500/10 text-red-500 border border-red-500/20';
        default: return 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20';
    }
}

function getClearanceLevel(userData) {
    const clearance = userData.clearance || 1;
    const rankName = getRankName(userData.rank).toUpperCase();
    return `LEVEL ${clearance} (${rankName})`;
}
