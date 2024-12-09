import PropTypes from "prop-types";
import { useState } from "react";
import FeedbackForm from "./FeedbackForm";
import FileList from "./FileList";
import { getFileBySubmission } from "../../services/SubmissionFileService";

const SubmissionItem = ({ submission, userType, onDeleteSubmission }) => {
    const [files, setFiles] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);

    const fetchSubmissionFiles = async (submissionId) => {
        try {
            const response = await getFileBySubmission(submissionId);
            setFiles(response.data);
        } catch (error) {
            console.error("Error fetching assignment files:", error);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
        if (!isDropdownVisible) fetchSubmissionFiles(submission.id);
    };

    return (
        <div className="border border-gray-400 rounded-lg p-1 mb-2">
            <div
                className="relative p-3 items-center rounded-lg bg-gray-400 drop-shadow-xl flex justify-between"
                onClick={toggleDropdown}
            >
                <div>
                    {userType.includes("ROLE_TEACHER") && (
                        <p>Họ tên sinh viên: {submission.username}</p>
                    )}
                    <p>Tiêu đề: {submission.title}</p>
                    <p>
                        Thời gian nộp: {submission.submittedDate}{" "}
                        {submission.isLate && "Muộn"}
                    </p>
                    {submission.point && (
                        <div className="content-center">Điểm: {submission.grade}/10</div>
                    )}

                </div>
                {userType.includes("ROLE_STUDENT") && 
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSubmission(submission.id);
                    }}
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 me-2 h-11 dark:bg-red-600 dark:hover:bg-red-700"
                >
                    Xóa
                </button>
                }
            </div>
            {isDropdownVisible && (
                <div className="p-3">
                    <div dangerouslySetInnerHTML={{ __html: submission.content }} />
                    <FileList files={files} />
                    {userType.includes("ROLE_TEACHER") && (
                        <button
                            className="text-white bg-blue-700 border-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 h-11 dark:bg-blue-600 dark:hover:bg-blue-700"
                            onClick={() => setIsFeedbackVisible(!isFeedbackVisible)}
                        >
                            Nhận xét
                        </button>
                    )}
                    {isFeedbackVisible && <FeedbackForm submissionId={submission.id} />}
                </div>
            )}
        </div>
    );
};

SubmissionItem.propTypes = {
    submission: PropTypes.object.isRequired,
    userType: PropTypes.array.isRequired,
    onDeleteSubmission: PropTypes.func.isRequired,
};

export default SubmissionItem;
