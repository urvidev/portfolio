import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const splitSql = (sql: string) => {
  return sql.split(';').filter(content => content.trim() !== '')
}

async function main() {
  const sql = `

INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c39281cf-8119-45d6-a253-18036e950eca', '1Camille16@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=3', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c3eb3799-d5ff-48f1-974c-f61295332338', '9Rogers20@hotmail.com', 'Michael Clark', 'https://i.imgur.com/YfJQV5z.png?id=11', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('a09770b8-1cd4-4c3c-966f-e5a15c732a4c', '17Nikolas65@hotmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=19', 'yz567abc890', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('21b0ede2-20b7-4e0a-8ce7-07b5aee11b71', '25Jaqueline_Stokes56@yahoo.com', 'John Doe', 'https://i.imgur.com/YfJQV5z.png?id=27', 'yz567abc890', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('1342fa5d-4075-4ba3-a2f6-b126a59f59a8', '41Lyric_Kling@gmail.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=43', 'mno345pqr678', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('b6078818-71e5-4de6-9d62-2c1b9ecf978d', '49Leola.Jacobs86@gmail.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=51', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('9a09b158-990d-47a5-bb27-a28dbe288940', '57Benny_Davis92@yahoo.com', 'Michael Clark', 'https://i.imgur.com/YfJQV5z.png?id=59', 'abc123def456', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('e6132a9c-18ee-4af2-a2a6-b672f66c3781', '65Velva.Nikolaus@yahoo.com', 'Emily Brown', 'https://i.imgur.com/YfJQV5z.png?id=67', 'ghi789jkl012', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "User" ("id", "email", "name", "pictureUrl", "tokenInvitation", "status", "globalRole", "password") VALUES ('c092a5ee-645a-4efc-93ad-3930547c0a21', '73Vicenta77@yahoo.com', 'Jane Smith', 'https://i.imgur.com/YfJQV5z.png?id=75', 'yz567abc890', 'VERIFIED', 'USER', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('037433fc-732e-4206-a796-e30a04ed210b', 'The Journey of a Solo Entrepreneur', 'Embarking on the path of a solo entrepreneur is both challenging and rewarding...', 'scheduled', 'balancingworklifeentrepreneur', '1342fa5d-4075-4ba3-a2f6-b126a59f59a8');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('61b1cf19-d185-4734-956d-87d5229fb572', 'Maximizing Productivity with Minimal Resources', 'In todays fastpaced world achieving maximum productivity with minimal resources is crucial...', 'pending review', 'artnetworking', '1342fa5d-4075-4ba3-a2f6-b126a59f59a8');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('c7840d6b-f3f9-4082-b9ce-4658e12daa9a', 'The Journey of a Solo Entrepreneur', 'In todays fastpaced world achieving maximum productivity with minimal resources is crucial...', 'scheduled', 'buildingbrandscratch', '9a09b158-990d-47a5-bb27-a28dbe288940');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('456d9545-ada6-43f9-afa9-4e2558bbdbe8', 'Building a Brand from Scratch', 'In todays fastpaced world achieving maximum productivity with minimal resources is crucial...', 'pending review', 'artnetworking', '9a09b158-990d-47a5-bb27-a28dbe288940');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('fe42e45b-482e-4126-a267-5006157e1542', 'Maximizing Productivity with Minimal Resources', 'Embarking on the path of a solo entrepreneur is both challenging and rewarding...', 'scheduled', 'artnetworking', 'c3eb3799-d5ff-48f1-974c-f61295332338');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('675bf46f-7179-41e4-9e79-bbab293a9fc5', 'The Journey of a Solo Entrepreneur', 'Creating a brand from scratch requires dedication creativity and a clear vision...', 'published', 'artnetworking', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('21397df8-809e-4e7e-81b6-2b139fccf081', 'The Art of Networking', 'Embarking on the path of a solo entrepreneur is both challenging and rewarding...', 'scheduled', 'maximizingproductivityminimalresources', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('0b4529dd-731b-4313-afa0-dc188d79bef8', 'Maximizing Productivity with Minimal Resources', 'Networking is an essential skill for any entrepreneur looking to expand their reach...', 'draft', 'balancingworklifeentrepreneur', '9a09b158-990d-47a5-bb27-a28dbe288940');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('6081accf-0b6e-44b8-b2a4-9395ad05321c', 'The Art of Networking', 'Networking is an essential skill for any entrepreneur looking to expand their reach...', 'published', 'journeysoloentrepreneur', 'c092a5ee-645a-4efc-93ad-3930547c0a21');
INSERT INTO "BlogPost" ("id", "title", "content", "status", "slug", "userId") VALUES ('5c1c1491-30b6-466e-8881-1d1ab19d1116', 'Maximizing Productivity with Minimal Resources', 'Finding the right balance between work and personal life is key to longterm success...', 'pending review', 'buildingbrandscratch', 'c3eb3799-d5ff-48f1-974c-f61295332338');

INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('5e85977b-dc94-4a0d-a8fb-c3982729cc00', 'This was really helpful looking forward to more posts.', 'pending', '037433fc-732e-4206-a796-e30a04ed210b', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('12324af4-3273-4b79-9443-cd9854b5d8ae', 'I have a different perspective on this.', 'pending', '0b4529dd-731b-4313-afa0-dc188d79bef8', 'a09770b8-1cd4-4c3c-966f-e5a15c732a4c');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('8e024c46-a9f0-4134-8b62-2888f062172c', 'Could you elaborate more on this topic', 'pending', '675bf46f-7179-41e4-9e79-bbab293a9fc5', '1342fa5d-4075-4ba3-a2f6-b126a59f59a8');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('09b40333-c560-475c-b44e-367b0f5caa70', 'I have a different perspective on this.', 'pending', '456d9545-ada6-43f9-afa9-4e2558bbdbe8', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('2bdbab96-1847-4956-988d-07f7cebd2a8a', 'I completely agree with your points.', 'rejected', '61b1cf19-d185-4734-956d-87d5229fb572', 'e6132a9c-18ee-4af2-a2a6-b672f66c3781');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('1786a68a-4f90-43a5-b5ba-9b0531ce7339', 'I have a different perspective on this.', 'approved', '21397df8-809e-4e7e-81b6-2b139fccf081', '21b0ede2-20b7-4e0a-8ce7-07b5aee11b71');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('d9dde3f8-2a9b-497b-9725-467aa92d277f', 'Could you elaborate more on this topic', 'approved', '0b4529dd-731b-4313-afa0-dc188d79bef8', '9a09b158-990d-47a5-bb27-a28dbe288940');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('42fc3dec-c6bd-496e-9520-3b98bba0d440', 'Great insights thanks for sharing', 'approved', '037433fc-732e-4206-a796-e30a04ed210b', '1342fa5d-4075-4ba3-a2f6-b126a59f59a8');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('f8b4a666-fcf2-4263-a9a4-88fc1e07a3f5', 'I have a different perspective on this.', 'pending', '5c1c1491-30b6-466e-8881-1d1ab19d1116', '21b0ede2-20b7-4e0a-8ce7-07b5aee11b71');
INSERT INTO "Comment" ("id", "content", "status", "blogPostId", "userId") VALUES ('7868f640-b46c-4fc5-b8d7-5a77c9e5f1d8', 'Great insights thanks for sharing', 'approved', '6081accf-0b6e-44b8-b2a4-9395ad05321c', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('8a41ee65-34a8-4dc5-b3d2-9a1792d86514', 'Ecommerce Platform Development', 'Developed a fullscale ecommerce platform with integrated payment solutions and userfriendly interfaces.', 'https://i.imgur.com/YfJQV5z.png?id=163', 'https://i.imgur.com/YfJQV5z.png?id=164', 'c092a5ee-645a-4efc-93ad-3930547c0a21');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('8895664a-d671-469d-b3dd-bb68e2538abf', 'Mobile App Design for Health Tracking', 'Designed a mobile application focused on tracking health metrics and providing personalized health insights.', 'https://i.imgur.com/YfJQV5z.png?id=168', 'https://i.imgur.com/YfJQV5z.png?id=169', 'c39281cf-8119-45d6-a253-18036e950eca');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('9e7724d3-8856-441d-b77f-241291bb09cb', 'Website Redesign for Local Business', 'Created a custom CRM solution tailored to the clients business needs improving customer relationship management.', 'https://i.imgur.com/YfJQV5z.png?id=173', 'https://i.imgur.com/YfJQV5z.png?id=174', '1342fa5d-4075-4ba3-a2f6-b126a59f59a8');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('e0a8fda6-5db3-4ea5-8a87-a893a3a72695', 'Ecommerce Platform Development', 'Developed a fullscale ecommerce platform with integrated payment solutions and userfriendly interfaces.', 'https://i.imgur.com/YfJQV5z.png?id=178', 'https://i.imgur.com/YfJQV5z.png?id=179', 'b6078818-71e5-4de6-9d62-2c1b9ecf978d');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('80d65193-1034-4316-abcc-7560e1d33ca0', 'Website Redesign for Local Business', 'Developed a fullscale ecommerce platform with integrated payment solutions and userfriendly interfaces.', 'https://i.imgur.com/YfJQV5z.png?id=183', 'https://i.imgur.com/YfJQV5z.png?id=184', 'e6132a9c-18ee-4af2-a2a6-b672f66c3781');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('5b88d5d7-02e8-462a-af8a-6b8cdc01aafb', 'Mobile App Design for Health Tracking', 'Redesigned a local businesss website to improve user experience and increase online engagement.', 'https://i.imgur.com/YfJQV5z.png?id=188', 'https://i.imgur.com/YfJQV5z.png?id=189', '1342fa5d-4075-4ba3-a2f6-b126a59f59a8');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('7402236b-7aa6-4c76-8e04-bcca6fffac2a', 'Custom CRM Solution Implementation', 'Redesigned a local businesss website to improve user experience and increase online engagement.', 'https://i.imgur.com/YfJQV5z.png?id=193', 'https://i.imgur.com/YfJQV5z.png?id=194', '9a09b158-990d-47a5-bb27-a28dbe288940');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('8f6c205c-4abf-4ce1-a372-8eec115dd10a', 'AIPowered Chatbot Integration', 'Created a custom CRM solution tailored to the clients business needs improving customer relationship management.', 'https://i.imgur.com/YfJQV5z.png?id=198', 'https://i.imgur.com/YfJQV5z.png?id=199', '1342fa5d-4075-4ba3-a2f6-b126a59f59a8');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('9963b57f-5c68-4a30-af54-6376b0afcc74', 'Website Redesign for Local Business', 'Developed a fullscale ecommerce platform with integrated payment solutions and userfriendly interfaces.', 'https://i.imgur.com/YfJQV5z.png?id=203', 'https://i.imgur.com/YfJQV5z.png?id=204', 'c39281cf-8119-45d6-a253-18036e950eca');
INSERT INTO "PortfolioProject" ("id", "title", "description", "imageUrl", "projectUrl", "userId") VALUES ('cb522857-5759-4005-b1b8-69821da45f09', 'Website Redesign for Local Business', 'Implemented an AI chatbot to enhance customer service and streamline user interactions on the website.', 'https://i.imgur.com/YfJQV5z.png?id=208', 'https://i.imgur.com/YfJQV5z.png?id=209', 'c3eb3799-d5ff-48f1-974c-f61295332338');

INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('762df224-c3af-46a5-b20d-2eab5d3bbc89', 'Software Engineer', 'Design Hub Co.', 'Developed and maintained web applications using modern frameworks.', '2025-08-31T17:58:52.165Z', '2024-02-18T08:44:25.573Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('85396096-95c0-4fc1-9d4f-45ef7ffb3271', 'Data Analyst', 'Design Hub Co.', 'Analyzed data trends to provide actionable insights for business growth.', '2025-07-13T22:10:30.856Z', '2025-02-08T13:03:36.686Z', 'e6132a9c-18ee-4af2-a2a6-b672f66c3781');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('0979fe73-ee37-4aad-aae6-ba9a7be15f67', 'Marketing Specialist', 'Global Enterprises', 'Created visually appealing designs for digital and print media.', '2025-06-18T18:55:10.419Z', '2024-02-14T00:26:46.567Z', 'c3eb3799-d5ff-48f1-974c-f61295332338');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('78961d07-1c91-424a-b4f0-f07007af96ef', 'Data Analyst', 'Analytics Pro Ltd.', 'Analyzed data trends to provide actionable insights for business growth.', '2024-05-09T16:09:18.297Z', '2024-09-01T02:00:41.609Z', 'c39281cf-8119-45d6-a253-18036e950eca');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('5596c774-5a08-4fa0-8bf7-741daee44728', 'Graphic Designer', 'Design Hub Co.', 'Created visually appealing designs for digital and print media.', '2025-02-01T21:30:16.666Z', '2025-03-18T20:53:54.696Z', 'c092a5ee-645a-4efc-93ad-3930547c0a21');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('2356854f-99fc-4c90-a512-c39ad57460db', 'Software Engineer', 'Design Hub Co.', 'Developed and maintained web applications using modern frameworks.', '2025-09-18T02:56:52.347Z', '2025-07-08T20:46:41.185Z', 'a09770b8-1cd4-4c3c-966f-e5a15c732a4c');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('ba505181-acbc-47ca-9cd3-20403c3f314b', 'Marketing Specialist', 'Tech Innovations Inc.', 'Analyzed data trends to provide actionable insights for business growth.', '2025-02-27T02:55:47.252Z', '2024-11-15T07:13:29.214Z', '21b0ede2-20b7-4e0a-8ce7-07b5aee11b71');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('dae0244b-803f-4b67-ad20-afe7473efdb4', 'Product Manager', 'Design Hub Co.', 'Created visually appealing designs for digital and print media.', '2025-10-13T16:23:17.441Z', '2025-02-19T09:54:09.655Z', 'a09770b8-1cd4-4c3c-966f-e5a15c732a4c');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('07763998-f81c-4279-acca-fe942b56014d', 'Product Manager', 'Analytics Pro Ltd.', 'Analyzed data trends to provide actionable insights for business growth.', '2024-07-16T12:38:30.328Z', '2025-03-20T16:14:03.250Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "Experience" ("id", "title", "company", "description", "startDate", "endDate", "userId") VALUES ('f9831d46-bbae-4330-85c0-eb9426a87215', 'Marketing Specialist', 'Tech Innovations Inc.', 'Led marketing campaigns that increased brand awareness by 30.', '2024-07-05T05:29:58.951Z', '2024-08-07T06:43:45.540Z', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');

  `

  const sqls = splitSql(sql)

  for (const sql of sqls) {
    try {
      await prisma.$executeRawUnsafe(`${sql}`)
    } catch (error) {
      console.log(`Could not insert SQL: ${error.message}`)
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
