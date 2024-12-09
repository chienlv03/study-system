import PropTypes from 'prop-types';
const FileList = ({ files }) => {
    const isImage = (fileName) => {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const extension = fileName.split('.').pop().toLowerCase();
        return imageExtensions.includes(extension);
    };

    return (
        <ul>
            {files.map((file, index) => (
                <li key={index} className="my-2">
                    {isImage(file.fileName) ? (
                        <img
                            src={`data:image/jpeg;base64,${file.fileData}`}
                            alt={file.fileName}
                            className="border border-gray-300 rounded-lg p-2 w-1/3"
                        />
                    ) : (
                        <a
                            className="text-sm border w-1/2 border-blue-300 rounded-lg p-2 bg-gray-300"
                            href={`data:${file.fileType};base64,${file.fileData}`}
                            download={file.fileName}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {file.fileName}
                        </a>
                    )}
                </li>
            ))}
        </ul>
    );
};

FileList.propTypes = {
    files: PropTypes.array.isRequired,
};

export default FileList;