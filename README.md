# Teeny

Teeny is a tiny news/posting site inspired by Reddit and Hacker News. It is designed to be easy to self-host and super lightweight.

# Design

## Server

- Using Fastify (I'm trying it out instead of express and it is supposed to be super fast and lightweight)
- Teeny is based on a flat data structure of post objects, comment objects, user objects, and channel objects
- A comment object has a very simple structure:
```
user:  USER ID  (user that posted the comment)
body: 'What a cool comment!' (the body text of the comment)
score: +10 (the votes up - votes down for the comment)
parent: POST/COMMENT ID (the id of the post this comment belongs to)
```
- A post object has this structure:
```
user: USER ID (the user that posted the post)
body: 'What a fantastic post! :)' (the body text of the post)
score: +40 (the votes up - votes down for the comment)
link: 'https://jameschiella.ca' (the external link associated with the post)
channel: CHANNEL ID (the channel that this post was posted in)
```
- Notice that the main fields (user, body, and score) are in common between comments and posts
- Each type of object is stored in a different mongodb collection in the teeny DB

- A user object has this structure:
```
name: 'jch'
...
```

- A channel object has this structure:
```
name: 'news'
...
```