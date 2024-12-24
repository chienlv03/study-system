import Modal from 'react-modal'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { createCourse } from '../services/CourseService';

const ModalAddCourse = ({ showModal, setShowModal, onClassAdded }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        startTime: '',
        endTime: '',
        maxStudents: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.endTime <= formData.startTime) {
            setErrorMessage("Thời gian kết thúc phải sau thời gian bắt đầu.");
            return;
        }
        setIsLoading(true);
        try {
            const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
            const userId = loginResponse.id;
            const response = await createCourse(formData, userId);
            if (onClassAdded) {
                onClassAdded(response.data); // response.data là lớp vừa được thêm
            }
            setShowModal(false);
        } catch (error) {
            setErrorMessage("Failed to create the course. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setFormData({ name: '', startTime: '', endTime: '', maxStudents: '' });
        setErrorMessage('');
    };

    return (
        <Modal
            isOpen={showModal}
            onRequestClose={handleClose}
            className={"bg-gray-400 p-6 w-2/3 rounded-lg shadow-lg m-auto mt-40"}
            size="lg"
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg shadow-lg p-6"
            >
                <div className='grid md:grid-cols-2 md:gap-6'>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Tên Lớp
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="number"
                            name="maxStudents"
                            id="maxStudents"
                            min="0"
                            value={formData.maxStudents}
                            onChange={handleInputChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="maxStudents"
                            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Số lượng sinh viên
                        </label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="time"
                            name="startTime"
                            id="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="startTime"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-900 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Thời gian bắt đầu
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="time"
                            name="endTime"
                            id="endTime"
                            value={formData.endTime}
                            onChange={handleInputChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required />
                        <label
                            htmlFor="endTime"
                            className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-800 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                            Thời gian kết thúc
                        </label>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setShowModal(false);
                            localStorage.removeItem('classId');
                        }}
                        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                    >
                        Cancel
                    </button>
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </form>
        </Modal>
    )
}


ModalAddCourse.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    onClassAdded: PropTypes.func,
};

export default ModalAddCourse
