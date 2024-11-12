import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSubmissionByAssignment, updateGradeAndFeedback, getSubmissionByUserAndCourse } from "../services/SubmissionService";
import { getFileBySubmission } from "../services/SubmissionFileService";

const Submission = () => {
    const [submissions, setSubmissions] = useState([]);
    const [files, setFiles] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(null);
    const [isDropdownFeedbackVisible, setIsDropdownFeedbackVisible] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [grade, setGrade] = useState("");

    const navigate = useNavigate();
    const assignmentId = localStorage.getItem('assignmentId');
    const assignmentTitle = localStorage.getItem('assignmentTitle');
    const classId = localStorage.getItem('classId');

    const user = JSON.parse(localStorage.getItem('loginResponse'));
    const userType = user.roles;
    const userId = user.id;


    useEffect(() => {
        fetchSubmission();
    }, []);

    const fetchSubmission = async () => {
        try {
            let response = null;
            if (userType.includes('ROLE_TEACHER')) {
                response = await getSubmissionByAssignment(assignmentId);
            } else if (userType.includes('ROLE_STUDENT')) {
                response = await getSubmissionByUserAndCourse(userId, classId);
            }
            setSubmissions(response.data);
        } catch (error) {
            console.error('Error fetching submissions:', error);
        }
    };

    const fetchSubmissionFiles = async (assignmentId) => {
        try {
            const response = await getFileBySubmission(assignmentId);
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching assignment files:', error);
        }
    };

    const toggleDropdown = (index, submissionId) => {
        setIsDropdownVisible(isDropdownVisible === index ? null : index);
        fetchSubmissionFiles(submissionId);
    };

    const toggleDropdownFeedback = (index) => {
        setIsDropdownFeedbackVisible(isDropdownFeedbackVisible === index ? null : index);
        // Clear feedback and grade state when opening the dropdown
        setFeedback('');
        setGrade('');
    };

    const isImage = (fileName) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const extension = fileName.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
    };

    // const handleInputChange = (index, field, value) => {
    //     const updatedSubmissions = submissions.map((submission, i) =>
    //         i === index ? { ...submission, [field]: value } : submission
    //     );
    //     setSubmissions(updatedSubmissions);
    // };

    const handleUpdate = async (submissionId) => {
        try {
            await updateGradeAndFeedback(submissionId, grade, feedback);
            fetchSubmission();
            setIsDropdownFeedbackVisible(null);
        } catch (error) {
            console.error('Error updating grade and feedback:', error);
            alert("Failed to update grade and feedback.");
        }
    };

    return (
        <div className="sm:ml-64 mt-16 px-4 py-1">
            <header className="border border-gray-200 rounded-lg py-2 text-center text-xl font-bold">
                <p onClick={() => navigate(-1)} className="float-left">
                    <svg
                        className="h-8 w-8 text-gray-500"
                        width="24" height="24" viewBox="0 0 24 24"
                        strokeWidth="2" stroke="currentColor" fill="none"
                        strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="15 6 9 12 15 18" />
                    </svg>
                </p>
                <h1>Danh sách sinh viên nộp bài tập {assignmentTitle}</h1>
            </header>
            {submissions.length > 0 ? (
                submissions.map((submission, index) => (
                    <div key={index} className="border border-gray-400 rounded-lg p-1 mb-2">
                        <div className="relative p-3 rounded-lg bg-gray-400 drop-shadow-xl flex justify-between">
                            <div onClick={() => toggleDropdown(index, submission.id)} className="w-full">
                                <p>Họ tên sinh viên: {submission.username}</p>
                                <p>Thời gian nộp: {submission.submittedDate} {submission.isLate && 'Muộn'}</p>
                            </div>
                            <div className="content-center">{submission.grade}/10</div>
                        </div>
                        {isDropdownVisible === index && (
                            <div className="p-3 relative">
                                {submission.content ? (
                                    <div
                                        className="border border-gray-200 rounded-lg p-2 mt-2 w-1/2"
                                        dangerouslySetInnerHTML={{ __html: submission.content }}
                                    ></div>
                                ) : (
                                    <p className="border border-gray-200 rounded-lg p-3 w-1/2">Trống</p>
                                )}
                                <div className="absolute top-5 right-5 text-wrap italic w-80">Nhận xét: {submission.feedback}</div>

                                <div className="mt-4">
                                    <ul>
                                        {files.map((file, i) => (
                                            <li className="my-2" key={i}>
                                                {isImage(file.fileName) ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${file.fileData}`}
                                                        alt={file.fileName}
                                                        className="border border-gray-300 rounded-lg p-2 w-1/3"
                                                    />
                                                ) : (
                                                    <a
                                                        className="text-sm border border-blue-300 rounded-lg p-2 bg-gray-300"
                                                        href={`data:${file.fileType};base64,${file.fileData}`}
                                                        download={file.fileName}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {file.fileName}
                                                    </a>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                {userType.includes('ROLE_TEACHER') && (
                                    <div className="mt-4 flex items-start">
                                        <button
                                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                                            onClick={() => toggleDropdownFeedback(index)}
                                        >
                                            Nhận xét
                                        </button>
                                        {isDropdownFeedbackVisible === index && (
                                            <form
                                                onClick={(e) => (e.stopPropagation())}
                                                onSubmit={(e) => {
                                                    e.preventDefault(); // Ngăn reload lại trang
                                                    handleUpdate(submission.id);
                                                }}
                                                className="ml-4 content-start items-start flex"
                                            >
                                                <textarea
                                                    type="text"
                                                    placeholder="Phản hồi"
                                                    className="border border-gray-300 rounded-lg p-2 w-96 focus:outline-none"
                                                    value={feedback ?? ''}
                                                    onChange={(e) => setFeedback(e.target.value)}
                                                />
                                                <input
                                                    className="w-16 text-center focus:outline-none rounded-md ml-2 p-2 bg-gray-200"
                                                    type="text"
                                                    placeholder="Điểm"
                                                    value={grade ?? ''}
                                                    onChange={(e) => setGrade(e.target.value)}
                                                />
                                                <button
                                                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm ml-2 px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                                                >
                                                    OK
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <div className="text-center mt-5">Không có bài tập nào</div>
            )}
        </div>
    );
};

export default Submission;
