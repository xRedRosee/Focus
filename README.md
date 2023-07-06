# Focus - Photography social media platform

## Why did I create this?

I created this for my passion project assignment for my ICT & media design semester 3. I designed and developed a photography social media platform.

## Description

I worked on a social media platform for photography. On the social media platform users can register an account, create posts, see posts from others and like and comment them and search for users.
The posts of an user contain some text and hashtags. Other users can see the comments made on the post and leave a comment themselves.
On a profile the followers count, following count and also posts count is shown, as well as a username, real name and bio. Users can also create an account and edit their account on the profile page.

## Features

### What can be done with the product?

Users can navigate through the app and do a lot of things like a real social media platform: create posts, like posts, comment posts, follow people. But also things as creating an account or updating an account. Right now the posts exists of some text and hashtags.

### What works well?

The register function works really well, the new user immediately gets added to the db.json file, just like with adding posts or comments.
The edit account funtion also works and updates everything in the db.json. The user can also search for other users.

### What needs improvement?

A nice addition would be if the search function wouldn't only search on users but also on hashtags. Another big improvement point, especially if it would come on the market, would be securing the authentication more. Right now, the passwords don't get secured and are saved in a JSON file. The last big improvement point would be adding images to the posts, but this could be done with adding a real database, such as MongoDB.

## Installation

### Compatibility

The PWA can be installed with:

- Safari iOS 11.3 or higher
- Android 4.4 or higher

### Installation Android devices

- Visit the Focus website: https://focus-iris.netlify.app/landing
- Click on the 3 dots at the top right corner of the screen and choose the ‘add to home screen’ option.
- Press on add again and enjoy the Focus PWA on your Android device!

### Installation iOS devices

- Make sure you visit the Focus website on Safari: https://focus-iris.netlify.app/landing
- Press the share button at the bottom of the screen and scroll down to the option ‘add to home screen’ and press add.
- Now you have the Focus PWA on your iOS device!

### Startup on desktop

- Go into the files folder where you want to install the Focus code map.
- Open your terminal and fill in the following npm command:
- `$ git clone https://git.fhict.nl/I487918/focus`

- You have to make sure you’re now in the Focus folder, if not then go into this folder with
- `$ cd Focus`

- To make the application work, you need to install the npm packages. You can do this with the following npm commands:
- `$ npm install`

- Now all the right npm packages are installed and you only need to run the application!

- First you need to run the (local) JSON server. This can be done with the following command:
- `$ json-server --watch db.json --port 3004`
- Note: if you want to use the LOCAL JSON server, change the fetch links into: http://localhost:3004/
- But if you want to use the 'real' db, you can visit it with the following link: https://focusdb.scarydemon.cf/

- Then you can start the application with the next command:
- `$ npm run dev`
- Visit the page on http://localhost:3000/landing to open the application.

### Logging in on the application

- Username: Iris
- Password: 1111
- Note: it’s case sensitive!

## Future plans

### Adding a database: upload photos & profile pictures

Adding a database would be a great addition to Focus. This would mean that the user can actually create posts with photos in it and also upload their own profile pictures.

### Direct message functionality

Another cool feature to implement would be a direct message function, such as Instagram or Facebook have. This would mean that the users can chat with each other in private and also get to know each other more with this. It would be a great addition to this social media platform since people love to chat with each other using social media.

### Online status

Right now you can’t see if an user is online or not, this would also be a cool addition to the social media platform. Users can see which friends are online and will send messages to these people.

### Public or private account

A feature that’s missing on the platform is setting your account public or private. Just like Instagram, user could choose to set their account on private and receive invitations from people. This way users can choose who can follow them and who not. The posts from this user can only be seen by their followers and not public.

### See follower and following list

Now the user only can see the follower and following count, but it would also be nice if the user can see the follower and following list, just like on other social media platforms. This could definitely be implemented in the future.

### Notifications

The last big feature that could definitely be implemented in the future would be notifications. For example, when you get a new follower, a new like or comment on your post etc. This could also mean push notifications on mobile and not just in app notifications.

### Secure password authentication

Because I have zero knowledge of securing an application by myself, I just check if the password matches the password in the db.json file. If the application would really go on the market it would be better to implement a more secure way of saving the passwords from users, and to prevent a data breach.

## Contributors

Iris Roemermann
