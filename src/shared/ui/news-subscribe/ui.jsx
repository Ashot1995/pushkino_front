'use client';

import {useState, useRef, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {useHookFormMask} from "use-mask-input";

import {SvgIcon} from "../svg-icon";
import {Checkbox} from "../checkbox";
import {networkService} from "../../lib/network";

import styles from './styles.module.scss';

const ChildrenDataTemplate = ({count, removeChildren, setIsInputsDateChildValid, changeInputsChildren}) => {
    const {register, handleSubmit} = useForm();
    const registerWithMask = useHookFormMask(register);

    const [inputDateChild, setInputDateChild] = useState('');

    const [isInputDateChildError, setIsInputDateChildError] = useState(false);

    const validateDateInput = () => {
        const changeInput = (value) => {
            setInputDateChild(value);
            changeInputsChildren(count, value);

            if (value.length === 0) {
                setIsInputDateChildError(true);
                setIsInputsDateChildValid(false);
            } else {
                setIsInputDateChildError(false);
            }

            if (value.length > 0 && value.includes('_')) {
                setIsInputsDateChildValid(false);
            } else if (value.length > 0 && !value.includes('_')) {
                const currentInputDate = `${value.split('.')[1]}.${value.split('.')[0]}.${value.split('.')[2]}`;

                if (!isNaN(new Date(currentInputDate)) && new Date(currentInputDate) < new Date()) {
                    setIsInputDateChildError(false);
                    setIsInputsDateChildValid(true);
                } else {
                    setIsInputDateChildError(true);
                    setIsInputsDateChildValid(false);
                }
            }
        }

        const blurInput = () => {
            if (inputDateChild.length === 0) {
                setIsInputDateChildError(true);
                setIsInputsDateChildValid(false);
            } else if (inputDateChild.length > 0 && inputDateChild.includes('_')) {
                setIsInputDateChildError(true);
                setIsInputsDateChildValid(false);
            } else if (inputDateChild.length > 0 && !inputDateChild.includes('_')) {
                const currentInputDate = `${inputDateChild.split('.')[1]}.${inputDateChild.split('.')[0]}.${inputDateChild.split('.')[2]}`;

                if (!isNaN(new Date(currentInputDate)) && new Date(currentInputDate) < new Date()) {
                    setIsInputDateChildError(false);
                    setIsInputsDateChildValid(true);
                } else {
                    setIsInputDateChildError(true);
                    setIsInputsDateChildValid(false);
                }
            }
        }

        return {
            changeInput,
            blurInput,
        }
    }

    return (
        <div className={`
            ${styles['kids-grid-inner']}
            ${isInputDateChildError ? styles['modal__grid_error'] : ''}
        `} >
            <div className={styles['kids-current-count']}>{count + 1}-й ребенок</div>
            <input
                {...registerWithMask("date", '99.99.9999')}
                type="text"
                name={`date of birth of the ${count + 1} child`}
                className={styles['kids-input-birthday']}
                placeholder='__.__.____'
                value={inputDateChild}
                onChange={event => validateDateInput().changeInput(event.target.value)}
                onBlur={() => validateDateInput().blurInput()}
                onFocus={() => setIsInputDateChildError(false)}
            />
            <button className={styles['cross']} onClick={removeChildren}><SvgIcon id={'cross'}></SvgIcon></button>
        </div>
    )
}

export function NewsSubscribeModal({onClose, email}) {
    const {register, handleSubmit} = useForm();
    const registerWithMask = useHookFormMask(register);

    const [inputName, setInputName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputDate, setInputDate] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputComment, setInputComment] = useState('');
    const inputsChildren = useRef([]);

    const [isInputsNameError, setIsInputsNameError] = useState(false);
    const [isInputEmailError, setIsInputEmailError] = useState(false);
    const [isInputNumberError, setIsInputNumberError] = useState(false);
    const [isInputDateError, setIsInputDateError] = useState(false);
    const [isInputCityError, setIsInputCityError] = useState(false);

    const [isInputsNameValid, setIsInputsNameValid] = useState(false);
    const [isInputEmailValid, setIsInputEmailValid] = useState(false);
    const [isInputNumberValid, setIsInputNumberValid] = useState(false);
    const [isInputDateValid, setIsInputDateValid] = useState(false);
    const [isInputCityValid, setIsInputCityValid] = useState(false);
    const [isInputsDateChildValid, setIsInputsDateChildValid] = useState(true);
    const [isApprovalValid, setIsApprovalValid] = useState(false);

    const [submitBtnText, setSubmitBtnText] = useState('Подписаться');

    const [isFormSuccess, setIsFormSuccess] = useState(false);
    const [feedbackHeading, setFeedbackHeading] = useState('Подписка успешно оформлена!');
    const [feedbackDescription, setFeedbackDescription] = useState('Теперь Вы не пропустите новости об акциях и других событиях, которые проходят ежедневно в ТРЦ Пушкино Парк');

    const [children, setChildren] = useState(false);
    const [childrenArray, setChildrenArray] = useState([]);

    useEffect(() => {
        if (email.length > 0 && (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm).test(email)) {
            setFeedbackHeading('Подписка успешно оформлена!');
            setFeedbackDescription('Теперь Вы не пропустите новости об акциях и других событиях, которые проходят ежедневно в ТРЦ Пушкино Парк');
            setIsFormSuccess(false);
            setInputEmail(email);
            setIsInputEmailValid(true);
        } else {
            setFeedbackHeading('Неверный E-mail');
            setFeedbackDescription('Введите корректный E-mail адрес');
            setIsFormSuccess(true);
            setInputEmail('');
            setIsInputEmailValid(false);
        }
    }, []);

    const addOneToLast = () => {
        setIsInputsDateChildValid(false);
        inputsChildren.current[inputsChildren.current.length] = '';

        setChildrenArray(prevArray => {
            if (prevArray.length === 0) {
                return [1];
            } else {
                const lastElement = prevArray[prevArray.length - 1];
                return [...prevArray, lastElement + 1];
            }
        });
    };

    const removeLastElement = () => {
        setChildrenArray(prevArray => {
            if (prevArray.length === 0) {
                return prevArray;
            } else {
                inputsChildren.current = inputsChildren.current.slice(0, -1);
                return prevArray.slice(0, -1);
            }
        });
    }

    const changeInputsChildren = (index, value) => {
        inputsChildren.current[index] = value;
    }

    const validateNameInputs = () => {
        const changeInput = (value, type) => {
            if (type === 'name') {
                setInputName(value);
            } else {
                setInputLastName(value);
            }

            if (value.length === 0) {
                setIsInputsNameError(true);
                setIsInputsNameValid(false);
            } else {
                setIsInputsNameError(false);

                if (inputName.length > 0 && inputLastName.length > 0) {
                    setIsInputsNameValid(true);
                } else {
                    setIsInputsNameValid(false);
                }
            }
        }

        const blurInput = () => {
            if (inputName.length === 0 || inputLastName.length === 0) {
                setIsInputsNameError(true);
            } else if (inputName.length > 0 && inputLastName.length > 0) {
                setIsInputsNameError(false);
            }
        }

        const focusInput = (type) => {
            if (type === 'name' && inputLastName.length > 0) {
                setIsInputsNameError(false);
            } else if (type === 'name' && inputName.length > 0 && inputLastName.length === 0) {
                setIsInputsNameError(true);
            } else if (type === 'lastName' && inputName.length > 0) {
                setIsInputsNameError(false);
            } else if (type === 'lastName' && inputLastName.length > 0 && inputName.length === 0) {
                setIsInputsNameError(true);
            }
        }

        return {
            changeInput,
            blurInput,
            focusInput,
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

    const validateDateInput = () => {
        const changeInput = (value) => {
            setInputDate(value);

            if (value.length === 0) {
                setIsInputDateError(true);
                setIsInputDateValid(false);
            } else {
                setIsInputDateError(false);
            }

            if (value.length > 0 && value.includes('_')) {
                setIsInputDateValid(false);
            } else if (value.length > 0 && !value.includes('_')) {
                const currentInputDate = value.split('.').reverse().join('.');
                    // `${value.split('.')[1]}.${value.split('.')[0]}.${value.split('.')[2]}`;

                if (!isNaN(new Date(currentInputDate)) && new Date(currentInputDate) < new Date()) {
                    setIsInputDateError(false);
                    setIsInputDateValid(true);
                } else {
                    setIsInputDateError(true);
                    setIsInputDateValid(false);
                }
            }
        }

        const blurInput = () => {
            if (inputDate.length === 0) {
                setIsInputDateError(true);
                setIsInputDateValid(false);
            } else if (inputDate.length > 0 && inputDate.includes('_')) {
                setIsInputDateError(true);
                setIsInputDateValid(false);
            } else if (inputDate.length > 0 && !inputDate.includes('_')) {
                const currentInputDate = `${inputDate.split('.')[1]}.${inputDate.split('.')[0]}.${inputDate.split('.')[2]}`;

                if (!isNaN(new Date(currentInputDate)) && new Date(currentInputDate) < new Date()) {
                    setIsInputDateError(false);
                    setIsInputDateValid(true);
                } else {
                    setIsInputDateError(true);
                    setIsInputDateValid(false);
                }
            }
        }

        return {
            changeInput,
            blurInput,
        }
    }

    const validateCityInput = () => {
        const changeInput = (value) => {
            setInputCity(value);

            if (value.length === 0) {
                setIsInputCityError(true);
                setIsInputCityValid(false);
            } else {
                setIsInputCityError(false);
                setIsInputCityValid(true);
            }
        }

        const blurInput = () => {
            if (inputCity.length === 0) {
                setIsInputCityError(true);
                setIsInputCityValid(false);
            } else {
                setIsInputCityError(false);
                setIsInputCityValid(true);
            }
        }

        return {
            changeInput,
            blurInput
        }
    }

    const handleSubmitForm = (event) => {
        event.preventDefault();
        setSubmitBtnText('Отправка...');

        const formData = {
            customer: {
                'email': inputEmail,
                'birthDate': inputDate.split('.').reverse().join('-'),
                'lastName': inputLastName,
                'firstName': inputName,
                'mobilePhone': inputPhone.replace(/\D/g, ''),
                'customFields': {
                    'cityOfResidence': inputCity,
                    'childrenAge': inputsChildren.current.map(child => child.split('.').reverse().join('-')),
                    'childrenYorN': inputsChildren.current.length > 0 ? 'Да' : 'Нет',
                    'wishes': inputComment,
                },
            },
        };

        networkService().subscribeEmailNewsletter(formData).then(response => {
            setIsFormSuccess(true);

            if (response.status === 'Success') {
                setFeedbackHeading('Подписка успешно оформлена!');
                setFeedbackDescription('Теперь Вы не пропустите новости об акциях и других событиях, которые проходят ежедневно в ТРЦ Пушкино Парк');
            } else if (response.status === 'ValidationError') {
                setFeedbackHeading('Подписка не оформлена');
                setFeedbackDescription(response.message && response.message.length > 0 ? response.message[0].message : 'Неизвестная ошибка. Попробуйте отправить заявку еще раз.');
            } else {
                setFeedbackHeading('Подписка не оформлена');
                setFeedbackDescription('Неизвестная ошибка. Попробуйте отправить заявку позже.');
            }

            setSubmitBtnText('Подписаться');
        });
    }

    return (
        <>
            <div className={styles['modal-shadow']} onClick={onClose}></div>

            <div className={`
                ${styles['modal']}
                ${isFormSuccess ? styles['modal_hidden'] : ''}
            `}>
                <div className={styles['modal-close']} onClick={onClose}><SvgIcon id={'close'}/></div>

                <div className={styles['modal-title']}>Подписка на<br/> новости</div>

                <div className={styles['modal__wrapper']}>
                    <div className={styles['modal__grid']}>

                        <div className={`${styles['modal__grid-subgrid']} ${styles['modal__grid-left']}`}>
                            <div
                                className={`${styles['modal__grid-title']} ${styles['modal__grid-name']} ${styles['modal__grid-name_title']}`}>
                                Заполните информацию о себе
                            </div>
                            <div className={`
                                ${styles['modal__grid-name']}
                                ${isInputsNameError ? styles['modal__grid_error'] : ''}
                            `}>
                                <div className={styles['modal__grid-name__block']}>
                                    <input
                                        placeholder='Имя'
                                        name='name'
                                        type="text"
                                        value={inputName}
                                        onChange={event => validateNameInputs().changeInput(event.target.value, 'name')}
                                        onBlur={() => validateNameInputs().blurInput()}
                                        onFocus={() => validateNameInputs().focusInput('name')}
                                    />
                                    <input
                                        placeholder='Фамилия'
                                        name='lastName'
                                        type="text"
                                        value={inputLastName}
                                        onChange={event => validateNameInputs().changeInput(event.target.value, 'lastName')}
                                        onBlur={() => validateNameInputs().blurInput()}
                                        onFocus={() => validateNameInputs().focusInput('lastName')}
                                    />
                                </div>
                                <div className={styles['modal__grid-error-message']}>
                                    Введите корректные Имя и Фамилию
                                </div>
                            </div>

                            <div
                                className={`${styles['modal__grid-title']} ${styles['modal__grid-birth']} ${styles['modal__grid-birth_title']}`}>
                                Введите свою дату рождения
                            </div>

                            <div className={`
                                ${styles['modal__grid-birth']}
                                ${isInputDateError ? styles['modal__grid_error'] : ''}
                            `}>
                                <input
                                    {...registerWithMask("date", '99.99.9999')}
                                    placeholder='Дата рождения'
                                    name={'date'}
                                    type="text"
                                    value={inputDate}
                                    onChange={event => validateDateInput().changeInput(event.target.value)}
                                    onBlur={() => validateDateInput().blurInput()}
                                    onFocus={() => setIsInputDateError(false)}
                                />
                                <div className={styles['modal__grid-error-message']}>
                                    Введите корректную дату рождения
                                </div>
                            </div>
                            <div className={`
                                ${styles['modal__grid-city']}
                                ${isInputCityError ? styles['modal__grid_error'] : ''}
                            `}>
                                <input
                                    placeholder='Город проживания'
                                    type="text"
                                    name='city'
                                    value={inputCity}
                                    onChange={event => validateCityInput().changeInput(event.target.value)}
                                    onBlur={() => validateCityInput().blurInput()}
                                    onFocus={() => setIsInputCityError(false)}
                                />
                                <div className={styles['modal__grid-error-message']}>Заполните все поля</div>
                            </div>
                            <div className={styles['modal__grid-kids']}>
                                <div className={styles['modal__grid-title']}>Есть ли у Вас дети?</div>
                                <div className={styles['modal__grid-kids__grid']}>
                                    <label className={styles['checkbox-radio']}>
                                        <input
                                            type="radio"
                                            name="kids"
                                            value="Да"
                                            checked={children}
                                            onChange={() => {
                                                setChildren(true);
                                                setIsInputsDateChildValid(false);
                                            }}
                                        />
                                        <span>Да</span>
                                    </label>
                                    <label className={styles['checkbox-radio']}>
                                        <input
                                            type="radio"
                                            name="kids"
                                            value="Нет"
                                            checked={!children}
                                            onChange={() => {
                                                setChildren(false);
                                                setIsInputsDateChildValid(true);
                                            }}
                                        />
                                        <span>Нет</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className={`${styles['modal__grid-subgrid']} ${styles['modal__grid-right']}`}>
                            <div className={styles['modal__grid-spacer']}>&nbsp;</div>
                            <div className={`
                                ${styles['modal__grid-email']}
                                ${isInputEmailError ? styles['modal__grid_error'] : ''}
                            `}>
                                <input
                                    placeholder='Электронная почта'
                                    type="email"
                                    name='email'
                                    value={inputEmail}
                                    onChange={event => validateEmailInput().changeInput(event.target.value)}
                                    onBlur={() => validateEmailInput().blurInput()}
                                    onFocus={() => setIsInputEmailError(false)}
                                />
                                <div className={styles['modal__grid-error-message']}>
                                    Введите корректный адрес: mail@pp.ru
                                </div>
                            </div>
                            <div className={`
                                ${styles['modal__grid-phone']}
                                ${isInputNumberError ? styles['modal__grid_error'] : ''}
                            `}>
                                <input
                                    {...registerWithMask("phone", '+7(999) 999-99-99')}
                                    type="tel"
                                    name="phone"
                                    placeholder='Телефон +7 ('
                                    value={inputPhone}
                                    onChange={event => validatePhoneInput().changeInput(event.target.value)}
                                    onBlur={() => validatePhoneInput().blurInput()}
                                    onFocus={() => setIsInputNumberError(false)}
                                />
                                <div className={styles['modal__grid-error-message']}>Заполните все поля</div>
                            </div>
                            <div className={styles['modal__grid-comment']}>
                                <textarea
                                    placeholder="Ваш комментарий"
                                    name={'comment'}
                                    value={inputComment}
                                    onChange={event => {
                                        setInputComment(event.target.value)
                                    }}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {
                        children &&
                        <>
                            <div className={styles['kids']}>
                                <div className={`${styles['modal__grid-title']}`}>Укажите даты рождения детей</div>

                                {
                                    childrenArray.length > 0 &&
                                    <>
                                        <div className={styles['kids-grid']}>
                                            {
                                                childrenArray.map((item, index) => (
                                                    <ChildrenDataTemplate
                                                        key={item}
                                                        count={index}
                                                        removeChildren={removeLastElement}
                                                        setIsInputsDateChildValid={setIsInputsDateChildValid}
                                                        changeInputsChildren={changeInputsChildren}
                                                    />
                                                ))
                                            }
                                        </div>
                                    </>
                                }

                                {
                                    childrenArray.length < 10 &&
                                    <>
                                        <div className={styles['kids-grid']}>
                                            <button className={styles['kids-button']} onClick={addOneToLast}>
                                                Добавить ребенка
                                            </button>
                                        </div>
                                    </>
                                }
                            </div>
                        </>
                    }

                    <div className={styles['modal__grid-privacy']}>
                        <Checkbox
                            label={'Согласие на обработку'}
                            labelAnchor={'персональных данных'}
                            link='/rules/'
                            onChange={() => setIsApprovalValid(!isApprovalValid)}
                        />
                    </div>

                    <button
                        className={`${styles['modal__grid-submit']} btn`}
                        disabled={!(isInputsNameValid && isInputEmailValid && isInputNumberValid && isInputDateValid && isInputCityValid && isInputsDateChildValid && isInputsDateChildValid && isApprovalValid)}
                        onClick={handleSubmitForm}
                    >
                        {submitBtnText}
                    </button>
                </div>
            </div>

            <div className={`
                ${styles['modal']}
                ${styles['modal_feedback']}
                ${!isFormSuccess ? styles['modal_hidden'] : ''}
            `}>
                <div className={styles['modal-close']} onClick={onClose}><SvgIcon id={'close'}/></div>

                <div className={`${styles['modal-title']} ${styles['modal-title_feedback']}`}>{feedbackHeading}</div>

                <div className={`${styles['modal__grid-title']} ${styles['modal__grid-title_feedback']}`}>{feedbackDescription}</div>

                <div className={styles['feedback-btn']}>
                    <button
                        className={`
                            ${styles['modal__grid-submit']}
                            ${styles['modal__grid-submit_feedback']}
                            btn
                        `}
                        onClick={onClose}
                    >
                        Хорошо
                    </button>
                </div>
            </div>
        </>
    )
}
