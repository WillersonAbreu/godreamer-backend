import Sequelize from 'sequelize';
import multer from 'multer';
import formidable from 'formidable';

// Models
import Post from '../models/Post';

// Yup validator
import * as Yup from 'yup';

class PostController {
  async index(req, res) {}

  async store(req, res) {
    const PostSchema = Yup.object({
      user_id: Yup.number()
        .typeError('É necessário inserir um inteiro')
        .required('É necessário o ID do usuário'),
      str_post: Yup.string().typeError('Você deve inserir um texto')
    });
    const files = req.files;
    const user_id = Number(req.body.user_id);
    const str_post = req.body.str_post;

    // Check if all data is correctly inserted
    try {
      await PostSchema.validate({ user_id, str_post });
    } catch (error) {
      return res.status(400).json(error.errors);
    }

    return res.json({ user_id, str_post, files });
  }

  async update(req, res) {}

  async delete(req, res) {}
}

export default new PostController();
