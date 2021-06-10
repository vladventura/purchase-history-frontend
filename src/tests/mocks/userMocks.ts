import { Item, User, UserProfile } from "../../graphql/schemas";
import { items } from "./itemMocks";

export const userProfile: UserProfile = {
    createdAt: "2020-01-01",
    totalCost: items.map((item) => item.cost).reduce((a, b) => a + b),
    totalPrice: items.map((item) => item.price).reduce((a, b) => a + b),
    totalAddedItems: items.length,
};

export const user: User = {
    id: "233",
    createdAt: "2020-01-01",
    token: "ifub2397tpc9273ty",
    username: "sleepy",
    items: items as [Item],
    profile: userProfile,
};
