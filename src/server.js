const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const bodyParser = require('body-parser');

server.use(middlewares);
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = router.db.get('users').value();
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

server.post('register', (req, res) => {
  const { username, email, password, address, phone } = req.body;
  const users = router.db.get('users').value();
  const userExists = users.find((u) => u.email === email);

  if (userExists) {
    res.status(400).json({ message: 'User already exists' });
  } else {
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password,
      address,
      phone,
    };
    router.db.get('users').push(newUser).write();
    res.status(201).json(newUser);
  }
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});