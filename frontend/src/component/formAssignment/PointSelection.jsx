// PointSelection.js
import PropTypes from 'prop-types';

const PointSelection = ({ point, setPoint }) => (
    <div className="flex items-center">
        <label className="text-sm font-bold mx-4">Điểm:</label>
        <label className="flex items-center mr-5 cursor-pointer">
            <input
                type="radio"
                name="point"
                checked={point === true}
                onChange={() => setPoint(true)}
                className="w-4 h-4 text-gray-800 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <span className="ms-2 text-sm font-bold">Có</span>
        </label>
        <label className="flex items-center cursor-pointer">
            <input
                type="radio"
                name="point"
                checked={point === false}
                onChange={() => setPoint(false)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <span className="ms-2 text-sm font-bold">Không</span>
        </label>
    </div>
);
PointSelection.propTypes = {
    point: PropTypes.bool.isRequired,
    setPoint: PropTypes.func.isRequired,
};

export default PointSelection;
