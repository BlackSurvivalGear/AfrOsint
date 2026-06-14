/**
 * Admin Panel Logic - Personnel Management
 */

function esc(s) {
    let d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
}

async function fetchPersonnel() {
    const listEl = document.getElementById('personnelList');
    if (!listEl) return;

    listEl.innerHTML = '<div class="text-center py-20 text-[#00E5FF] font-mono animate-pulse uppercase">Fetching Personnel Records...</div>';

    try {
        const authUser = firebase.auth().currentUser;
        const db = firebase.firestore();
        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';

        // Fetch users assigned to this network
        const snapshot = await db.collection('users')
            .where('networkId', '==', currentNetworkId)
            .get();

        // Get viewer's role for Super Admin checks
        let viewerRole = 'user';
        if (authUser) {
            const viewerDoc = await db.collection('users').doc(authUser.uid).get();
            if (viewerDoc.exists) {
                viewerRole = viewerDoc.data().role || 'user';
            }
        }
        const isSuper = typeof isSuperAdmin === 'function' ? isSuperAdmin(viewerRole) : viewerRole === 'super_admin';

        // Update Stats
        let total = 0, active = 0, analysts = 0, suspended = 0;

        if (snapshot.empty) {
            listEl.innerHTML = '<div class="text-center py-20 text-gray-500 uppercase font-mono">No personnel records found.</div>';
            return;
        }

        let html = `<div class='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>`;
        snapshot.forEach(doc => {
            const user = doc.data();
            const uid = doc.id;
            const role = user.role || "user";
            const rank = user.rank || "member";
            const status = user.status || "active";
            const isSuspended = user.suspended === true || user.disabled === true || status === "suspended";
            const isPending = status === "pending";

            total++;
            if (!isSuspended && !isPending) active++;
            if (isSuspended) suspended++;
            // Analysts are rank level 2 or above
            if (getRankLevel(rank) >= 2) analysts++;

            const statusColor = isSuspended ? "text-red-500" : "text-[#00ffee]";
            const statusBorder = isSuspended ? "border-red-500/40" : "border-[#00ffee]/40";
            const statusText = isSuspended ? "SUSPENDED" : "ACTIVE";

            html += `
            <div class='osint-card p-5 flex flex-col gap-4 relative group hover:border-[#00ffee]/60 transition-all'>
                <div class='flex items-center gap-4'>
                    <img src='${user.photoURL || "https://via.placeholder.com/150"}' class='w-12 h-12 rounded-full border border-[#00ffee]/30 p-0.5 object-cover'>
                    <div class='flex-1 min-width-0'>
                        <div class='text-white font-bold text-sm uppercase truncate'>${esc(user.displayName || "Unknown")}</div>
                        <div class='text-gray-500 text-[10px] font-mono truncate'>${esc(user.email || "No Email")}</div>
                    </div>
                    <div class='${isPending ? "text-yellow-500 border-yellow-500/40" : statusColor} text-[9px] font-bold border ${isPending ? "border-yellow-500/40" : statusBorder} px-2 py-0.5 rounded-sm tracking-tighter'>
                        ${isPending ? "PENDING" : statusText}
                    </div>
                </div>

                <div class='pt-3 border-t border-white/5 flex flex-col gap-2'>
                    <div class='flex justify-between items-center'>
                        <span class='text-gray-500 text-[10px] uppercase'>Role / Rank</span>
                        <span class='text-[#00ffee] text-[10px] font-bold uppercase'>${role} / ${getRankName(rank)}</span>
                    </div>
                    <div class='flex justify-between items-center'>
                        <span class='text-gray-500 text-[10px] uppercase'>Clearance</span>
                        <span class='text-white text-[10px] font-bold'>LEVEL ${user.clearance || getRankLevel(rank)}</span>
                    </div>
                </div>

                <div class='mt-2 flex gap-2'>
                    ${isPending ? `
                    <button onclick='approveMembership("${uid}", "${esc(user.displayName || "Unknown")}")' class='flex-1 py-1.5 bg-[#00ffee] text-black text-[10px] font-bold uppercase hover:opacity-90 transition-all rounded-sm'>
                        Approve Access
                    </button>
                    <button onclick='rejectMembership("${uid}")' class='flex-1 py-1.5 border border-red-500 text-red-500 text-[10px] font-bold uppercase hover:bg-red-500 hover:text-white transition-all rounded-sm'>
                        Reject
                    </button>
                    ` : `
                    <button onclick='manageUserRank("${uid}", "${rank}", "${role}")' class='flex-1 py-1.5 border border-[#00ffee]/30 text-[#00ffee] text-[10px] font-bold uppercase hover:bg-[#00ffee] hover:text-black transition-all rounded-sm'>
                        Adjust Rank
                    </button>
                    <button onclick='toggleUserSuspension("${uid}", "${rank}", ${isSuspended})' class='flex-1 py-1.5 border ${isSuspended ? "border-[#00ffee]/30 text-[#00ffee]" : "border-red-500/30 text-red-500"} text-[10px] font-bold uppercase hover:opacity-80 transition-all rounded-sm'>
                        ${isSuspended ? "Restore" : "Suspend"}
                    </button>
                    `}
                    ${isSuper && uid !== authUser.uid ? `
                    <button onclick='deleteUserRecord("${uid}", "${esc(user.displayName || "Unknown")}")' class='px-3 py-1.5 border border-red-600 text-red-500 hover:bg-red-600 hover:text-white transition-all rounded-sm' title='Delete Personnel Record'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>` : ''}
                </div>
            </div>`;
        });
        html += `</div>`;
        listEl.innerHTML = html;

        // Push Stats
        if(document.getElementById('statTotal')) document.getElementById('statTotal').textContent = total;
        if(document.getElementById('statActive')) document.getElementById('statActive').textContent = active;
        if(document.getElementById('statAnalysts')) document.getElementById('statAnalysts').textContent = analysts;
        if(document.getElementById('statSuspended')) document.getElementById('statSuspended').textContent = suspended;

    } catch (error) {
        console.error("Error fetching personnel:", error);
        listEl.innerHTML = `<div class="text-center py-20 text-red-500 font-mono uppercase">Access Denied: ${error.message}</div>`;
    }
}

async function manageUserRank(uid, currentRank, currentRole) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    // Get current user's rank level to check authority
    const selfDoc = await firebase.firestore().collection('users').doc(user.uid).get();
    const selfData = selfDoc.data();
    const selfRank = selfData.rank || "member";
    const selfRole = selfData.role || "user";

    // Use string ranks from RANKS constant
    let rankList = [
        AfroSINT.Permissions.RANKS.MEMBER,
        AfroSINT.Permissions.RANKS.ANALYST,
        AfroSINT.Permissions.RANKS.SENIOR_ANALYST,
        AfroSINT.Permissions.RANKS.LEAD_ANALYST,
        AfroSINT.Permissions.RANKS.REGIONAL_COORDINATOR,
        AfroSINT.Permissions.RANKS.DEPUTY_CHIEF_ANALYST,
        AfroSINT.Permissions.RANKS.CHIEF_ANALYST,
        AfroSINT.Permissions.RANKS.AFROSINT_FELLOW
    ];

    // Fellows (Level 8) can only promote up to Chief Analyst (Level 7) in their network
    const selfLevel = getRankLevel(selfRank);
    if (selfLevel === 8) {
        rankList = rankList.filter(r => getRankLevel(r) < 8);
    }

    let msg = "Select new Network Rank:\n" + rankList.map((r, i) => `${i}: ${getRankName(r).toUpperCase()}`).join("\n");
    const newRankIdx = prompt(msg, rankList.indexOf(currentRank.toLowerCase()));

    if (newRankIdx === null) return;
    const idx = parseInt(newRankIdx);
    if (isNaN(idx) || idx < 0 || idx >= rankList.length) {
        alert("Invalid selection.");
        return;
    }

    const targetRank = rankList[idx];

    // Check UI authority (Permissions.js)
    if (!isAdmin(selfRole) && !canPromote(selfRank, targetRank)) {
        alert(`ACCESS DENIED: Your rank (${getRankName(selfRank)}) does not have authority to promote to ${getRankName(targetRank)}.`);
        return;
    }

    try {
        const db = firebase.firestore();
        await db.collection('users').doc(uid).update({
            rank: targetRank,
            clearance: getRankLevel(targetRank)
        });
        alert(`User rank updated to ${getRankName(targetRank).toUpperCase()}`);
        fetchPersonnel();
    } catch (error) {
        console.error("Error updating rank:", error);
        alert("Action failed. " + error.message);
    }
}

async function approveMembership(compositeUid, name) {
    if (!confirm(`Approve network access for ${name}?`)) return;

    try {
        const db = firebase.firestore();
        const currentNetworkId = sessionStorage.getItem('afrosint_networkId') || 'afrosint-main';
        const uid = compositeUid.split('_')[0];

        // 1. Update composite doc to active
        await db.collection('users').doc(compositeUid).update({
            status: 'active',
            rank: 'member',
            clearance: 1,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // 2. Update central doc networkMemberships
        const centralRef = db.collection('users').doc(uid);
        const centralDoc = await centralRef.get();
        if (centralDoc.exists) {
            const data = centralDoc.data();
            const memberships = data.networkMemberships || [];
            if (!memberships.some(m => m.networkId === currentNetworkId)) {
                memberships.push({
                    networkId: currentNetworkId,
                    rank: 'member',
                    rankLevel: 1,
                    joinedAt: new Date()
                });
                await centralRef.update({ networkMemberships: memberships });
            }
        }

        // 3. Increment member count
        await db.collection('networks').doc(currentNetworkId).update({
            memberCount: firebase.firestore.FieldValue.increment(1)
        }).catch(err => console.warn("Member count update failed:", err));

        alert("Access approved. Personnel record activated.");
        fetchPersonnel();
    } catch (error) {
        console.error("Approval Error:", error);
        alert("Failed to approve membership: " + error.message);
    }
}

async function rejectMembership(compositeUid) {
    if (!confirm("Reject this access request? This will delete the pending record.")) return;

    try {
        await firebase.firestore().collection('users').doc(compositeUid).delete();
        alert("Request rejected and purged.");
        fetchPersonnel();
    } catch (error) {
        console.error("Rejection Error:", error);
        alert("Failed to reject request: " + error.message);
    }
}

/**
 * Super Admin only: Permanently delete a user record
 */
async function deleteUserRecord(uid, name) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const selfDoc = await firebase.firestore().collection('users').doc(user.uid).get();
    const selfData = selfDoc.data();
    const selfRole = selfData.role || "user";

    const isSuper = typeof isSuperAdmin === 'function' ? isSuperAdmin(selfRole) : selfRole === 'super_admin';

    if (!isSuper) {
        alert("ACCESS DENIED: Super Admin privileges required for record deletion.");
        return;
    }

    if (!confirm(`CRITICAL ACTION: Are you sure you want to PERMANENTLY DELETE personnel record for ${name.toUpperCase()}?\n\nThis action cannot be undone.`)) {
        return;
    }

    try {
        const db = firebase.firestore();
        await db.collection('users').doc(uid).delete();
        alert(`Personnel record for ${name} has been purged from system.`);
        fetchPersonnel();
    } catch (error) {
        console.error("Error purging record:", error);
        alert("Action failed. " + error.message);
    }
}

async function toggleUserSuspension(uid, targetRank, currentlySuspended) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    const selfDoc = await firebase.firestore().collection('users').doc(user.uid).get();
    const selfData = selfDoc.data();
    const selfRank = selfData.rank || "member";
    const selfRole = selfData.role || "user";

    // Check suspension authority
    if (!isAdmin(selfRole) && !canSuspend(selfRank, targetRank)) {
        alert(`ACCESS DENIED: Your rank (${getRankName(selfRank)}) does not have authority to suspend/restore ${getRankName(targetRank)}.`);
        return;
    }

    const action = currentlySuspended ? "restore" : "suspend";
    if (!confirm(`Confirm account ${action}?`)) return;

    try {
        const db = firebase.firestore();
        await db.collection('users').doc(uid).update({
            suspended: !currentlySuspended,
            disabled: !currentlySuspended
        });
        alert(`User successfully ${currentlySuspended ? "restored" : "suspended"}.`);
        fetchPersonnel();
    } catch (error) {
        console.error("Error toggling suspension:", error);
        alert("Action failed. " + error.message);
    }
}

// Initial fetch - Listen for auth state to ensure we have permissions before fetching
firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        // Double check admin status from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        const userData = userDoc.data();

        // Allow access if admin role OR high rank (Regional Coordinator +)
        if (userData && (isAdmin(userData.role) || getRankLevel(userData.rank) >= 5)) {
            fetchPersonnel();
        } else {
            console.warn("Unauthorized access attempt to personnel data.");
        }
    }
});
