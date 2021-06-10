import { Item } from "../../graphql/schemas";

export const items: Array<Item> = [
    {
        id: "01",
        cost: 21,
        price: 30,
        createdAt: "2020/01/01",
        name: "Pancakes",
        username: "sleepy",
    }, {
        id: "02",
        cost: 25,
        price: 50,
        createdAt: "2021/02/01",
        name: "Flour",
        username: "sleepy",
    }, {
        id: "03",
        cost: 2,
        price: 0,
        createdAt: "2024/11/01",
        name: "Mouse",
        username: "sleepy",
    }, {
        id: "04",
        cost: 54,
        price: 1000,
        createdAt: "2020/01/23",
        name: "Keyboard",
        username: "sleepy",
    }, {
        id: "05",
        cost: 70,
        price: 120,
        createdAt: "2020/2/01",
        name: "Tequila",
        username: "sleepy",
    }, {
        id: "06",
        cost: 750,
        price: 10,
        createdAt: "2020/08/11",
        name: "Speaker",
        username: "sleepy",
    },
]

export const item: Item = items[0];
