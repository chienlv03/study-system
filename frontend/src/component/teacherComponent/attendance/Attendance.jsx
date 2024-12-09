import { useState, useEffect } from 'react';
import moment from 'moment';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { createAttendance, getAttendanceTime, updateAttendance } from '../../../services/AttendanceService';
import { getAbsentInCourse, getUserAndAttendInCourse } from '../../../services/EnrollmentService';

const Attendance = () => {
  const [listUser, setListUser] = useState([]);
  const [attendanceTimes, setAttendanceTimes] = useState([]);
  const [absences, setAbsences] = useState({});
  const classId = localStorage.getItem('classId');

  const fetchUsers = async () => {
    try {
      const [attendanceTimesResponse, usersResponse, absencesResponse] = await Promise.all([
        getAttendanceTime(classId),
        getUserAndAttendInCourse(classId),
        getAbsentInCourse(classId),
      ]);

      setAttendanceTimes(attendanceTimesResponse.data);
      setListUser(usersResponse.data);

      const absencesMap = absencesResponse.data.reduce((acc, absence) => {
        acc[absence.userId] = absence;
        return acc;
      }, {});
      setAbsences(absencesMap);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCreateAttendance = async () => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      await createAttendance(classId, { attendanceTime: currentTime });
      fetchUsers();
      toast.success('🦄 Đã tạo điểm danh', {
        position: 'top-center',
        autoClose: 1000,
        transition: Flip,
      });
    } catch (error) {
      console.error('Error creating attendance:', error);
    }
  };

  const updateAttendanceStatus = async (userId, attendanceTime, isAbsent, isExcused) => {
    try {
      await updateAttendance(userId, classId, {
        attendanceTime,
        isAbsent,
        isExcused,
      });

      fetchUsers(); // Refresh data after update
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  const toggleIcon = (userId, attendanceTime, iconName) => {
    setListUser((prevList) =>
      prevList.map((student) => {
        if (student.id === userId) {
          const updatedAttendances = student.attendanceRecords.map((attendance) => {
            if (attendance.attendanceTime === attendanceTime) {
              let newStatus = attendance.status;
  
              if (iconName === 'vangCoPhep') {
                // Toggle between ABSENT_EXCUSED and PRESENT
                newStatus = attendance.status === 'ABSENT_EXCUSED' ? 'PRESENT' : 'ABSENT_EXCUSED';
              } else if (iconName === 'vangKhongPhep') {
                // Toggle between ABSENT_UNEXCUSED and PRESENT
                newStatus = attendance.status === 'ABSENT_UNEXCUSED' ? 'PRESENT' : 'ABSENT_UNEXCUSED';
              }
  
              // Update the backend with the new status
              const isAbsent = newStatus !== 'PRESENT';
              const isExcused = newStatus === 'ABSENT_EXCUSED';

              console.log("time: " + attendanceTime);
              updateAttendanceStatus(userId, attendanceTime, isAbsent, isExcused);
  
              return {
                ...attendance,
                status: newStatus,
              };
            }
            return attendance;
          });
  
          return {
            ...student,
            attendanceRecords: updatedAttendances,
          };
        }
        return student;
      })
    );
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="sm:ml-60 mt-16 px-4 py-1 relative">
      <Header onCreateAttendance={handleCreateAttendance} />
      <div className="p-3 pt-16 mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <TableHeader attendanceTimes={attendanceTimes} />
          <TableBody
            listUser={listUser}
            attendanceTimes={attendanceTimes}
            absences={absences}
            toggleIcon={toggleIcon}
          />
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Attendance;
