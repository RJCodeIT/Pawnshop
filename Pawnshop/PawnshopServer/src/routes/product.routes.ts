import { Router } from 'express';
import { addProduct, getProductById, getAllProducts, updateProduct, deleteProduct, uploadProductImage } from '../controllers/product.controller';

const router: Router = Router();

router.post('/products', uploadProductImage, addProduct);
router.get('/products/:id', getProductById);
router.get('/products', getAllProducts);
router.put('/products/:id', uploadProductImage, updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;