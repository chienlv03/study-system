import PropTypes from 'prop-types';

const ImportExcel = ({ fileName, handleFileChange, handleImportStudents, handleRemoveFile }) => (
    <div className="absolute flex top-6 right-1/3 mt-4 cursor-pointer">
        {!fileName ? (
            <label className="text-black mt-1">
                <span className="bg-gray-200 border border-gray-200 rounded px-1 py-1">Select File</span>
                <input
                    type="file"
                    accept=".xls,.xlsx"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </label>
        ) : (
            <div className="flex items-center space-x-2">
                <span className="text-white">{fileName}</span>
                <svg onClick={handleRemoveFile} className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
            </div>
        )}
        <button
            onClick={handleImportStudents}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 ml-2"
            disabled={!fileName}
        >
            Import
        </button>
    </div>
);

ImportExcel.propTypes = {
    fileName: PropTypes.string,
    handleFileChange: PropTypes.func.isRequired,
    handleImportStudents: PropTypes.func.isRequired,
    handleRemoveFile: PropTypes.func.isRequired,
};

export default ImportExcel;
