import moment from "moment"
import { Item } from "../graphql/schemas"

enum SortTypes {
    PriceAsc,
    PriceDesc,
    NameAsc,
    NameDesc,
    CostAsc,
    CostDesc,
    Current
}

type SorterInput = {
    items?: [Item],
    type: SortTypes
}

const sorter = (items: SorterInput["items"], type?: SorterInput["type"]) => {

    const priceDsc = (a: Item, b: Item) => a.price > b.price ? -1 : 0
    const priceAsc = (a: Item, b: Item) => a.price < b.price ? -1 : 0
    const costDsc = (a: Item, b: Item) => a.cost > b.cost ? -1 : 0
    const costAsc = (a: Item, b: Item) => a.cost < b.cost ? -1 : 0
    const nameDsc = (a: Item, b: Item) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 0
    const nameAsc = (a: Item, b: Item) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 0
    const defaultSorter = (a: Item, b: Item) =>
        moment(a.createdAt).isAfter(moment(b.createdAt)) ? -1 : 0


    let newItems = Array.from(items || []);
    switch (type) {
        case SortTypes.PriceAsc: return newItems?.sort(priceAsc);
        case SortTypes.PriceDesc: return newItems?.sort(priceDsc);
        case SortTypes.CostAsc: return newItems?.sort(costAsc);
        case SortTypes.CostDesc: return newItems?.sort(costDsc);
        case SortTypes.NameAsc: return newItems?.sort(nameAsc);
        case SortTypes.NameDesc: return newItems?.sort(nameDsc);
        case SortTypes.Current: return newItems;
        default: return newItems?.sort(defaultSorter);
    }
}

export {
    sorter,
    SortTypes
}