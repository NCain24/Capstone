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
    <div className="flex flex-col gap-5 items-center text-4xl pt-20">
      <div className="bg-slate-500 rounded-xl p-5 text-white shadow-lg">
        First Name: {displayProfile.firstName}
      </div>
      <div className="bg-slate-500 rounded-xl p-5 text-white shadow-lg">
        Last Name: {displayProfile.lastName}
      </div>
      <div className="bg-slate-500 rounded-xl p-5 text-white shadow-lg">
        E-Mail: {displayProfile.email}
      </div>
      <div className="bg-slate-500 rounded-xl p-5 text-white shadow-lg">
        Phone Number: {displayProfile.phoneNumber}
      </div>
      <div className="bg-slate-500 rounded-xl p-5 text-white shadow-lg">
        Address: {displayProfile.address}
      </div>
      <div className="bg-slate-500 rounded-xl p-5 text-white shadow-lg">
        Birthday: {displayProfile.birthday}
      </div>
      <div className="bg-slate-500 rounded-xl p-5 text-white shadow-lg">
        Occupation: {displayProfile.occupation}
      </div>
    </div>
  );
};

export default MemberCard;
