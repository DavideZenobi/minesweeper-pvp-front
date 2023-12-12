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

export const getAllRooms = async () => {
    const response = await fetch(privateUrl + '/room/', {
        method: 'GET',
        credentials: 'include',
    });

    return response;
}

export const getRoomInfo = async (roomId) => {
    const response = await fetch(privateUrl + `/room/info/${roomId}`, {
        method: 'GET',
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