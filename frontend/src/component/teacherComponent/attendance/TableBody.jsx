import PropTypes from 'prop-types';
import UserRow from './UserRow';

const TableBody = ({ listUser, attendanceTimes, absences, toggleIcon }) => (
  <tbody>
    {listUser.map((user, index) => (
      <UserRow
        key={user.id}
        user={{ ...user, index }}
        attendanceTimes={attendanceTimes}
        absences={absences}
        toggleIcon={toggleIcon}
      />
    ))}
  </tbody>
);

TableBody.propTypes = {
  listUser: PropTypes.array.isRequired,
  attendanceTimes: PropTypes.array.isRequired,
  absences: PropTypes.object.isRequired,
  toggleIcon: PropTypes.func.isRequired,
};

export default TableBody;
