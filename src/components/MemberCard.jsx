import { useEffect, useState } from 'react';
import axios from 'axios';

const MemberCard = () => {

  const [displayProfile, setDisplayProfile] = useState([]);

  useEffect( () => {
    axios
      .get(`http://localhost:5432/viewprofile/:id`)
      .then(() => {
        setDisplayProfile(displayProfile);
      });
  });

  profile.map((member) => {
    return (
      <div className='border'>
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
