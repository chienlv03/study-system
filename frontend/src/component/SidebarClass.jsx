import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SidebarClass = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    const userType = loginResponse.roles;

    const classId = localStorage.getItem('classId');
    const handleClick = (path) => {
        localStorage.removeItem('classId')
        localStorage.removeItem('name')
        localStorage.removeItem('classCode')
        localStorage.removeItem('startTime')
        navigate(path)
    }

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="w-64 mt-16">

            <aside id="default-sidebar" className="fixed mt-1 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li onClick={() => handleClick('/class-list')}>
                            <a className="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="ms-3">Danh sách lớp học</span>
                            </a>
                        </li>
                        <li onClick={() => handleNavigation(`/detail-class/${classId}/list-student`)}>
                            <a className="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                </svg>
                                <span className="ms-3">Danh sách sinh viên</span>
                            </a>
                        </li>

                        {userType.includes('ROLE_TEACHER') &&
                            <li onClick={() => handleNavigation(`/detail-class/${classId}/attendances`)}>
                                <a className="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="h-6 w-6 text-gray-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 11 12 14 20 6" />  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>
                                    <span className="ms-3">Điểm danh</span>
                                </a>
                            </li>
                        }
                        {userType.includes('ROLE_TEACHER') &&
                            <li onClick={() => handleNavigation(`/detail-class/${classId}/score`)}>
                                <a className="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>

                                    <span className="ms-3">Nhập điểm</span>

                                </a>
                            </li>
                        }

                        <li>
                            <button
                                onClick={toggleDropdown}
                                className="flex w-full justify-between p-2 items-center cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="flex ">
                                    <svg
                                        className="h-6 w-6 text-gray-300"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                                        <line x1="3" y1="6" x2="3" y2="19" />
                                        <line x1="12" y1="6" x2="12" y2="19" />
                                        <line x1="21" y1="6" x2="21" y2="19" />
                                    </svg>
                                    <span className="ms-3">Assignment</span>
                                </div>
                                <div className='mt-1'>
                                    {isOpen ? (
                                        <svg
                                            className="h-5 w-5 text-gray-200"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M18 15l-6-6l-6 6h12" />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="h-5 w-5 text-gray-200"
                                            viewBox="0 0 24 24"
                                            strokeWidth="2"
                                            stroke="currentColor"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M18 15l-6-6l-6 6h12" transform="rotate(180 12 12)" />
                                        </svg>

                                    )}
                                </div>
                            </button>
                            {isOpen && (
                                <ul id="dropdown-example" className="py-2 space-y-2 cursor-pointer">
                                    {userType.includes('ROLE_TEACHER') && (
                                        <li onClick={() => handleNavigation(`/detail-class/${classId}/assignment-form`)}>
                                            <a className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                Tạo bài tập
                                            </a>
                                        </li>
                                    )}
                                    <li onClick={() => handleNavigation(`/detail-class/${classId}/assignment`)}>
                                        <a className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                            {userType.includes('ROLE_TEACHER') ? 'Bài tập đã tạo' : 'Bài tập được giao'}
                                        </a>
                                    </li>
                                    {userType.includes('ROLE_STUDENT') && (
                                        <li onClick={() => handleNavigation(`/detail-class/${classId}/submission`)}>
                                            <a className="flex items-center w-full p-1 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                                                Các bài tập đã nộp
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </li>

                        {userType.includes('ROLE_STUDENT') &&
                            <li onClick={() => handleNavigation(`/detail-class/${classId}/info-user`)}>
                                <a className="flex items-center p-2 cursor-pointer text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>

                                    <span className="ms-3">Xem điểm</span>
                                </a>
                            </li>
                        }
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default SidebarClass;
