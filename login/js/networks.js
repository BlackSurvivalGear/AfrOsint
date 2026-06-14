/**
 * Network Selection Logic
 */

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        loadAvailableNetworks(user.uid);
    } else {
        window.location.href = 'login.html';
    }
});

async function loadAvailableNetworks(uid) {
    const listEl = document.getElementById('networkList');
    const db = firebase.firestore();

    try {
        const memberships = await db.collection('users')
            .where('uid', '==', uid)
            .get();

        if (memberships.empty) {
            // Check for legacy doc
            const legacyDoc = await db.collection('users').doc(uid).get();
            if (legacyDoc.exists) {
                // Single membership in main
                selectNetwork('afrosint-main');
                return;
            }
            listEl.innerHTML = '<div class="col-span-full text-center text-red-500 py-10 font-mono">NO AUTHORIZED NETWORKS FOUND.</div>';
            return;
        }

        const networkIds = memberships.docs.map(doc => doc.data().networkId || 'afrosint-main');

        // Fetch network details
        const networkDetails = [];
        for (const netId of networkIds) {
            if (netId === 'afrosint-main') {
                networkDetails.push({
                    id: 'afrosint-main',
                    name: 'AfroSINT Main Network',
                    description: 'Global Headquarters Intelligence Operations',
                    logo: 'AFROSINT LOGO.png'
                });
            } else {
                const netDoc = await db.collection('networks').doc(netId).get();
                if (netDoc.exists) {
                    networkDetails.push({ id: netId, ...netDoc.data() });
                }
            }
        }

        renderNetworks(networkDetails);

        // Check if user is a Fellow in main network to show "Establish New Network"
        const mainUserDoc = await db.collection('users').doc(uid).get();
        if (mainUserDoc.exists && getRankLevel(mainUserDoc.data().rank) >= 8) {
            document.getElementById('fellowAction').classList.remove('hidden');
        }

    } catch (error) {
        console.error("Error loading networks:", error);
        listEl.innerHTML = `<div class="col-span-full text-center text-red-500 py-10 font-mono">ERROR: ${error.message}</div>`;
    }
}

function renderNetworks(networks) {
    const listEl = document.getElementById('networkList');
    let html = '';

    networks.forEach(net => {
        html += `
        <div onclick="selectNetwork('${net.id}')" class="osint-card p-5 cursor-pointer hover:border-[#00E5FF] transition-all group flex items-center gap-4">
            <img src="${net.logo || 'AFROSINT LOGO.png'}" class="w-12 h-12 object-contain group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
            <div class="flex-1">
                <h3 class="text-white font-bold text-sm uppercase tracking-wider group-hover:text-[#00E5FF] transition-colors">${net.name}</h3>
                <p class="text-gray-500 text-[10px] leading-tight mt-1 line-clamp-2">${net.description || ''}</p>
            </div>
            <div class="text-[#00E5FF] opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
            </div>
        </div>
        `;
    });

    listEl.innerHTML = html;
}

function selectNetwork(netId) {
    sessionStorage.setItem('afrosint_networkId', netId);
    window.location.href = 'dashboard.html';
}
