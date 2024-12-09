import PropTypes from "prop-types";
import { useState } from "react";
import { updateGradeAndFeedback } from "../../services/SubmissionService";

const FeedbackForm = ({ submissionId }) => {
    const [feedback, setFeedback] = useState("");
    const [grade, setGrade] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateGradeAndFeedback(submissionId, grade, feedback);
            alert("Đã cập nhật nhận xét và điểm!");
        } catch (error) {
            console.error("Error updating grade and feedback:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col mt-4">
            <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Phản hồi"
                className="border p-2 rounded-lg"
            />
            <input
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                type="number"
                placeholder="Điểm"
                className="border p-2 rounded-lg mt-2"
            />
            <button className="bg-blue-700 text-white mt-2 p-2 rounded-lg">
                Cập nhật
            </button>
        </form>
    );
};

FeedbackForm.propTypes = {
    submissionId: PropTypes.number.isRequired,
};

export default FeedbackForm;
