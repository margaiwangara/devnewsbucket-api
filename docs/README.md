# DevNewsBucket RESTFull Web App

This is an api containing news and latest blog posts from different programming technology websites. The data is collected and then stored into a mongodb from which a REST api is created to acquire, update or delete the data. Currenly only news from the Laravel official blog site is available but this will be expanded to include most web technologies in the future

#### v1.0.2

- Changed entire folder structure for the project
- Added multiple files with specific functions related to scrapping
- Removed `node-fetch` and replaced it with `axios`
- Scapping is done in multiple stages
- Using `node-cron` for my online scrapping bot scheduling
- Changed request time to 4 hours time-space

#### v1.0.1

- Enabled pagination for the articles
- Changed the data display layout for the articles api to include no of articles, per page articles and no of pages

#### v1.0.0

- Scheduled scrapping of data occuring every 6 hours
- Laravel data available from official site
