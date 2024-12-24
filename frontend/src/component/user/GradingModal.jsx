import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { createGrade } from '../../services/GradeService';

Modal.setAppElement('#root');

const GradingModal = ({ isOpen, onClose, user, onGradeAdded }) => {
    const [gradeData, setGradeData] = useState({
        progressScore: '',
        finalScore: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setGradeData({
            progressScore: user?.progressScore || '',
            finalScore: user?.finalScore || '',
        });
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (value === '' || (/^\d+(\.\d{1,2})?$/.test(value) && value <= 100)) {
            setGradeData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const courseId = localStorage.getItem('classId');
            await createGrade(user.id, courseId, gradeData);
            alert('Grade created successfully');
            onGradeAdded(user.id);
            onClose();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create grade';
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Grading Modal"
            className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-24"
        >
            <h2 className="text-lg font-bold mb-4">Nhập điểm cho {user?.username}</h2>
            <label htmlFor="progressScore" className="block mb-2">
                Điểm quá trình:
            </label>
            <input
                id="progressScore"
                type="text"
                name="progressScore"
                value={gradeData.progressScore}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded"
            />
            <label htmlFor="finalScore" className="block mb-4">
                Điểm cuối kỳ:
            </label>
            <input
                id="finalScore"
                type="text"
                name="finalScore"
                value={gradeData.finalScore}
                onChange={handleInputChange}
                className="w-full p-2 mt-1 border rounded"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
            >
                Cancel
            </button>
        </Modal>
    );
};

GradingModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    onGradeAdded: PropTypes.func.isRequired,
};

export default GradingModal;
