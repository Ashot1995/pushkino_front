import {SingleRenterWidget} from "../../../../../widgets/single-renter";
import {networkService} from "../../../../../shared/lib/network";

export async function generateMetadata({params}) {
    const data = await networkService().getRenterData(params.id);

    return {
        title: data.header.heading,
        description: data.header.heading,
        keywords: data.header.heading,
    }
}

export default async function SingleCafePage({params}) {
    const data = await networkService().getRenterData(params.id);

    return (
        <SingleRenterWidget data={data} renterType='cafes' />
    )
}
