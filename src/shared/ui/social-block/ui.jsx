import {SvgIcon} from "../svg-icon";

import styles from './styles.module.scss';

export function SocialBlock({vkLink, tgLink}) {
    return (
        <>
            {
                vkLink &&
                    <a
                        href={vkLink}
                        className={`${styles['social-link']}`}
                        target="_blank"
                    >
                        <SvgIcon id="vkontakte" color="#000"/>
                    </a>
            }
            {
                tgLink &&
                    <a
                        href={tgLink}
                        className={`${styles['social-link']}`}
                        target="_blank"
                    >
                        <SvgIcon id="telegram" color='#000'/>
                    </a>
            }
        </>
    )
}
