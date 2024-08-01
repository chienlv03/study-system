import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { signin } from '../../services/AuthService';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Đảo ngược giá trị của state showPassword khi click
    };

    // eslint-disable-next-line no-unused-vars
    const handleLogin = async (e) => {
        e.preventDefault();
        // setLoading(true);

        const data = { email, password };

        try {
            const response = await signin(data);
            console.log(response.data.id); 
            // console.log(response.data);
            
            localStorage.setItem('loginResponse', JSON.stringify(response.data));
            setError('');
            
                navigate('/class-list');
        } catch (err) {
            setError(err.response.data.message); // Handle login error
            // setLoading(false);
        }
    };


    return (
        <div>
            {/* {loading && <Spiner />} */}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Đăng nhập vào tài khoản của bạn
                            </h1>
                            {/* {error && <div className="text-red-500">{error}</div>} */}
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                        required=""
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div onClick={handleTogglePasswordVisibility} className='relative cursor-pointer'>
                                        {showPassword ? <svg className="h-6 w-6 absolute -top-8 right-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg> : <svg className="h-6 w-6 absolute -top-8 right-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Nhớ mật khẩu</label>
                                        </div>
                                    </div>
                                    <a className="text-sm cursor-pointer font-medium text-gray-400 hover:underline ">Quên mật khẩu?</a>
                                </div>
                                <button
                                    type="submit"
                                    className={email && password ? "w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" : "w-full bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"}
                                    disabled={email && password ? false : true}
                                    onClick={(e) => handleLogin(e)}
                                >Đăng nhập</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Tôi chưa có tài khoản? <a onClick={() => navigate('/sign-up')} className="font-medium cursor-pointer text-primary-600 hover:underline dark:text-primary-300">Đăng ký</a>
                                </p>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                            </form>
                        </div>
                    </div>
                </div>  
            </section>
        </div>
    )
}

export default LoginForm
