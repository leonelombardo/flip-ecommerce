import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Heading } from "@chakra-ui/react"
import { collection, query, getDocs } from "firebase/firestore"

import { db } from "../firebase/client"

import { ItemList } from "../components/ItemList"
import { Wrapper } from "../components/Wrapper"

export const ItemListContainer = ({greeting}) => {
    const [products, setProducts] = useState([])
    const { categoryId } = useParams()

    const getSkateboards = async (category) => {
        if(!category){
            return
        }

        const q = query(collection(db, category));

        try{
            const querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc => setProducts(previous => [...previous, {id: doc.id, ...doc.data()}]))
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=> {
        getSkateboards()
    }, [])

    useEffect(() => {
        getSkateboards(categoryId)
    }, [categoryId])

    return (
        <Wrapper>
            <Container display="flex" alignItems="center">
                {
                    categoryId === "skateboards"
                        ? <ItemList category={categoryId} products={products}/>
                        : categoryId === "clothing"
                            ? <ItemList category={categoryId} products={products}/>
                            : <Heading as={motion.p} fontSize={{base: 24, md: 48}} fontWeight={1000} textAlign="center" display="flex" {...wordVariants}>Something went wrong</Heading>
                }
            </Container>
        </Wrapper>
    )
}