'use client';
import Button from '@components/commons/Button';

import { ReduxStates } from '@redux/store';
import { setModal } from '@redux/actions';

import { useAppDispatch, useAppSelector, useTrans } from '@utils/hooks';

const Modal: IModalComponent<IModalComponentProps> = () => {
    const trans = useTrans();
    const dispatch = useAppDispatch();
    const { modal } = useAppSelector((states: ReduxStates) => states);

    const handleModalShow = () => {
        if (modal.isShow && modal.onClose) {
            modal.onClose();
        }
        dispatch(
            setModal({
                ...modal,
                isShow: !modal.isShow,
                closeOnOutsiteClick: false,
                isHideButtons: false,
            }),
        );
    };

    return (
        <>
            {modal.isShow && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-50 bg-opacity-50">
                    <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
                        <div className="flex items-center justify-between border-b pb-4">
                            <h3 className="text-lg font-bold">{modal?.title}</h3>
                            <button
                                onClick={() => handleModalShow()}
                                className="ml-auto h-8 w-8 rounded-full bg-gray-200 p-2 text-gray-600 hover:bg-gray-300">
                                <span className="block h-4 w-4 bg-gray-600"></span>
                            </button>
                        </div>

                        {/* Content */}
                        <div className="py-4">{modal?.content ?? <></>}</div>

                        {/* Footer */}
                        {!modal.isHideButtons && (
                            <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                    onClick={() => handleModalShow()}
                                    fontSize="16"
                                    background="white"
                                    textColor="black"
                                    buttonText={modal.cancelText ?? trans.common.cancel}
                                    borderColor="gray"
                                    className="mr-2"
                                />
                                {modal.buttonText && (
                                    <Button
                                        onClick={() => (modal.onClickButton ? modal.onClickButton() : {})}
                                        fontSize="16"
                                        background="red"
                                        buttonText={modal.buttonText}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
