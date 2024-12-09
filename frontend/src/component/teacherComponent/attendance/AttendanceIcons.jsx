import PropTypes from 'prop-types';
import ToggleIcon from './ToggleIcon';

const AttendanceIcons = ({ attendance, toggleIcon }) => {
  const isExcused = attendance.status === 'ABSENT_EXCUSED';
  const isAbsent = attendance.status === 'ABSENT_UNEXCUSED' || isExcused;

  return (
    <div className="flex">
      <ToggleIcon isIconActive={isExcused} toggleIcon={() => toggleIcon('vangCoPhep')} />
      <ToggleIcon isIconActive={isAbsent && !isExcused} toggleIcon={() => toggleIcon('vangKhongPhep')} />
    </div>
  );
};

AttendanceIcons.propTypes = {
  attendance: PropTypes.object.isRequired,
  toggleIcon: PropTypes.func.isRequired,
};

export default AttendanceIcons;
