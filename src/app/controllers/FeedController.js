class FeedController {
  index(req, res) {
    const { userName } = req.params;

    return res.status(200).json({ user: userName });
  }
}

export default new FeedController();
