// import { useEffect, useState } from "react";
// import { getEnrollByUserId } from "../../services/EnrollmentService";
// import { useNavigate } from "react-router-dom";

// const LearnOutcomes = () => {
//     const [learnOutcomes, setLearnOutcomes] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchLearnOutcomes = async () => {
//             try {
//                 const response = await getEnrollByUserId(JSON.parse(localStorage.getItem('loginResponse')).id);
//                 setLearnOutcomes(response.data);
//             } catch (error) {
//                 console.error('Error fetching learn outcomes:', error);
//             }
//         };
//         fetchLearnOutcomes();
//     }, []);

//     return (
//         <div className="sm:mx-28 mt-16 px-4 py-1">
//             <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg">
//                 <table className="w-full text-sm text-gray-500 dark:text-gray-400">
//                     <caption className="p-5 sticky top-0 text-lg font-semibold text-center uppercase rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
//                         <svg onClick={() => navigate('/home')} className="h-8 w-8 a absolute cursor-pointer text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
//                         </svg>
//                         <span>Kết quả học tập cá nhân</span>
//                     </caption>
//                     <thead className="text-xs sticky top-14 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                         <tr>
//                             <th scope="col" className="px-6 py-3">
//                                 Mã lớp
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Tên lớp
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Điểm quá trình
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Điểm cuối kỳ
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Điểm học phần
//                             </th>
//                             <th scope="col" className="px-6 py-3">
//                                 Số lần vắng
//                             </th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {learnOutcomes.map((learnOutcome, index) => (
//                             <tr key={index} className="overflow-hidden text-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//                                 <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                                     {learnOutcome.classCode}
//                                 </th>
//                                 <td className="px-6 py-4">
//                                     {learnOutcome.name}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {learnOutcome.progressScore}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {learnOutcome.finalScore}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {learnOutcome.courseScore}
//                                 </td>
//                                 <td className="px-6 py-4">
//                                     {learnOutcome.unexcusedAbsenceCount}
//                                 </td>
//                             </tr>
//                         ))}

//                     </tbody>
//                 </table>
//             </div>

//         </div>
//     )
// }

// export default LearnOutcomes


const LearnOutcomes = () => {
  return (
    <div>
      
    </div>
  )
}

export default LearnOutcomes
