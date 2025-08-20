import styles from './styles.module.scss';

export function ContactBlock({heading = '', data}) {
    const formatPhoneNumber = (phone) => {
        let number = phone.replace(/\D/g, '');
        if (number[0] === '7') number = number.slice(1);
        if (number[0] === '8') number = number.slice(1);
        return number;
    };

    const renderPhoneLink = (phone, managerName = null) => {
        const formattedNumber = formatPhoneNumber(phone);
        return (
            <div key={phone + (managerName || '')} className={styles['contacts__num']}>
                <pre>
                    <a
                        href={`tel:+7${formattedNumber}`}
                        className={styles['contacts__phone']}
                    >
                        +7 {formattedNumber.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4')}
                    </a>
                    {managerName && <span> ({managerName})</span>}
                </pre>
            </div>
        );
    };

    return (
        <div key={data.id} className={styles['contacts']}>
            <div className={styles['contacts__title']} dangerouslySetInnerHTML={{ __html: heading }} />

            {/* Обработка массива телефонов без менеджеров (администрация) */}
            {data.phoneNumbers && data.phoneNumbers.map((phone, index) =>
                renderPhoneLink(phone)
            )}

            {/* Обработка массива менеджеров по аренде */}
            {Array.isArray(data) && data.map((manager, index) => (
                <div key={index}>
                    {manager.phoneNumber && renderPhoneLink(manager.phoneNumber, manager.managerName)}
                    {manager.managerEmail && (
                        <div className={styles['contacts__email']}>
                            <a href={`mailto:${manager.managerEmail}`}>{manager.managerEmail}</a>
                        </div>
                    )}
                </div>
            ))}

            {/* Обработка единичного контакта (обратная совместимость) */}
            {!Array.isArray(data) && data.phoneNumber &&
                renderPhoneLink(data.phoneNumber, data.managerName)
            }

            {/* Email для единичного контакта или общий email */}
            {data.email && (
                <div className={styles['contacts__email']}>
                    <a href={`mailto:${data.email}`}>{data.email}</a>
                </div>
            )}

            {/* Email менеджера для единичного контакта */}
            {!Array.isArray(data) && data.managerEmail && (
                <div className={styles['contacts__email']}>
                    <a href={`mailto:${data.managerEmail}`}>{data.managerEmail}</a>
                </div>
            )}

            {/* Презентация */}
            {data.presentationLink && (
                <a href={data.presentationLink} className={`${styles['contacts__btn']} btn btn_blue`}>
                    Скачать презентацию
                </a>
            )}
        </div>
    );
}