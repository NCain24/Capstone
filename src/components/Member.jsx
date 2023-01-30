import { useState, useEffect } from 'react';

const Member = () => {
  const [filteredList, setFilteredList] = useState(/*MEMBER LIST*/[]);
  const [selectedName, setSelectedName] = useState('');

  const filterByName = (filteredName) => {
    if (!selectedName) {
      return filteredName;
    }
  };

  const handleName = (e) => {
    setSelectedName(e.target.value);
  };

  useEffect(() => {
    const filtered = filterByName(/*MEMBER LIST*/[]);
    setFilteredList(filtered);
  }, [selectedName, filterByName]);

  return (
    <div>
      <div>
        <form>
          <label>Search for a family member</label>
          <input onChange={handleName} type="text" placeholder="Search" />
        </form>
      </div>
      <div>
        {filteredList.map((member, index) => {
          <div key={index}>
            <div>{member.firstName}</div>
            <div>{member.lastName}</div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Member;
