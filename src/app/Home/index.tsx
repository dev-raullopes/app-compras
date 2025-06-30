import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { styles } from "./styles";
import logoImg from "@/assets/logo.png";
import { ButtonApp } from "@/components/Button";
import { InputApp } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEM = [
  {
    id: "1",
    status: FilterStatus.PENDING,
    description: "Comprar pão",
  },
  {
    id: "2",
    status: FilterStatus.DONE,
    description: "Comprar leite",
  },
  {
    id: "3",
    status: FilterStatus.PENDING,
    description: "Comprar ovos",
  },
  {
    id: "4",
    status: FilterStatus.DONE,
    description: "Comprar frutas",
  },
];
export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />
      <View style={styles.form}>
        <InputApp placeholder="O que você deseja comprar?" />
        <ButtonApp title="Adicionar" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={status === FilterStatus.DONE}
            />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ITEM}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => console.log("Remove item")}
              onStatus={() => console.log("Change status")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Não há itens na lista</Text>}
        />
      </View>
    </View>
  );
}
