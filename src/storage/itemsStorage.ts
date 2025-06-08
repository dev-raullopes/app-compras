import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/filterStatus";

const ITEMS_STORAGE = "@comprar:items";


export type ItemStorage = {
    id: string;
    description: string;
    status: FilterStatus;
}

async function get(): Promise<ItemStorage[]> {
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE);
        const items: ItemStorage[] = storage ? JSON.parse(storage) : [];
        return items;
    }catch (error) {
        throw new Error("Erro ao obter os itens da lista de compras.");
    }
}
async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
    const items = await get();
    return items.filter(item => item.status === status);
}
async function save(items: ItemStorage[]): Promise<void> {
    try {
        const storage = JSON.stringify(items);
        await AsyncStorage.setItem(ITEMS_STORAGE, storage);
    } catch (error) {
        throw new Error("Erro ao salvar os itens da lista de compras.");
    }
}
async function add(newitem: ItemStorage): Promise<ItemStorage[]> {
    const items = await get();
    const updatedItems = [...items, newitem];
    await save(updatedItems);
    return updatedItems;
}
async function remove(id: string): Promise<void> {
    const items = await get();
    const updatedItems = items.filter(item => item.id !== id);
    await save(updatedItems);
}
async function clearAll(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE);
    } catch (error) {
        throw new Error("Erro ao limpar os itens da lista de compras.");
    }
}
async function toggleStatus(id: string): Promise<void> {
    const items = await get();
    const updatedItems = items.map((item) => 
        item.id === id ? { ...item, status: item.status === FilterStatus.PENDENTE 
            ? FilterStatus.CONCLUIDO : FilterStatus.PENDENTE } : item
    )
    await save(updatedItems);
}
export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clearAll,
    toggleStatus
}
