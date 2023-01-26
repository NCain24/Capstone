import axios from "axios";

const API_URL = 'http://localhost3001/api/test/';

const getPublicContent = () => {
    axios.get(API_URL + 'all')
};

const MemberService = {
    getPublicContent
};

export default MemberService