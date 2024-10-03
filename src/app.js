const express = require('express');
const cors = require('cors');
const verbsConstroller = require('./verbsConstroller');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/verbs', verbsConstroller.createVerbo);
app.get('/verbs', verbsConstroller.getVerbos);
app.get('/verbs/:id', verbsConstroller.getVerboById);
app.put('/verbs/:id', verbsConstroller.updateVerbo);
app.delete('/verbs/:id', verbsConstroller.deleteVerbo);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});