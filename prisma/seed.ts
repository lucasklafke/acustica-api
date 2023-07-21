import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const user = {
    username: 'admin',
    password: 'admin',
  };
  const categories = [
    {
      category: 'Sobre a empresa Acústica',
      parentId: null,
    },
    {
      category: 'Cursos',
      parentId: null,
    },
    {
      category: 'Pagamento',
      parentId: 2,
    },
  ];
  const questions = [
    {
      question: 'O que fazemos?',
      answer: 'Somos uma empresa que visa ajudar iniciantes no ramo musical',
      categoryId: 1,
    },
    {
      question: 'O que são os cursos?',
      answer:
        'Disponibilizamos cursos em nossa plataforma para que todos possam aprender, entre eles existem cursos pagos com a finalidade de pagar os professores responsáveis',
      categoryId: 2,
    },
    {
      question: 'Como posso pagar os cursos?',
      answer:
        'Para facilitar sua compra disponibilizamos várias formas de pagamento, sendo elas, Boleto bancário, Cartão de Crédito e PIX',
      categoryId: 3,
    },
  ];
  await prisma.user.create({
    data: user,
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.question.createMany({
    data: questions,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
