# Design social media news feed

Design a social media news feed like Twitter Timeline and Search

## Requirements:

In actual interview, one should always clarify requirements at the beginning of the interview.
In mock interview, the requirements are specified to help the users move forward

We'll scope the problem to handle only the following use cases
- User posts a tweet
- Service pushes tweets to followers, sending push notifications and emails
- User views the user timeline (activity from the user)
- User views the home timeline (activity from people the user is following)
- User searches keywords
- Service has high availability

**Out of scope**

- Service pushes tweets to the Twitter Firehose and other streams
- Service strips out tweets based on users' visibility settings
  - Hide @reply if the user is not also following the person being replied to
  - Respect 'hide retweets' setting
- Analytics
