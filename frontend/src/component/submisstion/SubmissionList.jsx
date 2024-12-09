import SubmissionItem from "./SubmissionItem";
import PropTypes from "prop-types";

const SubmissionList = ({ submissions, userType, onDeleteSubmission }) => {
    return submissions.length > 0 ? (
        submissions.map((submission, index) => (
            <SubmissionItem
                key={index}
                submission={submission}
                userType={userType}
                onDeleteSubmission={onDeleteSubmission}
            />
        ))
    ) : (
        <div className="text-center mt-5">Không có bài tập nào</div>
    );
};

SubmissionList.propTypes = {    
    submissions: PropTypes.array.isRequired,
    userType: PropTypes.array.isRequired,
    onDeleteSubmission: PropTypes.func.isRequired,
};

export default SubmissionList;
