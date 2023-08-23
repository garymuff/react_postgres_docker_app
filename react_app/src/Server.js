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

app.get('/students/:id', async (req, res) => {
  const studentId = parseInt(req.params.id);

  try {
    const student = await prisma.student.findUnique({
      where: {
        id: studentId,
      },
      include: {
        classes: true,
      },
    });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      id: student.id,
      name: student.name,
      classes: student.classes,
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.get('/classes', async (req, res) => {
  const classes = await prisma.class.findMany();
  res.json(classes);
});

app.get('/classes/:id', async (req, res) => {
  const classId = parseInt(req.params.id);

  try {
    const classInfo = await prisma.class.findUnique({
      where: {
        id: classId,
      },
      include: {
        students: true,
      },
    });

    if (!classInfo) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json({
      id: classInfo.id,
      name: classInfo.name,
      students: classInfo.students,
    });
  } catch (error) {
    console.error('Error fetching class:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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


app.post('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (req.query.update === 'true') {
    // Handle the update operation here
    await prisma.student.update({ 
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    res.json({ message: 'Student updated successfully' });
  } 
});

app.post('/students/:studentId/enroll', async (req, res) => {
  const { studentId } = req.params;
  const { classId } = req.body;

  try {
    const enrollment = await prisma.student.update({
      where: {
        id: parseInt(studentId),
      },
      data: {
        classes: {
          connect: {
            id: parseInt(classId),
          },
        },
      },
    });

    res.json(enrollment);
  } catch (error) {
    console.error('Error enrolling student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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
 
// ...

app.post('/classes/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (req.query.update === 'true') {
    // Handle the update operation here
    await prisma.class.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
      },
    });
    res.json({ message: 'Class updated successfully' });
  } 
});

// ...


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
