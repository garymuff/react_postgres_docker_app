// server.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/students', async (req, res) => {
  const students = await prisma.student.findMany();
  res.json(students);
});

app.get('/classes', async (req, res) => {
  const classes = await prisma.class.findMany();
  res.json(classes);
});

app.post('/students', async (req, res) => {
  const { name } = req.body;
  const createdStudent = await prisma.student.create({
    data: {
      name,
    },
  });
  res.json(createdStudent);
});

app.post('/classes', async (req, res) => {
  const { name } = req.body;
  const createdClass = await prisma.class.create({
    data: {
      name,
    },
  });
  res.json(createdClass);
});

app.delete('/students/:id', async (req, res) => {
  const studentId = parseInt(req.params.id);
  await prisma.student.delete({
    where: {
      id: studentId,
    },
  });
  res.json({ message: 'Student deleted successfully' });
});

app.delete('/classes/:id', async (req, res) => {
  const classId = parseInt(req.params.id);
  await prisma.class.delete({
    where: {
      id: classId,
    },
  });
  res.json({ message: 'Class deleted successfully' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
