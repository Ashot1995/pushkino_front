import {UISection} from "../../../shared/ui/section";
import {SocialBlock} from "../../../shared/ui/social-block";
import {SvgIcon} from "../../../shared/ui/svg-icon";

import styles from './styles.module.scss';

export function SingleRenterContacts({data}) {
    return (
        <UISection defaultClass={styles['renter-contacts']}>
            <div className={styles['renter-contacts__wrapper']}>
                <div className={styles['renter-contacts__local']}>
                    {
                        data.workingTime &&
                            <div className={styles['renter-contacts__item']}>
                                <SvgIcon id="clock" color="#3383a4"/>
                                <span>{data.workingTime}</span>
                            </div>
                    }
                    {
                        data.links &&
                            data.links.website &&
                                <a href={data.links.website} className={styles['renter-contacts__item']} target="_blank">
                                    <SvgIcon id="browse" color="#3383a4"/>
                                    <span>Сайт бренда</span>
                                </a>
                    }
                    {
                        data.phoneNumber &&
                            <div className={styles['renter-contacts__item']}>
                                <SvgIcon id="call" color="#3383a4"/>
                                <span>{data.phoneNumber}</span>
                            </div>
                    }
                </div>
                {
                    data.links &&
                        (data.links.vk || data.links.tg) &&
                            <div className={styles['renter-contacts__social']}>
                                <SocialBlock vkLink={data.links.vk} tgLink={data.links.tg} />
                            </div>
                }
            </div>
        </UISection>
    )
}
