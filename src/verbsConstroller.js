const client = require('./db');

// Crear un verbo
const createVerbo = async (req, res) => {
  const { espanol, infinitivo, past_simple, participio } = req.body;
  try {
    const [result] = await client.query(
      'INSERT INTO verbos (espanol, infinitivo, past_simple, participio) VALUES (?, ?, ?, ?)',
      [espanol, infinitivo, past_simple, participio]
    );
    res.status(201).json(result); 
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el verbo' });
  }
};

// Obtener todos los verbos
const getVerbos = async (req, res) => {
  try {
    const [result] = await client.query('SELECT * FROM verbos');
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los verbos' });
  }
};

// Obtener un verbo por ID
const getVerboById = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await client.query('SELECT * FROM verbos WHERE id = ?', [id]);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Verbo no encontrado' });
    }
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el verbo' });
  }
};

// Actualizar un verbo por ID
const updateVerbo = async (req, res) => {
  const { id } = req.params;
  const { espanol, infinitivo, past_simple, participio } = req.body;
  try {
    const [result] = await client.query(
      'UPDATE verbos SET espanol = ?, infinitivo = ?, past_simple = ?, participio = ? WHERE id = ?',
      [espanol, infinitivo, past_simple, participio, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Verbo no encontrado' });
    }
    res.status(200).json({ message: 'Verbo actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar el verbo' });
  }
};

// Eliminar un verbo por ID
const deleteVerbo = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await client.query('DELETE FROM verbos WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Verbo no encontrado' });
    }
    res.status(200).json({ message: 'Verbo eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el verbo' });
  }
};

module.exports = {
  createVerbo,
  getVerbos,
  getVerboById,
  updateVerbo,
  deleteVerbo,
};
