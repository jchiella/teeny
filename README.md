# Teeny

Teeny is a tiny news/posting site inspired by Reddit and Hacker News. It is designed to be easy to self-host and super lightweight.

# Design

## Server

- Using Fastify (I'm trying it out instead of express and it is supposed to be super fast and lightweight)
- Teeny is based on a flat data structure of post objects which contain nested comments
- A comment object has a very simple structure:
```
user: 'jch' (the user that posted the comment)
body: 'What a cool comment!' (the body text of the comment)
score: +10 (the votes up - votes down for the comment)
children: MORE COMMENT OBJECTS (the nesting continues!)
```
- A post object has this structure:
```
user: 'jch' (the user that posted the post)
body: 'What a fantastic post! :)' (the body text of the post)
score: +40 (the votes up - votes down for the comment)
link: 'https://jameschiella.ca' (the external link associated with the post)
comments: TOP LEVEL COMMENT OBJECTS (all the comments which contain other comments which contain...)
channel: 'news' (the channel that this post was posted in)
```
- Notice that the main fields (user, body, and score) are in common between comments and posts
- Post objects are stored in a MongoDB instance and comments are nested inside posts
- This organization of nested objects is simple and straightforward while still being lightweight