module.exports = {
        typeDefs: /* GraphQL */ `type AggregateChat {
  count: Int!
}

type AggregateCourse {
  count: Int!
}

type AggregateMessage {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Chat {
  id: ID!
  slackId: String
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message!]
  user: User!
  createdAt: DateTime!
}

type ChatConnection {
  pageInfo: PageInfo!
  edges: [ChatEdge]!
  aggregate: AggregateChat!
}

input ChatCreateInput {
  slackId: String
  messages: MessageCreateManyWithoutChatInput
  user: UserCreateOneWithoutChatInput!
}

input ChatCreateOneWithoutMessagesInput {
  create: ChatCreateWithoutMessagesInput
  connect: ChatWhereUniqueInput
}

input ChatCreateOneWithoutUserInput {
  create: ChatCreateWithoutUserInput
  connect: ChatWhereUniqueInput
}

input ChatCreateWithoutMessagesInput {
  slackId: String
  user: UserCreateOneWithoutChatInput!
}

input ChatCreateWithoutUserInput {
  slackId: String
  messages: MessageCreateManyWithoutChatInput
}

type ChatEdge {
  node: Chat!
  cursor: String!
}

enum ChatOrderByInput {
  id_ASC
  id_DESC
  slackId_ASC
  slackId_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type ChatPreviousValues {
  id: ID!
  slackId: String
  createdAt: DateTime!
}

type ChatSubscriptionPayload {
  mutation: MutationType!
  node: Chat
  updatedFields: [String!]
  previousValues: ChatPreviousValues
}

input ChatSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ChatWhereInput
  AND: [ChatSubscriptionWhereInput!]
  OR: [ChatSubscriptionWhereInput!]
  NOT: [ChatSubscriptionWhereInput!]
}

input ChatUpdateInput {
  slackId: String
  messages: MessageUpdateManyWithoutChatInput
  user: UserUpdateOneRequiredWithoutChatInput
}

input ChatUpdateManyMutationInput {
  slackId: String
}

input ChatUpdateOneRequiredWithoutMessagesInput {
  create: ChatCreateWithoutMessagesInput
  update: ChatUpdateWithoutMessagesDataInput
  upsert: ChatUpsertWithoutMessagesInput
  connect: ChatWhereUniqueInput
}

input ChatUpdateOneWithoutUserInput {
  create: ChatCreateWithoutUserInput
  update: ChatUpdateWithoutUserDataInput
  upsert: ChatUpsertWithoutUserInput
  delete: Boolean
  disconnect: Boolean
  connect: ChatWhereUniqueInput
}

input ChatUpdateWithoutMessagesDataInput {
  slackId: String
  user: UserUpdateOneRequiredWithoutChatInput
}

input ChatUpdateWithoutUserDataInput {
  slackId: String
  messages: MessageUpdateManyWithoutChatInput
}

input ChatUpsertWithoutMessagesInput {
  update: ChatUpdateWithoutMessagesDataInput!
  create: ChatCreateWithoutMessagesInput!
}

input ChatUpsertWithoutUserInput {
  update: ChatUpdateWithoutUserDataInput!
  create: ChatCreateWithoutUserInput!
}

input ChatWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  slackId: String
  slackId_not: String
  slackId_in: [String!]
  slackId_not_in: [String!]
  slackId_lt: String
  slackId_lte: String
  slackId_gt: String
  slackId_gte: String
  slackId_contains: String
  slackId_not_contains: String
  slackId_starts_with: String
  slackId_not_starts_with: String
  slackId_ends_with: String
  slackId_not_ends_with: String
  messages_every: MessageWhereInput
  messages_some: MessageWhereInput
  messages_none: MessageWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [ChatWhereInput!]
  OR: [ChatWhereInput!]
  NOT: [ChatWhereInput!]
}

input ChatWhereUniqueInput {
  id: ID
  slackId: String
}

type Course {
  id: ID!
  title: String!
  summary: String!
  description: String!
  image: String
  tags: [String!]!
  difficulty: Difficulty!
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
  createdAt: DateTime!
}

type CourseConnection {
  pageInfo: PageInfo!
  edges: [CourseEdge]!
  aggregate: AggregateCourse!
}

input CourseCreateInput {
  title: String!
  summary: String!
  description: String!
  image: String
  tags: CourseCreatetagsInput
  difficulty: Difficulty!
  videos: VideoCreateManyWithoutCourseInput
}

input CourseCreateOneWithoutVideosInput {
  create: CourseCreateWithoutVideosInput
  connect: CourseWhereUniqueInput
}

input CourseCreatetagsInput {
  set: [String!]
}

input CourseCreateWithoutVideosInput {
  title: String!
  summary: String!
  description: String!
  image: String
  tags: CourseCreatetagsInput
  difficulty: Difficulty!
}

type CourseEdge {
  node: Course!
  cursor: String!
}

enum CourseOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  summary_ASC
  summary_DESC
  description_ASC
  description_DESC
  image_ASC
  image_DESC
  difficulty_ASC
  difficulty_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type CoursePreviousValues {
  id: ID!
  title: String!
  summary: String!
  description: String!
  image: String
  tags: [String!]!
  difficulty: Difficulty!
  createdAt: DateTime!
}

type CourseSubscriptionPayload {
  mutation: MutationType!
  node: Course
  updatedFields: [String!]
  previousValues: CoursePreviousValues
}

input CourseSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CourseWhereInput
  AND: [CourseSubscriptionWhereInput!]
  OR: [CourseSubscriptionWhereInput!]
  NOT: [CourseSubscriptionWhereInput!]
}

input CourseUpdateInput {
  title: String
  summary: String
  description: String
  image: String
  tags: CourseUpdatetagsInput
  difficulty: Difficulty
  videos: VideoUpdateManyWithoutCourseInput
}

input CourseUpdateManyMutationInput {
  title: String
  summary: String
  description: String
  image: String
  tags: CourseUpdatetagsInput
  difficulty: Difficulty
}

input CourseUpdateOneRequiredWithoutVideosInput {
  create: CourseCreateWithoutVideosInput
  update: CourseUpdateWithoutVideosDataInput
  upsert: CourseUpsertWithoutVideosInput
  connect: CourseWhereUniqueInput
}

input CourseUpdatetagsInput {
  set: [String!]
}

input CourseUpdateWithoutVideosDataInput {
  title: String
  summary: String
  description: String
  image: String
  tags: CourseUpdatetagsInput
  difficulty: Difficulty
}

input CourseUpsertWithoutVideosInput {
  update: CourseUpdateWithoutVideosDataInput!
  create: CourseCreateWithoutVideosInput!
}

input CourseWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  summary: String
  summary_not: String
  summary_in: [String!]
  summary_not_in: [String!]
  summary_lt: String
  summary_lte: String
  summary_gt: String
  summary_gte: String
  summary_contains: String
  summary_not_contains: String
  summary_starts_with: String
  summary_not_starts_with: String
  summary_ends_with: String
  summary_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  difficulty: Difficulty
  difficulty_not: Difficulty
  difficulty_in: [Difficulty!]
  difficulty_not_in: [Difficulty!]
  videos_every: VideoWhereInput
  videos_some: VideoWhereInput
  videos_none: VideoWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [CourseWhereInput!]
  OR: [CourseWhereInput!]
  NOT: [CourseWhereInput!]
}

input CourseWhereUniqueInput {
  id: ID
}

scalar DateTime

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

scalar Long

type Message {
  id: ID!
  style: Style!
  text: String!
  chat: Chat!
  user: User!
  createdAt: DateTime!
}

type MessageConnection {
  pageInfo: PageInfo!
  edges: [MessageEdge]!
  aggregate: AggregateMessage!
}

input MessageCreateInput {
  style: Style
  text: String!
  chat: ChatCreateOneWithoutMessagesInput!
  user: UserCreateOneWithoutMessagesInput!
}

input MessageCreateManyWithoutChatInput {
  create: [MessageCreateWithoutChatInput!]
  connect: [MessageWhereUniqueInput!]
}

input MessageCreateManyWithoutUserInput {
  create: [MessageCreateWithoutUserInput!]
  connect: [MessageWhereUniqueInput!]
}

input MessageCreateWithoutChatInput {
  style: Style
  text: String!
  user: UserCreateOneWithoutMessagesInput!
}

input MessageCreateWithoutUserInput {
  style: Style
  text: String!
  chat: ChatCreateOneWithoutMessagesInput!
}

type MessageEdge {
  node: Message!
  cursor: String!
}

enum MessageOrderByInput {
  id_ASC
  id_DESC
  style_ASC
  style_DESC
  text_ASC
  text_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type MessagePreviousValues {
  id: ID!
  style: Style!
  text: String!
  createdAt: DateTime!
}

input MessageScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  style: Style
  style_not: Style
  style_in: [Style!]
  style_not_in: [Style!]
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [MessageScalarWhereInput!]
  OR: [MessageScalarWhereInput!]
  NOT: [MessageScalarWhereInput!]
}

type MessageSubscriptionPayload {
  mutation: MutationType!
  node: Message
  updatedFields: [String!]
  previousValues: MessagePreviousValues
}

input MessageSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MessageWhereInput
  AND: [MessageSubscriptionWhereInput!]
  OR: [MessageSubscriptionWhereInput!]
  NOT: [MessageSubscriptionWhereInput!]
}

input MessageUpdateInput {
  style: Style
  text: String
  chat: ChatUpdateOneRequiredWithoutMessagesInput
  user: UserUpdateOneRequiredWithoutMessagesInput
}

input MessageUpdateManyDataInput {
  style: Style
  text: String
}

input MessageUpdateManyMutationInput {
  style: Style
  text: String
}

input MessageUpdateManyWithoutChatInput {
  create: [MessageCreateWithoutChatInput!]
  delete: [MessageWhereUniqueInput!]
  connect: [MessageWhereUniqueInput!]
  disconnect: [MessageWhereUniqueInput!]
  update: [MessageUpdateWithWhereUniqueWithoutChatInput!]
  upsert: [MessageUpsertWithWhereUniqueWithoutChatInput!]
  deleteMany: [MessageScalarWhereInput!]
  updateMany: [MessageUpdateManyWithWhereNestedInput!]
}

input MessageUpdateManyWithoutUserInput {
  create: [MessageCreateWithoutUserInput!]
  delete: [MessageWhereUniqueInput!]
  connect: [MessageWhereUniqueInput!]
  disconnect: [MessageWhereUniqueInput!]
  update: [MessageUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [MessageUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [MessageScalarWhereInput!]
  updateMany: [MessageUpdateManyWithWhereNestedInput!]
}

input MessageUpdateManyWithWhereNestedInput {
  where: MessageScalarWhereInput!
  data: MessageUpdateManyDataInput!
}

input MessageUpdateWithoutChatDataInput {
  style: Style
  text: String
  user: UserUpdateOneRequiredWithoutMessagesInput
}

input MessageUpdateWithoutUserDataInput {
  style: Style
  text: String
  chat: ChatUpdateOneRequiredWithoutMessagesInput
}

input MessageUpdateWithWhereUniqueWithoutChatInput {
  where: MessageWhereUniqueInput!
  data: MessageUpdateWithoutChatDataInput!
}

input MessageUpdateWithWhereUniqueWithoutUserInput {
  where: MessageWhereUniqueInput!
  data: MessageUpdateWithoutUserDataInput!
}

input MessageUpsertWithWhereUniqueWithoutChatInput {
  where: MessageWhereUniqueInput!
  update: MessageUpdateWithoutChatDataInput!
  create: MessageCreateWithoutChatInput!
}

input MessageUpsertWithWhereUniqueWithoutUserInput {
  where: MessageWhereUniqueInput!
  update: MessageUpdateWithoutUserDataInput!
  create: MessageCreateWithoutUserInput!
}

input MessageWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  style: Style
  style_not: Style
  style_in: [Style!]
  style_not_in: [Style!]
  text: String
  text_not: String
  text_in: [String!]
  text_not_in: [String!]
  text_lt: String
  text_lte: String
  text_gt: String
  text_gte: String
  text_contains: String
  text_not_contains: String
  text_starts_with: String
  text_not_starts_with: String
  text_ends_with: String
  text_not_ends_with: String
  chat: ChatWhereInput
  user: UserWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [MessageWhereInput!]
  OR: [MessageWhereInput!]
  NOT: [MessageWhereInput!]
}

input MessageWhereUniqueInput {
  id: ID
}

type Mutation {
  createChat(data: ChatCreateInput!): Chat!
  updateChat(data: ChatUpdateInput!, where: ChatWhereUniqueInput!): Chat
  updateManyChats(data: ChatUpdateManyMutationInput!, where: ChatWhereInput): BatchPayload!
  upsertChat(where: ChatWhereUniqueInput!, create: ChatCreateInput!, update: ChatUpdateInput!): Chat!
  deleteChat(where: ChatWhereUniqueInput!): Chat
  deleteManyChats(where: ChatWhereInput): BatchPayload!
  createCourse(data: CourseCreateInput!): Course!
  updateCourse(data: CourseUpdateInput!, where: CourseWhereUniqueInput!): Course
  updateManyCourses(data: CourseUpdateManyMutationInput!, where: CourseWhereInput): BatchPayload!
  upsertCourse(where: CourseWhereUniqueInput!, create: CourseCreateInput!, update: CourseUpdateInput!): Course!
  deleteCourse(where: CourseWhereUniqueInput!): Course
  deleteManyCourses(where: CourseWhereInput): BatchPayload!
  createMessage(data: MessageCreateInput!): Message!
  updateMessage(data: MessageUpdateInput!, where: MessageWhereUniqueInput!): Message
  updateManyMessages(data: MessageUpdateManyMutationInput!, where: MessageWhereInput): BatchPayload!
  upsertMessage(where: MessageWhereUniqueInput!, create: MessageCreateInput!, update: MessageUpdateInput!): Message!
  deleteMessage(where: MessageWhereUniqueInput!): Message
  deleteManyMessages(where: MessageWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createVideo(data: VideoCreateInput!): Video!
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  updateManyVideos(data: VideoUpdateManyMutationInput!, where: VideoWhereInput): BatchPayload!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  deleteVideo(where: VideoWhereUniqueInput!): Video
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  chat(where: ChatWhereUniqueInput!): Chat
  chats(where: ChatWhereInput, orderBy: ChatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Chat]!
  chatsConnection(where: ChatWhereInput, orderBy: ChatOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ChatConnection!
  course(where: CourseWhereUniqueInput!): Course
  courses(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Course]!
  coursesConnection(where: CourseWhereInput, orderBy: CourseOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CourseConnection!
  message(where: MessageWhereUniqueInput!): Message
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message]!
  messagesConnection(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MessageConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  video(where: VideoWhereUniqueInput!): Video
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!
  node(id: ID!): Node
}

enum Role {
  USER
  ADMIN
}

enum Style {
  TEXT
  CODE
  IMAGE
}

type Subscription {
  chat(where: ChatSubscriptionWhereInput): ChatSubscriptionPayload
  course(where: CourseSubscriptionWhereInput): CourseSubscriptionPayload
  message(where: MessageSubscriptionWhereInput): MessageSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
}

type User {
  id: ID!
  name: String!
  email: String!
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean!
  messages(where: MessageWhereInput, orderBy: MessageOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Message!]
  chat: Chat
  role: Role!
  createdAt: DateTime!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
  email: String!
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean
  messages: MessageCreateManyWithoutUserInput
  chat: ChatCreateOneWithoutUserInput
  role: Role
}

input UserCreateOneWithoutChatInput {
  create: UserCreateWithoutChatInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutMessagesInput {
  create: UserCreateWithoutMessagesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutChatInput {
  name: String!
  email: String!
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean
  messages: MessageCreateManyWithoutUserInput
  role: Role
}

input UserCreateWithoutMessagesInput {
  name: String!
  email: String!
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean
  chat: ChatCreateOneWithoutUserInput
  role: Role
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  image_ASC
  image_DESC
  stripeId_ASC
  stripeId_DESC
  githubId_ASC
  githubId_DESC
  isSubscribed_ASC
  isSubscribed_DESC
  role_ASC
  role_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
  email: String!
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean!
  role: Role!
  createdAt: DateTime!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
  email: String
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean
  messages: MessageUpdateManyWithoutUserInput
  chat: ChatUpdateOneWithoutUserInput
  role: Role
}

input UserUpdateManyMutationInput {
  name: String
  email: String
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean
  role: Role
}

input UserUpdateOneRequiredWithoutChatInput {
  create: UserCreateWithoutChatInput
  update: UserUpdateWithoutChatDataInput
  upsert: UserUpsertWithoutChatInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutMessagesInput {
  create: UserCreateWithoutMessagesInput
  update: UserUpdateWithoutMessagesDataInput
  upsert: UserUpsertWithoutMessagesInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutChatDataInput {
  name: String
  email: String
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean
  messages: MessageUpdateManyWithoutUserInput
  role: Role
}

input UserUpdateWithoutMessagesDataInput {
  name: String
  email: String
  password: String
  image: String
  stripeId: String
  githubId: String
  isSubscribed: Boolean
  chat: ChatUpdateOneWithoutUserInput
  role: Role
}

input UserUpsertWithoutChatInput {
  update: UserUpdateWithoutChatDataInput!
  create: UserCreateWithoutChatInput!
}

input UserUpsertWithoutMessagesInput {
  update: UserUpdateWithoutMessagesDataInput!
  create: UserCreateWithoutMessagesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  image: String
  image_not: String
  image_in: [String!]
  image_not_in: [String!]
  image_lt: String
  image_lte: String
  image_gt: String
  image_gte: String
  image_contains: String
  image_not_contains: String
  image_starts_with: String
  image_not_starts_with: String
  image_ends_with: String
  image_not_ends_with: String
  stripeId: String
  stripeId_not: String
  stripeId_in: [String!]
  stripeId_not_in: [String!]
  stripeId_lt: String
  stripeId_lte: String
  stripeId_gt: String
  stripeId_gte: String
  stripeId_contains: String
  stripeId_not_contains: String
  stripeId_starts_with: String
  stripeId_not_starts_with: String
  stripeId_ends_with: String
  stripeId_not_ends_with: String
  githubId: String
  githubId_not: String
  githubId_in: [String!]
  githubId_not_in: [String!]
  githubId_lt: String
  githubId_lte: String
  githubId_gt: String
  githubId_gte: String
  githubId_contains: String
  githubId_not_contains: String
  githubId_starts_with: String
  githubId_not_starts_with: String
  githubId_ends_with: String
  githubId_not_ends_with: String
  isSubscribed: Boolean
  isSubscribed_not: Boolean
  messages_every: MessageWhereInput
  messages_some: MessageWhereInput
  messages_none: MessageWhereInput
  chat: ChatWhereInput
  role: Role
  role_not: Role
  role_in: [Role!]
  role_not_in: [Role!]
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  email: String
  stripeId: String
  githubId: String
}

type Video {
  id: ID!
  title: String!
  description: String!
  url: String!
  number: Int!
  time: Int!
  course: Course!
  createdAt: DateTime!
}

type VideoConnection {
  pageInfo: PageInfo!
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  title: String!
  description: String!
  url: String!
  number: Int!
  time: Int!
  course: CourseCreateOneWithoutVideosInput!
}

input VideoCreateManyWithoutCourseInput {
  create: [VideoCreateWithoutCourseInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateWithoutCourseInput {
  title: String!
  description: String!
  url: String!
  number: Int!
  time: Int!
}

type VideoEdge {
  node: Video!
  cursor: String!
}

enum VideoOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  url_ASC
  url_DESC
  number_ASC
  number_DESC
  time_ASC
  time_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoPreviousValues {
  id: ID!
  title: String!
  description: String!
  url: String!
  number: Int!
  time: Int!
  createdAt: DateTime!
}

input VideoScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  number: Int
  number_not: Int
  number_in: [Int!]
  number_not_in: [Int!]
  number_lt: Int
  number_lte: Int
  number_gt: Int
  number_gte: Int
  time: Int
  time_not: Int
  time_in: [Int!]
  time_not_in: [Int!]
  time_lt: Int
  time_lte: Int
  time_gt: Int
  time_gte: Int
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [VideoScalarWhereInput!]
  OR: [VideoScalarWhereInput!]
  NOT: [VideoScalarWhereInput!]
}

type VideoSubscriptionPayload {
  mutation: MutationType!
  node: Video
  updatedFields: [String!]
  previousValues: VideoPreviousValues
}

input VideoSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: VideoWhereInput
  AND: [VideoSubscriptionWhereInput!]
  OR: [VideoSubscriptionWhereInput!]
  NOT: [VideoSubscriptionWhereInput!]
}

input VideoUpdateInput {
  title: String
  description: String
  url: String
  number: Int
  time: Int
  course: CourseUpdateOneRequiredWithoutVideosInput
}

input VideoUpdateManyDataInput {
  title: String
  description: String
  url: String
  number: Int
  time: Int
}

input VideoUpdateManyMutationInput {
  title: String
  description: String
  url: String
  number: Int
  time: Int
}

input VideoUpdateManyWithoutCourseInput {
  create: [VideoCreateWithoutCourseInput!]
  delete: [VideoWhereUniqueInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueWithoutCourseInput!]
  upsert: [VideoUpsertWithWhereUniqueWithoutCourseInput!]
  deleteMany: [VideoScalarWhereInput!]
  updateMany: [VideoUpdateManyWithWhereNestedInput!]
}

input VideoUpdateManyWithWhereNestedInput {
  where: VideoScalarWhereInput!
  data: VideoUpdateManyDataInput!
}

input VideoUpdateWithoutCourseDataInput {
  title: String
  description: String
  url: String
  number: Int
  time: Int
}

input VideoUpdateWithWhereUniqueWithoutCourseInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateWithoutCourseDataInput!
}

input VideoUpsertWithWhereUniqueWithoutCourseInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateWithoutCourseDataInput!
  create: VideoCreateWithoutCourseInput!
}

input VideoWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  url: String
  url_not: String
  url_in: [String!]
  url_not_in: [String!]
  url_lt: String
  url_lte: String
  url_gt: String
  url_gte: String
  url_contains: String
  url_not_contains: String
  url_starts_with: String
  url_not_starts_with: String
  url_ends_with: String
  url_not_ends_with: String
  number: Int
  number_not: Int
  number_in: [Int!]
  number_not_in: [Int!]
  number_lt: Int
  number_lte: Int
  number_gt: Int
  number_gte: Int
  time: Int
  time_not: Int
  time_in: [Int!]
  time_not_in: [Int!]
  time_lt: Int
  time_lte: Int
  time_gt: Int
  time_gte: Int
  course: CourseWhereInput
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  AND: [VideoWhereInput!]
  OR: [VideoWhereInput!]
  NOT: [VideoWhereInput!]
}

input VideoWhereUniqueInput {
  id: ID
}
`
      }
    