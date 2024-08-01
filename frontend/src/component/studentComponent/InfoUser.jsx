import { useEffect, useState } from 'react'
import { getEnrollInCourse } from '../../services/CourseEnrollmentService';

const InfoUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
    console.log("userId: " + loginResponse.id);

    const fetchData = async () => {

        try {
            const response = await getEnrollInCourse(2, JSON.parse(localStorage.getItem('loginResponse')).id);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className='sm:ml-64 mt-16 px-4 py-1'>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className=" p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        <ul>
                            <li>Mã lớp: {localStorage.getItem('classCode')}</li>
                            <li>Tên Lớp: {localStorage.getItem('name')}</li>
                            <li>Thời gian bắt đầu: {localStorage.getItem('startTime')}</li>
                        </ul>
                    </caption>
                    <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Số lần vắng có phép
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số lần vắng không phép
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Điểm quá trình
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Điểm cuối kỳ
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Điểm học phần
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b text-center dark:bg-gray-600 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                                {users.unexcusedAbsenceCount}
                            </th>
                            <td className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                                {users.excusedAbsenceCount}
                            </td>
                            <td className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                                {users.progressScore}
                            </td>
                            <td className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                                {users.finalScore}
                            </td>
                            <td className="px-6 py-4 font-bold whitespace-nowrap dark:text-white">
                                {users.courseScore}
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default InfoUser
