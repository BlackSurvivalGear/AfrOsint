/**
 * AfroSINT Analyst Dashboard Logic
 * Handles report moderation, status updates, and filtering
 */

const reportsDB = firebase.firestore().collection('reports');
let currentReportId = null;
let allReports = [];

document.addEventListener('DOMContentLoaded', () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            checkAnalystAccess(user);
        } else {
            window.location.href = 'login/login.html';
        }
    });

    setupFilterListeners();
});

async function checkAnalystAccess(user) {
    try {
        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';
        const docId = currentNetworkId === 'afrosint-main' ? user.uid : `${user.uid}_${currentNetworkId}`;
        const userDoc = await firebase.firestore().collection('users').doc(docId).get();
        const userData = userDoc.data();

        // Report review/approval requires Senior Analyst (3) or above
        if (!userData || (!canReviewReports(userData.rank) && !canReviewReports(userData.role))) {
            console.warn("[Auth] Senior Analyst review access denied for user:", user.uid, "Rank:", userData?.rank, "Role:", userData?.role);
            alert("ACCESS DENIED: Senior Analyst (Level 3) clearance required for report review.");
            window.location.href = 'index.html';
            return;
        }

        loadReports();
    } catch (error) {
        console.error("Auth check error:", error);
    }
}

function setupFilterListeners() {
    const filters = ['filterStatus', 'filterCategory', 'filterThreat', 'filterUrgent'];
    filters.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', renderReportsList);
    });

    const updateBtn = document.getElementById('updateReportBtn');
    if (updateBtn) updateBtn.addEventListener('click', updateReport);
}

async function loadReports() {
    try {
        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';
        // Load reports scoped to network
        const snapshot = await reportsDB.where('networkId', '==', currentNetworkId).get();
        allReports = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Sort by date (descending)
        allReports.sort((a, b) => {
            const dateA = a.createdAt ? a.createdAt.toDate() : new Date(0);
            const dateB = b.createdAt ? b.createdAt.toDate() : new Date(0);
            return dateB - dateA;
        });

        renderReportsList();
    } catch (error) {
        console.error("Error loading reports:", error);
        const list = document.getElementById('reportsList');
        if (list) list.innerHTML = `<tr><td colspan="8" style="text-align:center; color:#ff4444;">FAILED TO RETRIEVE RECORDS.</td></tr>`;
    }
}

function renderReportsList() {
    const status = document.getElementById('filterStatus').value;
    const category = document.getElementById('filterCategory').value;
    const threat = document.getElementById('filterThreat').value;
    const urgent = document.getElementById('filterUrgent').value;

    let filtered = allReports.filter(r => {
        if (status !== 'All' && r.status !== status) return false;
        if (category !== 'All' && r.category !== category) return false;
        if (threat !== 'All' && r.threatLevel !== threat) return false;
        if (urgent === 'Urgent' && !r.urgent) return false;
        return true;
    });

    const tbody = document.getElementById('reportsList');
    if (!tbody) return;

    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:40px; color:#7fd6df;">NO REPORTS FOUND MATCHING CRITERIA.</td></tr>`;
        return;
    }

    tbody.innerHTML = filtered.map(r => {
        const date = r.createdAt ? r.createdAt.toDate().toLocaleDateString() : 'N/A';
        const statusClass = `status-${r.status.toLowerCase().replace(' ', '-')}`;
        const urgentStyle = r.urgent ? 'border-left: 3px solid #ff4444;' : '';

        return `
            <tr style="${urgentStyle}">
                <td style="font-family: 'Share Tech Mono', monospace; color: var(--cyan);">${r.referenceNumber}</td>
                <td style="font-size: 11px;">${date}</td>
                <td>${r.category}</td>
                <td>${r.country}</td>
                <td><span style="color: ${getThreatColor(r.threatLevel)}">${r.threatLevel.toUpperCase()}</span></td>
                <td style="font-size: 11px;">${r.createdByName}</td>
                <td><span class="status-badge ${statusClass}">${r.status}</span></td>
                <td>
                    <button onclick="viewReport('${r.id}')" class="atw-small-button" style="padding: 4px 10px; font-size: 10px;">VIEW</button>
                </td>
            </tr>
        `;
    }).join('');
}

function getThreatColor(level) {
    switch(level) {
        case 'Critical': return '#ff0000';
        case 'High': return '#ff4400';
        case 'Moderate': return '#ffcc00';
        default: return '#00ffee';
    }
}

window.viewReport = (id) => {
    const r = allReports.find(report => report.id === id);
    if (!r) return;

    currentReportId = id;
    document.getElementById('modalRef').textContent = r.referenceNumber;
    document.getElementById('modalTitle').textContent = r.title;
    document.getElementById('modalDescription').textContent = r.description;
    document.getElementById('updateStatus').value = r.status;
    document.getElementById('analystNotes').value = r.analystNotes || "";

    const attachments = document.getElementById('modalAttachments');
    if (r.attachments && r.attachments.length > 0) {
        attachments.innerHTML = r.attachments.map(file => `
            <a href="${file.url}" target="_blank" class="file-item" style="text-decoration:none;">
                <span>${file.name}</span>
                <span style="color:var(--cyan); margin-left:10px;">VIEW</span>
            </a>
        `).join('');
    } else {
        attachments.innerHTML = '<p style="font-size:12px; color:#555;">No attachments provided.</p>';
    }

    document.getElementById('reportModal').style.display = 'block';
};

window.closeModal = () => {
    document.getElementById('reportModal').style.display = 'none';
};

async function updateReport() {
    if (!currentReportId) return;

    const newStatus = document.getElementById('updateStatus').value;
    const notes = document.getElementById('analystNotes').value;
    const btn = document.getElementById('updateReportBtn');

    try {
        btn.disabled = true;
        btn.textContent = "UPDATING...";

        await reportsDB.doc(currentReportId).update({
            status: newStatus,
            analystNotes: notes,
            verified: newStatus === 'Verified',
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy: firebase.auth().currentUser.uid
        });

        alert("Report updated successfully.");
        closeModal();
        loadReports(); // Refresh data
    } catch (error) {
        console.error("Update error:", error);
        alert("Failed to update report.");
    } finally {
        btn.disabled = false;
        btn.textContent = "UPDATE RECORD";
    }
}
