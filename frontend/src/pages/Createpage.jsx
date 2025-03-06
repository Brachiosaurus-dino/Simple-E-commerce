import { Box, Container, Heading, Input, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { Button } from "@chakra-ui/react";
import { useProductStore } from "../store/product";

function Createpage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct}=useProductStore()
  const toast = useToast()
  const handleAddProduct = async() => {
    const {success,message} = await createProduct(newProduct)
    if(!success) {
      toast({
        title:"Error",
        description:message,
        status:"error",
        isClosable:true
      })
    }else{
      toast({
        title:"Success",
        description:message,
        status:"success",
        isClosable:true
      }
      )
      
    }
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} mb={8} textAlign={"center"}>
          Create New Product
        </Heading>

        <Box w={"full"} p={6} rounded={"lg"} shadow={"md"}>
          <VStack>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            ></Input>
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            ></Input>
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Createpage;
