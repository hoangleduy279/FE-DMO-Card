'use client';
import { createRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CreditCard, Calendar, MapPin, User } from 'lucide-react';
import Validator from '@components/commons/Validator';
import Input from '@components/commons/Input';
import { useTrans } from '@utils/hooks';
import Button from '@components/commons/Button';
import { validateHelper } from '@utils/helpers';

const LoginForm = forwardRef<ILoginComponentHandle, ILoginComponentProps>((props, ref) => {
    const { type } = props;
    const trans = useTrans();
    const [state, setState] = useState<ILoginComponentState>({
        email: '',
        password: '',
        showPassword: false,
        cardId: '',
        emergencyPassword: '',
        birthDate: '',
        birthPlace: '',
        applicantName: '',
        applicantEmail: '',
        activeTab: type === 'individual' ? 'manage' : type === 'professional' ? 'emergency' : 'emergency',
        showAlternativeLogin: false,
    });

    const {
        email,
        password,
        showPassword,
        cardId,
        emergencyPassword,
        birthDate,
        birthPlace,
        applicantName,
        applicantEmail,
        activeTab,
        showAlternativeLogin,
    } = state;

    const emailValidatorRef = createRef<IValidatorComponentHandle>();
    const passwordValidatorRef = createRef<IValidatorComponentHandle>();
    const cardIdValidatorRef = createRef<IValidatorComponentHandle>();
    const birthPlaceValidatorRef = createRef<IValidatorComponentHandle>();
    const dobValidatorRef = createRef<IValidatorComponentHandle>();
    const fullNameValidatorRef = createRef<IValidatorComponentHandle>();

    useImperativeHandle(ref, () => ({
        onSubmit: () => {
            submitForm();
        },
    }));

    const handleOnChange = (field: string, value: string | number | boolean | null) => {
        setState((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const submitForm = async () => {
        let isValidate = true;

        if (type === 'individual') {
            if (activeTab === 'manage') {
                cardIdValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(cardId ?? '')) {
                    cardIdValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                }

                passwordValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(password ?? '')) {
                    passwordValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                } else if ((password ?? '').length < 8) {
                    passwordValidatorRef?.current?.onValidateMessage(trans.common.validate.invalid.password);
                    isValidate = false;
                }

                if (isValidate) {
                }
            } else if (activeTab === 'active') {
                emailValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(email ?? '')) {
                    emailValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                } else if (!validateHelper.isEmail(email ?? '')) {
                    emailValidatorRef?.current?.onValidateMessage(trans.common.validate.invalid.email);
                    isValidate = false;
                }

                cardIdValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(password ?? '')) {
                    cardIdValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                }

                if (isValidate) {
                }
            }
        } else if (type === 'professional') {
            if (activeTab === 'emergency') {
                cardIdValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(cardId ?? '')) {
                    cardIdValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                }

                passwordValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(password ?? '')) {
                    passwordValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                } else if ((password ?? '').length < 8) {
                    passwordValidatorRef?.current?.onValidateMessage(trans.common.validate.invalid.password);
                    isValidate = false;
                }

                if (showAlternativeLogin) {
                    dobValidatorRef?.current?.onValidateMessage('');
                    if (validateHelper.isEmpty(email ?? '')) {
                        dobValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                        isValidate = false;
                    }

                    birthPlaceValidatorRef?.current?.onValidateMessage('');
                    if (validateHelper.isEmpty(email ?? '')) {
                        birthPlaceValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                        isValidate = false;
                    }
                }

                if (isValidate) {
                }
            } else if (activeTab === 'request') {
                cardIdValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(cardId ?? '')) {
                    cardIdValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                }

                fullNameValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(cardId ?? '')) {
                    fullNameValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                }

                emailValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(email ?? '')) {
                    emailValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                } else if (!validateHelper.isEmail(email ?? '')) {
                    emailValidatorRef?.current?.onValidateMessage(trans.common.validate.invalid.email);
                    isValidate = false;
                }

                if (isValidate) {
                }
            }
        } else {
            cardIdValidatorRef?.current?.onValidateMessage('');
            if (validateHelper.isEmpty(cardId ?? '')) {
                cardIdValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                isValidate = false;
            }

            passwordValidatorRef?.current?.onValidateMessage('');
            if (validateHelper.isEmpty(password ?? '')) {
                passwordValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                isValidate = false;
            } else if ((password ?? '').length < 8) {
                passwordValidatorRef?.current?.onValidateMessage(trans.common.validate.invalid.password);
                isValidate = false;
            }

            if (showAlternativeLogin) {
                dobValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(email ?? '')) {
                    dobValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                }

                birthPlaceValidatorRef?.current?.onValidateMessage('');
                if (validateHelper.isEmpty(email ?? '')) {
                    birthPlaceValidatorRef?.current?.onValidateMessage(trans.common.validate.required);
                    isValidate = false;
                }
            }

            if (isValidate) {
            }
        }
    };

    const renderTabButtons = (tabs: { key: string; label: string }[]) => (
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => handleOnChange('activeTab', tab.key)}
                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                        activeTab === tab.key ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
                    }`}>
                    {tab.label}
                </button>
            ))}
        </div>
    );

    const LoginFormIndividual = () => {
        const tabs = [
            { key: 'manage', label: 'Manage my DMO' },
            { key: 'active', label: 'Active my DMO-Card' },
        ];

        return (
            <div className="space-y-6">
                {renderTabButtons(tabs)}

                {activeTab === 'manage' && (
                    <div className="space-y-4">
                        {/* Card ID Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">{trans.auth.individual.login.form.cardId}</label>
                            <Validator ref={cardIdValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="cardId"
                                        type="text"
                                        value={cardId}
                                        placeholder={trans.common.placeholder.placeholderCardId}
                                        onChange={(value: string) => handleOnChange('cardId', value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </Validator>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">{trans.auth.individual.login.form.password}</label>
                            <Validator ref={passwordValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        placeholder={trans.common.placeholder.placeholderPassword}
                                        onChange={(value: string) => handleOnChange('password', value)}
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleOnChange('showPassword', !showPassword)}
                                        className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors">
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </Validator>
                        </div>
                    </div>
                )}

                {activeTab === 'active' && (
                    <div className="space-y-4">
                        {/* Card ID Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">{trans.auth.individual.login.form.cardId}</label>
                            <Validator ref={cardIdValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="cardId"
                                        type="text"
                                        value={cardId}
                                        placeholder={trans.common.placeholder.placeholderCardId}
                                        onChange={(value: string) => handleOnChange('cardId', value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </Validator>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">{trans.auth.individual.login.form.email}</label>
                            <Validator ref={emailValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="email"
                                        value={email}
                                        placeholder="your@email.com"
                                        onChange={(value: string) => handleOnChange('email', value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </Validator>
                        </div>
                    </div>
                )}

                <Button
                    onClick={submitForm}
                    buttonText={activeTab === 'manage' ? trans.common.signIn : trans.common.activeCard}
                    className="cursor-pointer w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                />
            </div>
        );
    };

    const LoginFormProfessional = () => {
        const tabs = [
            { key: 'emergency', label: 'Emergency Overview' },
            { key: 'request', label: 'Request for Access' },
        ];

        return (
            <div className="space-y-6">
                {renderTabButtons(tabs)}

                {activeTab === 'emergency' && (
                    <div className="space-y-4">
                        {/* Card ID Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">{trans.auth.professional.login.form.cardId}</label>
                            <Validator ref={cardIdValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="cardId"
                                        type="text"
                                        value={cardId}
                                        placeholder={trans.common.placeholder.placeholderCardId}
                                        onChange={(value: string) => handleOnChange('cardId', value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </Validator>
                        </div>

                        {/* Emergency Password or Alternative Fields */}
                        {!showAlternativeLogin ? (
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    {trans.auth.professional.login.form.emergencyPassword}
                                </label>
                                <Validator ref={passwordValidatorRef}>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="w-5 h-5 text-red-400" />
                                        </div>
                                        <Input
                                            name="emergencyPassword"
                                            type={showPassword ? 'text' : 'password'}
                                            value={emergencyPassword}
                                            placeholder={trans.common.placeholder.placeholderEmergency}
                                            onChange={(value: string) => handleOnChange('emergencyPassword', value)}
                                            className="w-full pl-12 pr-12 py-3.5 bg-red-50/50 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200 placeholder-red-400"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleOnChange('showPassword', !showPassword)}
                                            className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center hover:text-red-600 transition-colors">
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5 text-red-400" />
                                            ) : (
                                                <Eye className="w-5 h-5 text-red-400" />
                                            )}
                                        </button>
                                    </div>
                                </Validator>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Birth Date Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        {trans.auth.professional.login.form.birthDate}
                                    </label>
                                    <Validator ref={dobValidatorRef}>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <Calendar className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="date"
                                                name="birthDate"
                                                value={birthDate}
                                                onChange={(e) => handleOnChange('birthDate', e.target.value)}
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                                            />
                                        </div>
                                    </Validator>
                                </div>

                                {/* Birth Place Field */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        {trans.auth.professional.login.form.birthPlace}
                                    </label>
                                    <Validator ref={birthPlaceValidatorRef}>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <MapPin className="w-5 h-5 text-gray-400" />
                                            </div>
                                            <Input
                                                name="birthPlace"
                                                type="text"
                                                value={birthPlace}
                                                placeholder={trans.common.placeholder.placeholderBirthPlace}
                                                onChange={(value: string) => handleOnChange('birthPlace', value)}
                                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                            />
                                        </div>
                                    </Validator>
                                </div>
                            </div>
                        )}

                        {/* Another way to connect button */}
                        <button
                            type="button"
                            onClick={() => handleOnChange('showAlternativeLogin', !showAlternativeLogin)}
                            className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 transition-colors underline">
                            {showAlternativeLogin ? 'Back to Emergency Password' : 'Another way to connect'}
                        </button>
                    </div>
                )}

                {activeTab === 'request' && (
                    <div className="space-y-4">
                        {/* Applicant Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                {trans.auth.professional.login.form.applicantName}
                            </label>
                            <Validator ref={fullNameValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="applicantName"
                                        type="text"
                                        value={applicantName}
                                        placeholder="Enter full name"
                                        onChange={(value: string) => handleOnChange('applicantName', value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </Validator>
                        </div>

                        {/* Applicant Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                {trans.auth.professional.login.form.applicantEmail}
                            </label>
                            <Validator ref={emailValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="applicantEmail"
                                        value={applicantEmail}
                                        placeholder="applicant@email.com"
                                        onChange={(value: string) => handleOnChange('applicantEmail', value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </Validator>
                        </div>

                        {/* Card ID Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">{trans.auth.professional.login.form.cardId}</label>
                            <Validator ref={cardIdValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <CreditCard className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <Input
                                        name="cardId"
                                        type="text"
                                        value={cardId}
                                        placeholder={trans.common.placeholder.placeholderCardId}
                                        onChange={(value: string) => handleOnChange('cardId', value)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 placeholder-gray-400"
                                    />
                                </div>
                            </Validator>
                        </div>
                    </div>
                )}

                <Button
                    onClick={submitForm}
                    buttonText={activeTab === 'emergency' ? 'Emergency Access' : 'Submit Request'}
                    className={`cursor-pointer w-full ${
                        activeTab === 'emergency'
                            ? 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700'
                            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                    }`}
                />
            </div>
        );
    };

    const LoginFormEmergency = () => {
        return (
            <div className="space-y-6">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-bold text-red-600 mb-2">🚨 {trans.auth.emergency.login.form.title}</h3>
                    <p className="text-sm text-red-500">{trans.auth.emergency.login.form.subTitleForm}</p>
                </div>

                <div className="space-y-4">
                    {/* Card ID Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">{trans.auth.emergency.login.form.cardId}</label>
                        <Validator ref={cardIdValidatorRef}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <CreditCard className="w-5 h-5 text-red-400" />
                                </div>
                                <Input
                                    name="cardId"
                                    type="text"
                                    value={cardId}
                                    placeholder={trans.common.placeholder.placeholderCardId}
                                    onChange={(value: string) => handleOnChange('cardId', value)}
                                    className="w-full pl-12 pr-4 py-3.5 bg-red-50/50 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200 placeholder-red-400"
                                />
                            </div>
                        </Validator>
                    </div>

                    {/* Emergency Password or Alternative Fields */}
                    {!showAlternativeLogin ? (
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                {trans.auth.emergency.login.form.emergencyPassword}
                            </label>
                            <Validator ref={passwordValidatorRef}>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-red-400" />
                                    </div>
                                    <Input
                                        name="emergencyPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={emergencyPassword}
                                        placeholder={trans.common.placeholder.placeholderEmergency}
                                        onChange={(value: string) => handleOnChange('emergencyPassword', value)}
                                        className="w-full pl-12 pr-12 py-3.5 bg-red-50/50 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200 placeholder-red-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleOnChange('showPassword', !showPassword)}
                                        className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center hover:text-red-600 transition-colors">
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5 text-red-400" />
                                        ) : (
                                            <Eye className="w-5 h-5 text-red-400" />
                                        )}
                                    </button>
                                </div>
                            </Validator>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Birth Date Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    {trans.auth.emergency.login.form.birthDate}
                                </label>
                                <Validator ref={dobValidatorRef}>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Calendar className="w-5 h-5 text-red-400" />
                                        </div>
                                        <input
                                            type="date"
                                            name="birthDate"
                                            value={birthDate}
                                            onChange={(e) => handleOnChange('birthDate', e.target.value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-red-50/50 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200"
                                        />
                                    </div>
                                </Validator>
                            </div>

                            {/* Birth Place Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    {trans.auth.emergency.login.form.birthPlace}
                                </label>
                                <Validator ref={birthPlaceValidatorRef}>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <MapPin className="w-5 h-5 text-red-400" />
                                        </div>
                                        <Input
                                            name="birthPlace"
                                            type="text"
                                            value={birthPlace}
                                            placeholder={trans.common.placeholder.placeholderBirthPlace}
                                            onChange={(value: string) => handleOnChange('birthPlace', value)}
                                            className="w-full pl-12 pr-4 py-3.5 bg-red-50/50 border border-red-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all duration-200 placeholder-red-400"
                                        />
                                    </div>
                                </Validator>
                            </div>
                        </div>
                    )}

                    {/* Another way to connect button */}
                    <button
                        type="button"
                        onClick={() => handleOnChange('showAlternativeLogin', !showAlternativeLogin)}
                        className="w-full text-red-600 hover:text-red-700 font-medium text-sm py-2 transition-colors underline">
                        {showAlternativeLogin ? 'Back to Emergency Password' : 'Another way to connect'}
                    </button>
                </div>

                <Button
                    onClick={submitForm}
                    buttonText="EMERGENCY ACCESS"
                    className="cursor-pointer w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 animate-pulse"
                />
            </div>
        );
    };

    return (
        <div>
            {type === 'individual' ? LoginFormIndividual() : type === 'professional' ? LoginFormProfessional() : LoginFormEmergency()}
        </div>
    );
});

export default LoginForm;
