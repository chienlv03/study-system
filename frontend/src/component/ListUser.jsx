import { useState, useEffect } from 'react';
import { toast, ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserInCourse, removeUserFromCourse, enrollCourse } from '../services/CourseEnrollmentService';
import { searchUser } from '../services/UserService';

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

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
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Flip,
      });
    } catch (error) {
      console.error('Error deleting student:', error);
    }
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

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
    setIsTyping(true);
  };

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
      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
    } catch (error) {
      setSearchItem('');
      toast.error(error.response.data.message, {
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

  return (
    <div className='sm:ml-64 mt-16 px-4 py-1'>
      <div className='relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg'>
        <table className="w-full text-sm text-gray-500 dark:text-gray-400">
          <caption className="p-5 sticky top-0 text-lg font-semibold rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            <ul className="text-left">
              <li>Mã lớp: {localStorage.getItem('classCode')}</li>
              <li>Tên Lớp: {localStorage.getItem('name')}</li>
              <li>Thời gian bắt đầu: {localStorage.getItem('startTime')}</li>
            </ul>
          </caption>
          <thead className="text-xs sticky z-0 top-28 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">STT</th>
              <th scope="col" className="px-6 py-3">Họ Và Tên</th>
              <th scope="col" className="px-6 py-3">Ngày sinh</th>
              <th scope="col" className="px-6 py-3">Giới tính</th>
              <th scope="col" className="px-6 py-3">Email</th>
              {userType.includes('ROLE_TEACHER') && <th scope="col" className="px-6 py-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center font-medium dark:text-white bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.dob}</td>
                <td className="px-6 py-4">{user.gender}</td>
                <td className="px-6 py-4">{user.email}</td>
                {userType.includes('ROLE_TEACHER') &&
                  <td className="px-6 py-4">
                    <button onClick={() => handleDeleteUser(user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Xóa</button>
                  </td>
                }
              </tr>
            ))}
          </tbody>
        </table>
        {userType.includes('ROLE_TEACHER') &&
          <div className='absolute w-1/3 right-5 top-8'>
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Type to search"
              required
              autoComplete='off'
              value={searchItem}
              onChange={handleInputChange}
            />
          </div>
        }
        <div className="absolute w-1/3 right-5 rounded-lg overflow-hidden z-50 text-sm text-left rtl:text-right dark:text-gray-900" style={{ top: '86px' }}>
          {isTyping && filteredUsers.length === 0 && <p className='text-white ml-2 mt-2'>Không tìm thấy kết quả</p>}
          <table className=" w-full">
            <thead><tr><th></th></tr></thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="bg-white border-b dark:border-gray-800">
                  <th className="px-6 py-3 font-bold whitespace-nowrap dark:text-black">
                    {user.username}
                  </th>
                  <th onClick={() => handleAddUser(user.id)} className="font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="12.142A2" className="w-6 h-6">
                      <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                    </svg>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListUser;
