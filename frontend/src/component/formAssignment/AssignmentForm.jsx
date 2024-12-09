// AssignmentForm.js
import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { createAssignment } from '../../services/AssignmentService';
import { createSubmission } from '../../services/SubmissionService';

import TitleInput from './TitleInput';
import DueDateInput from './DueDateInput';
import PointSelection from './PointSelection';
import ContentEditor from './ContentEditor';
import FileList from './FileList';
import FileUploadButton from './FileUploadButton';

const AssignmentForm = () => {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [point, setPoint] = useState(false);
    const [content, setContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const loginResponse = useMemo(() => JSON.parse(localStorage.getItem('loginResponse')) || {}, []);
    const userType = useMemo(() => loginResponse.roles || [], [loginResponse]);
    const isTeacher = useMemo(() => userType.includes('ROLE_TEACHER'), [userType]);
    const userId = loginResponse.id;
    const assignmentId = localStorage.getItem('assignmentId');
    const classId = localStorage.getItem('classId');

    const handleFileChange = useCallback((event) => {
        const filesArray = Array.from(event.target.files);
        setSelectedFiles((prevFiles) => [...prevFiles, ...filesArray]);
    }, []);

    const removeFile = useCallback((indexToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formattedDueDate = moment(dueDate).format('DD-MM-YYYY HH:mm');

        const assignment = {
            title,
            content,
            dueDate: formattedDueDate,
            point,
            courseId: classId,
            userId: userId
        };

        const submission = {
            content,
            assignmentId: assignmentId,
            userId: userId,
            courseId: classId
        };

        try {
            if (isTeacher) {
                await createAssignment(assignment, selectedFiles);
                navigate(`/detail-class/${classId}/assignment`);
            } else {
                await createSubmission(submission, selectedFiles);
                navigate(`/detail-class/${classId}/submission`);
            } 
        } catch (error) { 
            console.error('Error creating assignment:', error);
            alert('Bài tập đã nộp', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sm:ml-64 mt-16 px-4 py-1">
            <form onSubmit={handleSubmit} className="border border-gray-300 rounded-lg shadow-lg p-3">
                <div className='flex justify-between'>
                    {isTeacher ? <TitleInput title={title} setTitle={setTitle} /> :
                        <svg onClick={() => navigate(-1)} className="h-8 w-8 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    }

                    <button type="submit" className="bg-blue-500 text-white px-4 mb-4 py-2 mt-5 rounded-lg" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
                {userType.includes('ROLE_TEACHER') && (
                    <div className='grid grid-cols-2 gap-5 mb-2'>
                        <DueDateInput dueDate={dueDate} setDueDate={setDueDate} error={error} setError={setError} />
                        <PointSelection point={point} setPoint={setPoint} />
                    </div>
                )}
                <ContentEditor content={content} setContent={setContent} />
                <FileList selectedFiles={selectedFiles} removeFile={removeFile} />
                <FileUploadButton handleFileChange={handleFileChange} />
            </form>
        </div>
    );
};

export default AssignmentForm;
