import { useEffect, useState } from 'react';
import { getGradeInCourse, updateScore } from '../../services/CourseEnrollmentService';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Score = () => {
    const [users, setUsers] = useState([]);
    const [scores, setScores] = useState({});

    useEffect(() => {

        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        try {
            const response = await getGradeInCourse(localStorage.getItem('classId'));
            setUsers(response.data);

            // Initialize scores with current values
            const initialScores = {};
            response.data.forEach(user => {
                initialScores[user.enrollmentId] = {
                    progressScore: user.progressScore ?? '',
                    finalScore: user.finalScore ?? ''
                };
            });
            // console.log("initialScores", initialScores);
            setScores(initialScores);
        } catch (error) {
            console.error("Error fetching grades:");
        }
    };

    // console.log("scores", scores);

    const handleInputChange = (e, userId) => {
        const { name, value } = e.target;
        setScores(prevScores => ({
            ...prevScores,
            [userId]: {
                ...prevScores[userId],
                [name]: value
            }
        }));
    };

    const handleUpdateScore = async (enrollmentId) => {
        const { progressScore, finalScore } = scores[enrollmentId] || {};

        if (progressScore === undefined || finalScore === undefined ||
            isNaN(progressScore) || isNaN(finalScore) ||
            progressScore < 0 || finalScore < 0 ||
            progressScore > 10 || finalScore > 10 ||
            progressScore === "" || finalScore === "") {
            toast.error("Bạn chưa nhập điểm hoặc nhập không đúng", {
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
            return;
        }

        const user = users.find(user => user.enrollmentId === enrollmentId);

        // Check if the scores have changed
        if (
            user.progressScore === parseFloat(progressScore) &&
            user.finalScore === parseFloat(finalScore)
        ) {
            toast.error("Điểm không thay đổi", {
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
            return;
        }

        try {
            await updateScore(enrollmentId, {
                progressScore: parseFloat(progressScore),
                finalScore: parseFloat(finalScore)
            });

            toast.success("Cập nhật thành công", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });

            // Fetch updated grades after updating
            fetchGrades();
        } catch (error) {
            console.error("Error updating score:", error);
        }
    };

    return (
        <div className="sm:ml-64 mt-16 px-4 py-1">
            <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
                <table className="w-full overflow-hidden text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 sticky top-0 text-lg font-semibold text-center uppercase rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        <ul className="text-left">
                            <li>Mã lớp: {localStorage.getItem('classCode')}</li>
                            <li>Tên Lớp: {localStorage.getItem('name')}</li>
                            <li>Thời gian bắt đầu: {localStorage.getItem('startTime')}</li>
                        </ul>
                    </caption>
                    <thead className="text-xs sticky top-28 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Họ và tên
                            </th>
                            <th scope="col" className="px-6 py-3 w-40 text-center">
                                Điểm quá trình
                            </th>
                            <th scope="col" className="px-6 py-3 w-40 text-center">
                                Điểm cuối kỳ
                            </th>
                            <th scope="col" className="px-6 py-3 w-40 text-center">
                                Điểm học phần
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <input
                                        type="text"
                                        className='w-2/5 text-center bg-gray-700 text-white focus:outline-none'
                                        name="progressScore"
                                        value={scores[user.enrollmentId]?.progressScore}
                                        onChange={(e) => handleInputChange(e, user.enrollmentId)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <input
                                        type="text"
                                        className='w-2/5 text-center bg-gray-700 text-white focus:outline-none'
                                        name="finalScore"
                                        value={scores[user.enrollmentId]?.finalScore}
                                        onChange={(e) => handleInputChange(e, user.enrollmentId)}
                                    />
                                </td>
                                <td className="px-6 py-4 text-center text-white">
                                    {user.courseScore !== null && user.courseScore !== undefined ? user.courseScore.toFixed(2) : ''}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => handleUpdateScore(user.enrollmentId)}
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
}

export default Score;
