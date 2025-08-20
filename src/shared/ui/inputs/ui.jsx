import styles from './styles.module.scss';

export function Input({
    attributes,
    isInputTypeSearch = false,
    onChange,
}) {

    return (
        <>
            <input
                {...attributes}
                className={`
                    ${styles['input']}
                    ${isInputTypeSearch && styles['input__search']}
                `}
                onChange={onChange}
            />
        </>
    )
}
