/**
 * AfroSINT Migration Script - White-Label System Backfill
 *
 * This script adds 'networkId: afrosint-main' to all existing users and reports
 * that do not already have a networkId assigned.
 */

async function migrateToMultiTenant(db) {
    console.log("Starting migration to multi-tenant architecture...");

    // 1. Ensure the Main Network exists
    const mainNetRef = db.collection('networks').doc('afrosint-main');
    const mainNetDoc = await mainNetRef.get();
    if (!mainNetDoc.exists) {
        console.log("Creating AfroSINT Main Network entry...");
        await mainNetRef.set({
            id: 'afrosint-main',
            name: 'AfroSINT Main Network',
            description: 'Global Headquarters Intelligence Operations',
            logo: 'AFROSINT LOGO.png',
            status: 'active',
            createdAt: new Date()
        });
    }

    // 2. Migrate Users
    console.log("Migrating users...");
    const usersSnapshot = await db.collection('users').get();
    let userCount = 0;
    for (const doc of usersSnapshot.docs) {
        const data = doc.data();
        if (!data.networkId) {
            await db.collection('users').doc(doc.id).update({
                networkId: 'afrosint-main'
            });
            userCount++;
        }
    }
    console.log(`Migrated ${userCount} users.`);

    // 3. Migrate Reports
    console.log("Migrating reports...");
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
    console.log(`Migrated ${reportCount} reports.`);

    console.log("Migration complete.");
}

// Note: This script is intended to be run in a controlled environment with admin privileges.
// migrateToMultiTenant(firebase.firestore());
