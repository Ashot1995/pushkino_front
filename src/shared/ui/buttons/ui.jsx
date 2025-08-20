import styles from './styles.module.scss';

export function ButtonFull({children, width = 'fit-content',  isDisabled = false, onClick}) {
    return (
        <>
            <style>{`
                .button_custom-width {
                    width: ${width};
                }
            `}</style>

            <button onClick={onClick}
                className={`
                ${styles.button}
                button_custom-width
                body-18-24
            `}
                disabled={isDisabled}
            >
                {children}
            </button>
        </>
    )
}

export function ButtonTransparent({children, width = 'fit-content',  isDisabled = false, onClick}) {
    return (
        <>
            <style>{`
                .button_custom-width {
                    width: ${width};
                }
            `}</style>

            <button onClick={onClick}
                className={`
                  ${styles.button}
                  ${styles.button_transparent}
                  button_custom-width
                  body-18-24
              `}
                disabled={isDisabled}
            >
                {children}
            </button>
        </>
    )
}

export function ButtonCircleFull({ isDisabled = false, onClick, isRevers = false}) {
    return (
        <button onClick={onClick}
            className={`
                ${styles.button}
                ${styles.button__circle}
                ${isRevers ? styles.button__circle_revers : null}
            `}
            disabled={isDisabled}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M13.2673 4.2095C12.9674 3.9238 12.4926 3.9354 12.2069 4.2353C11.9212 4.5352 11.9328 5.01 12.2327 5.2957L18.484 11.2502L3.75 11.2502C3.33579 11.2502 3 11.5859 3 12.0002C3 12.4144 3.33579 12.7502 3.75 12.7502L18.4844 12.7502L12.2327 18.705C11.9328 18.9907 11.9212 19.4654 12.2069 19.7653C12.4926 20.0652 12.9674 20.0768 13.2673 19.7911L20.6862 12.7244C20.8553 12.5634 20.9552 12.358 20.9861 12.1444C20.9952 12.0977 21 12.0495 21 12.0002C21 11.9505 20.9952 11.9019 20.9859 11.8549C20.9548 11.6418 20.8549 11.4369 20.6862 11.2762L13.2673 4.2095Z"
                    fill="white"/>
            </svg>
        </button>
    )
}

export function ButtonCircleTransparentBlack({ isDisabled = false, onClick, isRevers = false}) {
    return (
        <button onClick={onClick}
            className={`
                ${styles.button}
                ${styles.button__circle}
                ${styles.button__circle_black}
                ${isRevers ? styles.button__circle_revers : null}
            `}
            disabled={isDisabled}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M13.2673 4.2095C12.9674 3.9238 12.4926 3.9354 12.2069 4.2353C11.9212 4.5352 11.9328 5.01 12.2327 5.2957L18.484 11.2502L3.75 11.2502C3.33579 11.2502 3 11.5859 3 12.0002C3 12.4144 3.33579 12.7502 3.75 12.7502L18.4844 12.7502L12.2327 18.705C11.9328 18.9907 11.9212 19.4654 12.2069 19.7653C12.4926 20.0652 12.9674 20.0768 13.2673 19.7911L20.6862 12.7244C20.8553 12.5634 20.9552 12.358 20.9861 12.1444C20.9952 12.0977 21 12.0495 21 12.0002C21 11.9505 20.9952 11.9019 20.9859 11.8549C20.9548 11.6418 20.8549 11.4369 20.6862 11.2762L13.2673 4.2095Z"
                    fill="black"/>
            </svg>
        </button>
    )
}

export function ButtonCircleTransparentWhite({ isDisabled = false, onClick, isRevers = false}) {
    return (
        <button onClick={onClick}
            className={`
                ${styles.button}
                ${styles.button__circle}
                ${styles.button__circle_white}
                ${isRevers ? styles.button__circle_revers : null}
            `}
            disabled={isDisabled}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M13.2673 4.2095C12.9674 3.9238 12.4926 3.9354 12.2069 4.2353C11.9212 4.5352 11.9328 5.01 12.2327 5.2957L18.484 11.2502L3.75 11.2502C3.33579 11.2502 3 11.5859 3 12.0002C3 12.4144 3.33579 12.7502 3.75 12.7502L18.4844 12.7502L12.2327 18.705C11.9328 18.9907 11.9212 19.4654 12.2069 19.7653C12.4926 20.0652 12.9674 20.0768 13.2673 19.7911L20.6862 12.7244C20.8553 12.5634 20.9552 12.358 20.9861 12.1444C20.9952 12.0977 21 12.0495 21 12.0002C21 11.9505 20.9952 11.9019 20.9859 11.8549C20.9548 11.6418 20.8549 11.4369 20.6862 11.2762L13.2673 4.2095Z"
                    fill="white"/>
            </svg>
        </button>
    )
}

export function ButtonCircleTransparentGray({ isDisabled = false, onClick, isRevers = false}) {
    return (
        <button onClick={onClick}
            className={`
                ${styles.button}
                ${styles.button__circle}
                ${styles.button__circle_gray}
                ${isRevers ? styles.button__circle_revers : null}
            `}
            disabled={isDisabled}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M13.2673 4.2095C12.9674 3.9238 12.4926 3.9354 12.2069 4.2353C11.9212 4.5352 11.9328 5.01 12.2327 5.2957L18.484 11.2502L3.75 11.2502C3.33579 11.2502 3 11.5859 3 12.0002C3 12.4144 3.33579 12.7502 3.75 12.7502L18.4844 12.7502L12.2327 18.705C11.9328 18.9907 11.9212 19.4654 12.2069 19.7653C12.4926 20.0652 12.9674 20.0768 13.2673 19.7911L20.6862 12.7244C20.8553 12.5634 20.9552 12.358 20.9861 12.1444C20.9952 12.0977 21 12.0495 21 12.0002C21 11.9505 20.9952 11.9019 20.9859 11.8549C20.9548 11.6418 20.8549 11.4369 20.6862 11.2762L13.2673 4.2095Z"
                    fill="rgba(1, 1, 1, .2)"/>
            </svg>
        </button>
    )
}
