// FileUploadButton.js
import PropTypes from 'prop-types';

const FileUploadButton = ({ handleFileChange }) => (
    <div className="font-bold ml-24">
        <label className="flex w-36 items-center cursor-pointer">
            <svg className="h-4 w-4 text-gray-800 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2zm8 0v16m-4-8h8"></path>
            </svg>
            <span className="text-sm">File đính kèm</span>
            <input type="file" className="hidden" multiple onChange={handleFileChange} />
        </label>
    </div>
);

FileUploadButton.propTypes = {
    handleFileChange: PropTypes.func.isRequired,
};

export default FileUploadButton;
