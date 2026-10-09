import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,   
        port: process.env.DB_PORT || 3306,     
        dialect: "mysql",
        logging: false
    }
)

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Base de datos conectada correctamente.");

    
    await sequelize.sync({ force: true}); 
    console.log(" Tablas sincronizadas con éxito.");
  } catch (error) {
    console.error(" Error al conectar con la base de datos:", error.message);
  }
};