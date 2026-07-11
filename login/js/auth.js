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
                    // Check cache first
                    let userData = null;
                    const cachedData = sessionStorage.getItem(`afrosint_user_${user.uid}`);
                    if (cachedData) {
                        userData = JSON.parse(cachedData);
                    } else {
                        // Get user data from Firestore
                        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                        userData = userDoc.data();

                        // Self-healing: if authenticated user is missing a Firestore document, automatically create it
                        if (!userDoc.exists || !userData) {
                            console.log("Self-healing: Creating missing Firestore document for authenticated user:", user.email);
                            userData = {
                                uid: user.uid,
                                displayName: user.displayName || "Authorized Personnel",
                                email: user.email || "",
                                photoURL: user.photoURL || "",
                                role: "user",
                                rank: "member",
                                clearance: 1,
                                plan: "free",
                                isOnline: true,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                            };
                            await firebase.firestore().collection('users').doc(user.uid).set(userData);

                            // Re-fetch to make sure we have fully synchronized/hydrated fields
                            const freshDoc = await firebase.firestore().collection('users').doc(user.uid).get();
                            userData = freshDoc.data();
                        }

                        if (userData) {
                            sessionStorage.setItem(`afrosint_user_${user.uid}`, JSON.stringify(userData));
                        }
                    }

                    // Immediate redirection for authenticated users on auth pages
                    if (isAuthPage) {
                        window.location.href = 'dashboard.html';
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

// Error Mapper Helper
function getFriendlyErrorMessage(error) {
    if (!error) return "An unknown error occurred.";
    const code = error.code;
    const message = error.message;

    switch (code) {
        // Login & General Auth errors
        case 'auth/invalid-email':
            return "Access Denied: Invalid email format. Please use a valid personnel email.";
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
        case 'auth/invalid-login-credentials':
            return "Access Denied: Invalid credentials. Please verify your personnel email and access code.";
        case 'auth/user-disabled':
            return "Account Disabled: Access has been revoked by an administrator. Please contact operations.";
        case 'auth/network-request-failed':
            return "Network Error: Unable to establish secure uplink to the authentication servers. Check your connection.";
        case 'auth/too-many-requests':
            return "Access Suspended: Too many login attempts. Please wait before attempting to authorize access again.";

        // Registration errors
        case 'auth/email-already-in-use':
            return "Enrollment Failed: This personnel email is already registered in the system.";
        case 'auth/weak-password':
            return "Enrollment Failed: The access code is too weak. Must be at least 6 characters.";
        case 'auth/operation-not-allowed':
            return "System Error: Email/Password enrollment is not enabled on this server.";

        // Default
        default:
            return message || "An unknown authentication error occurred.";
    }
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
        alert(getFriendlyErrorMessage(error));
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
        await firebase.firestore().collection('users').doc(user.uid).set({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            isOnline: true
        }, { merge: true });

        window.location.href = 'dashboard.html';
    } catch (error) {
        console.error("Login Error:", error.message);
        alert(getFriendlyErrorMessage(error));
    }
}

// Shared helper to handle Google user document in Firestore
async function handleGoogleUserDoc(user) {
    const db = firebase.firestore();
    const userDoc = await db.collection('users').doc(user.uid).get();

    let userData;
    if (!userDoc.exists) {
        userData = {
            uid: user.uid,
            displayName: user.displayName || "Authorized Personnel",
            email: user.email || "",
            photoURL: user.photoURL || "",
            role: "user",
            rank: "member",
            clearance: 1,
            plan: "free",
            isOnline: true,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
        };
        await db.collection('users').doc(user.uid).set(userData);
    } else {
        userData = userDoc.data() || {};
        const updates = {
            lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
            isOnline: true
        };
        // Ensure displayName and email are kept updated if missing
        if (!userData.displayName && user.displayName) updates.displayName = user.displayName;
        if (!userData.email && user.email) updates.email = user.email;
        if (!userData.photoURL && user.photoURL) updates.photoURL = user.photoURL;

        await db.collection('users').doc(user.uid).update(updates);
        // Refresh userData with updates
        const freshDoc = await db.collection('users').doc(user.uid).get();
        userData = freshDoc.data();
    }

    // Sync to sessionStorage
    if (userData) {
        sessionStorage.setItem(`afrosint_user_${user.uid}`, JSON.stringify(userData));
    }
}

// Handle Redirect Result for Google Sign-In on Page Load
if (typeof firebase !== 'undefined') {
    firebase.auth().getRedirectResult()
        .then(async (result) => {
            if (result && result.user) {
                console.log("Google redirect login success:", result.user.email);
                await handleGoogleUserDoc(result.user);
                window.location.href = 'dashboard.html';
            }
        })
        .catch((error) => {
            console.error("Redirect Auth Error:", error.message);
            if (error.code !== 'auth/cancelled-popup-request') {
                alert(getFriendlyErrorMessage(error));
            }
        });
}

// Google Login
async function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebase.auth().signInWithPopup(provider);
        const user = result.user;
        await handleGoogleUserDoc(user);
        window.location.href = 'dashboard.html';
    } catch (error) {
        // If popup is blocked, closed, or unsupported, fallback to redirect
        if (error.code === 'auth/popup-blocked' ||
            error.code === 'auth/operation-not-supported-in-this-environment' ||
            error.code === 'auth/popup-closed-by-user') {
            console.log("Popup blocked/unsupported or closed. Falling back to redirect...");
            try {
                await firebase.auth().signInWithRedirect(provider);
            } catch (redirectError) {
                console.error("Google Redirect Error:", redirectError.message);
                alert(getFriendlyErrorMessage(redirectError));
            }
        } else {
            console.error("Google Login Error:", error.message);
            alert(getFriendlyErrorMessage(error));
        }
    }
}

// Password Reset
async function resetPassword(email) {
    try {
        await firebase.auth().sendPasswordResetEmail(email);
        alert("Password reset email sent!");
    } catch (error) {
        console.error("Reset Error:", error.message);
        alert(getFriendlyErrorMessage(error));
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
