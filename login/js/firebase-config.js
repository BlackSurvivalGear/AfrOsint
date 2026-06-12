// Firebase configuration placeholders
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
    apiKey: "AIzaSyAcsURFK7yDd0mJe_i_Jlmu-_2GpSfc2js",
    authDomain: "afrosint-2a5f2.firebaseapp.com",
    projectId: "afrosint-2a5f2",
    storageBucket: "afrosint-2a5f2.firebasestorage.app",
    messagingSenderId: "325085054891",
    appId: "1:325085054891:web:3ac905ed01f1d57cfb74ee"
};

// Initialize Firebase (will be loaded via CDN in HTML files)
// This file just exports the config or provides a global reference
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
} else {
    console.warn("Firebase SDK not loaded yet. Make sure to include Firebase scripts in your HTML.");
}

// Export config if using modules, but for vanilla JS we'll use global
window.firebaseConfig = firebaseConfig;

/**
 * AfroSINT Rank Definitions (Prestige Only)
 */
const AFROSINT_RANKS = {
    'member': "Member",
    'analyst': "Analyst",
    'senior_analyst': "Senior Analyst",
    'research_specialist': "Research Specialist",
    'field_observer': "Field Observer",
    'intelligence_officer': "Intelligence Officer",
    'senior_intelligence_officer': "Senior Intelligence Officer",
    'afrosint_fellow': "AfroSINT Fellow"
};

/**
 * AfroSINT Rank Display Helper
 * Handles both new string-based ranks and legacy numeric ranks
 */
function getRankName(rank) {
    if (typeof rank === 'number') {
        const legacy = {
            1: "Member", 2: "Analyst", 3: "Research Analyst", 4: "Senior Analyst",
            5: "Lead Analyst", 6: "Intelligence Specialist", 7: "Regional Intelligence Officer",
            8: "Strategic Intelligence Officer", 9: "AfroSINT Fellow"
        };
        return legacy[rank] || `Level ${rank}`;
    }

    if (!rank) return "Member";

    // Convert snake_case to Title Case if not in map
    if (!AFROSINT_RANKS[rank]) {
        return rank.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    return AFROSINT_RANKS[rank];
}
