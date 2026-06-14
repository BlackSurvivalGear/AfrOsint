/**
 * AfroSINT Authentication System
 * Core Auth and Firestore Logic
 */

// Check if user is logged in and handle route protection
function checkAuthState(protectedPage = false, adminOnly = false) {
    firebase.auth().onAuthStateChanged(async (user) => {
        const path = window.location.pathname;
        const isAuthPage = path.includes('login.html') || path.includes('register.html');

        if (user) {
            // User is signed in
            console.log("User logged in:", user.email);

            // Handle user data and security checks
            const processUserData = async () => {
                try {
                    let currentNetworkId = sessionStorage.getItem('afrosint_networkId');

                    const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                    const centralData = userDoc.exists ? userDoc.data() : null;

                    if (!currentNetworkId && !path.includes('networks.html')) {
                        // For new users, ensure a central document exists before redirecting
                        if (!centralData) {
                            console.log("Initializing new user central record...");
                            const initialData = {
                                uid: user.uid,
                                displayName: user.displayName || "Personnel",
                                email: user.email,
                                photoURL: user.photoURL || "../assets/images/default-avatar.png",
                                role: "user",
                                rank: "member",
                                clearance: 1,
                                plan: "free",
                                isOnline: true,
                                networkMemberships: [],
                                defaultNetworkId: '',
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                            };
                            await firebase.firestore().collection('users').doc(user.uid).set(initialData);
                        }
                        console.log("No active network session. Redirecting to network selection.");
                        window.location.href = 'networks.html';
                        return;
                    }

                    // Check cache first
                    let userData = null;
                    const cachedData = sessionStorage.getItem(`afrosint_user_${user.uid}_${currentNetworkId}`);
                    if (cachedData) {
                        userData = JSON.parse(cachedData);
                    } else {
                        // Get network-specific user data
                        const docId = currentNetworkId === 'afrosint-main' ? user.uid : `${user.uid}_${currentNetworkId}`;
                        const userDoc = await firebase.firestore().collection('users').doc(docId).get();

                        if (userDoc.exists) {
                            userData = userDoc.data();
                            sessionStorage.setItem(`afrosint_user_${user.uid}_${currentNetworkId}`, JSON.stringify(userData));

                            // Apply Branding if not main
                            if (currentNetworkId !== 'afrosint-main') {
                                const netDoc = await firebase.firestore().collection('networks').doc(currentNetworkId).get();
                                if (netDoc.exists) {
                                    const netData = netDoc.data();
                                    if (netData.accentColor) document.documentElement.style.setProperty('--osint-cyan', netData.accentColor);
                                    if (netData.secondaryColor) document.documentElement.style.setProperty('--osint-text-highlight', netData.secondaryColor);
                                    if (netData.logo) {
                                        const logos = document.querySelectorAll('img[src*="AFROSINT LOGO.png"], .header-logo, .logo-img');
                                        logos.forEach(img => img.src = netData.logo);
                                    }
                                }
                            }
                        } else if (!isAuthPage) {
                            sessionStorage.removeItem('afrosint_networkId');
                            window.location.href = 'networks.html';
                            return;
                        }
                    }

                    // Immediate redirection for authenticated users on auth pages
                    if (isAuthPage) {
                        window.location.href = 'networks.html';
                        return;
                    }

                    // Check if account is disabled
                    if (userData && (userData.disabled === true || userData.suspended === true)) {
                        alert("Account Disabled: Access revoked by administrator.");
                        await firebase.auth().signOut();
                        window.location.href = 'login.html';
                        return;
                    }

                    if (adminOnly && (!userData || !isAdmin(userData.role))) {
                        alert("Access Denied: Administrative privileges required.");
                        window.location.href = 'dashboard.html';
                        return;
                    }

                    // Handle session tracking
                    if (!sessionStorage.getItem('afrosint_session_started')) {
                        updateSessionData(user.uid); // Remove await to avoid blocking
                        sessionStorage.setItem('afrosint_session_started', 'true');
                    }
                    startHeartbeat(user.uid);
                } catch (error) {
                    console.error("Auth Data Error:", error);
                }
            };

            if (adminOnly) {
                await processUserData();
            } else {
                processUserData();
            }
        } else {
            // User is signed out
            console.log("User signed out");
            if (protectedPage) {
                window.location.href = 'login.html';
            }
        }
    });
}

// Register with Email and Password
async function registerUser(email, password, name) {
    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Create Firestore record
        await firebase.firestore().collection('users').doc(user.uid).set({
            uid: user.uid,
            networkId: 'afrosint-main',
            defaultNetworkId: '', // Prompt to choose
            networkMemberships: [], // Start empty to trigger network selection
            displayName: name,
            email: email,
            photoURL: "",
            role: "user",
            rank: "member",
            clearance: 1,
            plan: "free",
            isOnline: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Update profile
        await user.updateProfile({
            displayName: name
        });

        window.location.href = 'networks.html';
    } catch (error) {
        console.error("Registration Error:", error.message);
        alert(error.message);
    }
}

// Login with Email and Password
async function loginUser(email, password, rememberMe) {
    try {
        const persistence = rememberMe ? firebase.auth.Auth.Persistence.LOCAL : firebase.auth.Auth.Persistence.SESSION;
        await firebase.auth().setPersistence(persistence);
        await firebase.auth().signInWithEmailAndPassword(email, password);

        // Update last login and status
        const user = firebase.auth().currentUser;
        await firebase.firestore().collection('users').doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            isOnline: true
        });

        window.location.href = 'networks.html';
    } catch (error) {
        console.error("Login Error:", error.message);
        alert(error.message);
    }
}

// Google Login
async function loginWithGoogle() {
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;

        // Check if user exists in Firestore (legacy or initial login)
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
            // Create new record for Google user
            await firebase.firestore().collection('users').doc(user.uid).set({
                uid: user.uid,
                networkId: 'afrosint-main',
                defaultNetworkId: '', // Prompt to choose
                networkMemberships: [],
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: "user",
                rank: "member",
                clearance: 1,
                plan: "free",
                isOnline: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            });
            window.location.href = 'networks.html';
            return;
        } else {
            // Update profile data, last login and status
            await firebase.firestore().collection('users').doc(user.uid).update({
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                isOnline: true
            });
        }

        window.location.href = 'networks.html';
    } catch (error) {
        console.error("Google Login Error:", error.message);
        alert(error.message);
    }
}

// Password Reset
async function resetPassword(email) {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        alert("Password reset email sent!");
    } catch (error) {
        console.error("Reset Error:", error.message);
        alert(error.message);
    }
}

// Logout
async function logoutUser() {
    try {
        const user = firebase.auth().currentUser;
        if (user) {
            await firebase.firestore().collection('users').doc(user.uid).update({
                isOnline: false,
                lastSeen: firebase.firestore.FieldValue.serverTimestamp()
            }).catch(err => console.warn("Firestore logout update failed:", err));
        }
    } catch (error) {
        console.error("Logout Firestore Error:", error.message);
    } finally {
        if (window.heartbeatInterval) clearInterval(window.heartbeatInterval);
        sessionStorage.removeItem('afrosint_session_started');
        try {
            await firebase.auth().signOut();
        } catch (authErr) {
            console.error("Firebase SignOut Error:", authErr);
        }
        window.location.href = 'login.html';
    }
}

/**
 * Session and Geolocation Helpers
 */
async function getGeoLocation() {
    const cached = sessionStorage.getItem('afrosint_geo');
    if (cached) return JSON.parse(cached);

    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const geo = {
            countryCode: data.country_code || 'XX',
            countryName: data.country_name || 'Unknown'
        };
        sessionStorage.setItem('afrosint_geo', JSON.stringify(geo));
        return geo;
    } catch (error) {
        console.error("Geo-location lookup failed:", error);
        return { countryCode: 'XX', countryName: 'Unknown' };
    }
}

async function updateSessionData(uid) {
    const geo = await getGeoLocation();
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';

    const userRef = firebase.firestore().collection('users').doc(uid);

    try {
        const userDoc = await userRef.get();
        const userData = userDoc.data() || {};

        const updates = {
            countryCode: geo.countryCode,
            countryName: geo.countryName,
            deviceType: deviceType,
            isOnline: true,
            sessionStart: firebase.firestore.FieldValue.serverTimestamp(),
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (userData.sessionStart && userData.lastSeen) {
            const lastStart = userData.sessionStart.toDate();
            const lastSeen = userData.lastSeen.toDate();
            updates.lastSessionDuration = Math.floor((lastSeen - lastStart) / 1000);
        }

        await userRef.update(updates);
    } catch (error) {
        console.error("Error updating session data:", error);
    }
}

function startHeartbeat(uid) {
    if (window.heartbeatInterval) clearInterval(window.heartbeatInterval);

    const updateSeen = () => {
        firebase.firestore().collection('users').doc(uid).update({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            isOnline: true
        }).catch(err => console.error("Heartbeat error:", err));
    };

    updateSeen();
    window.heartbeatInterval = setInterval(updateSeen, 30000); // Every 30 seconds
}

// Global Offline Handler
window.addEventListener('beforeunload', () => {
    const user = firebase.auth().currentUser;
    if (user) {
        // Use sendBeacon or a synchronous update if possible,
        // but Firestore doesn't support sendBeacon directly.
        // We'll attempt a normal update.
        firebase.firestore().collection('users').doc(user.uid).update({
            isOnline: false,
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
});
