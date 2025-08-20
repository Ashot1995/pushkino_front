'use client';

import {UISection} from "../../../shared/ui/section";

import styles from './styles.module.scss';

export function AboutNums({data}) {
    return (
        <UISection >
            <div className={styles['about__grid']}>
              {
                  data.map((item, index) => {
                      let num = '';
                      let unit = '';

                      if (item.description) {
                          const description = item.description.trim().replace(/\s+/g, ' ').split(' ');

                          if (description.length > 1 && isNaN(+description.slice(-1)[0])) {
                              num = description.slice(0, description.length - 1).join(' ');
                              unit = description.slice(-1)[0] === 'М2' ? 'М<sup>2</sup>' : description.slice(-1)[0];
                          } else {
                              num = description.slice(0, description.length).join(' ');
                          }
                      }

                      return (
                          <div key={index} className={styles['about__item']}>
                              <div className={styles['about__text']}>
                                  {item.heading && item.heading}
                              </div>
                              <div
                                  className={styles['about__num']}
                              >{num} <span dangerouslySetInnerHTML={{ __html: unit }} /></div>
                          </div>
                      )
                  })
              }
            </div>
        </UISection>
    )
}
