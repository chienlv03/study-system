import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import SidebarItem from './SidebarItem';
import DropdownMenu from './DropdownMenu';

const SidebarClass = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    const userType = loginResponse?.roles || [];
    const classId = localStorage.getItem('classId');

    const handleClick = (path) => {
        localStorage.removeItem('classId');
        localStorage.removeItem('name');
        localStorage.removeItem('classCode');
        localStorage.removeItem('startTime');
        navigate(path);
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="w-64 mt-16">
            <aside
                id="default-sidebar"
                className="fixed mt-1 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <SidebarItem
                            icon={<svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>}
                            label="Danh sách lớp học"
                            onClick={() => handleClick('/class-list')}
                        />
                        <SidebarItem
                            icon={<svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                            </svg>}
                            label="Danh sách sinh viên"
                            onClick={() => handleNavigation(`/detail-class/${classId}/list-student`)}
                        />
                        {userType.includes('ROLE_TEACHER') && (
                            <>
                                <SidebarItem
                                    icon={<svg className="h-6 w-6 text-gray-300" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <polyline points="9 11 12 14 20 6" />  <path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" /></svg>}
                                    label="Điểm danh"
                                    onClick={() => handleNavigation(`/detail-class/${classId}/attendances`)}
                                />
                                <SidebarItem
                                    icon={<svg className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>}
                                    label="Điểm"
                                    onClick={() => handleNavigation(`/detail-class/${classId}/score`)}
                                />
                            </>
                        )}
                        <DropdownMenu
                            isOpen={isOpen}
                            toggleDropdown={() => setIsOpen(!isOpen)}
                            menuItems={[
                                {
                                    condition: userType.includes('ROLE_TEACHER'),
                                    label: 'Tạo bài tập',
                                    onClick: () => handleNavigation(`/detail-class/${classId}/assignment-form`),
                                },
                                {
                                    label: userType.includes('ROLE_TEACHER') ? 'Bài tập đã tạo' : 'Bài tập được giao',
                                    onClick: () => handleNavigation(`/detail-class/${classId}/assignment`),
                                },
                                {
                                    condition: userType.includes('ROLE_STUDENT'),
                                    label: 'Các bài tập đã nộp',
                                    onClick: () => handleNavigation(`/detail-class/${classId}/submission`),
                                },
                            ]}
                        />
                    </ul>
                </div>
            </aside >
        </div >
    );
};

export default SidebarClass;
