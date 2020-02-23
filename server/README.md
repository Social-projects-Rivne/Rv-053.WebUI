

# Eeevent api documentation

## Authentication
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
| /api/auth/login | POST | Login user into system || {"user_email": "user_email", "password": "userpass"} | status(200).json({"token":"LoNg", "success":"true"}) <br> status(401).json({ err: "Wrong password or email" })|
| /api/auth/logout | POST | Logout user from the system |access token in header Authorization <br> refresh token in cache|| status(200).json({ "success": "true", "token": "new expiried token" }) <br> status(401).json({ error }) |
| /api/auth/register | POST | Add new user into the system || {"email": "user_email", "password": "userpass","fist_name":"Vasya", "last_name":"Pupkin","phone": "38012345678"} | status(201).json{"success":"true"}  <br> status(200).json"({ err: "User already exists" })|
|/api/auth/refresh|POST|Refresh token|refresh token in cache
|/api/auth/Facebook/:token||
|/api/auth/Google/:token||

## Users
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
| /api/user| GET | Get list of all users into the system |access token in header Authorization|| [{"id":"55","fistname":"Vasya", "lastname":"Pupkin",  "created":"data","sex":"male","role":"user","status":"banned"}]|
| /api/user/:id| GET | Get info about user by id |access token in header Authorization|| {"fistname":"Vasya", "lastname":"Pupkin", "created":"date", "phone": "38012345678", "avatar":"URL", "birthday":"date", "sex":"male","role":"user","status":"banned"}|
| /api/user/:id/events| GET | Get list of user's events |access token in header Authorization|| {"listOfEvents":"[{"id": "id of event","name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}]"}|
|/api/user/:id/tags|GET|Get list of user's tags|access token in header Authorization||{"listOfCategories":"[{"id": "id of tag","category": "tag name example", "parent_id":"id of parent tag or 0" }]"}


## Profile
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
| /api/user/current | GET | Get full info about current user| access token in header Authorization|| { "id":"55", "fistname":"Vasya", "lastname":"Pupkin", "created":"date", "phone": "38012345678", "avatar":"URL", "birthday":"date","sex":"male","role":"user","status":"banned"} |
| /api/user/current| PUT | Update current user |access token in header Authorization |{fistname":"Vasya", "lastname":"Pupkin", "phone": "38012345678", "avatar":"URL", "birthday":"date","sex":"male"} | {"id":"55", "fistname":"Vasya", "lastname":"Pupkin", "created":"date", "phone": "38012345678", "avatar":"URL", "birthday":"date","sex":"male","role":"user","status":"banned"} |
|/api/user/followed-categories|GET|Get list of categories of current user|access token in header Authorization||{"categories": [{"id":"id of category","category":"name of category","parent_id":"id of parent category"}]
|/api/user/followed-categories|POST|Update list of categories of current user|access token in header Authorization|{"categories": [{"id":"id of category"}]|{"categories": [{"id":"id of category","category":"name of category","parent_id":"id of parent category"}]}|
|/api/user/followed-categories/:id|POST|Add category by id for current user|access token in header Authorization||{"message":"Category ${category} has been added"}
|/api/user/followed-events|GET|Get list of events of current user|access token in header Authorization||{"events":[{"id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}]}
|/api/user/followed-events|PUT|Update list of events of current user|access token in header Authorization|{"events":[{id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}]}




## Events
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
| /api/events | GET | Get list of all events ||| [{"id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}] |
| /api/events/:id | GET | Get info about event by id ||| {id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} |
| /api/events | POST | Add new event |access token in header Authorization| {"token":"LoNg",id":"event id", "name": "event name example","description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} |{id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}|
| /api/events/:id | POST | Update event by event id |access token in header Authorization| {"token":"LoNg", id":"event id", "name": "event name example", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} | {id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} |
| /api/events/:id | DELETE | Drop event by event id | access token in header Authorization|| {"message": "event ${name} has been deleted" }|
| /api/events/:id/subscribe | POST | Subscribe event by id for current user| access token in header Authorization|| {"message": "You subscribed  to ${name} event" }|
| /api/events/:id/unsubscribe | POST | Unsubscribe event by  id for current user|access token in header Authorization| | {"message": "You unsubscribed from ${name} event" }|
|/api/events/:id/tags|GET|List of categories for event by id|||[{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}]
|/api/events/:id/tags|POST|Update list of categories for event by id|access token in header Authorization||[{"id":"id of category"}]

## EventGallery
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
|api/events/:id/gallery|GET|Get gallery of event by id|||[{"id":"picture id", "img_url":"url of image","event_id":"id of event", "description":"description of picture"}]
|api/events/:id/gallery|POST|Add image to gallery of event|access token in header Authorization|{img_url":"url of image","event_id":"id of event", "description":"description of picture"}|{"id":"picture id", "img_url":"url of image","event_id":"id of event", "description":"description of picture"}
|api/events/:id/gallery/:id|GET|Get image by id|||{"img_url":"url of image","event_id":"id of event", "description":"description of picture"}
|api/events/:id/gallery/:id|POST|Update image or description by id|access token in header Authorization|{img_url":"url of image","event_id":"id of event", "description":"description of picture"}|{"img_url":"url of image","event_id":"id of event", "description":"description of picture"}
|api/events/:id/gallery/:id|DELETE|Delete image from the gallery|access token in header Authorization||{"message":"Image has been deleted"}


## Categories
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
|api/tags|GET|Get list of all categories|||[{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}]|
|api/tags/:id|GET|Get category by id|||{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}|
|api/tags|POST|Add new category|access token in header Authorization|{"category":"name of category", "parent_id":"id of parent category"}|{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}
|api/tags/:id|POST|Update category by id|access token in header Authorization|{"category":"name of category", "parent_id":"id of parent category"}|{"category":"name of category", "parent_id":"id of parent category"}
|api/tags/:id|DELETE|Delete category by id|access token in header Authorization|{"category":"name of category", "parent_id":"id of parent category"}|{"message":"Category ${category} has been deleted"}


## Feedbacks
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
|api/event/:id/feedbacks|GET|Get list of feedbacks for event by id|||[{"id":"feedback id","user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}]|
|api/event/:id/feedbacks|POST|Add feedback for event by id|access token in header Authorization| {"user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}|
|api/event/:id/feedbacks/:id|GET|Get feedback by id for event by id|||{"id":"feedback id","user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}|
|api/event/:id/feedbacks/:id|POST|Update feedback  (only author, admins and moderators)|access token in header Authorization|{"user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}|{"user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}
|api/event/:id/feedbacks/:id|DELETE|Delete feedback (only author, admins and moderators)|access token in header Authorization||{"message":"Feedback has been deleted"}

## Hubs
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
|api/hubs|GET|Get list of hubs|||[{"id":"id of hub", "name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}]
|api/hubs|POST|Add new hub|access token in header Authorization|{"name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}|{"id":"id of hub", "name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}
|api/hubs/:id|GET|Get info about hub by id|||{"name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}|
|api/hubs/:id|POST|Update hub by id|access token in header Authorization|{"name":"name", "location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description"}|{"name":"name", "location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}
|api/hubs/:id|DELETE|Delete hub by id|access token in header Authorization||{"message":"Hub has been deleted"}

## Followers
| api URL | HTTP Method | Description |Header and Cache| Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ | ------ |
|api/users/:id/followers|GET|Get list of user's (by id) followers|||[{}]
|api/users/:id/followers|POST|Add current user to the list of user's (by id) followers|access token in header Authorization||
|api/users/:id/followers|DELETE|Delete current user from the list of user's (by id) followers|access token in header Authorization||

