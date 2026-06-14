/**
 * Network Selection and Membership Logic
 */

firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
        loadNetworks(user.uid);
    } else {
        window.location.href = 'login.html';
    }
});

async function loadNetworks(uid) {
    const listEl = document.getElementById('networkList');
    const yourListEl = document.getElementById('yourNetworkList');
    const db = firebase.firestore();

    try {
        // Get user central data
        const userDoc = await db.collection('users').doc(uid).get();
        const userData = userDoc.exists ? userDoc.data() : { networkMemberships: [] };
        const myMemberships = userData.networkMemberships || [];
        const defaultNetId = userData.defaultNetworkId;

        // Fetch ALL available networks
        const allNetsSnap = await db.collection('networks').get();
        const allNetworks = [];
        allNetsSnap.forEach(doc => allNetworks.push({ id: doc.id, ...doc.data() }));

        // Ensure AfroSINT Main is in the list if not in Firestore
        if (!allNetworks.find(n => n.id === 'afrosint-main')) {
            allNetworks.unshift({
                id: 'afrosint-main',
                name: 'AfroSINT Main Network',
                description: 'Global Headquarters Intelligence Operations',
                logo: 'AFROSINT LOGO.png',
                isPublic: true,
                memberCount: '1000+'
            });
        }

        const myNets = [];
        const availableNets = [];

        allNetworks.forEach(net => {
            const membership = myMemberships.find(m => m.networkId === net.id);
            if (membership) {
                myNets.push({ ...net, myRank: membership.rank, isDefault: net.id === defaultNetId });
            } else {
                availableNets.push(net);
            }
        });

        renderMyNetworks(myNets);
        renderAvailableNetworks(availableNets);

        // Check if user is a Fellow
        if (userData.rank === 'afrosint_fellow' || getRankLevel(userData.rank) >= 8) {
            document.getElementById('fellowAction').classList.remove('hidden');
        }

    } catch (error) {
        console.error("Error loading networks:", error);
        listEl.innerHTML = `<div class="col-span-full text-center text-red-500 py-10 font-mono">ERROR: ${error.message}</div>`;
    }
}

function renderMyNetworks(networks) {
    const section = document.getElementById('yourNetworksSection');
    const listEl = document.getElementById('yourNetworkList');

    if (networks.length === 0) {
        section.classList.add('hidden');
        return;
    }

    section.classList.remove('hidden');
    let html = '';

    networks.forEach(net => {
        html += `
        <div class="osint-card p-5 relative group border-[#00E5FF]/20 hover:border-[#00E5FF] transition-all flex flex-col gap-3">
            <div onclick="selectNetwork('${net.id}')" class="cursor-pointer flex items-center gap-4">
                <img src="${net.logo || 'AFROSINT LOGO.png'}" class="w-12 h-12 object-contain group-hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                <div class="flex-1">
                    <h3 class="text-white font-bold text-sm uppercase tracking-wider group-hover:text-[#00E5FF] transition-colors">${net.name}</h3>
                    <p class="text-[#00E5FF] text-[9px] font-bold uppercase tracking-tighter">${getRankName(net.myRank)}</p>
                </div>
                ${net.isDefault ? '<span class="text-[8px] bg-[#00E5FF]/20 text-[#00E5FF] px-2 py-0.5 rounded border border-[#00E5FF]/30 font-bold uppercase">DEFAULT</span>' : ''}
            </div>
            <div class="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                <button onclick="selectNetwork('${net.id}')" class="text-[9px] font-bold uppercase tracking-widest text-[#00E5FF] hover:underline">Launch Dashboard</button>
                ${!net.isDefault ? `<button onclick="setDefaultNetwork('${net.id}')" class="text-[9px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Set as Default</button>` : ''}
            </div>
        </div>
        `;
    });

    listEl.innerHTML = html;
}

function renderAvailableNetworks(networks) {
    const listEl = document.getElementById('networkList');
    let html = '';

    if (networks.length === 0) {
        listEl.innerHTML = '<div class="col-span-full text-center text-gray-600 py-10 font-mono uppercase text-xs">No additional networks available.</div>';
        return;
    }

    networks.forEach(net => {
        const isPublic = net.isPublic !== false;
        html += `
        <div class="osint-card p-5 flex flex-col gap-4 border-white/5 hover:border-white/20 transition-all">
            <div class="flex items-start gap-4">
                <img src="${net.logo || 'AFROSINT LOGO.png'}" class="w-12 h-12 object-contain opacity-70 group-hover:opacity-100">
                <div class="flex-1">
                    <h3 class="text-gray-300 font-bold text-sm uppercase tracking-wider">${net.name}</h3>
                    <p class="text-gray-500 text-[10px] leading-tight mt-1 line-clamp-2">${net.description || 'No description available.'}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <div class="text-[9px]">
                    <span class="text-gray-600 uppercase block">Region</span>
                    <span class="text-gray-400 font-bold">${net.region || 'Global'}</span>
                </div>
                <div class="text-[9px]">
                    <span class="text-gray-600 uppercase block">Personnel</span>
                    <span class="text-gray-400 font-bold">${net.memberCount || 0}</span>
                </div>
            </div>
            <button onclick="${isPublic ? `joinNetwork('${net.id}')` : `requestAccess('${net.id}')`}"
                    class="osint-button w-full py-2 rounded text-[10px] font-bold uppercase tracking-widest ${isPublic ? 'text-[#00E5FF]' : 'text-yellow-500 border-yellow-500/50'}">
                ${isPublic ? 'Join Network' : 'Request Access'}
            </button>
        </div>
        `;
    });

    listEl.innerHTML = html;
}

function selectNetwork(netId) {
    sessionStorage.setItem('afrosint_networkId', netId);
    window.location.href = 'dashboard.html';
}

async function setDefaultNetwork(netId) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
        await firebase.firestore().collection('users').doc(user.uid).update({
            defaultNetworkId: netId
        });
        loadNetworks(user.uid);
    } catch (error) {
        console.error("Error setting default network:", error);
        alert("Failed to update default network.");
    }
}

async function joinNetwork(netId) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    if (!confirm("Are you sure you want to join this intelligence network?")) return;

    try {
        const db = firebase.firestore();
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        const memberships = userData.networkMemberships || [];

        if (memberships.some(m => m.networkId === netId)) {
            alert("You are already a member of this network.");
            return;
        }

        const newMembership = {
            networkId: netId,
            rank: 'member',
            rankLevel: 1,
            joinedAt: new Date()
        };

        memberships.push(newMembership);

        // Update central doc
        const updates = { networkMemberships: memberships };
        if (!userData.defaultNetworkId) updates.defaultNetworkId = netId;
        await db.collection('users').doc(user.uid).update(updates);

        // Create network-specific doc
        const networkUserData = {
            ...userData,
            networkId: netId,
            rank: 'member',
            clearance: 1,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        delete networkUserData.networkMemberships;
        delete networkUserData.defaultNetworkId;

        await db.collection('users').doc(`${user.uid}_${netId}`).set(networkUserData);

        // Increment member count
        await db.collection('networks').doc(netId).update({
            memberCount: firebase.firestore.FieldValue.increment(1)
        }).catch(err => console.warn("Could not increment member count:", err));

        alert("Welcome to the network. Intelligence access granted.");
        loadNetworks(user.uid);

    } catch (error) {
        console.error("Error joining network:", error);
        alert("Failed to join network: " + error.message);
    }
}

async function requestAccess(netId) {
    const user = firebase.auth().currentUser;
    if (!user) return;

    try {
        const db = firebase.firestore();
        // Create a pending request
        await db.collection('users').doc(`${user.uid}_${netId}`).set({
            uid: user.uid,
            networkId: netId,
            displayName: user.displayName,
            email: user.email,
            status: 'pending',
            requestedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Access request sent. Your credentials are under review by network command.");
    } catch (error) {
        console.error("Error requesting access:", error);
        alert("Failed to send request: " + error.message);
    }
}
