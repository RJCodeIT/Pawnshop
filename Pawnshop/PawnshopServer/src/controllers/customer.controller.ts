import { Request, Response } from 'express';
import { AppDataSource } from "../data-source";
import { Customer } from '../models/customer.model';

const customerRepository = AppDataSource.getRepository(Customer);

export const addCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCustomer = customerRepository.create(req.body);
    const savedCustomer = await customerRepository.save(newCustomer);
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error('Error adding customer:', error);
    res.status(500).json({ message: 'An error occurred while adding the customer.', error });
  }
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Fetching customer with ID:', id);

    const customer = await customerRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.products', 'products')
      .select([
        'customer.id',
        'customer.firstName',
        'customer.lastName',
        'customer.pesel',
        'customer.dateOfBirth',
        'customer.street',
        'customer.houseNumber',
        'customer.postalCode',
        'customer.city',
        'customer.idSeries',
        'customer.idNumber',
        'customer.phoneNumber',
        'customer.email',
        'customer.notes',
        'products.id',
        'products.productName',
        'products.transactionType'
      ])
      .where('customer.id = :id', { id })
      .getOne();

    if (!customer) {
      console.log('Customer not found:', id);
      res.status(404).json({ message: `Customer with ID ${id} not found.` });
      return;
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Detailed error in getCustomerById:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching the customer.',
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export const getAllCustomers = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching all customers');
    
    const customers = await customerRepository
      .createQueryBuilder('customer')
      .select([
        'customer.id',
        'customer.firstName',
        'customer.lastName',
        'customer.pesel'
      ])
      .getMany();

    console.log(`Found ${customers.length} customers`);
    res.status(200).json(customers);
  } catch (error) {
    console.error('Detailed error in getAllCustomers:', error);
    res.status(500).json({ 
      message: 'An error occurred while fetching the customers.',
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // First check if customer exists
    const existingCustomer = await customerRepository.findOne({ 
      where: { id },
      relations: ['products']
    });

    if (!existingCustomer) {
      res.status(404).json({ message: `Customer with ID ${id} not found.` });
      return;
    }

    // Update only allowed fields
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      pesel: req.body.pesel,
      dateOfBirth: req.body.dateOfBirth,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
      postalCode: req.body.postalCode,
      city: req.body.city,
      idSeries: req.body.idSeries,
      idNumber: req.body.idNumber,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      notes: req.body.notes
    };

    // Update the customer
    await customerRepository.update(id, updateData);

    // Fetch the updated customer
    const updatedCustomer = await customerRepository.findOne({
      where: { id },
      relations: ['products']
    });

    res.status(200).json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ 
      message: 'An error occurred while updating the customer.', 
      error: error instanceof Error ? error.message : String(error)
    });
  }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCustomer = await customerRepository.delete(id);

    if (!deletedCustomer.affected) {
      res.status(404).json({ message: `Customer with ID ${id} not found.` });
      return;
    }

    res.status(200).json({ message: `Customer with ID ${id} has been deleted.` });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ message: 'An error occurred while deleting the customer.', error });
  }
};