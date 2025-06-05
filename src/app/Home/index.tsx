import { View, Image, TouchableOpacity, Text, FlatList} from "react-native";
import { styles } from "./styles";
import logoImg from "@/assets/logo.png";
import { ButtonApp } from "@/components/Button";
import { InputApp } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/filterStatus";
import { Item } from "@/components/Item";

// Definindo os status de filtro disponíveis, importando o tipo FilterStatus
const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDENTE, FilterStatus.CONCLUIDO];

// Array de itens de exemplo, ID deve ser único pois é usado como chave no FlatList
const ITENS = [
  { id: "1", status: FilterStatus.PENDENTE, description: "Cafe" },
  { id: "2", status: FilterStatus.CONCLUIDO, description: "Almoço" },
  { id: "3", status: FilterStatus.PENDENTE, description: "Jantar" },
]
export function Home() {
  return (
    <View style={styles.container}>
      <Image source={logoImg} style={styles.logo} />
      <View style={styles.form}>
        <InputApp placeholder="O que deseja comprar?" />
        <ButtonApp />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
        {
          FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive />
          ))
        }
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
        </View>
        <FlatList 
        data={ITENS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Item 
            data={item}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, alignItems: "center", paddingTop: 24 }}>
            <Text style={{ color: "#828282", fontSize: 16 }}>Nenhum item</Text>
          </View>
        )}
        />
      </View>
    </View>
  );
}
