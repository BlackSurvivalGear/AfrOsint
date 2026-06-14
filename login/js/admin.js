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
        const db = firebase.firestore();
        const snapshot = await db.collection('users').get();

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
            const isSuspended = user.suspended === true || user.disabled === true;

            total++;
            if (!isSuspended) active++;
            if (isSuspended) suspended++;
            // Analysts are rank level 2 or above (but excluding Fellow status unless specified)
            if (getRankLevel(rank) >= 2 && getRankLevel(rank) < 8) analysts++;

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
                    <div class='${statusColor} text-[9px] font-bold border ${statusBorder} px-2 py-0.5 rounded-sm tracking-tighter'>
                        ${statusText}
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
                    <button onclick='manageUserRank("${uid}", "${rank}", "${role}")' class='flex-1 py-1.5 border border-[#00ffee]/30 text-[#00ffee] text-[10px] font-bold uppercase hover:bg-[#00ffee] hover:text-black transition-all rounded-sm'>
                        Adjust Rank
                    </button>
                    <button onclick='toggleUserSuspension("${uid}", "${rank}", ${isSuspended})' class='flex-1 py-1.5 border ${isSuspended ? "border-[#00ffee]/30 text-[#00ffee]" : "border-red-500/30 text-red-500"} text-[10px] font-bold uppercase hover:opacity-80 transition-all rounded-sm'>
                        ${isSuspended ? "Restore" : "Suspend"}
                    </button>
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
    const rankList = [
        AfroSINT.Permissions.RANKS.MEMBER,
        AfroSINT.Permissions.RANKS.ANALYST,
        AfroSINT.Permissions.RANKS.SENIOR_ANALYST,
        AfroSINT.Permissions.RANKS.LEAD_ANALYST,
        AfroSINT.Permissions.RANKS.REGIONAL_COORDINATOR,
        AfroSINT.Permissions.RANKS.DEPUTY_CHIEF_ANALYST,
        AfroSINT.Permissions.RANKS.CHIEF_ANALYST,
        AfroSINT.Permissions.RANKS.AFROSINT_FELLOW
    ];

    let msg = "Select new AfroSINT Rank:\n" + rankList.map((r, i) => `${i}: ${getRankName(r).toUpperCase()}`).join("\n");
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
