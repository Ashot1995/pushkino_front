'use client';

import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {UISection} from "../../../shared/ui/section";
import {ContactBlock} from "../../../shared/contacts";
import {SocialBlock} from "../../../shared/ui/social-block";

import styles from './styles.module.scss';

export function ContactsBlock({data}) {
    const socialLinks = useSelector(state => state.throughContactsData.value);

    const [socialLinksData, setSocialLinksData] = useState(null);

    useEffect(() => {
        setSocialLinksData(socialLinks);
    }, [socialLinks]);

    return (
        <UISection>
            <>
                <div  className={styles['contacts-block__grid']}>
                    {
                        data.administration &&
                            <div className={styles['contacts-block__item']}>
                                <ContactBlock heading='Администрация ТРЦ' data={data.administration}/>
                            </div>
                    }
                    {
                        data.rentalPremises &&
                            <div className={styles['contacts-block__item']}>
                                <ContactBlock heading='Аренда помещений' data={data.rentalPremises}/>
                            </div>
                    }
                    {
                        data.rentalPremises1 &&
                            <div className={styles['contacts-block__item']}>
                                <ContactBlock heading='&nbsp' data={data.rentalPremises1}/>
                            </div>
                    }
                </div>
                {
                    data.otherContactsList &&
                        Object.keys(data.otherContactsList).map((key, index) => (
                            <div className={styles['contacts-block__grid']} key={index}>
                                {
                                    data.otherContactsList[key].map((contact, index) => (
                                        <div className={styles['contacts-block__item']} key={index}>
                                            <ContactBlock
                                                heading={index === 0 ? key : '&#8203;'}
                                                data={contact}
                                            />
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                }
                <div className={styles['contacts-block__grid']}>
                    {
                        data.marketing &&
                            <div className={styles['contacts-block__item']}>
                                <ContactBlock heading='Реклама и маркетинг' data={data.marketing}/>
                            </div>
                    }
                    <div className={styles['contacts-block__item']}>
                        <div className={styles['contacts-block__title']}>Социальные сети</div>
                        {
                            socialLinksData?.socialLinks?.length > 0 &&
                                <div className={styles['contacts-block__social']}>
                                    <SocialBlock
                                        tgLink={socialLinksData.socialLinks[0].telegram}
                                        vkLink={socialLinksData.socialLinks[0].vkontakte}
                                    />
                                </div>
                        }
                    </div>
                </div>
            </>
        </UISection>
    )
}
