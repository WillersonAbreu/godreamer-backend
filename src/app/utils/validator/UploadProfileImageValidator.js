class UploadProfileImageValidator {
  /**
   *
   * @param {File} profileImageFile
   * @param {Response} res
   * @returns {void}
   * @description Check if profileImage is present or no
   */
  isProfileImagePresent(profileImageFile, res) {
    if (!profileImageFile)
      return res.status(400).json({
        error: 'Is necessary insert an image file to upload',
      })
  }
}

export default new UploadProfileImageValidator()
