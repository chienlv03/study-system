import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAssignmentBycourseId, updateDueDate, deleteAssignment } from "../../services/AssignmentService";
import { getFileByAssignment } from "../../services/AssignmentFileService";
import { checkIsSubmitted } from "../../services/SubmissionService";
import AssignmentItem from "./AssignmentItem";

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(null);
  const [files, setFiles] = useState([]);
  const [editingDueDate, setEditingDueDate] = useState(null);
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();

    const loginResponse = useMemo(() => JSON.parse(localStorage.getItem('loginResponse')) || {}, []);
    const userType = useMemo(() => loginResponse.roles || [], [loginResponse]);
    const classId = localStorage.getItem('classId');
    const userId = loginResponse.id;

  useEffect(() => {
    fetchAssignments();
  }, []);


  const fetchAssignments = async () => {
    try {
      const response = await getAssignmentBycourseId(classId);
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchAssignmentsFile = async (assignmentId) => {
    try {
      const response = await getFileByAssignment(assignmentId);
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchIsSubmitted = async (assignmentId) => {
    try {
      const response = await checkIsSubmitted(assignmentId, userId);
      // console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.error("Error checking submission status:", error);
      return false; // Mặc định false nếu lỗi
    }
  };

  const toggleDropdown = (index, assignmentId) => {
    setIsDropdownVisible(isDropdownVisible === index ? null : index);
    fetchAssignmentsFile(assignmentId);
  };

  const handleEditDueDate = (assignmentId, currentDueDate) => {
    setEditingDueDate(editingDueDate === assignmentId ? null : assignmentId);
    const formattedDueDate = moment(currentDueDate, "DD-MM-YYYY HH:mm").format("YYYY-MM-DDTHH:mm");
    setDueDate(formattedDueDate);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
    event.target.blur()
  };

  const handleSaveDueDate = async (assignmentId) => {
    try {
      const formattedDueDate = moment(dueDate).format("DD-MM-YYYY HH:mm");
      await updateDueDate(assignmentId, { dueDate: formattedDueDate });
      setAssignments(
        assignments.map((assignment) =>
          assignment.id === assignmentId ? { ...assignment, dueDate: formattedDueDate } : assignment
        )
      );
      setEditingDueDate(null);
      toast.success("Hạn nộp đã được cập nhật!", { theme: "dark", transition: Flip });
    } catch (error) {
      console.error("Error updating due date:", error);
      toast.error("Không thể cập nhật hạn nộp.", { theme: "dark", transition: Flip });
    }
  };

  const handleDelete = async (assignmentId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa bài tập này không?")) return;
    try {
      await deleteAssignment(assignmentId);
      setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
      toast.success("Đã xóa bài tập!", { theme: "dark", transition: Flip });
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast.error("Không thể xóa bài tập.", { theme: "dark", transition: Flip });
    }
  };

  const handleNavigation = (path, assignmentId, title) => {
    localStorage.setItem("assignmentId", assignmentId);
    localStorage.setItem("assignmentTitle", title);
    navigate(path);
  };

  return (
    <div className="sm:ml-64 mt-16 px-4 py-1 relative">
      <div className="grid grid-cols-1 gap-2">
        <div className="bg-white sticky top-0 p-4 mt-1 border shadow-xl border-gray-200">
          <h1 className="text-center text-xl font-bold">{userType.includes("ROLE_TEACHER") ? "Bài tập đã tạo" : "Bài tập được giao"}</h1>
        </div>
        {assignments.map((assignment, index) => (
          <AssignmentItem
            key={assignment.id}
            assignment={assignment}
            index={index}
            isDropdownVisible={isDropdownVisible}
            toggleDropdown={toggleDropdown}
            handleEditDueDate={handleEditDueDate}
            handleSaveDueDate={handleSaveDueDate}
            handleDelete={handleDelete}
            handleNavigation={handleNavigation}
            editingDueDate={editingDueDate}
            dueDate={dueDate}
            handleDueDateChange={handleDueDateChange}
            files={files}
            fetchAssignmentsFile={fetchAssignmentsFile}
            userType={userType}
            classId={classId}
            fetchIsSubmitted={fetchIsSubmitted}
          />
        ))}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
      />
    </div>
  );
};

export default Assignment;
