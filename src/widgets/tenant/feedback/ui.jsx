'use client';

import {useState, useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {useHookFormMask} from "use-mask-input";

import {UISection} from "../../../shared/ui/section";
import {SvgIcon} from "../../../shared/ui/svg-icon";
import {networkService} from "../../../shared/lib/network";

import styles from  './styles.module.scss'

import {ALLOWED_FILES_TO_ADD, ALLOWED_SIZE_FILE} from "./config";

export function ToRentersPageFeedback() {
    const {register, handleSubmit} = useForm();
    const registerWithMask = useHookFormMask(register);

    const form = useRef(null);
    const addedFile = useRef(null);

    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputMessage, setInputMessage] = useState('');

    const [isInputNameError, setIsInputNameError] = useState(false);
    const [isInputEmailError, setIsInputEmailError] = useState(false);
    const [isInputNumberError, setIsInputNumberError] = useState(false);

    const [isInputNameValid, setIsInputNameValid] = useState(false);
    const [isInputEmailValid, setIsInputEmailValid] = useState(false);
    const [isInputNumberValid, setIsInputNumberValid] = useState(false);

    const [nameAddedFile, setNameAddedFile] = useState('');
    const [addedFileErrorMessage, setAddedFileErrorMessage] = useState('');

    const [isFormSent, setIsFormSent] = useState(false);
    const [isFormSentError, setIsFormSentError] = useState(false);

    useEffect(() => {
        form.current = document.querySelector('form');
    }, []);

    const validateInputName = (value) => {
        if (value.length === 0) {
            setIsInputNameError(true);
            setIsInputNameValid(false);
        } else {
            setIsInputNameError(false);
            setIsInputNameValid(true);
        }
    }

    const validateEmailInput = () => {
        const changeInput = (value) => {
            setInputEmail(value);

            if (value.length === 0) {
                setIsInputEmailError(true);
                setIsInputEmailValid(false);
            } else {
                setIsInputEmailError(false);
            }

            if (value.length > 0 && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm).test(value)) {
                setIsInputEmailValid(false);
            } else if (value.length > 0 && (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm).test(value)) {
                setIsInputEmailValid(true);
            }
        }

        const blurInput = () => {
            if (inputEmail.length === 0) {
                setIsInputEmailError(true);
                setIsInputEmailValid(false);
            } else if (inputEmail.length > 0 && !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm).test(inputEmail)) {
                setIsInputEmailError(true);
                setIsInputEmailValid(false);
            } else if (inputEmail.length > 0 && (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm).test(inputEmail)) {
                setIsInputEmailError(false);
                setIsInputEmailValid(true);
            }
        }

        return {
            changeInput,
            blurInput,
        }
    }

    const validatePhoneInput = () => {
        const changeInput = (value) => {
            setInputPhone(value);

            if (value.length === 0) {
                setIsInputNumberError(true);
                setIsInputNumberValid(false);
            } else {
                setIsInputNumberError(false);
            }

            if (value.length > 0 && value.includes('_')) {
                setIsInputNumberValid(false);
            } else if (value.length > 0 && !value.includes('_')) {
                setIsInputNumberValid(true);
            }
        }

        const blurInput = () => {
            if (inputPhone.length === 0) {
                setIsInputNumberError(true);
                setIsInputNumberValid(false);
            } else if (inputPhone.length > 0 && inputPhone.includes('_')) {
                setIsInputNumberError(true);
                setIsInputNumberValid(false);
            } else if (inputPhone.length > 0 && !inputPhone.includes('_')) {
                setIsInputNumberError(false);
                setIsInputNumberValid(true);
            }
        }

        return {
            changeInput,
            blurInput,
        }
    }

    const validateInputFile = (event) => {
        addedFile.current = event.target.files[0];

        const file = event.target.files[0];
        setNameAddedFile(file.name);

        const fileExtension = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length);

        if (ALLOWED_FILES_TO_ADD.includes(fileExtension) && file.size <= ALLOWED_SIZE_FILE) {
            setAddedFileErrorMessage('');
            addedFile.current = event.target.files[0];
        }

        if (!ALLOWED_FILES_TO_ADD.includes(fileExtension)) {
            setAddedFileErrorMessage('Файл недопустимого формата. Пожалуйста выберите другой файл.');
            addedFile.current = null;
        } else if (file.size > ALLOWED_SIZE_FILE) {
            setAddedFileErrorMessage('Файл больше допустимого размера. Пожалуйста выберите файл до 5 Мб.');
            addedFile.current = null;
        }
    }

    const handleRemoveFile = () => {
        setAddedFileErrorMessage('');
        setNameAddedFile('');
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const formData = {};

        formData.full_name = inputName;
        formData.email = inputEmail;
        formData.phone = inputPhone;

        inputMessage?.length > 0 ? formData.message = inputMessage : null;
        addedFile?.current?.length > 0 ? formData.file = addedFile.current : null;

        networkService().sentFormToRenters(formData).then(response => {
            setIsFormSent(response);
            setIsFormSentError(!response);

            if (response) {
                setInputName('');
                setInputEmail('');
                setInputPhone('');
                setInputMessage('');
                addedFile.current = null;
            }
        });
    }

    return (
        <UISection defaultClass={styles['to-renters-feedback']}>
            <div className={styles['to-renters-feedback__wrapper']}>
                <div className={`
                    ${styles['to-renters-feedback__heading']}
                    ${isFormSent ? 'hidden' : ''}
                    ${isFormSentError ? 'hidden' : ''}
                `}>Обратная связь
                </div>
                <form
                    action="#"
                    className={`
                        ${styles['to-renters-feedback__form']}
                        ${isFormSent ? 'hidden' : ''}
                    `}
                    onSubmit={handleSubmitForm}
                >
                    <div className={`
                        ${styles['to-renters-feedback__input-wrapper']}
                        ${isInputNameError && styles['to-renters-feedback__input-wrapper_error']}
                    `}>
                        <input
                            type="text"
                            id="full_name"
                            name="full_name"
                            placeholder="ФИО"
                            className={styles['to-renters-feedback__input']}
                            value={inputName}
                            onChange={event => {
                                setInputName(event.target.value);
                                validateInputName(event.target.value)
                            }}
                            onBlur={event => validateInputName(event.target.value)}
                            required
                        />
                        <div className={styles['to-renters-feedback__input-error-message']}>
                            Введите корректные Имя и Фамилию
                        </div>
                    </div>
                    <div className={`
                        ${styles['to-renters-feedback__input-wrapper']}
                        ${isInputEmailError && styles['to-renters-feedback__input-wrapper_error']}
                    `}>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Электронная почта"
                            className={styles['to-renters-feedback__input']}
                            value={inputEmail}
                            onChange={event => validateEmailInput().changeInput(event.target.value)}
                            onBlur={() => validateEmailInput().blurInput()}
                            required
                        />
                        <div className={styles['to-renters-feedback__input-error-message']}>
                            Введите корректный адрес: mail@pp.ru
                        </div>
                    </div>
                    <div className={`
                        ${styles['to-renters-feedback__input-wrapper']}
                        ${isInputNumberError && styles['to-renters-feedback__input-wrapper_error']}
                    `}>
                        <input
                            {...registerWithMask("phone", '+7(999) 999-99-99')}
                            type="text"
                            id="phone"
                            name="phone"
                            placeholder="Телефон +7 ("
                            className={styles['to-renters-feedback__input']}
                            value={inputPhone}
                            onChange={event => validatePhoneInput().changeInput(event.target.value)}
                            onBlur={() => validatePhoneInput().blurInput()}
                            required
                        />
                        <div className={styles['to-renters-feedback__input-error-message']}>
                            Введите корректный номер телефона
                        </div>
                    </div>
                    <div className={styles['to-renters-feedback__textarea-wrapper']}>
                        <textarea
                            id="message"
                            name="message"
                            rows="9"
                            placeholder="Сообщение"
                            className={styles['to-renters-feedback__input']}
                            value={inputMessage}
                            onChange={event => setInputMessage(event.target.value)}
                        />
                        <div className={styles['to-renters-feedback__add-file']}>
                            <input
                                type="file"
                                id='file'
                                name='file'
                                className={styles['to-renters-feedback__input-file']}
                                onChange={validateInputFile}
                            />
                            <SvgIcon id="new-doc" color="#3383A4"/>
                        </div>
                        <div className={`
                            ${styles['to-renters-feedback__file-name']}
                            ${nameAddedFile.length > 0 && styles['to-renters-feedback__file-name_show']}
                            ${addedFileErrorMessage.length > 0 && styles['to-renters-feedback__file-name_error']}
                        `}>
                            <SvgIcon
                                id={addedFileErrorMessage.length === 0 ? "doc-done" : 'doc-error'}
                                color={addedFileErrorMessage.length === 0 ? "#3383A4" : '#9E2E46'}
                            />
                            <span>{nameAddedFile}</span>
                            <div
                                className={styles['to-renters-feedback__file-name-remove']}
                                onClick={handleRemoveFile}
                            >
                                <SvgIcon
                                    id='close'
                                    color={addedFileErrorMessage.length === 0 ? "#3383A4" : '#9E2E46'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`
                            ${styles['to-renters-feedback__input-error-message']}
                            ${addedFileErrorMessage.length > 0 && styles['to-renters-feedback__input-error-message_show']}
                        `}>{addedFileErrorMessage}</div>
                    <button
                        type='submit'
                        className={`${styles['to-renters-feedback__button']} btn`}
                        disabled={!(isInputNameValid && isInputEmailValid && isInputNumberValid && addedFileErrorMessage.length === 0)}
                    >Отправить сообщение
                    </button>
                </form>

                <div className={`
                    ${styles['to-renters-feedback__message']}
                    ${isFormSent ? styles['to-renters-feedback__message_show'] : ''}
                `}>
                    <div className={styles['to-renters-feedback__heading']}>Ваше обращение уже в пути</div>
                    <div className={styles['to-renters-feedback__description']}>Благодарим за Ваш отклик! Мы обязательно
                        вернемся с ответом в ближайшее время
                    </div>
                    <button className={`${styles['to-renters-feedback__button']} btn`} onClick={() => setIsFormSent(false)}>Хорошо</button>
                </div>

                <div className={`
                    ${styles['to-renters-feedback__message']}
                    ${isFormSentError ? styles['to-renters-feedback__message_show'] : ''}
                `}>
                    <div className={styles['to-renters-feedback__heading']}>Ваше обращение не отправлено</div>
                    <div className={styles['to-renters-feedback__description']}>Пожалуйста, повторите попытку позже</div>
                    <button className={`${styles['to-renters-feedback__button']} btn`} onClick={() => setIsFormSentError(false)}>Хорошо</button>
                </div>
            </div>
        </UISection>
    );
}
