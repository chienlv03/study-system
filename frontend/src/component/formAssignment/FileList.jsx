// FileList.js
import PropTypes from 'prop-types';

const FileList = ({ selectedFiles, removeFile }) => (
    <ul className="ml-24 w-1/3">
        {selectedFiles.map((file, index) => (
            <li key={index} className="flex items-center justify-between text-sm border bg-gray-200 rounded-lg p-3 mb-1">
                {file.name}
                <svg
                    onClick={() => removeFile(index)}
                    className="h-4 w-4 text-red-800 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </li>
        ))}
    </ul>
);

FileList.propTypes = {
    selectedFiles: PropTypes.array.isRequired,
    removeFile: PropTypes.func.isRequired,
};

export default FileList;
