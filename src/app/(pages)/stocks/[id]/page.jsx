import {SingleStockWidget} from "../../../../widgets/single-stock";
import {networkService} from "../../../../shared/lib/network";

// export function generateStaticParams() {
//     return [{ id: '1' }, { id: '2' }, { id: '3' }]
// }

export async function generateMetadata({params}) {
    const data = await networkService().getStock(params.id);

    return {
        title: data.header.heading,
        description: data.header.heading,
        keywords: data.header.heading,
    }
}

export default async function SingleStockPage({params}) {
    const data = await networkService().getStock(params.id);

    return (
        <>
            {
                data &&
                    <SingleStockWidget data={data} />
            }
        </>
    )
}
