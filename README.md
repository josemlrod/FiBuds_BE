# FiBuds Backend - Heroku
### Deployment steps:
* Create an account with [Heroku](signup.heroku.com).
* Install heroku: `$ brew install heroku/brew/heroku`
* Log in to your account with: `$ heroku login`
* While on the root directory of the app - `$ heroku create`
* To create DB `$ heroku addons:create heroku-postgresql:hobby-dev`
* To get the API Key `$ (heroku auth:token)`
* Now, there are some modifications that you need to make on your code:
	* It’s necessary to use `process.env.DATABASE_URL || “posgres://localhost/DB_NAME”` to allow the app to connect to the Heroku DB as well
	* Heroku will create a single DB, so `DROP DATABASE if exists` won’t work
	* The express port will also change, `process.env.PORT || LOCAL_PORT` to ensure Heroku can bind port
* To deploy: 
```
$ git push heroku master
$ heroku ps:scale web=1
```
* To test:
```
$ heroku logs —-tail	
```
---
### Travis Integration:
```
deploy:
	provider: heroku
	api_key: ...
	on: production
	strategy: git
	run:
		- [ANY_NECESSARY_TASK]
```