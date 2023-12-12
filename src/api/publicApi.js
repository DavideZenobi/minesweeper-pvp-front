const publicUrl = 'http://localhost:3000/api/public';

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