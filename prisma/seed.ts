import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    '123456',
    10,
  );

  // SUPER ADMIN
  const superAdmin =
    await prisma.user.findUnique({
      where: {
        email: 'superadmin@careerhub.com',
      },
    });

  if (!superAdmin) {
    await prisma.user.create({
      data: {
        fullname: 'Super Admin',
        email: 'superadmin@careerhub.com',
        password: hashedPassword,
        role: Role.SUPERADMIN,
      },
    });

    console.log(
      '✅ Super Admin berhasil dibuat',
    );
  }

  // PETUGAS
  const admin =
    await prisma.user.findUnique({
      where: {
        email: 'admin@careerhub.com',
      },
    });

  if (!admin) {
    await prisma.user.create({
      data: {
        fullname: 'Admin',
        email: 'admin@careerhub.com',
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log('✅ Admin berhasil dibuat');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });