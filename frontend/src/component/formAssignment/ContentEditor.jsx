// ContentEditor.js
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ContentEditor = ({ content, setContent }) => (
    <div className="flex mb-5">
        <label className="text-sm font-bold w-20 mr-3">Nội dung:</label>
        <div className="w-full ml-1">
            <ReactQuill value={content} onChange={setContent} />
        </div>
    </div>
);
ContentEditor.propTypes = {
    content: PropTypes.string.isRequired,
    setContent: PropTypes.func.isRequired,
};

export default ContentEditor;
