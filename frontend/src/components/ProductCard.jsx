import { Box ,Image , Heading ,HStack,Text, IconButton, VStack,Input, useToast, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, ModalHeader, ModalFooter, Button} from "@chakra-ui/react"
import { EditIcon , DeleteIcon } from "@chakra-ui/icons"
import { useProductStore } from "../store/product"
import { Modal } from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

const ProductCard = ({product}) => {

    // const textColor = useColorMode("gray:600","gray:200")
    // const bg = useColorMode("blue","gray:800")
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct,setUpdatedProduct] = useState(product)



    const {deleteProduct , updateProduct}=useProductStore()
    const toast = useToast()




    const handleDeleteProduct = async (pid) =>{
        const{success,message} =await deleteProduct(pid)
        if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
    }
    // const {updatedProduct} =useProductStore()
    const handleUpdateProduct = async(pid,updatedProduct) =>{
        const { success, message } = await updateProduct(pid, updatedProduct);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
    }
    return(
        <Box    
        shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			
        >
         <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />   
         <Box p={4}>
         <Heading as='h3' size='md' mb={2}>
					{product.name}
		</Heading>
         <Text fontWeight='bold' fontSize='xl'  mb={4}>
		 	${product.price}
		 </Text>
         <HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton	icon={<DeleteIcon />} onClick={()=>handleDeleteProduct(product._id)} colorScheme='red'/>
				</HStack>
         </Box>
         <Modal isOpen={isOpen} onClose={onClose}>
         <ModalOverlay/>
         <ModalContent>
         <ModalHeader>Update Content</ModalHeader>
         <ModalCloseButton/>
         <ModalBody>
         <VStack spacing={4}>
							<Input
								placeholder='Product Name'
								name='name'
								value={updatedProduct.name}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							/>
							<Input
								placeholder='Price'
								name='price'
								type='number'
								value={updatedProduct.price}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
							/>
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedProduct.image}
								onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
							/>
						</VStack>
         </ModalBody>
         <ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
         </ModalContent>
         </Modal>
        </Box>
    )
}
export default ProductCard