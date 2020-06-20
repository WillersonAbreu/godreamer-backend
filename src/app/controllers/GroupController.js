import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { resolve } from 'path';
import fs from 'fs';

// Models
import Group from '../models/Group.js';

// Yup validator
import * as Yup from 'yup';
import User from '../models/User.js';
import ProfileImage from '../models/ProfileImage.js';
import UserInfoDonation from '../models/UserInfoDonation.js';

class GroupController {
  async index(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    // const decodedToken = await promisify(jwt.verify)(
    //   token,
    //   process.env.JWT_KEY
    // );
    try {
      const getGroups = await Group.findAll();
      return res.status(200).json({ groups: getGroups });
    } catch (error) {
      return res.status(400).json({ error: error.message }); //'error to get the groups' });
    }
  }

  async store(req, res) {
    const GroupSchema = Yup.object({
      group_name: Yup.string().typeError('Você deve inserir um texto'),
      group_desc: Yup.string().typeError('Você deve inserir um texto'),
    });

    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    let group_image = null;
    const { group_name, group_desc } = req.body;
    const user_id = decodedToken.id;

    if (req.file) group_image = req.file.filename;
    // Check if all data is correctly inserted
    try {
      await GroupSchema.validate({ group_name, group_desc });

      const resposta = await Group.create({
        user_id,
        group_name,
        group_desc,
        group_image,
      });

      return res.status(200).json(resposta);
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  async update(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );
    const group_id = req.params.id;
    const { group_name, group_desc } = req.body;
    const user_id = decodedToken.id;
    let group_image;

    if (req.file) group_image = req.file.filename;

    const GroupSchema = Yup.object({
      group_name: Yup.string().typeError('É necessário inserir um texto'),
      group_desc: Yup.string().typeError('É necessário inserir um texto'),
      group_image: Yup.string().typeError('É necessário inserir um texto'),
    });

    const getGroup = await Group.findByPk(group_id);

    if (getGroup == null) {
      return res.status(400).json({ error: 'Group not found' });
    }

    if (getGroup.user_id == user_id) {
      try {
        await GroupSchema.validate({ group_name, group_desc, group_image });

        if (req.file) {
          if (getGroup.group_image) {
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
          await getGroup.update({ group_name, group_desc, group_image });
        } else {
          await getGroup.update({ group_name, group_desc });
        }
        return res.status(200).json({ message: 'Group update successfully' });
      } catch (err) {
        return res
          .status(400)
          .json({ error: 'An error occurred while updating the group' });
      }
    } else {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res
        .status(400)
        .json({ error: 'You are not authorized to update this group' });
    }
  }

  async delete(req, res) {
    const [, token] = req.headers.authorization.split(' ');
    const decodedToken = await promisify(jwt.verify)(
      token,
      process.env.JWT_KEY
    );

    const group_id = req.params.id;
    const user_id = decodedToken.id;
    const getGroup = await Group.findByPk(group_id);

    if (getGroup == null) {
      return res.status(400).json({ error: 'Group not found' });
    }

    if (getGroup.user_id == user_id) {
      try {
        if (getGroup.group_image) {
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
        await getGroup.destroy();
        return res.status(200).json({ message: 'Post deleted successfully' });
      } catch (error) {
        return res.status(400).json({ error: 'Error' });
      }
    } else {
      return res
        .status(400)
        .json({ error: 'You are not authorized to delete this group' });
    }
  }

  async getByGroupName(req, res) {
    const groupName = req.params.groupName;
    // Group Schema
    const GroupSchema = Yup.object({
      groupName: Yup.string(),
    });

    // Check if the URL param is name
    if (await GroupSchema.validate(req.params)) {
      try {
        const groups = await Group.findAll({
          where: { group_name: groupName },
        });

        return res.status(200).json(groups);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }

  async byId(req, res) {
    const groupId = req.params.groupId;
    // Group Schema
    const GroupSchema = Yup.object({
      groupId: Yup.string(),
    });

    // Check if the URL param is name
    if (await GroupSchema.validate(req.params)) {
      try {
        const groups = await Group.findAll({
          where: { id: groupId },
          include: [
            {
              model: User,
              include: [
                {
                  model: UserInfoDonation,
                },
              ],
              attributes: {
                exclude: [
                  'id',
                  'password',
                  'birthdate',
                  'user_type',
                  'is_active',
                  'createdAt',
                  'updatedAt',
                ],
              },
            },
          ],
        });

        return res.status(200).json(groups);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }
    }
  }
}

export default new GroupController();
