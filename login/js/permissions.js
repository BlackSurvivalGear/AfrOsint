/**
 * AfroSINT Central Permission Service
 */

const ROLES = {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'admin',
    SUPER_ADMIN: 'super_admin'
};

const RANKS = {
    MEMBER: 'member',
    ANALYST: 'analyst',
    RESEARCH_ANALYST: 'research_analyst',
    SENIOR_ANALYST: 'senior_analyst',
    LEAD_ANALYST: 'lead_analyst',
    INTELLIGENCE_SPECIALIST: 'intelligence_specialist',
    REGIONAL_INTELLIGENCE_OFFICER: 'regional_intelligence_officer',
    STRATEGIC_INTELLIGENCE_OFFICER: 'strategic_intelligence_officer',
    AFROSINT_FELLOW: 'afrosint_fellow'
};

// Numeric hierarchy for permissions
const RANK_LEVELS = {
    // Roles mapping
    [ROLES.USER]: 1,
    [ROLES.MODERATOR]: 2,
    [ROLES.ADMIN]: 10,
    [ROLES.SUPER_ADMIN]: 11,
    // Ranks mapping
    [RANKS.MEMBER]: 1,
    [RANKS.ANALYST]: 2,
    [RANKS.RESEARCH_ANALYST]: 3,
    [RANKS.SENIOR_ANALYST]: 4,
    [RANKS.LEAD_ANALYST]: 5,
    [RANKS.INTELLIGENCE_SPECIALIST]: 6,
    [RANKS.REGIONAL_INTELLIGENCE_OFFICER]: 7,
    [RANKS.STRATEGIC_INTELLIGENCE_OFFICER]: 8,
    [RANKS.AFROSINT_FELLOW]: 9
};

const MIN_ANALYST_LEVEL = RANK_LEVELS[RANKS.ANALYST];

const PLANS = {
    FREE: 'free',
    PRO: 'pro',
    ELITE: 'elite'
};

/**
 * Check if a role is included in allowed roles
 * @param {string} role
 * @param {string[]} allowedRoles
 * @returns {boolean}
 */
function hasRole(role, allowedRoles) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return allowedRoles.includes(normalizedRole);
}

/**
 * Check if user has administrative privileges
 * @param {string} role
 * @returns {boolean}
 */
function isAdmin(role) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return [ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(normalizedRole);
}

/**
 * Check if user has moderation privileges
 * @param {string} role
 * @returns {boolean}
 */
function isModerator(role) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return [ROLES.MODERATOR, ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(normalizedRole);
}

/**
 * Check if user is a super admin
 * @param {string} role
 * @returns {boolean}
 */
function isSuperAdmin(role) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return normalizedRole === ROLES.SUPER_ADMIN;
}

/**
 * Get numeric rank level
 * @param {string|number} rank
 * @returns {number}
 */
function getRankLevel(rank) {
    if (typeof rank === 'number') return rank;
    if (!rank) return 0;
    const normalizedRank = rank.toLowerCase().replace(/\s+/g, '_');
    return RANK_LEVELS[normalizedRank] || 0;
}

/**
 * Check if user is eligible to submit intelligence reports
 * Requirement: Analyst level or above
 * @param {string|number} rank
 * @returns {boolean}
 */
function canSubmitReports(rank) {
    return getRankLevel(rank) >= MIN_ANALYST_LEVEL;
}

// Global exposure
window.AfroSINT = window.AfroSINT || {};
window.AfroSINT.Permissions = {
    ROLES,
    RANKS,
    RANK_LEVELS,
    PLANS,
    hasRole,
    isAdmin,
    isModerator,
    isSuperAdmin,
    getRankLevel,
    canSubmitReports
};

// Also expose functions directly for easier access if preferred
window.hasRole = hasRole;
window.isAdmin = isAdmin;
window.isModerator = isModerator;
window.isSuperAdmin = isSuperAdmin;
window.getRankLevel = getRankLevel;
window.canSubmitReports = canSubmitReports;
