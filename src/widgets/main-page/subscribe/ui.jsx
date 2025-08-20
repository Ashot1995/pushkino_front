import Link from "next/link";

import {UISection} from "../../../shared/ui/section";
import {SubscribeEmail} from "../../../features/subscribe-email";
import {SocialBlock} from "../../../shared/ui/social-block";

import styles from './styles.module.scss';

import {LINKS} from "./config";

export function MainPageSubscribe() {
    return (
        <UISection defaultClass={styles['subscribe']}>
            <div className={styles['subscribe__links']}>
                    {
                        LINKS.map(link => (
                            <div className={styles['subscribe__link']} key={link.id}>
                                <Link
                                    href={link.href}
                                    target={`${link.href.includes('http') ? '_blank' : ''}`}
                                >
                                    {link.anchor}
                                </Link>
                            </div>
                        ))
                    }
            </div>

            <div className={styles['subscribe__wrapper']}>
                <div className={styles['subscribe__subscribe-block']}>
                    <div className={styles['subscribe__heading']}>Много задач - <br />одно решение</div>
                    <div className={styles['subscribe__subheading']}>Подписывайтесь</div>
                    <div className={styles['subscribe__input']}>
                        <SubscribeEmail button='ButtonCircleTransparentGray' />
                    </div>
                    <div className={styles['subscribe__social']}>
                        <SocialBlock vkLink='https://vk.com/trcpushkinopark' tgLink='https://t.me/pushkinoparktrc' />
                    </div>
                </div>
                <div className={styles['subscribe__image']}>
                    <picture>
                        <source srcSet="/images/main-page/subscribe/main-img-mobile.png" media="(max-width: 375px)"/>
                        <source srcSet="/images/main-page/subscribe/main-img-tablet.png" media="(max-width: 720px)"/>
                        <img src="/images/main-page/subscribe/main-img-desktop.png"
                             alt="Подписка на новости Пушкино Парк"/>
                    </picture>
                </div>
            </div>
        </UISection>
    )
}
