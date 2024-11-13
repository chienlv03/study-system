import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createAssignment } from '../services/AssignmentService';
import { createSubmission } from '../services/SubmissionService';
import debounce from 'lodash.debounce';

const AssignmentForm = () => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [point, setPoint] = useState(false);
    const [content, setContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');
    const [checkDate, setCheckDate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fileError, setFileError] = useState('');

    const navigate = useNavigate();
    const loginResponse = useMemo(() => JSON.parse(localStorage.getItem('loginResponse')) || {}, []);
    const userType = useMemo(() => loginResponse.roles || [], [loginResponse]);
    const isTeacher = useMemo(() => userType.includes('ROLE_TEACHER'), [userType]);
    const userId = useMemo(() => loginResponse.id, [loginResponse]);
    const assignmentId = useMemo(() => localStorage.getItem('assignmentId'), []);
    const classId = useMemo(() => localStorage.getItem('classId'), []);

    const handleFileChange = useCallback((event) => {
        const files = Array.from(event.target.files).filter(file => {
            if (file.size > 5242880 || !['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
                setFileError('Chỉ cho phép tải lên file PDF, JPEG, PNG và kích thước tối đa 5MB');
                return false;
            }
            return true;
        });
        setSelectedFiles(files);
        setFileError('');
    }, []);

    const removeFile = useCallback((indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    }, []);

    const handleDueDateChange = useCallback((e) => {
        const selectedDate = moment(e.target.value, "YYYY-MM-DDTHH:mm");
        const currentDate = moment();

        if (selectedDate.isBefore(currentDate)) {
            setCheckDate("Hạn nộp bài phải sau thời gian hiện tại");
        } else {
            // Chuyển đổi sang định dạng phù hợp cho LocalDateTime trước khi gửi lên backend
            const formattedDate = selectedDate.format("YYYY-MM-DDTHH:mm:ss");  // Định dạng đầy đủ với giây
            setDueDate(formattedDate);
            setCheckDate('');
        }
    }, []);


    const handleContentChange = useCallback(debounce((value) => setContent(value), 300), [setContent]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const assignment = {
            title,
            content,
            dueDate,
            point,
            courseId: classId,
            userId: userId
        };

        const submission = {
            content,
            userId,
            assignmentId,
            courseId: classId
        };

        try {
            if (userType.includes('ROLE_STUDENT')) {
                await createSubmission(submission, selectedFiles);
                navigate(`/detail-class/${classId}/submission`);
            } else {
                await createAssignment(assignment, selectedFiles);
                navigate(`/detail-class/${classId}/assignment`);
            }
        } catch (error) {
            setError('Có lỗi xảy ra trong quá trình tải lên, vui lòng thử lại.');
            console.error('Error uploading assignment:', error);
        } finally {
            setLoading(false);
        }
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
                        {loading ? 'Đang nộp...' : 'Nộp'}
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
                                    className="ml-2 bg-gray-50 border-b border-gray-300 text-sm focus:outline-none w-full px-2.5"
                                />
                                {checkDate && <p className="text-red-500 text-xs mt-1 ml-20">{checkDate}</p>}
                            </div>

                            <div className="flex items-center">
                                <label className="text-sm font-bold mx-4">Điểm:</label>
                                <label className="flex items-center mr-5 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="point"
                                        checked={point === true}
                                        onChange={() => setPoint(true)}
                                        className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 focus:ring-blue-500" />
                                    <span className="ms-2 text-sm font-bold">Có</span>
                                </label>
                                <label className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="point"
                                        checked={point === false}
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
                        <ReactQuill value={content} onChange={handleContentChange} />
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

                {fileError && <p className="text-red-500 text-xs mt-1 ml-20">{fileError}</p>}

                <div className="font-bold ml-20">
                    <label className="flex items-center cursor-pointer">
                        <svg className="h-4 w-4 text-gray-800" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a1.5 1.5 0 0 0 -3 -3" />
                            <path d="M9 15l-2.5 2.5a1.5 1.5 0 0 1 -3 -3l2.5 -2.5" />
                            <path d="M16 5l3 3" />
                        </svg>
                        <span className="ml-2 text-sm">đính kèm</span>
                    </label>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                    />
                </div>
                {error && <p className="text-red-500 text-xs mt-1 ml-20">{error}</p>}
            </form>
        </div>
    );
};

export default AssignmentForm;
