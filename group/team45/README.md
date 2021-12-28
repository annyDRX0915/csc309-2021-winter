# team45 MyTrans Lost And Found
 
 **Version 1.0.0**

A lost and found wesite used for items that are lost or found on the traffics.

---

## Table of Contents

- [Background](#background)
- [Contributing](#contributors)
- [Install](#install)
- [Usage](#usage)
- [Styles](#styles)
- [Packages Used](#packagesused)
    - [react](#react)
    - [react-router-dom](#react-router-dom)
    - [query-string](#query-string)
    - [jquery](#jquery)
-[Intructions](#instructions)


## Background

Based on data, the average amount of time people in Toronto spends commuting with public
transit is 52 minutes, and the percentage of transit riders in Toronto who ride public transit for more than 2 hours
every day is 53%. It is not hard to see that the demand for public transportation in Toronto is huge and
it also raises another serious problem that is loss during the public transit.
This is a web page, so that people who lost or pick the staff can have a safe, open and effective platform to publish 
their required announcements. This will greatly improve the possibility of finding lost items and building up a 
better society environment.



## Contributors

- Yuqi Chen 
- Anny Runxuan Dai
- Yuhao Yang
- Xingjian Zhou

## Install
```
git clone https://github.com/csc309-fall-2021/team45.git
```

## Usage
```
cd team45
cd lost-and-found
npm install
npm start
```

## Styles

Unique styles associated with each React component are kept separate. If the same styles are shared between multiple React components, keep them in a top-level, shared CSS file (i.e. `App.css`) to avoid repeated styles.

## PackagesUsed

### react
- React
- useState
### react-router-dom
- Link
- useLocation
- BrowserRouter
- Switch
- Route
### query-string
- queryString
### jquery
- $
### @material-ui
- Table
- Button
- Grid
- Card

## Instructions

You can use user@user.com and password user to login to user view page.
As a user, you can see all posts (lost and found) in the main display page. Also, you can search for specific item using the search bar. If you want to see details of items, you can click on the item name on the main page, and then you will see more detailed information about the item on new page. At the bottom of new page, you can see all the comments about this item (for now we just hardcoded same comments below each item)
If you want to add post, please click "Add Post" button on main page, and then you can create new post. 
Clicking on user's photo on the top right, you can go to your profile page, where you can edit your information, see all the posts you posted (lost and found), delete any of them, and send request to admin if you have questions or you need admin's help. 
You can use admin@admin.com and password admin to login to admin view page.
As an admin, you can see all the users' information and remove users if you want. Also, you can see all the post posted by all the users and delete any of them by clicking "post" on the side bar. By clicking "Requests" on the side bar, you can see all the requests from all users, and if you solve the problem, you can click "solve it" and then the request would disappear.
