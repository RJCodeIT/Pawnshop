import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cron from "node-cron";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import employeeRoutes from './routes/employee.routes';
import { AppDataSource } from "./data-source";
import { Product, TransactionType } from './models/product.model';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Inicjalizacja połączenia z bazą danych
const initializeDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Successfully connected to the database!");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

initializeDB();

// Endpoint testowy
app.get("/", (req: Request, res: Response) => {
  res.send("Backend is running and connected to the database!");
});

// Trasy dla klientów, produktów i pracowników
app.use("/api", customerRoutes);
app.use("/api", productRoutes);
app.use('/api', employeeRoutes);

// Automatyczna aktualizacja stanu przedmiotów
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Starting automatic item status update...");

    // Pobieranie przedmiotów w stanie "pawn"
    const products = await AppDataSource.getRepository(Product).find({
      where: { transactionType: TransactionType.PAWN },
    });

    for (const product of products) {
      if (product.redemptionDeadline && product.redemptionDeadline < new Date()) {
        product.transactionType = TransactionType.SALE; // Zmiana stanu na "sale"
        await AppDataSource.getRepository(Product).save(product);
      }
    }

    console.log("Automatic item status update completed.");
  } catch (error) {
    console.error("Error during automatic item status update:", error);
  }
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
