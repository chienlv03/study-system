// DueDateInput.js
import moment from 'moment';
import PropTypes from 'prop-types';

const DueDateInput = ({ dueDate, setDueDate, error, setError }) => {
    const handleDueDateChange = (e) => {
        const selectedDate = moment(e.target.value);
        if (selectedDate.isBefore(moment())) {
            setError("Hạn nộp bài phải sau thời gian hiện tại");
            e.target.blur()
        } else {
            setDueDate(selectedDate.format('YYYY-MM-DDTHH:mm'));
            setError('');
            e.target.blur()
        }
    };

    return (
        <div className="mb-4">
            <div className='flex items-end'>
                <label className="text-sm font-bold mr-2">Hạn nộp bài:</label>
                <input
                    type="datetime-local"
                    value={dueDate}
                    onChange={handleDueDateChange}
                    className="border-b border-gray-300 text-sm focus:outline-none w-2/5 p-1"
                />
            </div>
            {error && <p className="text-red-500 text-sm mt-1 ml-24">{error}</p>}
        </div>
    );
};

DueDateInput.propTypes = {
    dueDate: PropTypes.string.isRequired,
    setDueDate: PropTypes.func.isRequired,
    error: PropTypes.string,
    setError: PropTypes.func.isRequired,
};

export default DueDateInput;
