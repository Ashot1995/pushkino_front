'use client'

import React, {useState} from "react";
import {createPortal} from "react-dom";

import {Input} from "../../shared/ui/inputs";
import {ButtonCircleTransparentGray} from "../../shared/ui/buttons";
import {NewsSubscribeModal} from "../../shared/ui/news-subscribe";

import styles from './styles.module.scss';

export function SubscribeEmail({button}) {
    const [showModal, setShowModal] = useState(false);

    const [inputEmail, setInputEmail] = useState('');

    return (
        <>
            <div className={styles['subscribe-email']}>
                <Input
                    attributes={{type: 'text', placeholder: 'Электронная почта'}}
                    value={inputEmail}
                    onChange={event => setInputEmail(event.target.value)}
                />
                <ButtonCircleTransparentGray onClick={() => setShowModal(true)} />
            </div>
            {/*<Checkbox  label='Даю согласие на обработку персональных данных' />*/}

            {showModal && createPortal(
                <NewsSubscribeModal
                    email={inputEmail}
                    onClose={() => setShowModal(false)}
                />,
                document.body
            )}
        </>
    )
}
