import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Product } from '../models/product.model';
import { Customer } from '../models/customer.model';
import multer from 'multer';

const productRepository = AppDataSource.getRepository(Product);
const customerRepository = AppDataSource.getRepository(Customer);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 5MB
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  },
});

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received request body:', req.body);
    const {
      productName,
      productDescription,
      category,
      brand,
      productModel,
      serialNumber,
      yearOfProduction,
      technicalCondition,
      purchasePrice,
      salePrice,
      additionalNotes,
      transactionType,
      dateOfReceipt,
      redemptionDeadline,
      loanValue,
      interestRate,
      clientId,
    } = req.body;

    let productImage: Buffer | undefined;
    if (req.file) {
      productImage = req.file.buffer;
    }

    if (!clientId) {
      res.status(400).json({ message: 'Client ID is required' });
      return;
    }

    console.log('Looking for customer with ID:', clientId);
    const customer = await customerRepository.findOne({ 
      where: { id: clientId }
    });

    if (!customer) {
      console.log('Customer not found:', clientId);
      res.status(404).json({ message: `Customer with ID ${clientId} not found.` });
      return;
    }

    console.log('Found customer:', customer);

    // Create a new product with the exact property names from the model
    const newProduct = new Product();
    
    // Required fields
    if (!productName || !productDescription || !category || !technicalCondition || !purchasePrice || !transactionType) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    newProduct.productName = productName;
    newProduct.productDescription = productDescription;
    newProduct.category = category;
    newProduct.technicalCondition = technicalCondition;
    newProduct.purchasePrice = Number(purchasePrice);
    newProduct.transactionType = transactionType;
    newProduct.dateOfReceipt = dateOfReceipt ? new Date(dateOfReceipt) : new Date();
    newProduct.client = customer;

    // Optional fields
    if (brand) newProduct.brand = brand;
    if (productModel) newProduct.productModel = productModel;
    if (serialNumber) newProduct.serialNumber = serialNumber;
    if (yearOfProduction) newProduct.yearOfProduction = Number(yearOfProduction);
    if (salePrice) newProduct.salePrice = Number(salePrice);
    if (additionalNotes) newProduct.additionalNotes = additionalNotes;
    if (redemptionDeadline) newProduct.redemptionDeadline = new Date(redemptionDeadline);
    if (loanValue) newProduct.loanValue = Number(loanValue);
    if (interestRate) newProduct.interestRate = Number(interestRate);
    if (productImage) newProduct.productImage = productImage;

    console.log('Created product:', newProduct);

    console.log('Saving product:', newProduct);
    const savedProduct = await productRepository.save(newProduct);
    console.log('Saved product:', savedProduct);

    const response = {
      id: savedProduct.id,
      productName: savedProduct.productName,
      productDescription: savedProduct.productDescription,
      category: savedProduct.category,
      brand: savedProduct.brand,
      productModel: savedProduct.productModel,
      serialNumber: savedProduct.serialNumber,
      yearOfProduction: savedProduct.yearOfProduction,
      technicalCondition: savedProduct.technicalCondition,
      purchasePrice: savedProduct.purchasePrice,
      salePrice: savedProduct.salePrice,
      productImage: savedProduct.productImage ? savedProduct.productImage.toString('base64') : undefined,
      additionalNotes: savedProduct.additionalNotes,
      transactionType: savedProduct.transactionType,
      dateOfReceipt: savedProduct.dateOfReceipt,
      redemptionDeadline: savedProduct.redemptionDeadline,
      loanValue: savedProduct.loanValue,
      interestRate: savedProduct.interestRate,
      client: savedProduct.client ? {
        id: savedProduct.client.id,
        firstName: savedProduct.client.firstName,
        lastName: savedProduct.client.lastName,
        pesel: savedProduct.client.pesel
      } : undefined,
      clientName: savedProduct.client ? `${savedProduct.client.firstName} ${savedProduct.client.lastName}` : undefined
    };

    console.log('Sending product response:', response);
    res.status(201).json(response);
  } catch (error) {
    console.error('Error in addProduct:', error);
    res.status(500).json({ message: 'An error occurred while adding the product.', error });
  }
};

export const uploadProductImage = upload.single('productImage');

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Fetching product with ID:', id);
    const query = productRepository.createQueryBuilder('product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.client', 'client')
      .getSql();
    console.log('Generated SQL query:', query);
    const product = await productRepository.findOne({
      where: { id },
      relations: ['client'],
    });
    console.log('Found product:', product);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const response = {
      id: product.id,
      productName: product.productName,
      productDescription: product.productDescription,
      category: product.category,
      brand: product.brand,
      productModel: product.productModel,
      serialNumber: product.serialNumber,
      yearOfProduction: product.yearOfProduction,
      technicalCondition: product.technicalCondition,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      productImage: product.productImage ? product.productImage.toString('base64') : undefined,
      additionalNotes: product.additionalNotes,
      transactionType: product.transactionType,
      dateOfReceipt: product.dateOfReceipt,
      redemptionDeadline: product.redemptionDeadline,
      loanValue: product.loanValue,
      interestRate: product.interestRate,
      client: product.client ? {
        id: product.client.id,
        firstName: product.client.firstName,
        lastName: product.client.lastName,
        pesel: product.client.pesel
      } : undefined,
      clientName: product.client ? `${product.client.firstName} ${product.client.lastName}` : undefined
    };

    console.log('Sending product response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: 'Error getting product', error });
  }
};

export const getAllProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching all products');
    const products = await productRepository.find({
      relations: ['client'],
    });
    console.log('Found products:', products);

    const response = products.map(product => ({
      id: product.id,
      productName: product.productName,
      productDescription: product.productDescription,
      category: product.category,
      brand: product.brand,
      productModel: product.productModel,
      serialNumber: product.serialNumber,
      yearOfProduction: product.yearOfProduction,
      technicalCondition: product.technicalCondition,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      productImage: product.productImage ? product.productImage.toString('base64') : undefined,
      additionalNotes: product.additionalNotes,
      transactionType: product.transactionType,
      dateOfReceipt: product.dateOfReceipt,
      redemptionDeadline: product.redemptionDeadline,
      loanValue: product.loanValue,
      interestRate: product.interestRate,
      client: product.client ? {
        id: product.client.id,
        firstName: product.client.firstName,
        lastName: product.client.lastName,
        pesel: product.client.pesel
      } : undefined,
      clientName: product.client ? `${product.client.firstName} ${product.client.lastName}` : undefined
    }));

    console.log('Sending products response:', response);
    res.json(response);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Error getting products', error });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Updating product with ID:', id);
    console.log('Request body:', req.body);

    let product = await productRepository.findOne({ 
      where: { id },
      relations: ['client']
    });

    if (!product) {
      res.status(404).json({ message: `Product with ID ${id} not found.` });
      return;
    }

    console.log('Found existing product:', product);

    const {
      productName,
      productDescription,
      category,
      brand,
      productModel,
      serialNumber,
      yearOfProduction,
      technicalCondition,
      purchasePrice,
      salePrice,
      additionalNotes,
      transactionType,
      dateOfReceipt,
      redemptionDeadline,
      loanValue,
      interestRate,
      clientId,
    } = req.body;

    // Znajdź klienta jeśli został zmieniony
    if (clientId && (!product.client || clientId !== product.client.id)) {
      console.log('Client ID changed to', clientId);
      const customer = await customerRepository.findOne({ where: { id: clientId } });
      if (!customer) {
        res.status(404).json({ message: `Customer with ID ${clientId} not found.` });
        return;
      }
      product.client = customer;
    }

    // Aktualizacja podstawowych danych
    product.productName = productName;
    product.productDescription = productDescription;
    product.category = category;
    product.brand = brand;
    product.productModel = productModel;
    product.serialNumber = serialNumber;
    product.yearOfProduction = yearOfProduction ? parseInt(yearOfProduction.toString()) : undefined;
    product.technicalCondition = technicalCondition;
    product.purchasePrice = parseFloat(purchasePrice);
    product.salePrice = salePrice ? parseFloat(salePrice) : undefined;
    product.additionalNotes = additionalNotes;
    product.transactionType = transactionType;
    product.dateOfReceipt = new Date(dateOfReceipt);
    product.redemptionDeadline = redemptionDeadline ? new Date(redemptionDeadline) : undefined;
    product.loanValue = loanValue ? parseFloat(loanValue) : undefined;
    product.interestRate = interestRate ? parseFloat(interestRate) : undefined;

    // Aktualizacja zdjęcia jeśli zostało przesłane
    if (req.file) {
      product.productImage = req.file.buffer;
    }

    await productRepository.save(product);

    // Pobierz świeżo zaktualizowany produkt z relacjami
    const updatedProduct = await productRepository.findOne({
      where: { id },
      relations: ['client']
    });

    if (!updatedProduct) {
      res.status(404).json({ message: 'Updated product not found' });
      return;
    }

    const response = {
      id: updatedProduct.id,
      productName: updatedProduct.productName,
      productDescription: updatedProduct.productDescription,
      category: updatedProduct.category,
      brand: updatedProduct.brand,
      productModel: updatedProduct.productModel,
      serialNumber: updatedProduct.serialNumber,
      yearOfProduction: updatedProduct.yearOfProduction,
      technicalCondition: updatedProduct.technicalCondition,
      purchasePrice: updatedProduct.purchasePrice,
      salePrice: updatedProduct.salePrice,
      productImage: updatedProduct.productImage ? updatedProduct.productImage.toString('base64') : undefined,
      additionalNotes: updatedProduct.additionalNotes,
      transactionType: updatedProduct.transactionType,
      dateOfReceipt: updatedProduct.dateOfReceipt,
      redemptionDeadline: updatedProduct.redemptionDeadline,
      loanValue: updatedProduct.loanValue,
      interestRate: updatedProduct.interestRate,
      client: updatedProduct.client ? {
        id: updatedProduct.client.id,
        firstName: updatedProduct.client.firstName,
        lastName: updatedProduct.client.lastName,
        pesel: updatedProduct.client.pesel
      } : undefined,
      clientName: updatedProduct.client ? `${updatedProduct.client.firstName} ${updatedProduct.client.lastName}` : undefined
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    console.log('Attempting to delete product with ID:', id);

    // Najpierw sprawdźmy wszystkie produkty
    const allProducts = await productRepository.find();
    console.log('All product IDs in database:', allProducts.map(p => p.id));

    // Szukamy produktu
    const product = await productRepository.findOne({ 
      where: { id },
      relations: ['client'] 
    });

    console.log('Found product:', product);

    if (!product) {
      console.log('Product not found. Available products:', 
        allProducts.map(p => ({
          id: p.id,
          name: p.productName
        }))
      );
      res.status(404).json({ 
        message: `Product with ID ${id} not found.`,
        availableIds: allProducts.map(p => p.id)
      });
      return;
    }

    console.log('Removing product:', {
      id: product.id,
      name: product.productName,
      client: product.client?.id
    });

    await productRepository.remove(product);
    console.log('Product removed successfully');

    res.status(200).json({ 
      message: `Product with ID ${id} has been deleted.`,
      deletedProduct: {
        id: product.id,
        name: product.productName
      }
    });
  } catch (error) {
    console.error('Error in deleteProduct:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ 
      message: 'An error occurred while deleting the product.',
      error: error instanceof Error ? error.message : String(error)
    });
  }
};