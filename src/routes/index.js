import AuthRoutes from '../routes/authRoutes'
import UsersRoutes from '../routes/usersRoutes'
import ProfileImagesRoutes from '../routes/profileImagesRoutes'
import PostsRoutes from '../routes/postsRoutes'
import FriendshipRoutes from '../routes/friendshipRoutes'
import GroupsRoutes from '../routes/groupsRoutes'
import FeedRoutes from '../routes/feedRoutes'
import DonatioRoutes from '../routes/donationRoutes'
import FollowGroupsRoutes from '../routes/followGroupsRoutes'
import ChatRoutes from '../routes/chatRoutes'
import MetaTagsRoutes from '../routes/metaTagsRoutes'
import StaticFilesRoutes from '../routes/staticFilesRoutes'
import FeedRoutes from '../routes/feedRoutes'

const routes = [
  AuthRoutes,
  ChatRoutes,
  DonatioRoutes,
  FeedRoutes,
  FollowGroupsRoutes,
  FriendshipRoutes,
  GroupsRoutes,
  MetaTagsRoutes,
  PostsRoutes,
  ProfileImagesRoutes,
  StaticFilesRoutes,
  UsersRoutes
]

export default routes
