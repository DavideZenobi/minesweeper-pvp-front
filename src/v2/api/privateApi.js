const privateUrl = 'http://localhost:3000/api/private';

export const logout = async () => {
    const response = await fetch(privateUrl + '/logout', {
        method: 'POST',
        credentials: 'include',
    });

    return response;
}

export const joinQueue = async () => {
    const response = await fetch(privateUrl + '/queue/join', {
        method: 'POST',
        credentials: 'include',
    });

    return response;
}

export const leaveQueue = async () => {
    const response = await fetch(privateUrl + '/queue/leave', {
        method: 'POST',
        credentials: 'include',
    });

    return response;
}

export const rejoinQueue = async () => {
    const response = await fetch(privateUrl + '/queue/rejoin', {
        method: 'POST',
        credentials: 'include',
    });

    return response;
}

export const getProfileInfo = async () => {
    const response = await fetch(privateUrl + '/profile', {
        method: 'GET',
        credentials: 'include',
    });

    return response;
}


/**
 * Matchmaking controller
 */
export const acceptMatch = async (matchId) => {
    const data = { matchId: matchId };
    const response = await fetch(privateUrl + '/matchmaking/accept', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
        
    return response;
}

export const declineMatch = async (matchId) => {
    const data = { matchId: matchId };
    const response = await fetch(privateUrl + '/matchmaking/decline', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    return response;
}

/**
 * Match controller
 */
export const validateUser = async (matchId) => {
    const response = await fetch(privateUrl + `/match/${matchId}/validate`, {
        method: 'GET',
        credentials: 'include'
    });

    return response;
}

export const getMatchConfig = async (matchId) => {
    const response = await fetch(privateUrl + `/match/${matchId}/config`, {
        method: 'GET',
        credentials: 'include'
    });

    return response;
}

export const userIsReady = async (matchId) => {
    const response = await fetch(privateUrl + `/match/${matchId}/ready`, {
        method: 'GET',
        credentials: 'include'
    });

    return response;
}

export const getUserStatus = async (matchId) => {
    const response = await fetch(privateUrl + `/match/${matchId}/getStatus`, {
        method: 'GET',
        credentials: 'include'
    });

    return response;
}

export const getMatchInfoForReconnect = async (matchId) => {
    const response = await fetch(privateUrl + `/match/${matchId}/reconnect`, {
        method: 'GET',
        credentials: 'include'
    });

    return response;
}

/**
 * Game controller
 */
export const handleLeftClick = async (matchId, position) => {
    const data = {
        position: position
    }
    const response = await fetch(privateUrl + `/game/${matchId}/leftClick`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;
}

export const handleRightClick = async (matchId, position) => {
    const data = {
        position: position
    }
    const response = await fetch(privateUrl + `/game/${matchId}/rightClick`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;
}