const publicUrl = process.env.REACT_APP_PUBLIC_API_URL;

export const login = async (username, password) => {
    const dataToSend = {username: username, password: password};
    const response = await fetch(publicUrl + '/login', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return response;
}

export const register = async (data) => {
    const response = await fetch(publicUrl + '/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
    })

    return response;
}

export const verifyUser = async (uuid) => {
    const response = await fetch(publicUrl + `/confirm/${uuid}`, {
        method: 'GET'
    });

    return response;
}

export const getEmailAvailability = async (email) => {
    const response = await fetch(publicUrl + `/email/available/${email}`, {
        method: 'GET',
    })

    return response;
}

export const getUsernameAvailability = async (username) => {
    const response = await fetch(publicUrl + `/username/available/${username}`, {
        method: 'GET',
    })

    return response;
}

export const authenticate = async () => {
    const response = await fetch(publicUrl + '/session/auth', {
        credentials: 'include',
    });

    return response;
}

/**
 * Game PvE Offline Controller
 */

export const createGamePvEOffline = async () => {
    const response = await fetch(publicUrl + `/gamepveoffline/create`, {
        method: 'GET'
    });

    return response;
}

export const leftClickGamePvEOffline = async (matchId, position) => {
    const data = {position: position};
    const response = await fetch(publicUrl + `/gamepveoffline/leftClick/${matchId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export const rightClickGamePvEOffline = async (matchId, position) => {
    const data = {position: position};
    const response = await fetch(publicUrl + `/gamepveoffline/rightClick/${matchId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export const resetGamePvEOffline = async (matchId) => {
    const response = await fetch(publicUrl + `/gamepveoffline/reset/${matchId}`, {
        method: 'GET'
    });

    return response;
}

export const levelChangeGamePvEOffline = async (matchId, level) => {
    const data = {level: level};
    const response = await fetch(publicUrl + `/gamepveoffline/levelChange/${matchId}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}