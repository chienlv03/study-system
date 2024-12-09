import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGrade } from '../../services/GradeService'; // Import API function
import Modal from 'react-modal'; // Install with: npm install react-modal

Modal.setAppElement('#root'); // Đảm bảo modal được gắn vào root

const UserTable = ({ users, userType, handleDeleteUser }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [gradeData, setGradeData] = useState({
        progressScore: '',
        finalScore: '',
    });

    const naivgate = useNavigate();

    // Open modal and set current user
    const handleOpenModal = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentUser(null);
        setGradeData({ progressScore: '', finalScore: '' });
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGradeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle submit
    const handleSubmit = async () => {
        try {
            const courseId = localStorage.getItem('classId'); // Assuming courseId is stored in localStorage
            await createGrade(currentUser.id, courseId, gradeData);
            alert('Grade created successfully');
            handleCloseModal();
        } catch (error) {
            console.error('Error creating grade:', error);
            alert('Failed to create grade');
        }
    };

    return (
        <>
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
                <caption className="p-5 sticky top-0 text-lg font-semibold rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    <ul className="text-left">
                        <li>Mã lớp: {localStorage.getItem('classCode')}</li>
                        <li>Tên Lớp: {localStorage.getItem('name')}</li>
                        <li>Thời gian bắt đầu: {localStorage.getItem('startTime')}</li>
                    </ul>
                </caption>
                <thead className="text-xs sticky z-0 top-28 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">STT</th>
                        <th scope="col" className="px-6 py-3">Họ Và Tên</th>
                        <th scope="col" className="px-6 py-3">Ngày sinh</th>
                        <th scope="col" className="px-6 py-3">Giới tính</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        {userType.includes('ROLE_TEACHER') && <th scope="col" className="px-6 py-3">Action</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="text-center font-medium dark:text-white bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" className="px-6 py-4">{index + 1}</th>
                            <td className="px-6 py-4">{user.username}</td>
                            <td className="px-6 py-4">{user.dob}</td>
                            <td className="px-6 py-4">{user.gender}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            {userType.includes('ROLE_TEACHER') && (
                                <td className="px-6 py-4">
                                    {!user.isScore ?
                                        <button
                                            onClick={() => handleOpenModal(user)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Chấm điểm
                                        </button>
                                        :
                                        <button
                                            onClick={() => naivgate(`/detail-class/${localStorage.getItem('classId')}/score`)}
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Xem điểm
                                        </button>
                                    }
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for grading */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Grading Modal"
                    className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-24"
                >
                    <h2 className="text-lg font-bold mb-4">Nhập điểm cho {currentUser?.username}</h2>
                    <label className="block mb-2">
                        Điểm quá trình:
                        <input
                            type="text"
                            name="progressScore"
                            value={gradeData.progressScore}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded"
                        />
                    </label>
                    <label className="block mb-4">
                        Điểm cuối kỳ:
                        <input
                            type="text"
                            name="finalScore"
                            value={gradeData.finalScore}
                            onChange={handleInputChange}
                            className="w-full p-2 mt-1 border rounded"
                        />
                    </label>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                    >
                        Submit
                    </button>
                    <button
                        onClick={handleCloseModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </Modal>
            )}
        </>
    );
};

UserTable.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        dob: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    })).isRequired,
    userType: PropTypes.array.isRequired,
    handleDeleteUser: PropTypes.func.isRequired,
};

export default UserTable;
