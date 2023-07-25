import jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { resolve } from 'path'
import fs from 'fs'

// Models
import Post from '../models/Post'
import User from '../models/User'

// Yup validator
import * as Yup from 'yup'

class PostController {
  async index(req, res) {
    try {
      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )
      const user_id = decodedToken.id

      const getPosts = await Post.findAll({
        where: {
          user_id: user_id,
        },
        order: [['updated_at', 'DESC']],
      })

      return res.status(200).json({ posts: getPosts })
    } catch (error) {
      return res.status(400).json({ error: 'error to get the posts' })
    }
  }

  async store(req, res) {
    // Check if all data is correctly inserted
    try {
      const PostSchema = Yup.object({
        user_id: Yup.number()
          .typeError('É necessário inserir um inteiro')
          .required('É necessário o ID do usuário'),
        str_post: Yup.string().typeError('Você deve inserir um texto'),
      })

      const [, token] = req.headers.authorization.split(' ')

      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )

      const files = req.files
      const user_id = decodedToken.id
      const str_post = req.body.str_post

      await PostSchema.validate({ user_id, str_post })

      var url_image = null
      var url_video = null

      files.map((file) => {
        if (file.fieldname === 'url_image') {
          url_image = file.filename
        }

        if (file.fieldname === 'url_video') {
          url_video = file.filename
        }
      })

      await Post.create({
        user_id,
        str_post,
        url_image,
        url_video,
      })

      return res.status(200).json({ message: 'Post registered successfully' })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ error: error.errors })
    }
  }

  async update(req, res) {
    try {
      const PostSchema = Yup.object({
        post_id: Yup.number()
          .typeError('É necessário inserir um inteiro')
          .required('É necessário o ID do post'),
        user_id: Yup.number()
          .typeError('É necessário inserir um inteiro')
          .required('É necessário o ID do usuário'),
        str_post: Yup.string().typeError('Você deve inserir um texto'),
      })

      const [, token] = req.headers.authorization.split(' ')
      const decodedToken = await promisify(jwt.verify)(
        token,
        process.env.JWT_KEY,
      )

      const files = req.files
      const post_id = req.params.id
      const user_id = decodedToken.id
      const str_post = req.body.str_post

      await PostSchema.validate({ post_id, user_id, str_post })
      const getPost = await Post.findByPk(post_id)

      if (!getPost) return res.status(404).json({ error: 'Post not found' })

      if (files.length <= 0) {
        await getPost.update({ user_id, str_post })
      } else {
        var url_image = null
        var url_video = null

        files.map((file) => {
          if (file.fieldname === 'url_image') {
            url_image = file.filename
          }

          if (file.fieldname === 'url_video') {
            url_video = file.filename
          }
        })

        // Delete the current files
        if (url_image !== null && getPost.url_image) {
          const imageDestination = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'temp',
            'post_images',
            getPost.url_image,
          )

          fs.unlinkSync(imageDestination)
        }

        if (url_video !== null && getPost.url_video) {
          const videoDestination = resolve(
            __dirname,
            '..',
            '..',
            '..',
            'temp',
            'post_images',
            getPost.url_video,
          )
          fs.unlinkSync(videoDestination)
        }

        const data = {
          user_id: user_id,
          str_post: str_post ? str_post : getPost.str_post,
          url_image: url_image !== null ? url_image : getPost.url_image,
          url_video: url_video !== null ? url_video : getPost.url_video,
        }

        await getPost.update(data)
      }

      return res.status(200).json({ message: 'Post updated successfully' })
    } catch (error) {
      return res
        .status(400)
        .json({ error: error.message, test: 'Samerda n vai' })
    }
  }

  async delete(req, res) {
    try {
      const post_id = req.params.id
      const getPost = await Post.findByPk(post_id)

      // Delete the current files
      if (getPost.url_video) {
        const videoDestination = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'temp',
          'post_images',
          getPost.url_video,
        )

        fs.unlinkSync(videoDestination)
      }

      if (getPost.url_image) {
        const imageDestination = resolve(
          __dirname,
          '..',
          '..',
          '..',
          'temp',
          'post_images',
          getPost.url_image,
        )

        fs.unlinkSync(imageDestination)
      }

      getPost.destroy()

      return res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
      return res.status(400).json({ error: 'Error to update the post' })
    }
  }
}

export default new PostController()
