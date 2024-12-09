import Proptypes from 'prop-types';

const Header = ({ onCreateAttendance }) => (
    <div className="fixed top-14 p-4 text-xl">
      <ul className="fixed pl-3 h-16 top-auto flex justify-between w-4/5 bg-gray-200 items-center rounded">
        <li>Tên Lớp: {localStorage.getItem('name')}</li>
        <li
          onClick={onCreateAttendance}
          className="focus:outline-none mr-3 cursor-pointer text-white bg-purple-700 hover:bg-purple-800  font-medium rounded-lg text-sm px-5 py-2.5 mb-2 "
        >
          Điểm Danh
        </li>
      </ul>
    </div>
  );

  Header.propTypes = {
    onCreateAttendance: Proptypes.func.isRequired,
  };
  
  export default Header;
  
  