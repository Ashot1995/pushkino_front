import Link from "next/link";
import {ImagePage} from "../../../shared/image-page";
import {UISection} from "../../../shared/ui/section";
import styles from './styles.module.scss';

export function AboutPresentation({description, link, srcDesk, srcMob=srcDesk, alt}) {
    return (
        <UISection defaultClass={styles['about__presentation']}>
            <div className={styles['about__topflex']}>
                <div className={styles['about__left']}>
                <div
                    className={styles['about__desc']}
                    dangerouslySetInnerHTML={{__html: description}} />
                    {
                        link &&
                            <Link href={link} className={`${styles['about__link']} btn`}>Скачать презентацию</Link>
                    }
                </div>
                <div className={styles['about__first_image']} >
                    {
                        ImagePage &&
                        <ImagePage imgDesk={srcDesk} imgMob={srcMob} alt={alt} />
                    }
                </div>
            </div>
        </UISection>
    )
}
