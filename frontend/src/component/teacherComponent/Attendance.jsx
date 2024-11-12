import { useState, useEffect } from 'react';
import moment from 'moment';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createAttendance, getAttendanceTime, updateAttendance } from '../../services/AttendanceService';
import { getAbsentInCourse, getUserAndAttendInCourse } from '../../services/CourseEnrollmentService';

// eslint-disable-next-line react/prop-types
const ToggleIcon = ({ isIconActive, toggleIcon }) => (
  <div className="items-center">
    {isIconActive ? (
      <svg
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={toggleIcon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ) : (
      <svg
        className="h-6 w-6 text-green-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={toggleIcon}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )}
  </div>
);

const Attendance = () => {
  const [listUser, setListUser] = useState([]);
  const [attendanceTimes, setAttendanceTimes] = useState([]);
  const [absences, setAbsences] = useState({});

  const classId = localStorage.getItem('classId');

  const handleCreateAttendance = async () => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
    try {
      await createAttendance(classId, {
        attendanceTime: currentTime,
      });
      fetchUsers();
      toast.success('🦄 Đã tạo điểm danh', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
        });
    } catch (error) {
      console.error('Error creating attendance records:', error);
      alert(error.response.data.message);
    }
  };

  
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
      // Update the state with the absences map
      setAbsences(absencesMap);
    } catch (error) {
      // If there's an error, log it to the console
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  const toggleIcon = (id, attendanceTime, iconName) => {
    setListUser((prevList) =>
      prevList.map((student) => {
        if (student.id === id) {
          const updatedAttendances = student.attendanceRecords.map((attendance) => {
            if (attendance.attendanceTime === attendanceTime) {
              let newIsAbsent = attendance.status === 'ABSENT_UNEXCUSED' || attendance.status === 'ABSENT_EXCUSED';
              let newIsExcused = attendance.status === 'ABSENT_EXCUSED';

              if (iconName === 'vangCoPhep') {
                if (newIsExcused) {
                  newIsExcused = false;
                  newIsAbsent = false;
                } else {
                  newIsExcused = true;
                  newIsAbsent = true;
                }
              } else if (iconName === 'vangKhongPhep') {
                if (newIsAbsent && !newIsExcused) {
                  newIsAbsent = false;
                } else {
                  newIsAbsent = true;
                  newIsExcused = false;
                }
              }

              updateAttendanceStatus(id, attendanceTime, newIsAbsent, newIsExcused);

              return {
                ...attendance,
                status: newIsExcused ? 'ABSENT_EXCUSED' : newIsAbsent ? 'ABSENT_UNEXCUSED' : 'PRESENT',
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

  return (
    <div className="py-4 sm:ml-64">
      <div className="fixed top-12 ml-2 p-4 text-xl">
        <ul className="fixed pl-3 h-16 top-auto flex justify-between w-4/5 bg-gray-200 items-center rounded">
          <li>Tên Lớp: {localStorage.getItem('name')}</li>
          <li
            onClick={handleCreateAttendance}
            className="focus:outline-none cursor-pointer text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          >
            Điểm Danh
          </li>
        </ul>
      </div>
      <div className="p-4 pt-16">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">STT</th>
              <th scope="col" className="px-6 py-3">Họ Và Tên</th>
              <th scope="col" className="px-6 py-3">Ngày sinh</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3 text-center">Số lần vắng</th>
              {attendanceTimes.map((time, index) => (
                <th key={index} scope="col" className="w-6 text-center">{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listUser.map((user, index) => (
              // console.log(user),
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </th>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4">{user.dob}</td>  
                <td className="px-6 py-4">{user.email}</td>
                <td className="text-center">{absences[user.id]?.unexcusedAbsenceCount || 0}</td>
                {attendanceTimes.map((time, index) => {
                  const attendance = user.attendanceRecords.find((a) => a.attendanceTime === time) || { status: 'PRESENT' };
                  const isExcused = attendance.status === 'ABSENT_EXCUSED';
                  const isAbsent = attendance.status === 'ABSENT_UNEXCUSED' || isExcused;

                  return (
                    <td key={index} className="px-6 py-4 cursor-pointer">
                      <div className="flex">
                        <ToggleIcon
                          isIconActive={isExcused}
                          toggleIcon={() => toggleIcon(user.id, time, 'vangCoPhep')}
                        />
                        <ToggleIcon
                          isIconActive={isAbsent && !isExcused}
                          toggleIcon={() => toggleIcon(user.id, time, 'vangKhongPhep')}
                        />
                      </div>
                    </td>
                  );
                })}
                {/* {absences.map((absence, index) => (
                  <td key={index}>{absence.unexcusedAbsenceCount}</td>
                ))} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Attendance;
