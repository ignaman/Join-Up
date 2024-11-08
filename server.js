const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Login_page.html'));
});

app.post('/save-data', (req, res) => {
  const { username, email, password } = req.body;
  const data = `Username: ${username}\nEmail: ${email}\nPassword: ${password}\n\n`;

  fs.appendFile('data_base.txt', data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      res.status(500).send('Failed to write to file');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

app.post('/validate-user', (req, res) => {
  const { usernameOrEmail, password } = req.body;

  fs.readFile('data_base.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ valid: false, error: 'Internal server error' });
      return;
    }

    const userEntries = data.trim().split('\n\n');
    const users = userEntries.map(entry => {
      const user = {};
      entry.split('\n').forEach(line => {
        const [key, value] = line.split(':').map(part => part.trim());
        user[key.toLowerCase()] = value;
      });
      return user;
    });

    const trimmedUsernameOrEmail = usernameOrEmail.trim();
    const isValidUser = users.some(user => 
      (user.username === trimmedUsernameOrEmail || user.email === trimmedUsernameOrEmail) && user.password === password
    );

    if (isValidUser) {
      res.status(200).json({ valid: true });
    } else {
      res.status(200).json({ valid: false });
    }
  });
});

app.post('/check-username', (req, res) => {
  const { username } = req.body;

  fs.readFile('data_base.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ isUnique: false });
    }

    const regex = new RegExp(`^Username: ${username}$`, 'm');
    const isUnique = !regex.test(data);
    res.status(200).json({ isUnique });
  });
});

app.post('/check-email', (req, res) => {
  const { email } = req.body;

  fs.readFile('data_base.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ isUnique: false });
    }

    const regex = new RegExp(`^Email: ${email}$`, 'm');
    const isUnique = !regex.test(data);
    res.status(200).json({ isUnique });
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
