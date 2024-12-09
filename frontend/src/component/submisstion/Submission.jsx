import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getSubmissionByAssignment, getSubmissionByUserAndCourse, deleteSubmission } from "../../services/SubmissionService";
import SubmissionList from "./SubmissionList";

const Submission = () => {
    const [submissions, setSubmissions] = useState([]);
    const navigate = useNavigate();

    const assignmentId = localStorage.getItem("assignmentId");
    const assignmentTitle = localStorage.getItem("assignmentTitle");
    const classId = localStorage.getItem("classId");
    const user = JSON.parse(localStorage.getItem("loginResponse"));
    const userType = user.roles;
    const userId = user.id;

    useEffect(() => {
        fetchSubmission();
    }, []);

    const fetchSubmission = async () => {
        try {
            let response = null;
            if (userType.includes("ROLE_TEACHER")) {
                response = await getSubmissionByAssignment(assignmentId);
            } else if (userType.includes("ROLE_STUDENT")) {
                response = await getSubmissionByUserAndCourse(userId, classId);
            }
            setSubmissions(response.data);
        } catch (error) {
            console.error("Error fetching submissions:", error);
        }
    };

    const handleDeleteSubmission = async (submissionId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa bài tập này không?")) return;
        try {
            await deleteSubmission(submissionId, assignmentId);
            setSubmissions((prev) => prev.filter((submission) => submission.id !== submissionId));
            toast.success("Đã xóa bài tập!", { theme: "dark", transition: Flip });
        } catch (error) {
            console.error("Error deleting assignment:", error);
            toast.error("Không thể xóa bài tập.", { theme: "dark", transition: Flip });
        }
    };

    return (
        <div className="sm:ml-64 mt-16 px-4 py-1">
            <header className="border border-gray-200 rounded-lg py-2 text-center text-xl font-bold">
                <p onClick={() => navigate(-1)} className="float-left">
                    <svg
                        className="h-8 w-8 text-gray-500"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="15 6 9 12 15 18" />
                    </svg>
                </p>
                <h1>
                    {userType.includes("ROLE_TEACHER")
                        ? `Danh sách sinh viên nộp bài tập ${assignmentTitle}`
                        : "Bài tập đã nộp"}
                </h1>
            </header>
            <SubmissionList
                submissions={submissions}
                userType={userType}
                onDeleteSubmission={handleDeleteSubmission}
            />
            <ToastContainer position="top-center" autoClose={1000} />
        </div>
    );
};

export default Submission;
