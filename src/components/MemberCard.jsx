import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthContext from '../store/authContext';
import axios from 'axios';

const MemberCard = () => {
  const authCtx = useContext(AuthContext);

  const [displayProfile, setDisplayProfile] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5432/viewprofile/${id}`, {
        headers: {
          authorization: authCtx.token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDisplayProfile(res.data[0]);
      });
  }, [authCtx.token, id]);

  return (
    <div className='flex-col'>
      <div>First Name: {displayProfile.firstName}</div>
      <div>Last Name: {displayProfile.lastName}</div>
      <div>E-Mail: {displayProfile.email}</div>
      <div>Phone Number: {displayProfile.phoneNumber}</div>
      <div>Address: {displayProfile.address}</div>
      <div>Birthday: {displayProfile.birthday}</div>
      <div>Occupation: {displayProfile.occupation}</div>
    </div>
  );
};

export default MemberCard;
