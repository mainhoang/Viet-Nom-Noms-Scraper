# Viet-Nom-Noms-Scraper
UCLA Extension Bootcamp - Homework # 18

### Overview
In this assignment, you'll create a web app that lets users leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.

### Instructions
Create an app that follows this user story:
* Whenever a user visits your site, the app will scrape stories from a news outlet of your choice. The data should at least include a link to the story and a headline, but feel free to add more content to your database (photos, bylines, and so on).
* Use Cheerio to grab the site content and Mongoose to save it to your MongoDB database. 
* All users can leave comments on the stories you collect. They should also be allowed to delete whatever comments they want removed. All stored comments should be visible to every user.
* You'll need to use Mongoose's model system to associate comments with particular articles. 
  
### Technologies Used
* express
* express-handlebars
* mongoose
* body-parser
* cheerio
* request
* javascript
