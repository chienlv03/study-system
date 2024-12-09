// TitleInput.js
import PropTypes from 'prop-types';

const TitleInput = ({ title, setTitle }) => (
    <div className="flex w-full items-end mb-4">
        <label className="text-sm font-bold mr-9">Tiêu đề:</label>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" border-b border-gray-300 text-sm focus:outline-none w-3/4 p-2"
        />
    </div>
);
TitleInput.propTypes = {
    title: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
};

export default TitleInput;
