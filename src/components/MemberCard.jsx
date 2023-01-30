import { useContext, useEffect, useState } from 'react';
import AuthContext from '../store/authContext';
import axios from 'axios';

const MemberCard = () => {
  const authCtx = useContext(AuthContext);
  const [profile, setProfile] = useState(authCtx.id);

  useEffect(() => {
    axios
      .get(`http://localhost:5432/profile/${id}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        setProfile(res.data);
      });
  });

  profile.map((member) => {
    return (
      <div>
        <div>First Name: {member.firstName}</div>
        <div>Last Name: {member.lastName}</div>
        <div>E-Mail: {member.email}</div>
        <div>Phone Number: {member.phoneNumber}</div>
        <div>Address: {member.address}</div>
        <div>Birthday: {member.birthday}</div>
        <div>Occupation: {member.occupation}</div>
      </div>
    );
  });
};

export default MemberCard;
