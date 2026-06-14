/**
 * AfroSINT Migration Script - Multi-Network Identity Backfill
 *
 * This script ensures all existing users have:
 * 1. networkId: 'afrosint-main'
 * 2. defaultNetworkId: 'afrosint-main'
 * 3. networkMemberships array containing 'afrosint-main'
 *
 * It also ensures 'afrosint-main' exists in the networks collection.
 */

async function migrateToMultiNetwork(db) {
    console.log("Starting multi-network identity migration...");

    // 1. Ensure the Main Network exists
    const mainNetRef = db.collection('networks').doc('afrosint-main');
    const mainNetDoc = await mainNetRef.get();
    if (!mainNetDoc.exists) {
        console.log("Creating AfroSINT Main Network record...");
        await mainNetRef.set({
            id: 'afrosint-main',
            name: 'AfroSINT Main Network',
            description: 'Global Headquarters Intelligence Operations',
            logo: 'AFROSINT LOGO.png',
            status: 'active',
            isPublic: true,
            memberCount: 0, // Will be updated below
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    // 2. Migrate Users
    console.log("Migrating personnel records...");
    const usersSnapshot = await db.collection('users').get();
    let migratedCount = 0;
    let mainNetworkMemberCount = 0;

    for (const doc of usersSnapshot.docs) {
        const data = doc.data();
        const uid = doc.id;

        // Skip composite docs (already multi-network ready)
        if (uid.includes('_')) {
            if (data.networkId === 'afrosint-main') mainNetworkMemberCount++;
            continue;
        }

        const updates = {};
        if (!data.networkId) updates.networkId = 'afrosint-main';
        if (!data.defaultNetworkId) updates.defaultNetworkId = 'afrosint-main';

        if (!data.networkMemberships || data.networkMemberships.length === 0) {
            updates.networkMemberships = [{
                networkId: 'afrosint-main',
                rank: data.rank || 'member',
                rankLevel: typeof getRankLevel === 'function' ? getRankLevel(data.rank) : 1,
                joinedAt: data.createdAt || new Date()
            }];
        }

        if (Object.keys(updates).length > 0) {
            await db.collection('users').doc(uid).update(updates);
            migratedCount++;
        }
        mainNetworkMemberCount++;
    }

    // Update main network member count
    await mainNetRef.update({ memberCount: mainNetworkMemberCount });

    console.log(`Migration complete. Migrated ${migratedCount} central records. Total Main Network strength: ${mainNetworkMemberCount}.`);

    // 3. Migrate Reports (ensure they have networkId)
    console.log("Verifying report associations...");
    const reportsSnapshot = await db.collection('reports').get();
    let reportCount = 0;
    for (const doc of reportsSnapshot.docs) {
        const data = doc.data();
        if (!data.networkId) {
            await db.collection('reports').doc(doc.id).update({
                networkId: 'afrosint-main'
            });
            reportCount++;
        }
    }
    console.log(`Migrated ${reportCount} reports to Main Network.`);
}

// migrateToMultiNetwork(firebase.firestore());
