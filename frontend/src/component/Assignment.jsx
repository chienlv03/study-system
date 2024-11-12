import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAssignmentBycourseId, updateDueDate, deleteAssignment } from "../services/AssignmentService";
import { getFileByAssignment } from "../services/AssignmentFileService";


const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(null); // Manage visibility per assignment
  const [files, setFiles] = useState([]);
  const [editingDueDate, setEditingDueDate] = useState(null); // Trạng thái để quản lý chế độ chỉnh sửa hạn nộp
  const [dueDate, setDueDate] = useState('');

  const navigate = useNavigate();

  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  const userType = loginResponse.roles;
  const classId = localStorage.getItem('classId');

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const classId = localStorage.getItem('classId');

    try {
      const response = await getAssignmentBycourseId(classId);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchAssignmentsFile = async (assignmentId) => {
    try {
      const response = await getFileByAssignment(assignmentId);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const toggleDropdown = (index, assignmentId) => {
    setIsDropdownVisible(isDropdownVisible === index ? null : index);
    fetchAssignmentsFile(assignmentId);
    localStorage.setItem('assignmentId', assignmentId);
  };

  const handleEditDueDate = (assignmentId, currentDueDate) => {
    setEditingDueDate(editingDueDate === assignmentId ? null : assignmentId); // Toggle chế độ chỉnh sửa
    const momentDate = moment(currentDueDate, "DD-MM-YYYY HH:mm");
    const formattedDueDate = momentDate.format("YYYY-MM-DDTHH:mm");
    setDueDate(formattedDueDate); // Format current due date for input field
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSaveDueDate = async (assignmentId) => {
    try {
      const formattedDueDate = moment(dueDate).format("DD-MM-YYYY HH:mm");
  
      await updateDueDate(assignmentId, { dueDate: formattedDueDate }); // Just send the string
  
      setAssignments(assignments.map(assignment => 
        assignment.id === assignmentId ? { ...assignment, dueDate: formattedDueDate } : assignment
      ));
      
      setEditingDueDate(null); // Exit editing mode
      
      toast.success("Hạn nộp đã được cập nhật!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } catch (error) {
      console.error("Error updating due date:", error);
      toast.error("Không thể cập nhật hạn nộp.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    }
  };
  

  const handleDelete = async (assignmentId) => {
    try {
      await deleteAssignment(assignmentId);
      setAssignments(assignments.filter(assignment => assignment.id !== assignmentId));
      setIsDropdownVisible(null);
      toast.success("Đã xóa bài tập", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleNavigation = (path, assignmentId) => {
    navigate(path);
    localStorage.setItem('assignmentId', assignmentId);
  };

  const isImage = (fileName) => {
    // Check if the file is an image based on its extension
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    const extension = fileName.split('.').pop().toLowerCase();
    return imageExtensions.includes(extension);
  };

  return (
    <div className='sm:ml-64 mt-16 px-4 py-1'>
      <div className="bg-white sticky top-0 p-4 mt-1 border shadow-xl border-gray-200">
        <h1 className="text-center text-xl font-bold">Các bài tập đã tạo</h1>
      </div>

      {assignments.length > 0 ? (
        assignments.map((assignment, index) => (
          <div key={index} className='border border-gray-400 rounded-lg p-1'>
            <div className="relative text-white rounded-lg p-4 mt-1 dark:bg-gray-800 dark:border-gray-700">
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
                      type="button"
                      className="ml-2 text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none"
                    >
                      Lưu hạn nộp
                    </button>
                  </div>
                ) : (
                  <p>Hạn nộp: {assignment.dueDate}</p>
                )}
                {userType.includes('ROLE_TEACHER') &&
                  <p>Số lượng đã nộp: {assignment.totalSubmissions}/{localStorage.getItem('currentStudents')}</p>
                }
              </div>
              <div className="absolute top-10 right-3">
                <button
                  onClick={() => toggleDropdown(index, assignment.id)}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                >
                  Chi tiết
                </button>

                {userType.includes('ROLE_TEACHER') &&
                  <button
                    onClick={() => handleEditDueDate(assignment.id, assignment.dueDate)}
                    type="button"
                    className="text-white bg-yellow-700 hover:bg-yellow-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-yellow-600 dark:hover:bg-yellow-700 focus:outline-none"
                  >
                    {editingDueDate === assignment.id ? "Hủy" : "Cập nhật hạn nộp"}
                  </button>
                }

                {userType.includes('ROLE_TEACHER') &&
                  <button
                    onClick={() => handleDelete(assignment.id)
                    }
                    type="button"
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none"
                  >
                    Xóa
                  </button>
                }

                {userType.includes('ROLE_TEACHER') &&
                  <button
                    onClick={() => (handleNavigation(`/detail-class/${classId}/submission`, assignment.id), localStorage.setItem('assignmentTitle', assignment.title))}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                  >
                    Các bài đã nộp
                  </button>
                }

                {userType.includes('ROLE_STUDENT') &&
                  <button
                    onClick={() => {
                      handleNavigation(`/detail-class/${classId}/assignment-form`, assignment.id);
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                  >
                    Làm bài
                  </button>
                }
              </div>
            </div>

            {isDropdownVisible === index && (
              <div className="p-3">
                <div className="border border-gray-200 rounded-lg p-3" dangerouslySetInnerHTML={{ __html: assignment.content }}></div>
                <div>
                  <ul>
                    {files.map((file, i) => (
                      <li className="my-2" key={i}>
                        {isImage(file.fileName) ? (
                          // Render image if the file is an image
                          <img
                            src={`data:image/jpeg;base64,${file.fileData}`}
                            alt={file.fileName}
                            className="border border-gray-300 rounded-lg p-2 w-1/3"
                          />
                        ) : (
                          <a
                            className="text-sm border border-blue-300 rounded-lg p-2 bg-gray-300"
                            href={`data:${file.fileType};base64,${file.fileData}`}
                            download={file.fileName}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.fileName.replace(/_\d+/, '')}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center mt-5">Không có bài tập nào</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Assignment;
