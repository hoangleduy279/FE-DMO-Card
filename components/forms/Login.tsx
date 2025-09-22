'use client';

import { createRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Validator from '@components/commons/Validator';
import Input from '@components/commons/Input';

import { fetchLogin, setModal } from '@redux/actions';

import { validateHelper } from '@utils/helpers';
import { useAppDispatch, useTrans } from '@utils/hooks';
import Button from '@components/commons/Button';
import { http, routes } from '@utils/constants';
import { useRouter } from 'next/navigation';

const LoginForm = forwardRef<ILoginComponentHandle, ILoginComponentProps>((_, ref) => {
    const trans = useTrans();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [state, setState] = useState<ILoginComponentState>({
        email: '',
        password: '',
        showPassword: false,
    });
    const { email, password, showPassword } = state;
    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();

    useImperativeHandle(ref, () => ({
        onSubmit: () => {
            submitForm();
        },
    }));

    const submitForm = async () => {
        let isValidate = true;

        emailValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(email ?? '')) {
            emailValidatorRef?.current?.onValidateMessage('Empty');
            isValidate = false;
        } else if (!validateHelper.isEmail(email ?? '')) {
            emailValidatorRef?.current?.onValidateMessage('Email Invalid');
            isValidate = false;
        }

        passwordValidatorRef?.current?.onValidateMessage('');
        if (validateHelper.isEmpty(password ?? '')) {
            passwordValidatorRef?.current?.onValidateMessage('Empty');
            isValidate = false;
        } else if ((password ?? '').length < 8) {
            passwordValidatorRef?.current?.onValidateMessage('Password Invalid');
            isValidate = false;
        }

        if (isValidate) {
            dispatch(
                await fetchLogin({ email, password }, (result: ILoginAPIRes | IErrorAPIRes | null) => {
                    if (result?.code === http.SUCCESS_CODE) {
                        router.push(routes.CLIENT.HOME.href);
                    } else {
                        dispatch(
                            setModal({
                                isShow: true,
                                title: 'Login Fail',
                                content: <div>Incorrect Email or Password</div>,
                            }),
                        );
                    }
                }),
            );
        }
    };

    const handleOnChange = (field: string, value: string | number | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <Validator ref={emailValidatorRef}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            name="email"
                            type="text"
                            value={email}
                            placeholder="your@email.com"
                            onChange={(value: string) => handleOnChange('email', value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                        />
                    </div>
                </Validator>
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <Validator ref={passwordValidatorRef}>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            name="password"
                            type={`${showPassword ? 'text' : 'password'}`}
                            value={password}
                            placeholder="Nhập mật khẩu của bạn"
                            onChange={(value: string) => handleOnChange('password', value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setState((prevState) => ({
                                    ...prevState,
                                    showPassword: !prevState.showPassword,
                                }));
                            }}
                            className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors">
                            {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                        </button>
                    </div>
                </Validator>
            </div>

            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <span className="text-gray-600 font-medium">Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                    Quên mật khẩu?
                </a>
            </div>

            <Button onClick={submitForm} buttonText={trans.auth.loginButton} className="cursor-pointer" />
        </div>
    );
});

export default LoginForm;
