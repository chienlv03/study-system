import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createAssignment } from '../services/AssignmentService';
import { createSubmission } from '../services/SubmissionService';

const AssignmentForm = () => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [formattedDueDate, setFormattedDueDate] = useState('');
    const [point, setPoint] = useState(false);
    const [content, setContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const loginResponse = JSON.parse(localStorage.getItem('loginResponse')) || {};
    const userType = loginResponse.roles || [];
    const isTeacher = userType.includes('ROLE_TEACHER');
    const userId = loginResponse.id;
    const assignmentId = localStorage.getItem('assignmentId');
    const classId = localStorage.getItem('classId');

    const handleFileChange = (event) => setSelectedFiles(Array.from(event.target.files));
    const removeFile = (indexToRemove) => setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));

    const handleDueDateChange = (e) => {
        const selectedDate = moment(e.target.value);
        const currentDate = moment();

        if (selectedDate.isBefore(currentDate)) {
            setError("Hạn nộp bài phải sau thời gian hiện tại");
        } else {
            setDueDate(selectedDate.format('YYYY-MM-DDTHH:mm')); 
            setFormattedDueDate(selectedDate.format('DD-MM-YYYY HH:mm'));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const currentTime = moment().format('DD-MM-YYYY HH:mm');

        const assignment = {
            title,
            content,
            assignedDate: currentTime,
            dueDate: formattedDueDate,
            point,
            courseId: classId,
            userId
        };

        const submission = {
            content,
            submittedDate: currentTime,
            userId,
            assignmentId,
            courseId: classId
        };

        try {
            if (userType.includes('ROLE_STUDENT')) {
                await createSubmission(submission, selectedFiles);
            } else {
                await createAssignment(assignment, selectedFiles);
            }
            navigate(`/detail-class/${classId}/assignment`);
        } catch (error) {
            console.error('Error uploading assignment:', error);
        } finally {
            setLoading(false);
        }

        console.log('Assignment submitted:', assignment);
    };

    return (
        <div className="sm:ml-64 mt-16 px-4 py-1">
            <form className="border border-gray-300 rounded-lg shadow-lg p-3" onSubmit={handleSubmit}>
                <div className="p-3 flex justify-between text-lg font-bold">
                    {isTeacher ? <h2>Bài tập mới</h2> : (
                        <button type="button" onClick={() => navigate(-1)} className="text-gray-500">
                            <svg className="h-8 w-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 6 9 12 15 18" />
                            </svg>
                        </button>
                    )}
                    <button type="submit" disabled={loading} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>

                {isTeacher && (
                    <>
                        <div className="flex w-full mb-5">
                            <label className="text-sm font-bold w-20">Tiêu đề:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="ml-1 bg-gray-50 border-b border-gray-300 text-sm focus:outline-none w-full px-2.5" />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex items-center">
                                <label className="text-sm font-bold w-20">Hạn nộp bài:</label>
                                <input
                                    type="datetime-local"
                                    value={dueDate}
                                    onChange={handleDueDateChange}
                                    className="ml-2 bg-gray-50 border-b border-gray-300 text-sm focus:outline-none w-full px-2.5" />
                                {error && <p className="text-red-500 text-xs mt-1 ml-20">{error}</p>}
                            </div>

                            <div className="flex items-center">
                                <label className="text-sm font-bold mx-4">Điểm:</label>
                                <label className="flex items-center mr-5">
                                    <input
                                        type="radio"
                                        name="point"
                                        checked={point}
                                        onChange={() => setPoint(true)}
                                        className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                    <span className="ms-2 text-sm font-bold">Có</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="point"
                                        checked={point}
                                        onChange={() => setPoint(false)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                    <span className="ms-2 text-sm font-bold">Không</span>
                                </label>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex mb-5">
                    <label className="text-sm font-bold w-20">Nội dung:</label>
                    <div className="w-full ml-1">
                        <ReactQuill value={content} onChange={setContent} />
                    </div>
                </div>

                {selectedFiles.length > 0 && (
                    <ul className="ml-20 w-1/2">
                        {selectedFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between text-sm border border-blue-300 rounded-lg p-3 mb-1">
                                {file.name}
                                <svg onClick={() => removeFile(index)} className="h-4 w-4 text-red-800 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </li>
                        ))}
                    </ul>
                )}

                <div className="font-bold ml-20">
                    <label className="flex w-20 items-center cursor-pointer">
                        <svg className="h-4 w-4 text-gray-800" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
                        </svg>
                        Attach
                        <input type="file" multiple className="hidden" onChange={handleFileChange} />
                    </label>
                </div>
            </form>
        </div>
    );
};

export default AssignmentForm;
