import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { resolve } from 'path';
import fs from 'fs';

// Models
import Group from '../models/Group.js';

// Yup validator
import * as Yup from 'yup';

class GroupController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const user_id = decodedToken.id;

    try {
      const getGroups = await Group.findAll({
        where: {
          user_id: user_id
        },
        order: [['updated_at', 'DESC']]
      });

      return res.status(200).json({ groups: getGroups });
    } catch (error) {
      return res.status(400).json({ error: 'error to get the groups' });
    }
  }

  async store(req, res) {
    if (!req.file)
      return res
        .status(400)
        .json({ error: 'The file is necessary to execute the upload' });

    const GroupSchema = Yup.object({
      group_name: Yup.string().typeError('Você deve inserir um texto'),
      group_image: Yup.string().typeError('Você deve inserir um texto')
    });

    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    
    const group_image = req.file.filename;
    const group_name = req.body.group_name;
    const user_id = decodedToken.id;
    
    // Check if all data is correctly inserted
    try {
      await GroupSchema.validate({ group_name, group_image });

      const resposta = await Group.create({
        user_id,
        group_name,
        group_image
      });

      return res.status(200).json(resposta);
    } catch (error) {
      return res.status(400).json({ error: 'Error to create the group' });
    }
  }

  async update(req, res) {
    const PostSchema = Yup.object({
      post_id: Yup.number()
        .typeError('É necessário inserir um inteiro')
        .required('É necessário o ID do post'),
      user_id: Yup.number()
        .typeError('É necessário inserir um inteiro')
        .required('É necessário o ID do usuário'),
      str_post: Yup.string().typeError('Você deve inserir um texto')
    });

    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    const files = req.files;
    const post_id = req.params.id;
    const user_id = decodedToken.id;
    const str_post = req.body.str_post;

    try {
      await PostSchema.validate({ post_id, user_id, str_post });
      const getPost = await Post.findByPk(post_id);

      if (!getPost) return res.status(404).json({ error: 'Post not found' });

      if (files.length <= 0) {
        await getPost.update({ user_id, str_post });
      } else {
        const url_image = files[0] ? files[0].filename : null;
        const url_video = files[1] ? files[1].filename : null;

        // Delete the current files
        if ((getPost.url_video, getPost.url_image)) {
          const imageDestination = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'temp',
            'post_images',
            getPost.url_image
          );

          const videoDestination = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'temp',
            'post_images',
            getPost.url_video
          );

          fs.unlinkSync(imageDestination);
          fs.unlinkSync(videoDestination);
        }

        await getPost.update({
          user_id,
          str_post,
          url_image,
          url_video
        });
      }

      return res.status(200).json({ message: 'Post updated successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'Error to update the post' });
    }
  }

  async delete(req, res) {

      const id = req.params.id;
      const user_id = req.params.user_id;
      const getGroup = await Group.findByPk(id);

      if(getGroup.user_id == user_id) {
        try {
          if(getGroup.group_image){
            const imageDestination = resolve(
              __dirname,
              '..',
              '..',
              '..',
              'temp',
              'group_images',
              getGroup.group_image
            );
            fs.unlinkSync(imageDestination);
          }
          getGroup.destroy();
          return res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
          return res.status(400).json({ error: 'Error' });
      }
    } 
  }
}

export default new GroupController();
