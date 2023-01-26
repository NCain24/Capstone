import axios from "axios";

const API_URL = 'http://localhost:3001/api/auth/';

const register = ( firstName, lastName, email, password ) => {
    axios.post( API_URL + 'signup', {
        firstName,
        lastName,
        email,
        password
    })
}

const login = ( email, password ) => {
    axios.post( API_URL + 'login', {
        email,
        password
    } )
        .then( ( res ) => {
            if ( res.data.accessToken ) {
            localStorage.setItem('member', JSON.stringify(res.data))
            }
            return res.data
    })
}

const logout = () => {
    localStorage.removeItem('member')
}

const getCurrentMember = () => {
    JSON.parse(localStorage.getItem('member'))
}

const AuthService = {
    register,
    login,
    logout,
    getCurrentMember
}

export default AuthService
