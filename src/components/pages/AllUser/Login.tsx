import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../Redex/UserInfo';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../Redex/Store';
import toast from 'react-hot-toast';
import { LoginFn, resetlogin } from '../../../Redex/All Tables slice/Login';

export const Login = () => {
    const toastId: string = 'login';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const login = useSelector((state: RootState) => state.Login);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            email,
            password,
        };

        toast.loading('Loading! Please wait', { id: toastId });
        dispatch(LoginFn(data));
    };

    useEffect(() => {
        if (localStorage.getItem('userInfo')) {
            navigate('/dashboard/overview');
        }
    }, []);

    useEffect(() => {
        if (login.isSuccess && login.data && 'result' in login.data) {
            const { name, email, token, image, Role }: any = login.data.result;
            dispatch(setUser({ name, email, token, image, Role }));
            toast.success('Success', { id: toastId });
            navigate('/dashboard/overview');
        }

        dispatch(resetlogin());
        if (login.isError) {
            toast.error(login.errorMsg, { id: toastId });
        }
    }, [login.isError, login.isSuccess]);

    return (
        <div className="relative flex flex-col justify-center min-h-screen bg-gradient-to-r from-green-500 via-green-500 to-red-500">
            <div className="w-full p-6 m-auto bg-white rounded-lg shadow-lg lg:max-w-md">
                <h1 className="text-4xl font-bold text-center text-gray-800">Welcome Back!</h1>
                <p className="mt-2 text-sm text-center text-gray-600">Please login to your account</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <a href="#" className="text-sm text-green-600 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>

                <div className="relative flex items-center justify-center mt-6 border-t border-gray-300">
                    <span className="absolute px-2 text-sm text-gray-600 bg-white">Or</span>
                </div>

                <div className="flex gap-4 mt-6">
                    <button className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-green-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                        </svg>
                    </button>

                    <button className="flex items-center justify-center w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-green-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                            <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                    </button>
                </div>

                <p className="mt-8 text-sm text-center text-gray-600">
                    Don’t have an account?{' '}
                    <a href="#" className="font-medium text-green-600 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;