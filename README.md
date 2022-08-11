# Social Network API

Authored by Charissa Hollister 08/08/2022

## Description

This is an API for a social network web application that allows users to be created to share their thoughts, react to other thoughts, and create a list of friends. It uses Express.js for routing and MongoDB for the database. Testing and demonstration is done using Insomnia.

## Features

API routes available:
- Show all users  
- Show a single user  
- Create a new user
- Update a user's username
- Delete a single user
- Associate another user as a friend
- Remove the friend connection
- Show all thoughts
- Show a single thought
- Create a new thought
- Delete a single thought
- Add a reaction to a thought
- Remove a reaction from a thought

## Demo Video

Google Drive Link to Demo:
https://watch.screencastify.com/v/9aakcZnt2Qyj0ChLFg4q

### GitHub Repo:

https://github.com/CharissaHollister/Social-Network-API

### Minimum customer criteria

AS A social media startup  
I WANT an API for my social network that uses a NoSQL database  
SO THAT my website can handle large amounts of unstructured data  

GIVEN a social network API  
WHEN I enter the command to invoke the application  
THEN my server is started and the Mongoose models are synced to the MongoDB database  
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON  
WHEN I test API POST, PUT, and DELETE routes in Insomnia  
THEN I am able to successfully create, update, and delete users and thoughts in my database  
WHEN I test API POST and DELETE routes in Insomnia  
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list  
