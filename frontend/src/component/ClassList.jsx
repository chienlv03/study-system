import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteCourse, getAllCourseByUser } from '../services/CourseService';
import { enrollCourse, getAllCourseTheUserParticipated, removeUserFromCourse } from '../services/CourseEnrollmentService';

const ClassList = () => {
    const [classList, setClassList] = useState([]);
    const [showJoinClassInput, setShowJoinClassInput] = useState(false);
    const [classCode, setClassCode] = useState('');

    const navigate = useNavigate();

    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    const userType = loginResponse.roles;

    const fetchClassList = async () => {
        try {
            if (userType.includes('ROLE_TEACHER')) {
                const response = await getAllCourseByUser(loginResponse.id);
                setClassList(response.data);
            } else if (userType.includes('ROLE_STUDENT')) {
                const response = await getAllCourseTheUserParticipated(loginResponse.id);
                setClassList(response.data);
            }
        } catch (error) {
            console.error('Error fetching class list:', error);
        }
    };

    useEffect(() => {
        fetchClassList();
    }, []);

    const handleClassClick = (classItem) => {
        localStorage.setItem('classId', classItem.id);
        localStorage.setItem('name', classItem.name);
        localStorage.setItem('classCode', classItem.classCode);
        localStorage.setItem('startTime', classItem.startTime);
        navigate(`/detail-class/${classItem.id}/list-student`);
    };

    const handleEditClass = (classItem) => {
        localStorage.setItem('classId', classItem.id);
        navigate(`/edit-class-form/${classItem.id}`, { state: { class: classItem } });
    };

    const handleDeleteClass = async (classId) => {
        try {
            if (userType.includes('ROLE_TEACHER')) {
                await deleteCourse(classId);
                setClassList(classList.filter((classItem) => classItem.id !== classId));
            } else if (userType.includes('ROLE_STUDENT')) {
                await removeUserFromCourse(loginResponse.id, classId);
                setClassList(classList.filter((classItem) => classItem.id !== classId));
            }
        } catch (error) {
            console.error('Error deleting class:', error);
        }
    };

    const handleJoinClassClick = () => {
        setShowJoinClassInput(!showJoinClassInput);
    };

    const handleAttendCourseByCode = async () => {
        try {
            await enrollCourse(loginResponse.id, 0, classCode);
            setClassCode('');
            setShowJoinClassInput(false);
            fetchClassList();

            toast.success("Đã tham gia lớp học", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
              });
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
              });
        }
    };

    return (
        <div className="p-4">
            <div className="mt-16 flex">
                <button
                    onClick={() => navigate('/home')}
                    type="button"
                    className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                    hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg 
                    shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    mb-4 ml-5">
                    <svg className="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Home
                </button>
                {userType.includes('ROLE_TEACHER') && (
                    <button
                        onClick={() => navigate('/add-class-form')}
                        type="button"
                        className="flex text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg 
                        shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                        mb-4 ml-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-1">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                        Tạo lớp
                    </button>
                )}
                {userType.includes('ROLE_STUDENT') && (
                    <button
                        onClick={handleJoinClassClick}
                        type="button"
                        className="flex mr-2 absolute right-5 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
                        hover:bg-gradient-to-br focus:outline-none focus:ring-blue-300  shadow-lg 
                        shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                        mb-4 ml-5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mr-1">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                        Tham gia lớp bằng mã
                    </button>
                )}
                {showJoinClassInput && (
                    <div className='absolute shadow-lg border z-50 right-6 p-2 rounded-lg top-32 bg-yellow-200'>
                        <input
                            type="text"
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)}
                            placeholder="Enter class code"
                            className="p-2 border border-gray-300 rounded-lg"
                        />
                        <div className='flex justify-evenly mt-2'>
                            <svg onClick={() => setShowJoinClassInput(false)} className="h-8 w-8 cursor-pointer text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <svg onClick={handleAttendCourseByCode} className="h-8 w-8 cursor-pointer text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-4 gap-4 mb-4">
                    {classList.map((classItem) => (
                        <div key={classItem.id} className="relative h-44 p-2 rounded bg-gray-50 dark:bg-blue-200">
                            <ul onClick={() => handleClassClick(classItem)} className="h-full w-full cursor-pointer">
                                <li className="text-2xl w-64 line-clamp-1">Tên Lớp: {classItem.name}</li>
                                <li className="text-lg">Mã lớp: {classItem.classCode}</li>
                                <li className="text-lg">Thời gian bắt đầu: {classItem.startTime}</li>
                            </ul>
                            <ul className="absolute z-20 my-2 h-10 flex right-0 top-0 bg-blue-300">
                                {userType.includes('ROLE_TEACHER') && (
                                    <li onClick={() => handleEditClass(classItem)} className="cursor-pointer py-1 px-2 h-10 border-r-2">
                                        <svg className="h-6 w-6 text-gray-800" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M9 7h-3a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-3" />
                                            <path d="M9 15h3l8.5-8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                            <line x1="16" y1="5" x2="19" y2="8" />
                                        </svg>
                                    </li>
                                )}
                                <li onClick={() => handleDeleteClass(classItem.id)} className="cursor-pointer p-1 h-10">
                                    <svg className="h-6 w-6 mx-1 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 01 16.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default ClassList;
