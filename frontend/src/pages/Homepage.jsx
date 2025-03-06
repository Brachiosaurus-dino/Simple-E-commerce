import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useProductStore } from "../store/product"
import ProductCard from "../components/ProductCard"

function Homepage() {
  const {fetchProducts , products} = useProductStore()
  useEffect(()=>{
    fetchProducts();
  },[fetchProducts])
  console.log("products",products)

  return (
    <Container maxN="container.x1" py={12}>
      <VStack spacing={8}>
        <Text
        fontSize={"30"}
        fontWeight={"bold"}
        bgGradient={"linear(to-r, cyan.400, blue.500)"}
        bgClip={"text"}
        textAlign={"center"}
        >
          Current Products
        </Text>
        <SimpleGrid  columns={[2, null, 3]} w={"1000px"} gap="40px" >
        {products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
        </SimpleGrid>
        {products.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No products found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a product
							</Text>
						</Link>
					</Text>
				)}
      </VStack>
    </Container>
  )
}

export default Homepage