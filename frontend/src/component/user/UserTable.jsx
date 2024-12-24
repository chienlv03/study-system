import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import GradingModal from './GradingModal';

const UserTable = ({ users, userType, handleDeleteUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [userList, setUserList] = useState([]);

    const navigate = useNavigate();
    const classId = localStorage.getItem('classId');
    const classCode = localStorage.getItem('classCode');
    const className = localStorage.getItem('name');
    const startTime = localStorage.getItem('startTime');

    useEffect(() => {
        setUserList(users);
    }, [users]);

    const handleOpenModal = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
    };

    const handleGradeAdded = (userId) => {
        setUserList((prevList) =>
            prevList.map((user) =>
                user.id === userId ? { ...user, isScore: true } : user
            )
        );
    };

    if (userList.length === 0) {
        return <p className="text-center text-gray-500">No users found in this class.</p>;
    }

    return (
        <>
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <caption className="p-5 sticky top-0 text-lg font-semibold text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    <ul className="text-left">
                        <li>Mã lớp: {classCode}</li>
                        <li>Tên Lớp: {className}</li>
                        <li>Thời gian bắt đầu: {startTime}</li>
                    </ul>
                </caption>
                <thead className="text-xs sticky z-0 top-28 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className="px-6 py-3">STT</th>
                        <th className="px-6 py-3">Họ Và Tên</th>
                        <th className="px-6 py-3">Ngày sinh</th>
                        <th className="px-6 py-3">Giới tính</th>
                        <th className="px-6 py-3">Email</th>
                        {userType.includes('ROLE_TEACHER') && <th className="px-6 py-3">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {userList.map((user, index) => (
                        <tr key={user.id} className="text-center font-medium dark:text-white bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th className="px-6 py-4">{index + 1}</th>
                            <td className="px-6 py-4">{user.username}</td>
                            <td className="px-6 py-4">{user.dob}</td>
                            <td className="px-6 py-4">{user.gender}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            {userType.includes('ROLE_TEACHER') && (
                                <td className="px-6 py-4">
                                    {!user.isScore ? (
                                        <button
                                            onClick={() => handleOpenModal(user)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Chấm điểm
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate(`/detail-class/${classId}/score`)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Xem điểm
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                        aria-label={`Delete user ${user.username}`}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {isModalOpen && (
                <GradingModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    user={currentUser}
                    onGradeAdded={handleGradeAdded}
                />
            )}
        </>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    userType: PropTypes.array.isRequired,
    handleDeleteUser: PropTypes.func.isRequired,
};

export default UserTable;
