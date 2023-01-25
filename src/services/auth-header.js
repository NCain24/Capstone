export default function authHeader() {
    const member = JSON.parse( localStorage.get( 'member' ) )
    
    if ( member && member.accessToken ) {
        return {'x-access-token': member.accessToken}
    } else {
        return {}
    }
}