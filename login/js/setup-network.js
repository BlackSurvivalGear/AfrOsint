/**
 * Network Setup Logic
 */

firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Verify Fellow rank in main network
    const db = firebase.firestore();
    const userDoc = await db.collection('users').doc(user.uid).get();
    if (!userDoc.exists || getRankLevel(userDoc.data().rank) < 8) {
        alert("ACCESS DENIED: Only AfroSINT Fellows can establish new networks.");
        window.location.href = 'networks.html';
    }
});

document.getElementById('networkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    if (!user) return;

    const submitBtn = document.getElementById('submitBtn');
    const statusEl = document.getElementById('statusMessage');

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = 'ESTABLISHING...';
        statusEl.classList.remove('hidden', 'bg-red-500/20', 'text-red-500');
        statusEl.classList.add('bg-[#00E5FF]/10', 'text-[#00E5FF]');
        statusEl.textContent = 'COMMENCING NETWORK ESTABLISHMENT...';

        const db = firebase.firestore();
        const networkName = document.getElementById('networkName').value;
        const networkId = networkName.toLowerCase().replace(/[^a-z0-9]/g, '-');

        // Check if ID exists
        const existing = await db.collection('networks').doc(networkId).get();
        if (existing.exists) {
            throw new Error("A network with this name or ID already exists.");
        }

        let logoUrl = document.getElementById('logoUrl').value;
        const logoFile = document.getElementById('logoFile').files[0];

        if (logoFile) {
            statusEl.textContent = 'UPLOADING BRANDING ASSETS...';
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(`networks/${networkId}/logo_${Date.now()}`);
            await fileRef.put(logoFile);
            logoUrl = await fileRef.getDownloadURL();
        }

        const networkData = {
            id: networkId,
            name: networkName,
            description: document.getElementById('networkDescription').value,
            mission: document.getElementById('missionStatement').value,
            region: document.getElementById('regionFocus').value,
            isPublic: document.getElementById('isPublic').value === 'true',
            memberCount: 1,
            logo: logoUrl,
            dashboardTitle: document.getElementById('dashboardTitle').value || networkName.toUpperCase(),
            footerText: document.getElementById('footerText').value || `© ${new Date().getFullYear()} ${networkName}`,
            accentColor: document.getElementById('accentColor').value,
            secondaryColor: document.getElementById('secondaryColor').value,
            createdBy: user.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'active'
        };

        // Create network doc
        await db.collection('networks').doc(networkId).set(networkData);

        // Create Director record for the Fellow in the new network
        const mainUserDoc = await db.collection('users').doc(user.uid).get();
        const mainUserData = mainUserDoc.data();
        const currentMemberships = mainUserData.networkMemberships || [];

        // Check if already a member (should not happen for a new network)
        if (!currentMemberships.some(m => m.networkId === networkId)) {
            currentMemberships.push({
                networkId: networkId,
                rank: 'network_director',
                rankLevel: 8,
                joinedAt: new Date()
            });
        }

        const directorData = {
            ...mainUserData,
            networkId: networkId,
            role: 'administrator',
            rank: 'network_director', // Keep rank level 8
            clearance: 8,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        // Composite key for multi-network users
        await db.collection('users').doc(`${user.uid}_${networkId}`).set(directorData);

        // Update central user doc with membership and default
        await db.collection('users').doc(user.uid).update({
            networkMemberships: currentMemberships,
            defaultNetworkId: networkId
        });

        statusEl.textContent = 'NETWORK ESTABLISHED SUCCESSFULLY. REDIRECTING...';
        setTimeout(() => {
            sessionStorage.setItem('afrosint_networkId', networkId);
            window.location.href = 'dashboard.html';
        }, 2000);

    } catch (error) {
        console.error("Network Creation Error:", error);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Establish Network';
        statusEl.classList.replace('text-[#00E5FF]', 'text-red-500');
        statusEl.classList.replace('bg-[#00E5FF]/10', 'bg-red-500/10');
        statusEl.textContent = `ERROR: ${error.message}`;
    }
});
