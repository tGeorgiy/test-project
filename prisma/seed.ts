import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const userId1 = "c3a3c7ce-9772-484f-9fdd-30848ab726c1";
const userId2 = "c3a3c7ce-9772-484f-9fdd-30848ab726c2";
const userId3 = "c3a3c7ce-9772-484f-9fdd-30848ab726c3";

const hairdresserId1 = "c3a3c7ce-9772-484f-9fdd-30848ab726c4";
const hairdresserId2 = "c3a3c7ce-9772-484f-9fdd-30848ab726c5";
const hairdresserId3 = "c3a3c7ce-9772-484f-9fdd-30848ab726c6";

const slots = [
  {
    slotStart: "2022-08-31T07:00:00.000Z",
    slotEnd: "2022-08-31T08:00:00.000Z",
  },
  {
    slotStart: "2022-08-31T08:00:00.000Z",
    slotEnd: "2022-08-31T09:00:00.000Z",
  },
  {
    slotStart: "2022-08-31T09:00:00.000Z",
    slotEnd: "2022-08-31T10:00:00.000Z",
  },
  {
    slotStart: "2022-08-31T10:00:00.000Z",
    slotEnd: "2022-08-31T11:00:00.000Z",
  },
  {
    slotStart: "2022-08-31T11:00:00.000Z",
    slotEnd: "2022-08-31T12:00:00.000Z",
  },
  {
    slotStart: "2022-08-31T12:00:00.000Z",
    slotEnd: "2022-08-31T13:00:00.000Z",
  },
  {
    slotStart: "2022-08-31T13:00:00.000Z",
    slotEnd: "2022-08-31T14:00:00.000Z",
  },
  {
    slotStart: "2022-08-31T14:00:00.000Z",
    slotEnd: "2022-08-31T15:00:00.000Z",
  },
];

async function main() {
  await prisma.user.createMany({
    data: [
      {
        id: userId1,
        name: "Olga",
        email: "qwert@qwert.com",
        password: await bcrypt.hash("qwert", 10),
        phone: "+1111111111",
      },
      {
        id: userId2,
        name: "Katya",
        email: "asdfg@asdfg.com",
        password: await bcrypt.hash("asdfg", 10),
        phone: "+2222222222",
        role: Role.ADMIN,
      },
      {
        id: userId3,
        name: "Oleg",
        email: "zxcvb@zxcvb.com",
        password: await bcrypt.hash("zxcvb", 10),
        phone: "+3333333333",
      },
    ],
  });

  await prisma.hairdresser.createMany({
    data: [
      {
        id: hairdresserId1,
        spec: "male, femail, haircuts for the holidays",
        userId: userId1,
      },
      {
        id: hairdresserId2,
        spec: "wedding haircuts",
        userId: userId2,
      },
      {
        id: hairdresserId3,
        spec: "modern women haircuts",
        userId: userId3,
      },
    ],
  });

  await prisma.appointmentAndSlot.createMany({
    data: [hairdresserId1, hairdresserId2, hairdresserId3].reduce(
      (array, hairdresserId) => {
        return [
          ...array,
          ...slots.map((slot) => ({
            ...slot,
            hairdresserId,
          })),
        ];
      },
      [],
    ),
  });
}

main()
  .catch((e) => {
    //eslint-disable-next-line
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
