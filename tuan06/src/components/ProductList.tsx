import { useEffect, useState } from "react"
import { FlatList, Image, Text, View } from "react-native"

const url = "https://6a0f16e21736097c360b1ff8.mockapi.io/api/v1/products"

interface Product {
    id: string,
    name: string,
    image: string,
    price: number
}

const ProductList = () => {

    const [products, setProducts] = useState<Product[]>([]);

    const [loading, setLoading] = useState(false)
    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await fetch(url);
                const data = await res.json();
                setProducts(data)
            } catch (error) {
                throw new Error("error");

            } finally {
                setLoading(false);
            }
        }
        fetchData()
    }, [])

    if (loading) {
        return <View><Text>Loading</Text></View>
    }

    return <View>
        <FlatList
            data={products}
            renderItem={({ item }) => <ProductItem name={item.name} img={item.image} price={item.price} />}
            keyExtractor={(item) => item.id.toString()}
        />
    </View>
}




const ProductItem = ({ name, img, price }: { name: string, img: string, price: number }) => {
    return <View style={{ borderWidth: 1, margin: 5, borderRadius: 20, padding: 5, flexDirection: "row", justifyContent: "space-between" }}>
        <View> <Text>Name: {name}</Text>
            <Text>Price: ${price}</Text></View>
        <Image source={{ uri: img }} style={{ width: 75, height: 75, borderRadius:10 }} />
    </View>
}
export default ProductList