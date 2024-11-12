import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/AuthService';

const SignUpForm = () => {
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ROLE_STUDENT');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        const data = { username, email, dob, gender, password, role: [role] };

        try {
            await signup(data);
            setError('');
            alert("Đăng ký thành công")
            navigate('/sign-in');
        } catch (err) {
            setError(err.response.data.message); // Handle registration error
        }
    };

    const navigate = useNavigate();

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900 mt-12 pt-32">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-3xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
                                Đăng ký tài khoản
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div className="grid md:grid-cols-2 md:gap-8">
                                    
                                    <div className="flex items-center h-8 mt-8">
                                        <label htmlFor="role" className="block me-5 text-lg font-bold text-gray-900 dark:text-white">Bạn là:</label>
                                        <div className="flex items-center me-5">
                                            <input 
                                                id="role-student" 
                                                type="radio"
                                                name="inline-radio-group" 
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                                value= "ROLE_STUDENT"
                                                checked={role === 'ROLE_STUDENT'}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <label htmlFor="role-student" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Sinh viên</label>
                                        </div>
                                        <div className="flex items-center me-4">
                                            <input 
                                                id="role-teacher" 
                                                type="radio"
                                                name="inline-radio-group" 
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                                                value= "ROLE_TEACHER"
                                                checked={role === 'ROLE_TEACHER'}
                                                onChange={(e) => setRole(e.target.value)}
                                            />
                                            <label htmlFor="role-teacher" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Giáo viên</label>
                                        </div>
                                    </div>

                                </div>
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                                    <input
                                        type="text"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Username"
                                        required=""
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 md:gap-6">
                                    <div>
                                        <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ngày sinh</label>
                                        <input
                                            type="text"
                                            id="dob"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="dd/mm/yyyy"
                                            required=""
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Giới tính</label>
                                        <select
                                            id="gender"
                                            name='gender'
                                            value={gender}
                                            onChange={e => setGender(e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="">Chọn....</option>
                                            <option value="nam">Nam</option>
                                            <option value="nữ">Nữ</option>
                                            <option value="khác">Khác</option>
                                        </select>
                                    </div>

                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@gmail.com"
                                        required=""
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nhập lại mật khẩu</label>
                                    <input
                                        type="password"
                                        id="confirm-password" placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button onClick={handleSubmit} className={username && email && password && confirmPassword ? "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" : "w-full bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"}>Create an account</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Tôi đã có tài khoản? <a onClick={() => navigate('/sign-in')} className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-500">Đăng nhập</a>
                                </p>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUpForm;
