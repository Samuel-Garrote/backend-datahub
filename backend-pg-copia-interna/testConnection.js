const prisma = require("./prisma/prismaClient");

async function main() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Conexión a la DB exitosa ✅");
  } catch (error) {
    console.error("Error al conectar a la DB ❌", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
