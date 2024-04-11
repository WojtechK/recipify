// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     // Extract data from request body
//     const { email, username, password } = req.body;

//     try {
//       const user = await prisma.users.create({
//         data: {
//           email,
//           username,
//           password_hash: password, // Consider hashing the password before storing
//         },
//       });

//       return res.status(200).json(user);
//     } catch (error) {
//       return res.status(500).json({ error: "Internal server error" });
//     }
//   } else {
//     // Handle any requests that aren't POST
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }