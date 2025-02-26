import { Router } from 'express';
import { addCustomer, getCustomerById, getAllCustomers, updateCustomer, deleteCustomer } from '../controllers/customer.controller';

const router: Router = Router();

router.post('/customers', addCustomer);
router.get('/customers/:id', getCustomerById);
router.get('/customers', getAllCustomers);
router.put('/customers/:id', updateCustomer);
router.delete('/customers/:id', deleteCustomer);

export default router;
