import ProfileImage from '../models/ProfileImage';
import User from '../models/User';

class UploadProfileImageController {
  async index(req, res) {
    try {
      const { userId } = req.params;

      const profileImage = await ProfileImage.findByPk(userId);

      return res.status(200).json(profileImage);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async store(req, res) {
    const { userId } = req.params;

    // try {
    //   return res.status(200).json({ profileImage });
    // } catch (error) {
    //   return res.status(400).json({ error: error.message });
    // }

    if (!req.file)
      return res
        .status(400)
        .json({
          error: 'É necessário inserir de um arquivo para realizar o upload',
        });

    const { originalname: name, filename: image_source } = req.file;

    try {
      const profileImage = await ProfileImage.findByPk(userId);

      if (profileImage === null) {
        await ProfileImage.create({
          name,
          image_source,
        });

        return res
          .status(200)
          .json({ message: 'Imagem de perfil registrada com sucesso' });
      } else {
        await profileImage.update({
          name,
          image_source,
        });
        return res
          .status(200)
          .json({ message: 'Imagem de perfil atualizada com sucesso' });
      }
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const { userId } = req.body;
    try {
      const user = await User.findByPk(userId, {
        attributes: {
          exclude: [
            'password',
            'is_active',
            'createdAt',
            'updatedAt',
            'profile_image_id',
          ],
        },
        include: [
          {
            model: ProfileImage,
            attributes: {
              exclude: ['user_id', 'is_active', 'createdAt', 'updatedAt'],
            },
          },
        ],
      });

      if (!user)
        return res.status(401).json({
          error: `The user isn't registered in database`,
        });

      const profileImage = await ProfileImage.findByPk(user.ProfileImage.id);

      if (!profileImage)
        return res.status(400).json({
          error: `The image don't exists or has already deleted from our database`,
        });

      await profileImage.update({ is_active: false });

      return res
        .status(200)
        .json({ message: 'The profile image was deleted successfully' });
    } catch (error) {
      return res.status(400).error({ error: error.message });
    }
  }
}

export default new UploadProfileImageController();
