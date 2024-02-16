export const isUsernameValid = (username) => {
    const regex = /^[a-zA-Z0-9]{3,16}$/;
    return regex.test(username);
}

export const isPasswordValid = (password) => {
    const regex = /^[a-zA-Z0-9./$#]{3,16}$/;
    return regex.test(password);
}

export const isEmailValid = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}