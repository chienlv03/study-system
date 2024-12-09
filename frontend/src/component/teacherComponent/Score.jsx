import { useEffect, useState } from 'react';
import { getGradeByCourseId, updateGrade } from '../../services/GradeService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Score = () => {
    const [grades, setGrades] = useState([]);

    // Fetch grades for the course
    useEffect(() => {
        fetchData();
    }, []);
    
    // Handle input change
    const fetchData = async () => {
        try {
            const courseId = localStorage.getItem('classId');
            const response = await getGradeByCourseId(courseId);
            setGrades(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Không thể tải dữ liệu điểm!');
        }
    };
    const handleInputChange = (e, gradeId, field) => {
        const { value } = e.target;
    
        setGrades((prevGrades) =>
            prevGrades.map((grade) =>
                grade.id === gradeId
                    ? { ...grade, [field]: value }
                    : grade
            )
        );
    };
    

    // Handle save score
    const handleSaveScore = async (id) => {
        const gradeToUpdate = grades.find((grade) => grade.id === id);
    
        if (!gradeToUpdate) {
            toast.error('Không tìm thấy điểm để cập nhật!');
            return;
        }
    
        const { progressScore, finalScore } = gradeToUpdate;

        if (
            progressScore === '' || finalScore === '' ||
            progressScore === null || finalScore === null
        ) {
            toast.error('Điểm không được để trống!');
            return;
        }
    
        // Kiểm tra tính hợp lệ của điểm
        if (
            isNaN(progressScore) || isNaN(finalScore) ||
            progressScore < 0 || progressScore > 10 ||
            finalScore < 0 || finalScore > 10
        ) {
            toast.error('Điểm phải là số trong khoảng từ 0 đến 10!');
            return;
        }
    
        // Lấy điểm hiện tại từ cơ sở dữ liệu (hoặc giá trị gốc trong danh sách)
        const originalGrade = await getGradeByCourseId(localStorage.getItem('classId'))
            .then(response => response.data.find(g => g.id === id));
    
        if (!originalGrade) {
            toast.error('Không thể xác định điểm gốc!');
            return;
        }
    
        if (
            parseFloat(progressScore) === parseFloat(originalGrade.progressScore) &&
            parseFloat(finalScore) === parseFloat(originalGrade.finalScore)
        ) {
            toast.info('Điểm không thay đổi!');
            return;
        }
    
        // Cập nhật điểm
        try {
            await updateGrade(id, { progressScore, finalScore });
            toast.success('Cập nhật điểm thành công!');
            fetchData();
        } catch (error) {
            console.error('Error updating grade:', error);
            toast.error('Không thể cập nhật điểm!');
        }
    };
    

    return (
        <div className="sm:ml-64 mt-16 px-4 py-1">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-center text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        <ul className="text-left">
                            <li>Mã lớp: {localStorage.getItem('classCode')}</li>
                            <li>Tên Lớp: {localStorage.getItem('name')}</li>
                            <li>Thời gian bắt đầu: {localStorage.getItem('startTime')}</li>
                        </ul>
                    </caption>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">STT</th>
                            <th className="px-6 py-3">Họ và tên</th>
                            <th className="px-6 py-3 text-center">Điểm quá trình</th>
                            <th className="px-6 py-3 text-center">Điểm cuối kỳ</th>
                            <th className="px-6 py-3 text-center">Điểm học phần</th>
                            <th className="px-6 py-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {grades.map((grade, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4">{grade.username}</td>
                                <td className="px-6 py-4 text-center">
                                    <input
                                        type="text"
                                        className="w-2/5 text-center bg-gray-700 text-white focus:outline-none"
                                        value={grade.progressScore || ''}
                                        onChange={(e) => handleInputChange(e, grade.id, 'progressScore')}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <input
                                        type="text"
                                        className="w-2/5 text-center bg-gray-700 text-white focus:outline-none"
                                        value={grade.finalScore || ''}
                                        onChange={(e) => handleInputChange(e, grade.id, 'finalScore')}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">{grade.courseScore}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => handleSaveScore(grade.id)}
                                    >
                                        Cập nhật
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Score;
