/**
 * AfroSINT Central Permission Service
 */

const ROLES = {
    USER: 'user',
    MODERATOR: 'moderator',
    ADMIN: 'administrator',
    SUPER_ADMIN: 'super_admin'
};

const RANKS = {
    MEMBER: 'member',
    ANALYST: 'analyst',
    SENIOR_ANALYST: 'senior_analyst',
    LEAD_ANALYST: 'lead_analyst',
    REGIONAL_COORDINATOR: 'regional_coordinator',
    DEPUTY_CHIEF_ANALYST: 'deputy_chief_analyst',
    CHIEF_ANALYST: 'chief_analyst',
    AFROSINT_FELLOW: 'afrosint_fellow'
};

// Numeric hierarchy for permissions
const RANK_LEVELS = {
    // Roles mapping (legacy support)
    [ROLES.USER]: 1,
    [ROLES.MODERATOR]: 2,
    [ROLES.ADMIN]: 10,
    ['admin']: 10, // Common alias
    [ROLES.SUPER_ADMIN]: 11,
    // Ranks mapping
    [RANKS.MEMBER]: 1,
    [RANKS.ANALYST]: 2,
    [RANKS.SENIOR_ANALYST]: 3,
    [RANKS.LEAD_ANALYST]: 4,
    [RANKS.REGIONAL_COORDINATOR]: 5,
    [RANKS.DEPUTY_CHIEF_ANALYST]: 6,
    [RANKS.CHIEF_ANALYST]: 7,
    [RANKS.AFROSINT_FELLOW]: 8
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
    return [ROLES.ADMIN, 'admin', ROLES.SUPER_ADMIN].includes(normalizedRole);
}

/**
 * Check if user has moderation privileges
 * @param {string} role
 * @returns {boolean}
 */
function isModerator(role) {
    if (!role) return false;
    const normalizedRole = role.toLowerCase().replace(/\s+/g, '_');
    return [ROLES.MODERATOR, ROLES.ADMIN, 'admin', ROLES.SUPER_ADMIN].includes(normalizedRole);
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
    const level = getRankLevel(rank);
    // Fellow (8) cannot submit unless separately assigned
    if (level === RANK_LEVELS[RANKS.AFROSINT_FELLOW]) return false;
    return level >= MIN_ANALYST_LEVEL;
}

/**
 * Check if user can review/approve reports
 * Requirement: Senior Analyst (3) or above
 * @param {string|number} rank
 * @returns {boolean}
 */
function canReviewReports(rank) {
    const level = getRankLevel(rank);
    // Fellow (8) holds no automatic authority
    if (level === 8) return false;
    return level >= 3;
}

/**
 * Check promotion authority based on Matrix
 * @param {string|number} userRank
 * @param {string|number} targetRank
 * @returns {boolean}
 */
function canPromote(userRank, targetRank) {
    const userLevel = getRankLevel(userRank);
    const targetLevel = getRankLevel(targetRank);

    if (userLevel === 7) return true; // Chief Analyst can promote to any rank
    if (userLevel === 6) return [2, 3, 4, 5].includes(targetLevel);
    if (userLevel === 5) return targetLevel === 4;
    if (userLevel === 4) return [2, 3].includes(targetLevel);

    return false;
}

/**
 * Check suspension authority based on Matrix
 * @param {string|number} userRank
 * @param {string|number} targetRank
 * @returns {boolean}
 */
function canSuspend(userRank, targetRank) {
    const userLevel = getRankLevel(userRank);
    const targetLevel = getRankLevel(targetRank);

    if (userLevel === 7) return true; // All ranks
    if (userLevel === 6) return targetLevel < 7; // All ranks below Chief Analyst
    if (userLevel === 5) return [1, 2, 3, 4].includes(targetLevel);

    return false;
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
    canSubmitReports,
    canReviewReports,
    canPromote,
    canSuspend
};

// Also expose functions directly for easier access if preferred
window.hasRole = hasRole;
window.isAdmin = isAdmin;
window.isModerator = isModerator;
window.isSuperAdmin = isSuperAdmin;
window.getRankLevel = getRankLevel;
window.canSubmitReports = canSubmitReports;
window.canReviewReports = canReviewReports;
window.canPromote = canPromote;
window.canSuspend = canSuspend;
