import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const AssignmentItem = ({
  assignment,
  index,
  isDropdownVisible,
  toggleDropdown,
  handleEditDueDate,
  handleSaveDueDate,
  handleDelete,
  handleNavigation,
  editingDueDate,
  dueDate,
  handleDueDateChange,
  files,
  userType,
  classId,
  fetchIsSubmitted,
}) => {
  const isImage = (fileName) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const extension = fileName.split(".").pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  const [isSubmitted, setIsSubmitted] = useState('');

  useEffect(() => {
    const fetchSubmittedStatus = async () => {
      try {
        const submitted = await fetchIsSubmitted(assignment.id);
        console.log("submitted", submitted + " " + assignment.id);
        setIsSubmitted(submitted);
      } catch (error) {
        console.error("Error checking submission status:", error);
      }
    };

    fetchSubmittedStatus();
  }, [assignment.id, fetchIsSubmitted]);

  return (
    <div className="border border-gray-400 rounded-lg p-1">
      <div className="relative text-white rounded-lg p-4 mt-1 dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
        <div>
          <h3>Tiêu đề: {assignment.title}</h3>
          <p>Ngày tạo: {assignment.assignedDate}</p>
          {editingDueDate === assignment.id ? (
            <div>
              <input
                className="dark:bg-gray-600"
                type="datetime-local"
                value={dueDate}
                onChange={handleDueDateChange}
              />
              <button
                onClick={() => handleSaveDueDate(assignment.id)}
                className="ml-2 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
              >
                Lưu hạn nộp
              </button>
            </div>
          ) : (
            <p>Hạn nộp: {assignment.dueDate}</p>
          )}
          {userType.includes("ROLE_TEACHER") && (
            <p>
              Số lượng đã nộp: {assignment.totalSubmissions}/
              {localStorage.getItem("currentStudents")}
            </p>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleDropdown(index, assignment.id)}
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 w-32 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isDropdownVisible === index ? "Ẩn" : "Xem chi tiết"}
          </button>
          {userType.includes("ROLE_TEACHER") && (
            <>
              <button
                onClick={() => handleEditDueDate(assignment.id, assignment.dueDate)}
                className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg w-40 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700"
              >
                {editingDueDate === assignment.id ? "Hủy" : "Cập nhật hạn nộp"}
              </button>
              <button
                onClick={() => handleDelete(assignment.id)}
                className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
              >
                Xóa
              </button>
              <button
                onClick={() => handleNavigation(`/detail-class/${classId}/submission`, assignment.id, assignment.title)}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Các bài đã nộp
              </button>
            </>
          )}
          {userType.includes("ROLE_STUDENT") && (
           
              <button
                onClick={() => handleNavigation(`/detail-class/${classId}/assignment-form`, assignment.id)}
                className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 w-28 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700"
              >
                {isSubmitted ? "Nộp lại" : "Nộp bài"}
              </button>
            
          )}
        </div>
      </div>
      {isDropdownVisible === index && (
        <div className="p-3">
          <div
            className="border border-gray-200 rounded-lg p-3"
            dangerouslySetInnerHTML={{ __html: assignment.content }}
          ></div>
          <div>
            {/* <FileList files={files} isImage={isImage}></FileList> */}
            <ul>
              {files.map((file, i) => (
                <li className="my-4" key={i}>
                  {isImage(file.fileName) ? (
                    <img
                      src={`data:image/jpeg;base64,${file.fileData}`}
                      alt={file.fileName}
                      className="border border-gray-300 rounded-lg p-2 w-1/3"
                    />
                  ) : (
                    <a
                      className="text-sm border w-full mb-2 border-blue-300 rounded-lg p-2 bg-gray-300"
                      href={`data:${file.fileType};base64,${file.fileData}`}
                      download={file.fileName}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.fileName.replace(/_\d+/, "")}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

AssignmentItem.propTypes = {
  assignment: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isDropdownVisible: PropTypes.number,
  toggleDropdown: PropTypes.func.isRequired,
  handleEditDueDate: PropTypes.func.isRequired,
  handleSaveDueDate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleNavigation: PropTypes.func.isRequired,
  editingDueDate: PropTypes.number,
  dueDate: PropTypes.string,
  handleDueDateChange: PropTypes.func.isRequired,
  files: PropTypes.array.isRequired,
  fetchAssignmentsFile: PropTypes.func.isRequired,
  userType: PropTypes.array.isRequired,
  classId: PropTypes.string.isRequired,
  fetchIsSubmitted: PropTypes.func.isRequired,
};

export default AssignmentItem;
