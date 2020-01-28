

# Eeevent api documentation

## Authentication
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
| /api/auth/login | POST | Login user into system | {"user_email": "user_email", "password": "userpass"} | status(200).json({"token":"LoNg", "success":"true"}) <br> status(401).json({ err: "Wrong password or email" })|
| /api/auth/logout | POST | Logout user from the system | {"token":"LoNg"}| status(200).json({ "success": "true", "token": "new expiried token" }) <br> status(401).json({ error }) |
| /api/auth/register | POST | Add new user into the system | {"user_email": "user_email", "password": "userpass","fistname":"Vasya", "lastname":"Pupkin","phone": "38012345678"} | status(201).json{"success":"true"}  <br> status(200).json"({ err: "User already exists" })|
|/api/auth/check| POST|Check token | {"token":"token"}|status(200).json({ "success": "true" }) <br> status(401).json({ error }) 
|/api/auth/refresh|POST|
|/api/auth/Facebook/:token||
|/api/auth/Google/:token||

## Users
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
| /api/users| GET | Get list of all users into the system || [{"id":"55","fistname":"Vasya", "lastname":"Pupkin",  "created":"data","sex":"male","role":"user","status":"banned"}]|
| /api/users/:id| GET | Get info about user by id |{token}  | {"fistname":"Vasya", "lastname":"Pupkin", "created":"date", "phone": "38012345678", "avatar":"URL", "birthday":"date", "sex":"male","role":"user","status":"banned"}|
| /api/users/:id/events| GET | Get list of user's events | {token} | {"listOfEvents":"[{"id": "id of event","name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}]"}|
|/api/users/:id/tags|GET|Get list of user's tags|{token}|{"listOfCategories":"[{"id": "id of tag","category": "tag name example", "parent_id":"id of parent tag or 0" }]"}


## Profile
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
| /api/profile | GET | Get full info about current user| {"token":"LoNg"} | { "id":"55", "fistname":"Vasya", "lastname":"Pupkin", "created":"date", "phone": "38012345678", "avatar":"URL", "birthday":"date","sex":"male","role":"user","status":"banned"} |
| /api/profile| POST | Update current user | {"token":"LoNg", "id":"55", "fistname":"Vasya", "lastname":"Pupkin", "phone": "38012345678", "avatar":"URL", "birthday":"date","sex":"male"} | {"id":"55", "fistname":"Vasya", "lastname":"Pupkin", "created":"date", "phone": "38012345678", "avatar":"URL", "birthday":"date","sex":"male","role":"user","status":"banned"} |
|/api/profile/tags|GET|Get list of categories of current user|{"token":"LoNg"}|{"categories": [{"id":"id of category","category":"name of category","parent_id":"id of parent category"}]
|/api/profile/tags|POST|Update list of categories of current user|{"token":"LoNg","categories": [{"id":"id of category"}]|{"categories": [{"id":"id of category","category":"name of category","parent_id":"id of parent category"}]}|
|/api/profile/tags/:id|POST|Add category by id for current user|{"token":"LoNg"}|{"message":"Category ${category} has been added"}
|/api/profile/events|GET|Get list of events of current user|{"token":"LoNg"}|{"events":[{"id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}]}
|/api/profile/events|POST|Update list of events of current user|{"token":"LoNg"}|{"events":[{id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}]}



## Events
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
| /api/events | GET | Get list of all events |{token} | [{"id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}] |
| /api/events/:id | GET | Get info about event by id | {token}| {id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} |
| /api/events | POST | Add new event | {"token":"LoNg",id":"event id", "name": "event name example","description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} |{id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"}|
| /api/events/:id | POST | Update event by event id | {"token":"LoNg", id":"event id", "name": "event name example", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} | {id":"event id", "name": "event name example", "owner_id": "owner_id", "description": "description for event", "location": "location", "datetime":"18.01.2020 17:00", "duration":"3 hours", "max_participants":"10", "min_age":"18", "cover":"cover", "status":"status", "price":"price"} |
| /api/events/:id | DELETE | Drop event by event id | {"token":"LoNg", id":"event id"}| {"message": "event ${name} has been deleted" }|
| /api/events/:id/subscribe | POST | Subscribe event by id for current user| {"token":"LoNg", "id": "event id"}| {"message": "You subscribed  to ${name} event" }|
| /api/events/:id/unsubscribe | POST | Unsubscribe event by  id for current user| {"token":"LoNg", "id": "event id"}| {"message": "You unsubscribed from ${name} event" }|
|/api/events/:id/tags|GET|List of categories for event by id|{token}|[{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}]
|/api/events/:id/tags|POST|Update list of categories for event by id|[{"id":"id of category"}]|[{"id":"id of category"}]

## EventGallery
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
|api/events/:id/gallery|GET|Get gallery of event by id|{token}|[{"id":"picture id", "img_url":"url of image","event_id":"id of event", "description":"description of picture"}]
|api/events/:id/gallery|POST|Add image to gallery of event|{"token":"LoNg","img_url":"url of image","event_id":"id of event", "description":"description of picture"}|{"id":"picture id", "img_url":"url of image","event_id":"id of event", "description":"description of picture"}
|api/events/:id/gallery/:id|GET|Get image by id|{token}|{"img_url":"url of image","event_id":"id of event", "description":"description of picture"}
|api/events/:id/gallery/:id|POST|Update image or description by id|{"token":"LoNg", "img_url":"url of image","event_id":"id of event", "description":"description of picture"}|{"img_url":"url of image","event_id":"id of event", "description":"description of picture"}
|api/events/:id/gallery/:id|DELETE|Delete image from the gallery|{"token":"LoNg"}|{"message":"Image has been deleted"}


## Categories
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
|api/tags|GET|Get list of all categories|{token}|[{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}]|
|api/tags/:id|GET|Get category by id|{token}|{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}|
|api/tags|POST|Add new category|{"token":"LoNg","category":"name of category", "parent_id":"id of parent category"}|{"id":"category id", "category":"name of category", "parent_id":"id of parent category"}
|api/tags/:id|POST|Update category by id|{"token":"LoNg","category":"name of category", "parent_id":"id of parent category"}|{"category":"name of category", "parent_id":"id of parent category"}
|api/tags/:id|DELETE|Delete category by id|{"token":"LoNg","category":"name of category", "parent_id":"id of parent category"}|{"message":"Category ${category} has been deleted"}


## Feedbacks
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
|api/event/:id/feedbacks|GET|Get list of feedbacks for event by id|{token}|[{"id":"feedback id","user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}]|
|api/event/:id/feedbacks|POST|Add feedback for event by id| {"token":"LoNg","user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}|
|api/event/:id/feedbacks/:id|GET|Get feedback by id for event by id|{token}|{"id":"feedback id","user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}|
|api/event/:id/feedbacks/:id|POST|Update feedback  (only author, admins and moderators)|{"token":"LoNg","user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}|{"user_event_id":"id of author", "positive":"positive review", "negative": "negative review", "date":"11.02.2020"}
|api/event/:id/feedbacks/:id|DELETE|Delete feedback (only author, admins and moderators)|{"token":"LoNg"}|{"message":"Feedback has been deleted"}

## Hubs
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
|api/hubs|GET|Get list of hubs|{token}|[{"id":"id of hub", "name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}]
|api/hubs|POST|Add new hub|{"token":"LoNg", "name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}|{"id":"id of hub", "name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}
|api/hubs/:id|GET|Get info about hub by id|{token}|{"name":"name","location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}|
|api/hubs/:id|POST|Update hub by id|{"token":"LoNg", "name":"name", "location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description"}|{"name":"name", "location":"location of hub", "phone":"phone", "email":"email", "img":"url of image", "description":"description", "owner_id":"user's id"}
|api/hubs/:id|DELETE|Delete hub by id|{"token":"LoNg"}|{"message":"Hub has been deleted"}

## Followers
| api URL | HTTP Method | Description | Request JSON | Response JSON |
| ------ | ------ | ------ | ------ | ------ |
|api/users/:id/followers|GET|Get list of user's (by id) followers|{token}|[{}]
|api/users/:id/followers|POST|Add current user to the list of user's (by id) followers|{token}|
|api/users/:id/followers|DELETE|Delete current user from the list of user's (by id) followers|{token}|

