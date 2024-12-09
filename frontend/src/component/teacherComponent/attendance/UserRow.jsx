import PropTypes from 'prop-types';
import AttendanceIcons from './AttendanceIcons';

const UserRow = ({ user, attendanceTimes, absences, toggleIcon }) => (
  <tr key={user.id} className=" bg-white text-white border-b dark:bg-gray-800 dark:border-gray-700">
    <th scope="row" className="px-6 py-4 font-medium text-gray-300 max-w-5">
      {user.index + 1}
    </th>
    <td className="pr-3 whitespace-nowrap max-w-16">{user.username}</td>
    <td className="pr-3 whitespace-nowrap">{user.dob}</td>
    <td className="pr-3 whitespace-nowrap max-w-32">{user.email}</td>
    <td className="px-9 max-w-20">{absences[user.id]?.unexcusedAbsenceCount || 0}</td>
    {attendanceTimes.map((time, index) => (
      <td key={index} className="pr-8 cursor-pointer">
        <AttendanceIcons
          attendance={user.attendanceRecords.find((a) => a.attendanceTime === time) || { status: 'PRESENT' }}
          toggleIcon={(iconName) => toggleIcon(user.id, time, iconName)}
        />
      </td>
    ))}
  </tr>
);

UserRow.propTypes = {
  user: PropTypes.object.isRequired,
  attendanceTimes: PropTypes.array.isRequired,
  absences: PropTypes.object.isRequired,
  toggleIcon: PropTypes.func.isRequired,
};

export default UserRow;
