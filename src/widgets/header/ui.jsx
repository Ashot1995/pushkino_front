import {networkService} from "../../shared/lib/network";
import {HeaderLayout} from "../../features/header";

export async function Header() {
    const throughContacts = await networkService().getThroughContacts();
    const categoriesForMenu = await networkService().getCategoriesForMenu();

    return (
        <HeaderLayout
            throughContacts={throughContacts}
            categoriesForMenu={categoriesForMenu}
        />
    )
}
