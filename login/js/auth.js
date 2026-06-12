/**
 * AfroSINT Authentication System
 * Core Auth and Firestore Logic
 */

// Check if user is logged in and handle route protection
function checkAuthState(protectedPage = false, adminOnly = false) {
    firebase.auth().onAuthStateChanged(async (user) => {
        const path = window.location.pathname;
        const isAuthPage = path.includes('login.html') || path.includes('register.html') || path.endsWith('/') || path.includes('index.html');

        if (user) {
            // Immediate redirection for authenticated users on auth pages
            if (isAuthPage) {
                window.location.href = 'dashboard.html';
                return;
            }

            // User is signed in
            console.log("User logged in:", user.email);

            // Handle user data and security checks in the background for regular pages
            // But MUST wait if it's an admin-only page to prevent unauthorized access
            const processUserData = async () => {
                try {
                    // Check cache first
                    let userData = null;
                    const cachedData = sessionStorage.getItem(`afrosint_user_${user.uid}`);
                    if (cachedData) {
                        userData = JSON.parse(cachedData);
                    } else {
                        // Get user data from Firestore
                        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                        userData = userDoc.data();
                        if (userData) {
                            sessionStorage.setItem(`afrosint_user_${user.uid}`, JSON.stringify(userData));
                        }
                    }

                    // Check if account is disabled
                    if (userData && userData.disabled === true) {
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

        window.location.href = 'dashboard.html';
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

        window.location.href = 'dashboard.html';
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

        // Check if user exists in Firestore
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();

        if (!userDoc.exists) {
            // Create new record for Google user
            await firebase.firestore().collection('users').doc(user.uid).set({
                uid: user.uid,
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
        } else {
            // Update last login and status
            await firebase.firestore().collection('users').doc(user.uid).update({
                lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
                isOnline: true
            });
        }

        window.location.href = 'dashboard.html';
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
            });
        }
        if (window.heartbeatInterval) clearInterval(window.heartbeatInterval);
        sessionStorage.removeItem('afrosint_session_started');
        await firebase.auth().signOut();
        window.location.href = 'login.html';
    } catch (error) {
        console.error("Logout Error:", error.message);
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
