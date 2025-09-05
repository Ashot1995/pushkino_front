import {networkService} from "../../../../../shared/lib/network";
import {SingleRenterWidget} from "../../../../../widgets/single-renter";

export async function generateMetadata({params}) {
    try {
        const data = await networkService().getRenterData(params.id);

        return {
            title: data?.header?.heading || 'Магазин',
            description: data?.header?.heading || 'Магазин',
            keywords: data?.header?.heading || 'Магазин',
        }
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Магазин',
            description: 'Магазин',
            keywords: 'Магазин',
        }
    }
}

export default async function SingleStorePage({params}) {
    try {
        const data = await networkService().getRenterData(params.id);

        return (
            <>
                <SingleRenterWidget data={data} renterType='stores' />
            </>
        )
    } catch (error) {
        console.error('Error loading store data:', error);
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h1>Ошибка загрузки данных</h1>
                <p>Не удалось загрузить информацию о магазине. Попробуйте обновить страницу.</p>
            </div>
        )
    }
}
