import { useState, useEffect } from 'react';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserInCourse, removeUserFromCourse, enrollCourse, importExcel } from '../../services/EnrollmentService';
import { searchUser } from '../../services/UserService';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import SearchResultList from './SearchResultList';
import ImportExcel from './ImportExcel';

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);

  const loginResponse = JSON.parse(localStorage.getItem('loginResponse'));
  const userType = loginResponse.roles;
  const courseId = localStorage.getItem('classId');

  useEffect(() => {
    getAllStudent();
  }, []);

  const getAllStudent = async () => {
    try {
      const response = await getUserInCourse(courseId);
      setUsers(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await removeUserFromCourse(userId, courseId);
      setUsers(users.filter((user) => user.id !== userId));
      toast(response.data.message, {
        position: "top-center",
        autoClose: 1000,
        theme: "light",
        transition: Flip,
      });
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
    setIsTyping(true);
  };

  useEffect(() => {
    if (searchItem.trim() !== '') {
      const fetchUsers = async () => {
        try {
          const response = await searchUser(searchItem);
          setFilteredUsers(response.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchUsers();
    } else {
      setFilteredUsers([]);
    }
  }, [searchItem]);

  useEffect(() => {
    if (searchItem.trim() === '') {
      setIsTyping(false);
      setFilteredUsers([]);
    }
  }, [searchItem]);

  const handleAddUser = async (userId) => {
    try {
      const response = await enrollCourse(userId, courseId);
      setSearchItem('');
      getAllStudent();
      toast.success(response.data.message, { position: "top-center", autoClose: 2000, theme: "dark", transition: Flip });
    } catch (error) {
      setSearchItem('');
      toast.error(error.response.data.message, { position: "top-center", autoClose: 3000, theme: "dark", transition: Flip });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("Please select a file.", { position: "top-center", theme: "light" });
      return;
    }

    const validTypes = [
      "application/vnd.ms-excel", // .xls
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // .xlsx
    ];

    if (!validTypes.includes(file.type)) {
      toast.error("Invalid file type. Please upload an Excel file (.xls or .xlsx).", {
        position: "top-center",
        theme: "light",
      });
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error("File size exceeds the maximum limit of 10MB.", { position: "top-center", theme: "light" });
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileName(null);
  };

  const handleImportStudents = async () => {
    if (!selectedFile) {
      toast.error("No file selected. Please upload a file.", { position: "top-center", theme: "light" });
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await importExcel(formData, courseId);
      getAllStudent();
      setSelectedFile(null);
      setFileName(null);
      toast.success(response.data.message, { position: "top-center", autoClose: 2000, theme: "dark", transition: Flip });
    } catch (error) {
      console.error(error.response.data);
      if (error.response && error.response.data) {
        // Join the array of error messages into a single string
        const errorMessage = error.response.data.join('\n');
        toast.error(errorMessage, {
          position: "top-center",
          autoClose: 5000, // Adjust timeout as needed
          theme: "dark",
          transition: Flip
        });
      } else {
        toast.error("An error occurred during import.", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
          transition: Flip
        });
      }
    }
  };

  return (
    <div className='sm:ml-64 mt-16 px-4 py-1 relative'>
      <UserTable
        users={users}
        userType={userType}
        handleDeleteUser={handleDeleteUser}
        
      />

      {userType.includes('ROLE_TEACHER') &&
        <>
          <div>
            <SearchBar searchItem={searchItem} handleInputChange={handleInputChange} />
            <SearchResultList isTyping={isTyping} filteredUsers={filteredUsers} handleAddUser={handleAddUser} />
          </div>

          <div className="">
            <ImportExcel
              fileName={fileName}
              handleFileChange={handleFileChange}
              handleImportStudents={handleImportStudents}
              handleRemoveFile={handleRemoveFile}
            />
          </div>
        </>
      }
      <ToastContainer />
    </div>
  );
};

export default ListUser;
