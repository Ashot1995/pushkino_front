import Image from "next/image";

export function DefaultImage({
    src,
    srcMob = src,
    alt
}) {

    const image = <Image
                        src={src}
                        alt={alt}
                        fill={true}
                        sizes='100%'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectPosition: 'center',
                            objectFit: 'cover',
                        }}
                        quality={100}
                    />;

    const picture = <picture>
                        <source srcSet={srcMob} media="(max-width:640px)"/>
                        <Image
                            src={src}
                            alt={alt}
                            fill={true}
                            sizes='100%'
                            style={{
                                width: '100%',
                                height: '100%',
                                objectPosition: 'center',
                                objectFit: 'cover',
                            }}
                            quality={100}
                        />
                    </picture>;

    return (
        <>
            {
                src === srcMob
                    ? image
                    : picture
            }
        </>
    )
}
