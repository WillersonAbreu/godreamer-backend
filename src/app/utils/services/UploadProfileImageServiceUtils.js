import ProfileImage from '../../models/ProfileImage'

// Utils
import { resolve } from 'path'
import { unlinkSync } from 'fs'

class UploadProfileImageServiceUtils {
  /**
   * Attributes to exclude when find images
   */
  excludedUserAttributesFromFindQueries() {
    let excluded = [
      'password',
      'is_active',
      'createdAt',
      'updatedAt',
      'profile_image_id',
    ]

    return excluded
  }

  /**
   * Attributes to include when find images
   */
  includedUserAttributesFromFindQueries() {
    let included = [
      {
        model: ProfileImage,
        attributes: {
          exclude: ['user_id', 'is_active', 'createdAt', 'updatedAt'],
        },
      },
    ]

    return included
  }

  /**
   * Delete image source file from disk
   */
  async deleteImageFileFromDisk(profileImage) {
    await unlinkSync(
      `${resolve(__dirname, '..', '..', '..', 'temp', 'profile_images')}/${
        profileImage.image_source
      }`,
    )
  }
}

export default new UploadProfileImageServiceUtils()
