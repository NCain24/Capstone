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
    <div className="flex flex-col pt-10 items-center text-xl h-2/4 ">
      <div className="bg-amber-50 rounded-xl p-10 px-40 text-white shadow-lg">
        <h4 className="text-center text-4xl text-black">First Name</h4>
        <h2 className="text-black pb-5 transform duration-75 hover:scale-150 text-center">
          {displayProfile.firstName}
        </h2>
        <h4 className="text-center text-4xl text-black">Last Name</h4>
        <h2 className="text-black transform pb-5 duration-75 hover:scale-150 text-center">
          {displayProfile.lastName}
        </h2>
        <h4 className="text-center text-4xl text-black">E-Mail</h4>
        <h2 className="text-black transform pb-5 duration-75 hover:scale-150 text-center">
          {displayProfile.email}
        </h2>
        <h4 className="text-center text-4xl text-black">Phone Number</h4>
        <h2 className="text-black transform pb-5 duration-75 hover:scale-150 text-center">
          {displayProfile.phoneNumber}
        </h2>
        <h4 className="text-center text-4xl text-black">Address</h4>
        <h2 className="text-black transform pb-5 duration-75 hover:scale-150 text-center">
          {displayProfile.address}
        </h2>
        <h4 className="text-center text-4xl text-black">Birthday</h4>
        <h2 className="text-black transform pb-5 duration-75 hover:scale-150 text-center">
          {displayProfile.birthday}
        </h2>
        <h4 className="text-center text-4xl text-black">Occupation</h4>
        <h2 className="text-black transform duration-75 hover:scale-150 text-center">
          {displayProfile.occupation}
        </h2>
      </div>
    </div>
  );
};

export default MemberCard;
